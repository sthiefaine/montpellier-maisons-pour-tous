import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as XLSX from 'xlsx';
import { MPT } from '@/types/maisons';
import { MAIN_CATEGORIES, MainCategory } from '@/types/categories';
import { determineSubCategory } from '@/helpers/categorizationHelpers';
import { Activity } from '@/types/activity';

/**
 * Normalise une catégorie en supprimant les espaces superflus et en uniformisant les apostrophes
 */
function normalizeCategory(category: string): string {
  return category
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[']/g, "'")
    .replace(/[’]/g, "'");
}

/**
 * Normalise un niveau en une valeur standardisée
 */
function normalizeLevel(level: string): {
  value: 'débutant' | 'intermédiaire' | 'confirmé' | 'tous niveaux';
  original: string;
} {
  if (!level) return { value: 'tous niveaux', original: '' };

  const levelLower = level.toLowerCase().trim();

  if (
    levelLower.includes('débutant') ||
    levelLower.includes('initiation') ||
    levelLower.includes('découverte')
  ) {
    return { value: 'débutant', original: level };
  }

  if (levelLower.includes('intermédiaire') || levelLower.includes('moyen')) {
    return { value: 'intermédiaire', original: level };
  }

  if (
    levelLower.includes('confirmé') ||
    levelLower.includes('avancé') ||
    levelLower.includes('perfectionnement')
  ) {
    return { value: 'confirmé', original: level };
  }

  return { value: 'tous niveaux', original: level };
}

/**
 * Extrait les informations d'âge d'une chaîne de caractères
 */
function extractAgeInfo(level: string): { min?: number; max?: number; text?: string } {
  if (!level) return {};

  const ageInfo: { min?: number; max?: number; text?: string } = {};

  const ageRangeMatch = level.match(/(\d+)\s*[-à]\s*(\d+)\s*ans?/);
  if (ageRangeMatch) {
    ageInfo.min = parseInt(ageRangeMatch[1]);
    ageInfo.max = parseInt(ageRangeMatch[2]);
    ageInfo.text = `${ageInfo.min}-${ageInfo.max} ans`;
    return ageInfo;
  }

  const minAgeMatch = level.match(/à partir de (\d+)\s*ans?/);
  if (minAgeMatch) {
    ageInfo.min = parseInt(minAgeMatch[1]);
    ageInfo.text = `À partir de ${ageInfo.min} ans`;
    return ageInfo;
  }

  const maxAgeMatch = level.match(/jusqu'à (\d+)\s*ans?/);
  if (maxAgeMatch) {
    ageInfo.max = parseInt(maxAgeMatch[1]);
    ageInfo.text = `Jusqu'à ${ageInfo.max} ans`;
    return ageInfo;
  }

  if (level.includes('ans')) {
    ageInfo.text = level;
  }

  return ageInfo;
}

/**
 * Scrape les détails d'une MPT depuis sa page de détail
 */
async function scrapeMPTDetails(
  slug: string,
  logMessage?: (message: string) => void
): Promise<{
  phone?: string;
  email?: string;
  instagram?: string;
  facebook?: string;
}> {
  const log = logMessage || console.log;
  const details: { phone?: string; email?: string; instagram?: string; facebook?: string } = {};

  try {
    const url = `https://www.montpellier.fr/territoire/lieux-equipements/${slug}`;
    log(`Scraping des détails de la MPT: ${url}`);

    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml',
        'Accept-Language': 'fr,fr-FR;q=0.9,en;q=0.8',
      },
    });

    if (!response.ok) {
      log(`Erreur HTTP lors du scraping des détails: ${response.status} ${response.statusText}`);
      return details;
    }

    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Récupération du téléphone
    const phoneLink = document.querySelector('a[href^="tel:"]');
    if (phoneLink) {
      details.phone = phoneLink.textContent?.trim() || undefined;
    }

    // Récupération de l'email
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
      details.email = emailLink.textContent?.trim() || undefined;
    }

    // Récupération des réseaux sociaux
    const socialLinks = document.querySelectorAll('.social-link-field a');
    socialLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href) {
        if (href.includes('facebook.com')) {
          details.facebook = href;
        } else if (href.includes('instagram.com')) {
          details.instagram = href;
        }
      }
    });

    return details;
  } catch (error) {
    log(
      `Erreur lors du scraping des détails: ${
        error instanceof Error ? error.message : 'Erreur inconnue'
      }`
    );
    return details;
  }
}

