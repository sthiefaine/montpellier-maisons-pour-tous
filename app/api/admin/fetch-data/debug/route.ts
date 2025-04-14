import { NextResponse } from 'next/server';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as XLSX from 'xlsx';

// Route API de débogage pour tester l'accès aux fichiers
export async function GET() {
  try {
    const logs: string[] = [];
    const logMessage = (message: string) => {
      logs.push(message);
      console.log(message);
    };

    const dataDir = path.resolve(process.cwd(), 'data');
    logMessage(`Dossier de données résolu: ${dataDir}`);

    try {
      await fs.mkdir(dataDir, { recursive: true });
      logMessage(`Dossier de données créé ou déjà existant`);
    } catch (error) {
      logMessage(
        `Erreur lors de la création du dossier: ${
          error instanceof Error ? error.message : 'Erreur inconnue'
        }`
      );
    }

    try {
      const files = await fs.readdir(dataDir);
      logMessage(`Contenu du dossier (${files.length} fichiers):`);
      for (const file of files) {
        try {
          const stats = await fs.stat(path.join(dataDir, file));
          logMessage(
            `- ${file} (${stats.size} octets, ${stats.isDirectory() ? 'dossier' : 'fichier'})`
          );
        } catch (error) {
          logMessage(
            `- ${file} (erreur d'accès: ${
              error instanceof Error ? error.message : 'Erreur inconnue'
            })`
          );
        }
      }
    } catch (error) {
      logMessage(
        `Erreur lors de la lecture du dossier: ${
          error instanceof Error ? error.message : 'Erreur inconnue'
        }`
      );
    }

    // 3. Tester l'accès au fichier XLS spécifique
    const xlsPath = path.resolve(dataDir, 'activites.xls');
    logMessage(`Chemin du fichier XLS résolu: ${xlsPath}`);

    try {
      await fs.access(xlsPath, fs.constants.R_OK);
      logMessage(`Fichier XLS accessible en lecture`);

      // 4. Tester la lecture du fichier
      try {
        const fileBuffer = await fs.readFile(xlsPath);
        logMessage(`Fichier XLS lu avec succès (${fileBuffer.length} octets)`);

        // 5. Tester le parsing avec XLSX
        try {
          const workbook = XLSX.read(fileBuffer);
          const sheetNames = workbook.SheetNames;
          logMessage(`Parsing XLS réussi, feuilles trouvées: ${sheetNames.join(', ')}`);

          if (sheetNames.length > 0) {
            const firstSheet = workbook.Sheets[sheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet);
            logMessage(`Conversion en JSON réussie (${jsonData.length} lignes)`);

            if (jsonData.length > 0) {
              logMessage(`Exemple de la première ligne de données:`);
              logMessage(JSON.stringify(jsonData[0], null, 2));
            }
          }
        } catch (error) {
          logMessage(
            `Erreur lors du parsing XLS: ${
              error instanceof Error ? error.message : 'Erreur inconnue'
            }`
          );
        }
      } catch (error) {
        logMessage(
          `Erreur lors de la lecture du fichier: ${
            error instanceof Error ? error.message : 'Erreur inconnue'
          }`
        );
      }
    } catch (error) {
      logMessage(
        `Erreur d'accès au fichier XLS: ${
          error instanceof Error ? error.message : 'Erreur inconnue'
        }`
      );
    }

    // 6. Tester les permissions du processus
    try {
      const tempFile = path.join(dataDir, `test-${Date.now()}.txt`);
      await fs.writeFile(tempFile, "Test d'écriture");
      logMessage(`Test d'écriture réussi: ${tempFile}`);
      await fs.unlink(tempFile);
      logMessage(`Test de suppression réussi`);
    } catch (error) {
      logMessage(
        `Erreur lors du test d'écriture/suppression: ${
          error instanceof Error ? error.message : 'Erreur inconnue'
        }`
      );
    }

    // Renvoyer tous les logs comme réponse
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      environment: {
        nodeEnv: process.env.NODE_ENV,
        cwd: process.cwd(),
        tempDir: path.resolve(process.cwd(), 'tmp'),
        platform: process.platform,
        uid: process.getuid?.(),
        gid: process.getgid?.(),
      },
      logs: logs,
    });
  } catch (error) {
    console.error('Erreur générale:', error);
    return NextResponse.json(
      {
        error: 'Erreur lors du débogage',
        message: error instanceof Error ? error.message : 'Erreur inconnue',
      },
      { status: 500 }
    );
  }
}
