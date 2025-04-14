import { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch';
import * as fs from 'fs/promises';
import * as path from 'path';
import { scrapeMPTs, extractActivities } from '@/scripts/processData';
import { Activity } from '@/types/activity';

const validateApiKey = (request: NextRequest): boolean => {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }

  const providedApiKey = authHeader.substring(7);
  const validApiKey = process.env.API_SECRET_KEY;

  return providedApiKey === validApiKey;
};

export async function GET(request: NextRequest) {
  if (!validateApiKey(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const logs: string[] = [];
    const logMessage = (message: string) => {
      logs.push(message);
      console.log(message);
    };

    logMessage("Démarrage de l'extraction des données avec catégorisation avancée...");

    logMessage('Récupération des données des MPT...');
    const mpts = await scrapeMPTs(logMessage);
    logMessage(`${mpts.length} MPT récupérées.`);

    const dataDir = path.resolve(process.cwd(), 'data');
    await fs.mkdir(dataDir, { recursive: true });

    const xlsPath = path.resolve(dataDir, 'activites.xls');
    try {
      await fs.access(xlsPath, fs.constants.R_OK);
      logMessage('Fichier XLS trouvé et accessible.');
    } catch {
      logMessage('Téléchargement du fichier XLS...');
      const xlsResponse = await fetch(
        'https://data.montpellier3m.fr/sites/default/files/ressources/VilleMTP_MTP_ActivitesMPT.xls'
      );
      const xlsBuffer = await xlsResponse.arrayBuffer();
      await fs.writeFile(xlsPath, Buffer.from(xlsBuffer));
      logMessage('Fichier XLS téléchargé.');
    }

    logMessage('Extraction et catégorisation des activités...');
    const activities = await extractActivities(xlsPath, mpts, logMessage);
    logMessage(`${activities.length} activités extraites et catégorisées.`);

    await fs.writeFile(path.resolve(dataDir, 'mpt.json'), JSON.stringify(mpts, null, 2));

    await fs.writeFile(
      path.resolve(dataDir, 'activities.json'),
      JSON.stringify(activities, null, 2)
    );

    const categoryStats: Record<string, number> = {};
    const subCategoryStats: Record<string, Record<string, number>> = {};

    activities.forEach((activity: Activity) => {
      categoryStats[activity.category] = (categoryStats[activity.category] || 0) + 1;

      if (!subCategoryStats[activity.category]) {
        subCategoryStats[activity.category] = {};
      }
      subCategoryStats[activity.category][activity.subCategory] =
        (subCategoryStats[activity.category][activity.subCategory] || 0) + 1;
    });

    logMessage('Données enregistrées avec succès !');

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      stats: {
        mptCount: mpts.length,
        activityCount: activities.length,
        categories: categoryStats,
        subCategories: subCategoryStats,
      },
      logs: logs,
    });
  } catch (error) {
    console.error("Erreur lors de l'extraction des données:", error);
    return NextResponse.json(
      {
        error: "Erreur lors de l'extraction des données",
        message: error instanceof Error ? error.message : 'Erreur inconnue',
      },
      { status: 500 }
    );
  }
}
