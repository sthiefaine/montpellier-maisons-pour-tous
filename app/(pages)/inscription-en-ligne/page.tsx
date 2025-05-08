'use client';
import React, { useState, useRef, useEffect } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

import PdfPreview from './components/PdfPreview';
import CoordonneesImageInteractive from './components/CoordonneesImageInteractive';
import Page1Form from './components/Page1Form';
import Page2Form from './components/Page2Form';

export interface FormData {
  maison: string;
  saison: string;
  nom: string;
  prenom: string;
  sexe: string;
  mineur: boolean;
  adresse: string;
  codePostal: string;
  ville: string;
  telephone: string;
  email: string;
  acceptationInformations: boolean;
  dateNaissance: string;
  communeNaissance: string;
  departementNaissance: number;
  carteReseau: boolean;
  activites: { designation: string; jour: string; horaireDebut: string; horaireFin: string }[];
  total: string;
  modeReglement: string;
  datePaiementDebut1: number;
  datePaiementFin1: number;
  moisPaiement1: number;
  anneePaiement1: number;
  datePaiementDebut2: number;
  datePaiementFin2: number;
  moisPaiement2: number;
  anneePaiement2: number;
  faitA: string;
  signature: string;
  dateSignature: string;
  representantLegal1: {
    type: 'pere' | 'mere' | 'autre' | '';
    nom: string;
    prenom: string;
    jourNaissance: string;
    moisNaissance: string;
    anneeNaissance: string;
    sexe: string;
    adresse: string;
    codePostal: string;
    ville: string;
    tel: string;
    courriel: string;
  };
  representantLegal2: {
    type: 'pere' | 'mere' | 'autre' | '';
    nom: string;
    prenom: string;
    jourNaissance: string;
    moisNaissance: string;
    anneeNaissance: string;
    sexe: string;
    adresse: string;
    codePostal: string;
    ville: string;
    tel: string;
    courriel: string;
  };
  domiciliation: {
    domicile1: boolean;
    domicile2: boolean;
    gardeAlternee: boolean;
  };
  personnes: { id: string; nom: string; prenom: string; tel: string }[];
  personnesAccident: string[];
  personnesHabilitees: string[];
  autorisationSortie: 'autorise' | 'nAutorisePas';
  droitImage: 'autorise' | 'nAutorisePas';
  aps: 'apte' | 'nonApte';
  caf: {
    allocataire: boolean;
    numeroAllocataire: string;
    nbEnfants: number;
  };
  soussigneNom: string;
  soussignePrenom: string;
}

export interface PaiementAdmin {
  mode: string;
  date: string;
}

function pad2(n: number | string) {
  return n.toString().padStart(2, '0');
}

