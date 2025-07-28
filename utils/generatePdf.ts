import type { FormData } from '@/types/form';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

function pad2(n: number | string) {
  return n.toString().padStart(2, '0');
}

export async function generatePdf(formData: FormData) {
  const existingPdfBytes = await fetch('/MPT-Fiche-inscription-MPT.pdf').then(res => {
    console.log(res, 'FETCHED');
    return res.arrayBuffer();
  });
  console.log(existingPdfBytes, 'EXISTING PDF BYTES');
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
  page.drawText(formData.maison.replace('Maison pour tous', ''), {
    x: 333,
    y: 745,
    size: maisonSize,
    font,
    color: rgb(0, 0, 0),
  });

  const subsribersSize =
    formData.nom.length > 10 ? (formData.nom.length > 18 ? 10 : 11) : defaultSize;
  page.drawText(formData.nom.toUpperCase(), {
    x: 86,
    y: 668,
    size: subsribersSize,
    font,
    color: rgb(0, 0, 0),
  });
  page.drawText(formData.prenom.toUpperCase(), {
    x: 369,
    y: 668,
    size: subsribersSize,
    font,
    color: rgb(0, 0, 0),
  });

  // Date de naissance
  if (formData.dateNaissance) {
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
  }

  // sexe
  if (formData.sexe === 'Femme') {
    page.drawText('x', {
      x: 374,
      y: 651,
      size: 10,
      font,
      color: rgb(0, 0, 0),
    });
  } else if (formData.sexe === 'Homme') {
    page.drawText('x', {
      x: 423.8,
      y: 651,
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
  if (formData.communeNaissance) {
    const communeLines = formData.communeNaissance.split(' ');
    let currentCommuneY = 615;
    let currentCommuneYSmallSize = 599;
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
      page.drawText(currentCommuneLine.slice(0, 1).toUpperCase() + currentCommuneLine.slice(1), {
        x: currentCommuneX,
        y: currentCommuneYSmallSize,
        size: defaultSize,
        font,
        color: rgb(0, 0, 0),
      });
    }
  }

  // departement
  if (formData.departementNaissance) {
    page.drawText(formData.departementNaissance.toString(), {
      x: 410,
      y: 599,
      size: defaultSize,
      font,
      color: rgb(0, 0, 0),
    });
  }

  // adresse
  if (formData.adresse) {
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
  }

  // code postal
  if (formData.codePostal) {
    page.drawText(formData.codePostal, {
      x: 109,
      y: 536,
      size: defaultSize,
      font,
      color: rgb(0, 0, 0),
    });
  }

  // ville
  if (formData.ville) {
    const citySize = formData.ville.length > 10 ? 11 : defaultSize;
    page.drawText(formData.ville.slice(0, 1).toUpperCase() + formData.ville.slice(1), {
      x: 333,
      y: 536,
      size: citySize,
      font,
      color: rgb(0, 0, 0),
    });
  }

  // téléphone
  if (formData.telephone) {
    page.drawText(formData.telephone, {
      x: 67,
      y: 518,
      size: defaultSize,
      font,
      color: rgb(0, 0, 0),
    });
  }

  // email
  if (formData.email) {
    page.drawText(formData.email, {
      x: 287,
      y: 518,
      size: defaultSize,
      font,
      color: rgb(0, 0, 0),
    });
  }

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
  if (formData.activites && formData.activites.length > 0) {
    formData.activites.forEach((activite, index) => {
      if (activite && activite.designation) {
        const activitySize = activite.designation.length > 20 ? 9 : 11;
        page.drawText(activite.designation, {
          x: 115,
          y: 395 - index * 36,
          size: activitySize,
          font,
          color: rgb(0, 0, 0),
        });
      }
      if (activite.jour) {
        page.drawText(activite.jour, {
          x: 476,
          y: 406 - index * 36,
          size: 10,
          font,
          color: rgb(0, 0, 0),
        });
      }

      if (activite.horaireDebut) {
        page.drawText(activite.horaireDebut, {
          x: 476,
          y: 387 - index * 36,
          size: 10,
          font,
          color: rgb(0, 0, 0),
        });
      }

      if (activite.horaireFin) {
        page.drawText(activite.horaireFin, {
          x: 516,
          y: 387 - index * 36,
          size: 10,
          font,
          color: rgb(0, 0, 0),
        });
      }
    });
  }

  // total paiement

  if (formData.total) {
    page.drawText(formData.total + ' €', {
      x: 151,
      y: 234,
      size: defaultSize,
      font,
      color: rgb(0, 0, 0),
    });
  }

  // mode de paiement
  if (formData.modeReglement === 'comptant') {
    page.drawText('x', {
      x: 401,
      y: 252,
      size: 9,
      font,
      color: rgb(0, 0, 0),
    });
  } else if (formData.modeReglement === '3fois') {
    page.drawText('x', {
      x: 496.5,
      y: 252,
      size: 9,
      font,
      color: rgb(0, 0, 0),
    });

    // Dates de paiement pour le paiement en 3 fois (période ②)

    page.drawText(formData.saison.split('-')[0], {
      x: 450,
      y: 236,
      size: 10,
      font,
      color: rgb(0, 0, 0),
    });

    if (formData.datePaiementDebut1 && formData.datePaiementFin1) {
      const debut = new Date(formData.datePaiementDebut1);
      const fin = new Date(formData.datePaiementFin1);
      page.drawText(pad2(debut.getDate()), {
        x: 316,
        y: 223,
        size: 9.5,
        font,
        color: rgb(0, 0, 0),
      });
      page.drawText(pad2(fin.getDate()), {
        x: 342,
        y: 223,
        size: 9.5,
        font,
        color: rgb(0, 0, 0),
      });
      page.drawText(pad2(debut.getMonth() + 1), {
        x: 365,
        y: 223,
        size: 9.5,
        font,
        color: rgb(0, 0, 0),
      });
      page.drawText(debut.getFullYear().toString().slice(2), {
        x: 396,
        y: 223,
        size: 9.5,
        font,
        color: rgb(0, 0, 0),
      });
    }

    // Dates de paiement pour le paiement en 3 fois (période ③)
    if (formData.datePaiementDebut2 && formData.datePaiementFin2) {
      const debut = new Date(formData.datePaiementDebut2);
      const fin = new Date(formData.datePaiementFin2);
      page.drawText(pad2(debut.getDate()), {
        x: 443,
        y: 223,
        size: 9.5,
        font,
        color: rgb(0, 0, 0),
      });
      page.drawText(pad2(fin.getDate()), {
        x: 469,
        y: 223,
        size: 9.5,
        font,
        color: rgb(0, 0, 0),
      });
      page.drawText(pad2(debut.getMonth() + 1), {
        x: 490,
        y: 223,
        size: 9.5,
        font,
        color: rgb(0, 0, 0),
      });
      page.drawText(debut.getFullYear().toString().slice(2), {
        x: 521,
        y: 223,
        size: 9.5,
        font,
        color: rgb(0, 0, 0),
      });
    }
  }

  // signature et date
  if (formData.faitA) {
    const faitASize: number = formData.faitA.length > 25 ? 10 : defaultSize;
    page.drawText(formData.faitA.slice(0, 1).toUpperCase() + formData.faitA.slice(1), {
      x: 73,
      y: 146,
      size: faitASize,
      font,
      color: rgb(0, 0, 0),
    });
  }

  if (formData.dateSignature) {
    page.drawText(formData.dateSignature, {
      x: 73,
      y: 132,
      size: defaultSize,
      font,
      color: rgb(0, 0, 0),
    });
  }

  if (formData.signature) {
    try {
      // Convertir la chaîne base64 en Uint8Array
      const base64Data = formData.signature.split(',')[1];
      const imageBytes = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
      // Incorporer l'image dans le PDF
      const signatureImage = await pdfDoc.embedPng(imageBytes);
      page.drawImage(signatureImage, {
        x: 374,
        y: 132,
        width: 100,
        height: 30,
      });
    } catch (error) {
      console.error("Erreur lors de l'incorporation de la signature:", error);
    }
  }

  // paiements administratifs
  if (formData.paiementsAdmin && formData.paiementsAdmin.length > 0) {
    formData.paiementsAdmin.forEach((p, index: number) => {
      if (p.mode) {
        page.drawText(p.mode, {
          x: 139,
          y: 76 - 17 * index,
          size: defaultSize,
          font,
          color: rgb(0, 0, 0),
        });

        if (p.date) {
          page.drawText(p.date, {
            x: 452,
            y: 76 - 17 * index,
            size: defaultSize,
            font,
            color: rgb(0, 0, 0),
          });
        }
      }
    });
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

  page2.drawText(formData.maison.replace('Maison pour tous', ''), {
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
      x: 360.5,
      y: 592,
      size: 8,
      font,
      color: rgb(0, 0, 0),
    });
  }
  if (formData.representantLegal2.sexe === 'M') {
    page2.drawText('x', {
      x: 402,
      y: 592,
      size: 8,
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
      const nomSize = personne.nom.length > 20 ? 10 : defaultSize;
      page2.drawText(personne.nom.toUpperCase().charAt(0) + personne.nom.slice(1), {
        x: 71 + index * 262,
        y: 395,
        size: nomSize,
        font,
        color: rgb(0, 0, 0),
      });
      const prenomSize = personne.prenom.length > 20 ? 10 : defaultSize;
      page2.drawText(personne.prenom.toUpperCase().charAt(0) + personne.prenom.slice(1), {
        x: 85 + index * 262,
        y: 376,
        size: prenomSize,
        font,
        color: rgb(0, 0, 0),
      });
      page2.drawText(personne.tel, {
        x: 63 + index * 262,
        y: 358,
        size: defaultSize,
        font,
        color: rgb(0, 0, 0),
      });
    }
  }

  // Personnes (habilités)
  if (formData.personnesHabilitees.length > 0) {
    for (let index = 0; index < formData.personnesHabilitees.length; index++) {
      const personne = formData.personnesHabilitees[index];
      const nomSize = personne.nom.length > 20 ? 10 : defaultSize;
      page2.drawText(personne.nom.toUpperCase().charAt(0) + personne.nom.slice(1), {
        x: 71 + index * 262,
        y: 302,
        size: nomSize,
        font,
        color: rgb(0, 0, 0),
      });
      const prenomSize = personne.prenom.length > 20 ? 10 : defaultSize;
      page2.drawText(personne.prenom.toUpperCase().charAt(0) + personne.prenom.slice(1), {
        x: 85 + index * 262,
        y: 283,
        size: prenomSize,
        font,
        color: rgb(0, 0, 0),
      });
      page2.drawText(personne.tel, {
        x: 63 + index * 262,
        y: 265,
        size: defaultSize,
        font,
        color: rgb(0, 0, 0),
      });
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
  if (formData.autorisationSortie === 'autorise') {
    page2.drawText(soussigneString, {
      x: 102,
      y: 229,
      size: soussigneSize,
      font,
      color: rgb(0, 0, 0),
    });
  }
  if (formData.droitImage === 'autorise') {
    page2.drawText(soussigneString, {
      x: 100,
      y: 173,
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
      font,
    });
    page2.drawText(formData.caf.nbEnfants.toString(), {
      x: 511,
      y: 56,
      size: 8,
      font,
    });
  }

  // end page 2
  // signature et date
  const faitASize: number = formData.faitA.length > 25 ? 10 : defaultSize;
  page2.drawText(formData.faitA, {
    x: 72,
    y: 34,
    size: faitASize,
    font,
  });

  page2.drawText(formData.dateSignature, {
    x: 208,
    y: 34,
    size: defaultSize,
    font,
  });

  if (formData.signature) {
    try {
      // Convertir la chaîne base64 en Uint8Array
      const base64Data = formData.signature.split(',')[1];
      const imageBytes = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
      // Incorporer l'image dans le PDF
      const signatureImage = await pdfDoc.embedPng(imageBytes);
      page2.drawImage(signatureImage, {
        x: 460,
        y: 15,
        width: 100,
        height: 30,
      });
    } catch (error) {
      console.error("Erreur lors de l'incorporation de la signature:", error);
    }
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  return URL.createObjectURL(blob);
}