/**
 * Charge les coordonnées depuis le fichier maisons-livemap.json
 */
async function loadCoordinates(
  logMessage?: (message: string) => void
): Promise<Record<string, { lat: number; lng: number }>> {
  const log = logMessage || console.log;
  const coordinates: Record<string, { lat: number; lng: number }> = {};

  try {
    const filePath = path.join(process.cwd(), 'data/sav/maisons-livemap.json');
    const fileContent = await fs.readFile(filePath, 'utf8');
    const mpts = JSON.parse(fileContent);

    for (const mpt of mpts) {
      if (mpt.latitude && mpt.longitude) {
        // On utilise le nom de la MPT comme clé
        coordinates[mpt.name] = {
          lat: mpt.latitude,
          lng: mpt.longitude,
        };
      }
    }

    log(`Coordonnées chargées pour ${Object.keys(coordinates).length} MPTs`);
    return coordinates;
  } catch (error) {
    log(
      `Erreur lors du chargement des coordonnées: ${
        error instanceof Error ? error.message : 'Erreur inconnue'
      }`
    );
    return {};
  }
}

export async function scrapeMPTs(logMessage?: (message: string) => void): Promise<MPT[]> {
  const log = logMessage || console.log;

  try {
    // Chargement des coordonnées
    const coordinates = await loadCoordinates(log);

    const baseUrl =
      'https://www.montpellier.fr/vie-quotidienne/vivre-ici/se-cultiver/24-maisons-pour-tous-a-montpellier';
    let currentPage = 0;
    let hasMorePages = true;
    const allMPTs: MPT[] = [];

    log('Démarrage du scraping des MPT avec pagination...');

    while (hasMorePages) {
      const targetUrl = `${baseUrl}?page1=&page=${currentPage}`;

      log(`Scraping de la page ${currentPage + 1}: ${targetUrl}`);

      const response = await fetch(targetUrl, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          Accept: 'text/html,application/xhtml+xml,application/xml',
          'Accept-Language': 'fr,fr-FR;q=0.9,en;q=0.8',
        },
      });

      if (!response.ok) {
        log(`Erreur HTTP: ${response.status} ${response.statusText}`);
        break;
      }

      const html = await response.text();

      const dom = new JSDOM(html);
      const document = dom.window.document;

      const mptCards = Array.from(document.querySelectorAll('div.flex.flex-col'));

      const relevantCards = mptCards.filter(card => {
        const title = card.querySelector('h2.drt-title-heading')?.textContent;
        return title && title.includes('Maison pour tous');
      });

      if (relevantCards.length === 0) {
        log(`Aucune carte MPT trouvée sur la page ${currentPage + 1}, fin du scraping.`);
        break;
      }

      log(`Trouvé ${relevantCards.length} cartes de MPT sur la page ${currentPage + 1}`);

      for (const card of relevantCards) {
        const nameElement = card.querySelector('h2.drt-title-heading');
        const name = nameElement?.textContent?.trim() || '';

        if (!name) {
          log(`Nom de MPT non trouvé, ignoré.`);
          continue;
        }
        const addressContainer = card.querySelector(
          '.p-7 .flex.flex-col > div > div:nth-child(1) > div'
        );

        const address = addressContainer?.textContent?.trim() || '';

        const linkElement = card.querySelector('a.coverLink');
        const detailUrl = linkElement?.getAttribute('href') || '';

        const openingHoursDiv = card.querySelector('.office-hours');
        const openingHours: MPT['openingHours'] = {};

        if (openingHoursDiv) {
          const hourItems = openingHoursDiv.querySelectorAll('.office-hours__item');
          hourItems.forEach(item => {
            const day =
              item
                .querySelector('.office-hours__item-label')
                ?.textContent?.replace(':', '')
                .trim() || '';
            const slots =
              item.querySelector('.office-hours__item-slots')?.textContent?.trim() || '';
            const comments =
              item.querySelector('.office-hours__item-comments')?.textContent?.trim() || '';

            if (day) {
              openingHours[day] = {
                slots: slots.split(',').map(s => s.trim()),
                comments: comments || undefined,
              };
            }
          });
        }

        const codeMPT = name.replace(/Maison pour tous /i, '').trim();
        const codeMPTWithDashes = codeMPT.replace(/\s+/g, '-');

        let slug = '';
        if (detailUrl) {
          const urlParts = detailUrl.split('/');
          slug = urlParts[urlParts.length - 1];
        } else {
          slug = name
            .toLowerCase()
            .replace(/maison pour tous /i, '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-');
        }

        if (allMPTs.some(mpt => mpt.slug === slug)) {
          log(`MPT "${name}" déjà ajoutée, ignorée.`);
          continue;
        }

        // Récupération des détails supplémentaires
        const details = await scrapeMPTDetails(slug, log);
        log(`Détails récupérés pour ${name}:`, details);

        // Récupération des coordonnées
        const mptCoordinates = coordinates[name];

        allMPTs.push({
          id: `mpt-${slug}`,
          codeMPT,
          codeMPTWithDashes,
          slug,
          name,
          address,
          openingHours,
          activities: [],
          phone: details.phone,
          email: details.email,
          instagram: details.instagram,
          facebook: details.facebook,
          coordinates: mptCoordinates,
        });

        // Pause pour éviter de surcharger le serveur
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      const nextPageLink = document.querySelector('.pager__item--next a');
      if (!nextPageLink) {
        log('Aucun lien "page suivante" trouvé, fin du scraping.');
        hasMorePages = false;
      } else {
        currentPage++;
        log(`Passage à la page ${currentPage + 1}...`);

        await new Promise(resolve => setTimeout(resolve, 300));
      }

      if (currentPage > 20) {
        log(
          'Nombre maximum de pages atteint (20), arrêt du scraping pour éviter une boucle infinie.'
        );
        hasMorePages = false;
      }
    }

    log(`Scraping terminé. ${allMPTs.length} MPTs récupérées.`);
    return allMPTs;
  } catch (error) {
    log(
      `Erreur lors du scraping des MPT: ${
        error instanceof Error ? error.message : 'Erreur inconnue'
      }`
    );
    return [];
  }
}