export default function InscriptionEnLigne() {
  const [form, setForm] = useState<FormData>({
    maison: 'Marcel Pagnol',
    saison: '2024-2025',
    nom: 'Dupont',
    prenom: 'Marie',
    sexe: 'Femme',
    mineur: true,
    adresse: '12 rue des Fleurs, Résidence du Parc, Appartement 123',
    codePostal: '34000',
    ville: 'Montpellier',
    telephone: '0601020304',
    email: 'marie.dupont@email.com',
    acceptationInformations: true,
    dateNaissance: '2001-05-12',
    communeNaissance: 'Montpellier',
    departementNaissance: 34,
    carteReseau: true,
    activites: [
      { designation: 'Activité 1', jour: 'Lundi', horaireDebut: '10:00', horaireFin: '12:00' },
      { designation: 'Activité 2', jour: 'Mardi', horaireDebut: '14:00', horaireFin: '16:00' },
      { designation: 'Activité 3', jour: 'Mercredi', horaireDebut: '18:00', horaireFin: '20:00' },
      { designation: 'Activité 4', jour: 'Jeudi', horaireDebut: '20:00', horaireFin: '22:00' },
    ],
    total: '100',
    modeReglement: '3fois',
    datePaiementDebut1: 1,
    datePaiementFin1: 31,
    moisPaiement1: 1,
    anneePaiement1: 2024,
    datePaiementDebut2: 1,
    datePaiementFin2: 31,
    moisPaiement2: 1,
    anneePaiement2: 2024,
    faitA: 'Montpellier',
    signature: 'Démonstration',
    dateSignature: new Date().toLocaleDateString('fr-FR'),
    representantLegal1: {
      type: 'pere',
      nom: 'Dupont',
      prenom: 'Thomas',
      jourNaissance: '12',
      moisNaissance: '01',
      anneeNaissance: '1996',
      sexe: 'M',
      adresse: '123 rue de la paix',
      codePostal: '75000',
      ville: 'Paris',
      tel: '06 06 06 06 06',
      courriel: 'thomas.dupont@gmail.com',
    },
    representantLegal2: {
      type: 'mere',
      nom: 'Dupont',
      prenom: 'Marie',
      jourNaissance: '12',
      moisNaissance: '01',
      anneeNaissance: '1991',
      sexe: 'F',
      adresse: '321 rue de la paix',
      codePostal: '75000',
      ville: 'Paris',
      tel: '06 06 06 06 06',
      courriel: 'marie.dupont@gmail.com',
    },
    domiciliation: {
      domicile1: false,
      domicile2: false,
      gardeAlternee: false,
    },
    personnes: [
      {
        id: Math.random().toString(36).slice(2) + Date.now().toString(36),
        nom: '',
        prenom: '',
        tel: '',
      },
    ],
    personnesAccident: [],
    personnesHabilitees: [],
    autorisationSortie: 'autorise',
    droitImage: 'autorise',
    aps: 'apte',
    caf: {
      allocataire: false,
      numeroAllocataire: '',
      nbEnfants: 0,
    },
    soussigneNom: '',
    soussignePrenom: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [live, setLive] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [paiementsAdmin, setPaiementsAdmin] = useState<PaiementAdmin[]>([
    { mode: 'CB', date: '01/01/2024' },
    { mode: 'Chèque', date: '01/01/2024' },
    { mode: 'Espèce', date: '01/01/2024' },
  ]);
  const [page, setPage] = useState(1);

  // Génération du PDF (utilisé pour le rendu live et la soumission)
  const generatePdf = async (formData: typeof form) => {
    const existingPdfBytes = await fetch('/MPT-Fiche-inscription-MPT.pdf').then(res =>
      res.arrayBuffer()
    );
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const page = pdfDoc.getPages()[0];
    const page2 = pdfDoc.getPages()[1];
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const defaultSize = 12;
    // Saison
    const saisonHeaderY = 773.5;
    const saisonHeaderSize = defaultSize;
    // start year 20XX get first char
    page.drawText(formData.saison.split('-')[0].slice(2).slice(0, 1), {
      x: 268,
      y: saisonHeaderY,
      size: saisonHeaderSize,
      font,
      color: rgb(0, 0, 0),
    });
    // start year 20XX get last char
    const startYearLastChar = formData.saison.split('-')[0].slice(2).slice(-1);
    page.drawText(startYearLastChar, {
      x: 280,
      y: saisonHeaderY,
      size: saisonHeaderSize,
      font,
      color: rgb(0, 0, 0),
    });

    // end year 20XX get first char
    page.drawText(formData.saison.split('-')[1].slice(2).slice(0, 1), {
      x: 316,
      y: saisonHeaderY,
      size: saisonHeaderSize,
      font,
      color: rgb(0, 0, 0),
    });
    // end year 20XX get last char
    const endYearLastChar = formData.saison.split('-')[1].slice(2).slice(-1);
    page.drawText(endYearLastChar, {
      x: 328,
      y: saisonHeaderY,
      size: saisonHeaderSize,
      font,
      color: rgb(0, 0, 0),
    });

    const maisonSize = formData.maison.length > 10 ? 11.2 : 12;
    page.drawText(formData.maison, { x: 333, y: 745, size: maisonSize, font, color: rgb(0, 0, 0) });

    const subsribersSize =
      formData.nom.length > 10 ? (formData.nom.length > 18 ? 10 : 11) : defaultSize;
    page.drawText(formData.nom.toUpperCase(), {
      x: 86,
      y: 669,
      size: subsribersSize,
      font,
      color: rgb(0, 0, 0),
    });
    page.drawText(formData.prenom.toUpperCase(), {
      x: 369,
      y: 669,
      size: subsribersSize,
      font,
      color: rgb(0, 0, 0),
    });

    // Date de naissance
    // jour
    page.drawText(formData.dateNaissance.split('-')[2], {
      x: 141,
      y: 651,
      size: defaultSize,
      font,
      color: rgb(0, 0, 0),
    });
    // mois
    page.drawText(formData.dateNaissance.split('-')[1], {
      x: 180,
      y: 651,
      size: defaultSize,
      font,
      color: rgb(0, 0, 0),
    });
    // année
    page.drawText(formData.dateNaissance.split('-')[0], {
      x: 219,
      y: 651,
      size: defaultSize,
      font,
      color: rgb(0, 0, 0),
    });

    // sexe
    if (formData.sexe === 'Femme') {
      page.drawText('x', {
        x: 374,
        y: 652,
        size: 10,
        font,
        color: rgb(0, 0, 0),
      });
    } else if (formData.sexe === 'Homme') {
      page.drawText('x', {
        x: 423.8,
        y: 652,
        size: 10,
        font,
        color: rgb(0, 0, 0),
      });
    }

    // mineur
    if (formData.mineur) {
      page.drawText('x', {
        x: 43,
        y: 632,
        size: 9,
        font,
        color: rgb(0, 0, 0),
      });
    }

    // Lieu de naissance
    const communeLines = formData.communeNaissance.split(' ');
    let currentCommuneY = 615;
    let currentCommuneLine = '';
    let currentCommuneX = 115;
    for (const word of communeLines) {
      const testLine = currentCommuneLine ? `${currentCommuneLine} ${word}` : word;
      if (testLine.length > 30) {
        page.drawText(currentCommuneLine, {
          x: currentCommuneX,
          y: currentCommuneY,
          size: defaultSize,
          font,
          color: rgb(0, 0, 0),
        });
        currentCommuneLine = word;
        currentCommuneY -= 15;
      } else {
        currentCommuneLine = testLine;
      }
    }
    if (currentCommuneLine) {
      page.drawText(currentCommuneLine, {
        x: currentCommuneX,
        y: currentCommuneY,
        size: defaultSize,
        font,
        color: rgb(0, 0, 0),
      });
    }

    // departement
    page.drawText(formData.departementNaissance.toString(), {
      x: 410,
      y: 599,
      size: defaultSize,
      font,
      color: rgb(0, 0, 0),
    });

    // adresse
    const adresseLines = formData.adresse.split(' ');
    let currentAdresseY = 582;
    let currentAdresseLine = '';
    let currentAdresseX = 92;
    for (const word of adresseLines) {
      const testLine = currentAdresseLine ? `${currentAdresseLine} ${word}` : word;
      if (testLine.length > 50) {
        page.drawText(currentAdresseLine, {
          x: currentAdresseX,
          y: currentAdresseY,
          size: defaultSize,
          font,
          color: rgb(0, 0, 0),
        });
        currentAdresseLine = word;
        currentAdresseY -= 15;
      } else {
        currentAdresseLine = testLine;
      }
    }
    if (currentAdresseLine) {
      page.drawText(currentAdresseLine, {
        x: currentAdresseX,
        y: currentAdresseY,
        size: defaultSize,
        font,
        color: rgb(0, 0, 0),
      });
    }

    // code postal
    page.drawText(formData.codePostal, {
      x: 109,
      y: 536,
      size: defaultSize,
      font,
      color: rgb(0, 0, 0),
    });

    // ville
    const citySize = formData.ville.length > 10 ? 11 : defaultSize;
    page.drawText(formData.ville, {
      x: 333,
      y: 536,
      size: citySize,
      font,
      color: rgb(0, 0, 0),
    });

    // téléphone
    page.drawText(formData.telephone, {
      x: 67,
      y: 518,
      size: defaultSize,
      font,
      color: rgb(0, 0, 0),
    });

    // email
    page.drawText(formData.email, {
      x: 287,
      y: 518,
      size: defaultSize,
      font,
      color: rgb(0, 0, 0),
    });

    // acceptation informations
    if (formData.acceptationInformations) {
      page.drawText('x', {
        x: 43,
        y: 500.5,
        size: 8,
        font,
        color: rgb(0, 0, 0),
      });
    }

    // activités HEADER
    // Saison
    const activitesHeaderY = 462;
    const activitesHeaderSize = defaultSize;
    // start year 20XX get first char
    page.drawText(formData.saison.split('-')[0].slice(2).slice(0, 1), {
      x: 360,
      y: activitesHeaderY,
      size: activitesHeaderSize,
      font,
      color: rgb(0, 0, 0),
    });
    // start year 20XX get last char
    const startActivitesHeaderLastChar = formData.saison.split('-')[0].slice(2).slice(-1);
    page.drawText(startActivitesHeaderLastChar, {
      x: 371,
      y: activitesHeaderY,
      size: activitesHeaderSize,
      font,
      color: rgb(0, 0, 0),
    });

    // end year 20XX get first char
    page.drawText(formData.saison.split('-')[1].slice(2).slice(0, 1), {
      x: 403,
      y: activitesHeaderY,
      size: activitesHeaderSize,
      font,
      color: rgb(0, 0, 0),
    });
    // end year 20XX get last char
    const endActivitesHeaderLastChar = formData.saison.split('-')[1].slice(2).slice(-1);
    page.drawText(endActivitesHeaderLastChar, {
      x: 414,
      y: activitesHeaderY,
      size: activitesHeaderSize,
      font,
      color: rgb(0, 0, 0),
    });

    // carte réseau
    if (formData.carteReseau) {
      page.drawText('x', {
        x: 249.5,
        y: 441,
        size: 9,
        font,
      });
    } else {
      page.drawText('x', {
        x: 299,
        y: 441,
        size: 9,
        font,
      });
    }

    // activités
    if (formData.activites[0].designation) {
      const activitySize = formData.activites[0].designation.length > 20 ? 9 : 11;
      page.drawText(formData.activites[0].designation, {
        x: 115,
        y: 395,
        size: activitySize,
        font,
      });

      page.drawText(formData.activites[0].jour, {
        x: 476,
        y: 406,
        size: 10,
        font,
      });

      page.drawText(formData.activites[0].horaireDebut, {
        x: 476,
        y: 387,
        size: 10,
        font,
      });

      page.drawText(formData.activites[0].horaireFin, {
        x: 516,
        y: 387,
        size: 10,
        font,
      });
    }

    if (formData.activites[1].designation) {
      const activitySize = formData.activites[0].designation.length > 20 ? 9 : 11;
      page.drawText(formData.activites[1].designation, {
        x: 115,
        y: 359,
        size: activitySize,
        font,
      });

      page.drawText(formData.activites[1].jour, {
        x: 476,
        y: 369,
        size: 10,
        font,
      });

      page.drawText(formData.activites[1].horaireDebut, {
        x: 476,
        y: 350,
        size: 10,
        font,
      });

      page.drawText(formData.activites[1].horaireFin, {
        x: 516,
        y: 350,
        size: 10,
        font,
      });
    }

    if (formData.activites[2].designation) {
      const activitySize = formData.activites[2].designation.length > 20 ? 9 : 11;
      page.drawText(formData.activites[2].designation, {
        x: 115,
        y: 322,
        size: activitySize,
        font,
      });

      page.drawText(formData.activites[2].jour, {
        x: 476,
        y: 333,
        size: 10,
        font,
      });

      page.drawText(formData.activites[2].horaireDebut, {
        x: 476,
        y: 314,
        size: 10,
        font,
      });

      page.drawText(formData.activites[2].horaireFin, {
        x: 516,
        y: 314,
        size: 10,
        font,
      });
    }

    if (formData.activites[3].designation) {
      const activitySize = formData.activites[3].designation.length > 20 ? 9 : 11;
      page.drawText(formData.activites[3].designation, {
        x: 115,
        y: 287,
        size: activitySize,
        font,
      });

      page.drawText(formData.activites[3].jour, {
        x: 476,
        y: 298,
        size: 10,
        font,
      });

      page.drawText(formData.activites[3].horaireDebut, {
        x: 476,
        y: 279,
        size: 10,
        font,
      });

      page.drawText(formData.activites[3].horaireFin, {
        x: 516,
        y: 279,
        size: 10,
        font,
      });
    }

    // total paiement
    page.drawText(formData.total + ' €', {
      x: 151,
      y: 234,
      size: defaultSize,
      font,
    });

    // mode de paiement
    if (formData.modeReglement === 'comptant') {
      page.drawText('x', {
        x: 401,
        y: 252,
        size: 9,
        font,
      });
    } else if (formData.modeReglement === '3fois') {
      page.drawText('x', {
        x: 496.5,
        y: 252,
        size: 9,
        font,
      });
    }

    if (formData.modeReglement === '3fois') {
      page.drawText(formData.saison.split('-')[0], {
        x: 452,
        y: 236,
        size: 9.5,
        font,
      });

      page.drawText(pad2(formData.datePaiementDebut1), {
        x: 316,
        y: 223,
        size: 9.5,
        font,
      });

      page.drawText(pad2(formData.datePaiementFin1), {
        x: 342,
        y: 223,
        size: 9.5,
        font,
      });

      page.drawText(pad2(formData.moisPaiement1), {
        x: 365,
        y: 223,
        size: 9.5,
        font,
      });

      page.drawText(formData.anneePaiement1.toString().slice(2), {
        x: 396,
        y: 223,
        size: 9.5,
        font,
      });

      // 3ème paiement
      page.drawText(pad2(formData.datePaiementDebut2), {
        x: 443,
        y: 223,
        size: 9.5,
        font,
      });

      page.drawText(pad2(formData.datePaiementFin2), {
        x: 469,
        y: 223,
        size: 9.5,
        font,
      });

      page.drawText(pad2(formData.moisPaiement2), {
        x: 490,
        y: 223,
        size: 9.5,
        font,
      });

      page.drawText(formData.anneePaiement2.toString().slice(2), {
        x: 521,
        y: 223,
        size: 9.5,
        font,
      });
    }

    // signature et date
    const faitASize = formData.faitA.length > 25 ? 10 : defaultSize;
    page.drawText(formData.faitA, {
      x: 73,
      y: 148,
      size: faitASize,
      font,
    });

    page.drawText(formData.dateSignature, {
      x: 73,
      y: 134,
      size: defaultSize,
      font,
    });

    page.drawText(formData.signature, {
      x: 374,
      y: 145,
      size: defaultSize,
      font,
    });

    // paiements administratifs
    if (paiementsAdmin.length > 0) {
      for (const [index, paiement] of paiementsAdmin.entries()) {
        page.drawText(paiement.mode, {
          x: 139,
          y: 76 - 17 * index,
          size: defaultSize,
          font,
        });

        page.drawText(paiement.date, {
          x: 452,
          y: 76 - 17 * index,
          size: defaultSize,
          font,
        });
      }
    }

    // page 2
    // start year 20XX get first char
    const saisonHeaderYPage2 = 770;
    page2.drawText(formData.saison.split('-')[0].slice(2).slice(0, 1), {
      x: 268,
      y: saisonHeaderYPage2,
      size: saisonHeaderSize,
      font,
      color: rgb(0, 0, 0),
    });
    // start year 20XX get last char
    page2.drawText(startYearLastChar, {
      x: 280,
      y: saisonHeaderYPage2,
      size: saisonHeaderSize,
      font,
      color: rgb(0, 0, 0),
    });

    // end year 20XX get first char
    page2.drawText(formData.saison.split('-')[1].slice(2).slice(0, 1), {
      x: 316,
      y: saisonHeaderYPage2,
      size: saisonHeaderSize,
      font,
      color: rgb(0, 0, 0),
    });
    // end year 20XX get last char

    page2.drawText(endYearLastChar, {
      x: 328,
      y: saisonHeaderYPage2,
      size: saisonHeaderSize,
      font,
      color: rgb(0, 0, 0),
    });

    page2.drawText(formData.maison, {
      x: 333,
      y: 745,
      size: maisonSize,
      font,
      color: rgb(0, 0, 0),
    });

    // Représentant légal 1
    if (formData.representantLegal1.type === 'pere') {
      page2.drawText('x', {
        x: 42.5,
        y: 666,
        size: 8,
        font,
        color: rgb(0, 0, 0),
      });
    }
    if (formData.representantLegal1.type === 'mere') {
      page2.drawText('x', {
        x: 85,
        y: 666,
        size: 8,
        font,
        color: rgb(0, 0, 0),
      });
    }
    if (formData.representantLegal1.type === 'autre') {
      page2.drawText('x', {
        x: 131,
        y: 666,
        size: 8,
        font,
        color: rgb(0, 0, 0),
      });
    }
    page2.drawText(formData.representantLegal1.nom, {
      x: 70,
      y: 647,
      size: defaultSize,
      font,
      color: rgb(0, 0, 0),
    });

    page2.drawText(formData.representantLegal1.prenom, {
      x: 80,
      y: 628,
      size: defaultSize,
      font,
      color: rgb(0, 0, 0),
    });

    // Date de naissance RL1
    page2.drawText(formData.representantLegal1.jourNaissance, {
      x: 125,
      y: 610,
      size: defaultSize,
      font,
      color: rgb(0, 0, 0),
    });

    page2.drawText(formData.representantLegal1.moisNaissance, {
      x: 153,
      y: 610,
      size: defaultSize,
      font,
      color: rgb(0, 0, 0),
    });

    page2.drawText(formData.representantLegal1.anneeNaissance, {
      x: 187,
      y: 610,
      size: defaultSize,
      font,
      color: rgb(0, 0, 0),
    });

    // Sexe RL1
    if (formData.representantLegal1.sexe === 'F') {
      page2.drawText('x', {
        x: 100,
        y: 592,
        size: 8,
        font,
        color: rgb(0, 0, 0),
      });
    } else if (formData.representantLegal1.sexe === 'M') {
      page2.drawText('x', {
        x: 142,
        y: 592,
        size: 8,
        font,
        color: rgb(0, 0, 0),
      });
    }

    // Adresse RL1
    const adresseRL1Size = formData.representantLegal1.adresse.length > 40 ? 10 : defaultSize;
    page2.drawText(formData.representantLegal1.adresse, {
      x: 80,
      y: 575,
      size: adresseRL1Size,
      font,
      color: rgb(0, 0, 0),
    });
    // Code postal et ville RL1
    page2.drawText(formData.representantLegal1.codePostal, {
      x: 100,
      y: 555,
      size: defaultSize,
      font,
      color: rgb(0, 0, 0),
    });

    page2.drawText(formData.representantLegal1.ville, {
      x: 70,
      y: 536,
      size: defaultSize,
      font,
      color: rgb(0, 0, 0),
    });

    // Téléphone et courriel RL1
    page2.drawText(formData.representantLegal1.tel, {
      x: 66,
      y: 517,
      size: defaultSize,
      font,
      color: rgb(0, 0, 0),
    });

    const courrielRL1Size = formData.representantLegal1.courriel.length > 30 ? 10 : defaultSize;
    page2.drawText(formData.representantLegal1.courriel, {
      x: 82,
      y: 500,
      size: courrielRL1Size,
      font,
      color: rgb(0, 0, 0),
    });

    // Représentant légal 2

    if (formData.representantLegal2.type === 'pere') {
      page2.drawText('x', {
        x: 303,
        y: 666,
        size: 8,
        font,
        color: rgb(0, 0, 0),
      });
    }
    if (formData.representantLegal2.type === 'mere') {
      page2.drawText('x', {
        x: 345.5,
        y: 666,
        size: 8,
        font,
        color: rgb(0, 0, 0),
      });
    }
    if (formData.representantLegal2.type === 'autre') {
      page2.drawText('x', {
        x: 391.5,
        y: 666,
        size: 8,
        font,
        color: rgb(0, 0, 0),
      });
    }

    page2.drawText(formData.representantLegal2.nom, {
      x: 330,
      y: 647,
      size: defaultSize,
      font,
      color: rgb(0, 0, 0),
    });

    page2.drawText(formData.representantLegal2.prenom, {
      x: 341,
      y: 628,
      size: defaultSize,
      font,
      color: rgb(0, 0, 0),
    });

    // Date de naissance RL2
    page2.drawText(formData.representantLegal2.jourNaissance, {
      x: 385,
      y: 610,
      size: defaultSize,
      font,
      color: rgb(0, 0, 0),
    });

    page2.drawText(formData.representantLegal2.moisNaissance, {
      x: 415,
      y: 610,
      size: defaultSize,
      font,
      color: rgb(0, 0, 0),
    });

    page2.drawText(formData.representantLegal2.anneeNaissance, {
      x: 446,
      y: 610,
      size: defaultSize,
      font,
      color: rgb(0, 0, 0),
    });

    // Sexe RL2
    if (formData.representantLegal2.sexe === 'F') {
      page2.drawText('x', {
        x: 360,
        y: 593,
        size: 10,
        font,
        color: rgb(0, 0, 0),
      });
    }
    if (formData.representantLegal2.sexe === 'M') {
      page2.drawText('x', {
        x: 402,
        y: 593,
        size: 10,
        font,
        color: rgb(0, 0, 0),
      });
    }

    // Adresse RL2
    const adresseRL2Size = formData.representantLegal2.adresse.length > 40 ? 10 : defaultSize;
    page2.drawText(formData.representantLegal2.adresse, {
      x: 340,
      y: 575,
      size: adresseRL2Size,
      font,
      color: rgb(0, 0, 0),
    });
    // Code postal et ville RL2
    page2.drawText(formData.representantLegal2.codePostal, {
      x: 360,
      y: 555,
      size: defaultSize,
      font,
      color: rgb(0, 0, 0),
    });

    page2.drawText(formData.representantLegal2.ville, {
      x: 330,
      y: 536,
      size: defaultSize,
      font,
      color: rgb(0, 0, 0),
    });

    // Téléphone et courriel RL2
    page2.drawText(formData.representantLegal2.tel, {
      x: 330,
      y: 517,
      size: defaultSize,
      font,
      color: rgb(0, 0, 0),
    });

    const courrielRL2Size = formData.representantLegal2.courriel.length > 30 ? 10 : defaultSize;
    page2.drawText(formData.representantLegal2.courriel, {
      x: 345,
      y: 498,
      size: courrielRL2Size,
      font,
      color: rgb(0, 0, 0),
    });

    // Domiciliation
    if (formData.domiciliation.domicile1) {
      page2.drawText('x', {
        x: 42.5,
        y: 470,
        size: 8,
        font,
        color: rgb(0, 0, 0),
      });
    }
    if (formData.domiciliation.domicile2) {
      page2.drawText('x', {
        x: 198.5,
        y: 470,
        size: 8,
        font,
        color: rgb(0, 0, 0),
      });
    }
    if (formData.domiciliation.gardeAlternee) {
      page2.drawText('x', {
        x: 368,
        y: 470,
        size: 8,
        font,
        color: rgb(0, 0, 0),
      });
    }

    // Personnes (accidents)
    if (formData.personnesAccident.length > 0) {
      for (let index = 0; index < formData.personnesAccident.length; index++) {
        const personne = formData.personnesAccident[index];
        const personneData = formData.personnes.find(p => p.id === personne);
        if (personneData) {
          const nomSize = personneData.nom.length > 20 ? 10 : defaultSize;
          page2.drawText(personneData.nom.toUpperCase().charAt(0) + personneData.nom.slice(1), {
            x: 71 + index * 262,
            y: 395,
            size: nomSize,
            font,
            color: rgb(0, 0, 0),
          });
          const prenomSize = personneData.prenom.length > 20 ? 10 : defaultSize;
          page2.drawText(
            personneData.prenom.toUpperCase().charAt(0) + personneData.prenom.slice(1),
            {
              x: 85 + index * 262,
              y: 376,
              size: prenomSize,
              font,
              color: rgb(0, 0, 0),
            }
          );
          page2.drawText(personneData.tel, {
            x: 63 + index * 262,
            y: 358,
            size: defaultSize,
            font,
            color: rgb(0, 0, 0),
          });
        }
      }
    }

    // Personnes (habilités)
    if (formData.personnesHabilitees.length > 0) {
      for (let index = 0; index < formData.personnesHabilitees.length; index++) {
        const personne = formData.personnesHabilitees[index];
        const personneData = formData.personnes.find(p => p.id === personne);
        if (personneData) {
          const nomSize = personneData.nom.length > 20 ? 10 : defaultSize;
          page2.drawText(personneData.nom.toUpperCase().charAt(0) + personneData.nom.slice(1), {
            x: 71 + index * 262,
            y: 302,
            size: nomSize,
            font,
            color: rgb(0, 0, 0),
          });
          const prenomSize = personneData.prenom.length > 20 ? 10 : defaultSize;
          page2.drawText(
            personneData.prenom.toUpperCase().charAt(0) + personneData.prenom.slice(1),
            {
              x: 85 + index * 262,
              y: 283,
              size: prenomSize,
              font,
              color: rgb(0, 0, 0),
            }
          );
          page2.drawText(personneData.tel, {
            x: 63 + index * 262,
            y: 265,
            size: defaultSize,
            font,
            color: rgb(0, 0, 0),
          });
        }
      }
    }

    // Soussigne

    const soussigneString =
      formData.soussigneNom.toUpperCase().charAt(0) +
      formData.soussigneNom.slice(1) +
      ' ' +
      formData.soussignePrenom.toUpperCase().charAt(0) +
      formData.soussignePrenom.slice(1);

    const soussigneSize = soussigneString.length > 30 ? 10 : defaultSize;
    const soussigneSmallSize =
      soussigneString.length > 20 ? (soussigneString.length > 25 ? 6.5 : 8) : 10;
    // autorisationSortie: 'autorise',
    //droitImage: 'autorise',
    //aps: 'apte',
    if (formData.autorisationSortie === 'autorise') {
      page2.drawText(soussigneString, {
        x: 102,
        y: 230,
        size: soussigneSize,
        font,
        color: rgb(0, 0, 0),
      });
    }
    if (formData.droitImage === 'autorise') {
      page2.drawText(soussigneString, {
        x: 100,
        y: 174,
        size: soussigneSize,
        font,
        color: rgb(0, 0, 0),
      });
    }

    if (formData.aps === 'apte') {
      page2.drawText(soussigneString, {
        x: 94,
        y: 92,
        size: soussigneSmallSize,
        font,
        color: rgb(0, 0, 0),
      });
    }

    // checkbox sortie
    if (formData.autorisationSortie === 'autorise') {
      page2.drawText('x', {
        x: 42,
        y: 211,
        size: 8,
        font,
        color: rgb(0, 0, 0),
      });
    } else {
      page2.drawText('x', {
        x: 103,
        y: 211,
        size: 8,
        font,
      });
    }

    // checkbox droit image
    if (formData.droitImage === 'autorise') {
      page2.drawText('x', {
        x: 42,
        y: 159.5,
        size: 8,
        font,
        color: rgb(0, 0, 0),
      });
    } else {
      page2.drawText('x', {
        x: 103,
        y: 159.5,
        size: 8,
        font,
      });
    }

    // checkbox aps
    if (formData.aps === 'apte') {
      page2.drawText('x', {
        x: 383.5,
        y: 92,
        size: 8,
        font,
        color: rgb(0, 0, 0),
      });
    } else {
      page2.drawText('x', {
        x: 455,
        y: 92,
        size: 8,
        font,
      });
    }

    // checkbox caf
    if (formData.caf.allocataire) {
      page2.drawText('x', {
        x: 113,
        y: 55,
        size: 8,
      });
    }

    if (formData.caf.allocataire === false) {
      page2.drawText('x', {
        x: 150,
        y: 55,
        size: 8,
      });
    }

    // numero allocataire et nombre d'enfants
    if (formData.caf.allocataire) {
      page2.drawText(formData.caf.numeroAllocataire, {
        x: 305,
        y: 56,
        size: 8,
      });
      page2.drawText(formData.caf.nbEnfants.toString(), {
        x: 511,
        y: 56,
        size: 8,
      });
    }

    // end page 2
    // signature et date
    page2.drawText(formData.faitA, {
      x: 72, y: 34,
      size: faitASize,
      font,
    });

    page2.drawText(formData.dateSignature, {
      x: 208,
      y: 34,
      size: defaultSize,
      font,
    });

    page2.drawText(formData.signature, {
      x: 460, y: 23,
      size: defaultSize,
      font,
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
  };

  // Rendu live : génère le PDF à chaque modif (avec debounce)
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    // Gestion des champs imbriqués (ex: caf.allocataire)
    if (name === 'caf.allocataire') {
      setForm(prev => ({
        ...prev,
        caf: {
          ...prev.caf,
          allocataire: value === 'true',
        },
      }));
      return;
    }
    // Gestion des champs imbriqués (ex: domiciliation.domicile1)
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setForm(prev => {
        const parentValue = prev[parent as keyof FormData];
        if (typeof parentValue === 'object' && parentValue !== null) {
          return {
            ...prev,
            [parent]: {
              ...parentValue,
              [child]: type === 'checkbox' || type === 'radio' ? checked : value,
            },
          };
        }
        return prev;
      });
      return;
    }
    setForm(prev => ({
      ...prev,
      [name]: name === 'carteReseau' ? value === 'true' : type === 'checkbox' ? checked : value,
    }));
  };

  // Handler pour les activités
  const handleActiviteChange = (
    index: number,
    field: 'designation' | 'jour' | 'horaireDebut' | 'horaireFin',
    value: string
  ) => {
    setForm(prev => {
      const activites = prev.activites.map((a, i) => (i === index ? { ...a, [field]: value } : a));
      return { ...prev, activites };
    });
    if (live) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(async () => {
        const newForm = {
          ...form,
          activites: form.activites.map((a, i) => (i === index ? { ...a, [field]: value } : a)),
        };
        const url = await generatePdf(newForm);
        setPdfUrl(url);
      }, 400);
    }
  };

  const handlePaiementAdminChange = (index: number, field: 'mode' | 'date', value: string) => {
    setPaiementsAdmin(prev => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
  };

  useEffect(() => {
    if (live) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(async () => {
        const url = await generatePdf(form);
        setPdfUrl(url);
      }, 400);
    }
  }, [form, live]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Navigation pages */}
      <div className="mb-6 flex gap-4 justify-center">
        <button
          className={`px-4 py-2 rounded font-semibold ${page === 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setPage(1)}
        >
          Page 1
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold ${page === 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setPage(2)}
        >
          Page 2
        </button>
      </div>
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-8 flex flex-col md:flex-row gap-8">
        {/* Colonne formulaire */}
        <div className="flex-1 min-w-[320px]">
          <h1 className="text-3xl font-bold mb-6 text-blue-700">Inscription en ligne</h1>
          {page === 1 ? (
            <Page1Form
              form={form}
              handleFormChange={handleFormChange}
              handleActiviteChange={handleActiviteChange}
              paiementsAdmin={paiementsAdmin}
              handlePaiementAdminChange={(index, field, value) =>
                handlePaiementAdminChange(index, field as 'mode' | 'date', value)
              }
            />
          ) : (
            <Page2Form form={form} handleFormChange={handleFormChange} />
          )}
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors mt-6"
          >
            {loading ? 'Génération du PDF...' : 'Télécharger le PDF pré-rempli'}
          </button>
          <p className="mt-6 text-gray-500 text-sm">
            Le PDF généré respecte la confidentialité de vos données et n'est pas stocké sur le
            serveur.
          </p>
        </div>
        {/* Colonne aperçu PDF */}
      </div>
    </div>
  );
}