export async function extractActivities(
  xlsPath: string,
  mpts: MPT[],
  logMessage?: (message: string) => void
): Promise<Activity[]> {
  const log = logMessage || console.log;

  try {
    log(`Lecture du fichier XLS: ${xlsPath}`);

    try {
      await fs.access(xlsPath, fs.constants.R_OK);
      log(`Fichier XLS trouvé et accessible`);
    } catch (error) {
      throw new Error(
        `Le fichier ${xlsPath} n'existe pas ou n'est pas accessible: ${
          error instanceof Error ? error.message : 'Erreur inconnue'
        }`
      );
    }

    const fileBuffer = await fs.readFile(xlsPath);
    log(`Fichier XLS lu avec succès (${fileBuffer.length} octets)`);

    const workbook = XLSX.read(fileBuffer);
    const sheetName = workbook.SheetNames[0];
    log(`Feuille de calcul trouvée: ${sheetName}`);

    const worksheet = workbook.Sheets[sheetName];

    const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');

    const headers = [];
    for (let C = range.s.c; C <= range.e.c; C++) {
      const cellAddress = XLSX.utils.encode_cell({ r: range.s.r, c: C });
      const cell = worksheet[cellAddress];
      headers.push(cell ? cell.v : undefined);
    }

    log(`En-têtes originaux: ${headers.join(', ')}`);

    const customHeaders: string[] = [];
    const headerCounts: Record<string, number> = {};

    headers.forEach(header => {
      if (header) {
        headerCounts[header] = (headerCounts[header] || 0) + 1;
        if (headerCounts[header] > 1) {
          customHeaders.push(`${header}_${headerCounts[header]}`);
        } else {
          customHeaders.push(header);
        }
      } else {
        customHeaders.push();
      }
    });

    log(`En-têtes personnalisés: ${customHeaders.filter(h => h).join(', ')}`);

    const rawData = XLSX.utils.sheet_to_json(worksheet, {
      header: customHeaders,
    });
    log(`Données XLS converties en JSON: ${rawData.length} lignes`);

    const mptNameToId = new Map();
    mpts.forEach(mpt => {
      if (mpt.codeMPT) {
        mptNameToId.set(mpt.codeMPT, mpt.id);
      }
      if (mpt.codeMPTWithDashes) {
        mptNameToId.set(mpt.codeMPTWithDashes, mpt.id);
        const simplifiedName = mpt.codeMPTWithDashes.split('-et-')[0];
        if (simplifiedName && simplifiedName !== mpt.codeMPTWithDashes) {
          mptNameToId.set(simplifiedName, mpt.id);
        }
      }
    });

    const jourToText = {
      '1': 'Lundi',
      '2': 'Mardi',
      '3': 'Mercredi',
      '4': 'Jeudi',
      '5': 'Vendredi',
      '6': 'Samedi',
      '7': 'Dimanche',
    };

    const formatHeure = (heure: string | number) => {
      const heureStr = String(heure).padStart(4, '0');
      return `${heureStr.substring(0, 2)}:${heureStr.substring(2, 4)}`;
    };

    const activities: Activity[] = [];
    let mptNotFoundCount = 0;
    const unmatchedMPTs = new Set<string>();

    if (rawData.length > 0) {
      log(`Exemple de la première ligne de données:`);
      log(JSON.stringify(rawData[0], null, 2));
    }

    rawData.forEach((row: any, index) => {
      const idTheme1 = row['idTheme1'];
      const libelleTheme1 = row['libelleTheme1'];
      const idTheme2 = row['idTheme2'];
      const libelleTheme2 = row['libelleTheme1_2'] || row['libelleTheme2'];
      const cdMPT = row['CDMPT'];
      const nomMPT = row['NOMLG'];
      const libelleActivite = row['libelleActivité'] || row['libelleActivite'];
      const libellePublic = row['libellePublic'];
      const niveau = row['niveau'];
      const jour = row['jour'];
      const heureDebut = row['heureDebut'];
      const heureFin = row['heureFin'];

      if (!libelleActivite || !nomMPT) return;

      if (libelleTheme1 === 'libelleTheme1') {
        return;
      }

      const mptId = mptNameToId.get(nomMPT) || '';

      if (!mptId) {
        if (!unmatchedMPTs.has(nomMPT)) {
          unmatchedMPTs.add(nomMPT);
          log(
            `Impossible de trouver la MPT correspondant à "${nomMPT}" pour l'activité "${libelleActivite}"`
          );
        }
        mptNotFoundCount++;
      }

      let mainCategory: string = libelleTheme1;
      if (!MAIN_CATEGORIES.includes(libelleTheme1 as MainCategory)) {
        const normalizedCategory = normalizeCategory(libelleTheme1);
        const normalizedMainCategories = MAIN_CATEGORIES.map(cat => normalizeCategory(cat));

        const matchingCategory = MAIN_CATEGORIES.find(
          cat => normalizeCategory(cat) === normalizedCategory
        );

        if (matchingCategory) {
          mainCategory = matchingCategory;
        } else {
          log(
            `Catégorie inconnue: "${libelleTheme1}" pour l'activité "${libelleActivite}", catégorie conservée`
          );
        }
      }

      const baseActivity = {
        name: libelleActivite,
        category: mainCategory,
        originalCategory: libelleTheme1,
        originalSubCategory: libelleTheme2,
      };

      const subCategory = determineSubCategory(baseActivity);

      const activity: Activity = {
        id: `activity-${index}`,
        name: libelleActivite,
        category: mainCategory as MainCategory,
        subCategory: subCategory || '',
        originalCategory: libelleTheme1,
        originalSubCategory: libelleTheme2,
        mptId,
        mptName: nomMPT,
        public: libellePublic,
        originalPublic: libellePublic,
        level: normalizeLevel(niveau),
        age: extractAgeInfo(niveau),
        schedule: jour
          ? {
              day: jourToText[jour as keyof typeof jourToText] || jour,
              startTime: heureDebut ? formatHeure(heureDebut) : undefined,
              endTime: heureFin ? formatHeure(heureFin) : undefined,
            }
          : undefined,
      };

      activities.push(activity);

      const mpt = mpts.find(m => m.id === mptId);
      if (mpt) {
        mpt.activities.push(activity.id);
      }
    });

    const categoryStats: Record<string, Record<string, number>> = {};
    MAIN_CATEGORIES.forEach((cat: MainCategory) => {
      categoryStats[cat] = {};
    });

    activities.forEach(activity => {
      if (!categoryStats[activity.category]) {
        categoryStats[activity.category] = {};
      }

      if (!categoryStats[activity.category][activity.subCategory]) {
        categoryStats[activity.category][activity.subCategory] = 0;
      }

      categoryStats[activity.category][activity.subCategory]++;
    });

    log('\nStatistiques de catégorisation:');
    Object.entries(categoryStats).forEach(([category, subcats]) => {
      log(`\n${category}:`);
      const sortedSubcats = Object.entries(subcats).sort((a, b) => b[1] - a[1]);
      sortedSubcats.forEach(([subcat, count]) => {
        log(`  - ${subcat}: ${count} activités`);
      });
    });

    if (mptNotFoundCount > 0) {
      log(
        `\nAu total, ${mptNotFoundCount} activités font référence à ${unmatchedMPTs.size} MPT qui n'ont pas été trouvées lors du scraping.`
      );
      log(`MPTs non trouvées: ${Array.from(unmatchedMPTs).join(', ')}`);
    }

    return activities;
  } catch (error) {
    log(
      `Erreur lors de l'extraction des activités: ${
        error instanceof Error ? error.message : 'Erreur inconnue'
      }`
    );
    throw error;
  }
}

if (require.main === module) {
  async function main() {
    const dataDir = path.resolve(process.cwd(), 'data');
    await fs.mkdir(dataDir, { recursive: true });

    const mptJsonPath = path.resolve(dataDir, 'mpt.json');
    const activitiesJsonPath = path.resolve(dataDir, 'activities.json');

    let existingMPTs: MPT[] = [];
    let existingActivities: Activity[] = [];

    try {
      const mptData = await fs.readFile(mptJsonPath, 'utf8');
      existingMPTs = JSON.parse(mptData);
      console.log(`Données existantes chargées: ${existingMPTs.length} MPT trouvées.`);
    } catch (error) {
      console.log('Aucun fichier de données MPT existant trouvé.');
    }

    try {
      const activitiesData = await fs.readFile(activitiesJsonPath, 'utf8');
      existingActivities = JSON.parse(activitiesData);
      console.log(`Données existantes chargées: ${existingActivities.length} activités trouvées.`);
    } catch (error) {
      console.log("Aucun fichier de données d'activités existant trouvé.");
    }

    console.log('Récupération des données des MPT...');
    const newMPTs = await scrapeMPTs();
    console.log(`${newMPTs.length} MPT récupérées.`);

    if (newMPTs.length === 0 && existingMPTs.length > 0) {
      console.log(
        'ATTENTION: Le scraping a échoué, aucune MPT récupérée. Conservation des données existantes.'
      );
      return;
    }

    if (newMPTs.length < existingMPTs.length * 0.8) {
      console.log(
        `ATTENTION: Le nombre de MPT a diminué significativement (${existingMPTs.length} -> ${newMPTs.length}).`
      );

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      await fs.copyFile(mptJsonPath, `${mptJsonPath}.${timestamp}.backup`);
      await fs.copyFile(activitiesJsonPath, `${activitiesJsonPath}.${timestamp}.backup`);
      console.log('Sauvegarde des données existantes créée.');
    }

    const xlsPath = path.resolve(dataDir, 'activites.xls');
    try {
      await fs.access(xlsPath);
      console.log('Fichier XLS déjà téléchargé.');
    } catch {
      console.log('Téléchargement du fichier XLS...');
      const xlsResponse = await fetch(
        'https://data.montpellier3m.fr/sites/default/files/ressources/VilleMTP_MTP_ActivitesMPT.xls'
      );
      const xlsBuffer = await xlsResponse.arrayBuffer();
      await fs.writeFile(xlsPath, Buffer.from(xlsBuffer));
      console.log('Fichier XLS téléchargé.');
    }

    console.log('Extraction des activités...');
    let newActivities: Activity[] = [];
    try {
      newActivities = await extractActivities(xlsPath, newMPTs);
      console.log(`${newActivities.length} activités extraites.`);
    } catch (error) {
      console.error("Erreur lors de l'extraction des activités:", error);
      if (existingActivities.length > 0) {
        console.log('Conservation des activités existantes.');
        return;
      }
    }

    if (newActivities.length === 0 && existingActivities.length > 0) {
      console.log(
        "ATTENTION: L'extraction a échoué, aucune activité récupérée. Conservation des données existantes."
      );
      return;
    }

    await fs.writeFile(mptJsonPath, JSON.stringify(newMPTs, null, 2));

    await fs.writeFile(activitiesJsonPath, JSON.stringify(newActivities, null, 2));

    console.log('Données enregistrées avec succès !');
  }

  main().catch(console.error);
}
