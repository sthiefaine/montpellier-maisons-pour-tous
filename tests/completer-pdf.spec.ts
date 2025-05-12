import { test, expect } from '@playwright/test';

test.describe('Page de complétion de PDF', () => {
  test('devrait afficher les deux options de complétion', async ({ page }) => {
    await page.goto('/completer-pdf');

    // Vérifier le titre
    await expect(page.getByText("Compléter le PDF d'inscription")).toBeVisible();

    // Vérifier les deux options
    await expect(page.getByText('Option 1 : Compléter le PDF en ligne')).toBeVisible();
    await expect(page.getByText('Option 2 : Formulaire vierge')).toBeVisible();
  });

  test('devrait naviguer vers le formulaire en ligne', async ({ page }) => {
    await page.goto('/completer-pdf');

    // Cliquer sur le bouton du formulaire en ligne
    await page.getByText('Compléter le PDF en ligne', { exact: true }).click();

    // Vérifier que nous sommes sur la bonne page
    await expect(page).toHaveURL('/completer-pdf/formulaire');
  });

  test('devrait permettre le téléchargement du formulaire vierge', async ({ page }) => {
    await page.goto('/completer-pdf');

    // Cliquer sur le bouton de téléchargement
    const downloadPromise = page.waitForEvent('download');
    await page.getByText('Télécharger le formulaire vierge').click();
    const download = await downloadPromise;

    // Vérifier que le fichier téléchargé est un PDF
    expect(download.suggestedFilename()).toMatch(/\.pdf$/);
  });
});

test.describe("Formulaire d'inscription", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/completer-pdf/formulaire');
  });

  test('devrait compléter toutes les étapes du formulaire', async ({ page }) => {
    // Étape 1 : Initialisation
    await page.getByText('Inscription pour moi-même').click();

    // Étape 2 : Sélection de la maison
    // Test de la recherche
    await page.getByLabel('Rechercher une Maison pour tous').click();
    await page.fill('input[id="mpt-search"]', 'Alber');
    await page.getByText('Albert Camus').first().click();

    // Vérifier que la sélection est correcte
    await expect(page.getByLabel('Rechercher une Maison pour tous')).toHaveValue('Albert Camus');

    // Test du select alternatif
    await page
      .getByLabel('Ou sélectionnez une Maison pour tous')
      .selectOption({ label: 'Albert Camus' });
    await expect(page.getByLabel('Rechercher une Maison pour tous')).toHaveValue('Albert Camus');

    await page.getByRole('button', { name: 'Suivant' }).click();

    // Étape 3 : Informations adhérent
    await page.fill('input[name="nom"]', 'DUPONT');
    await page.fill('input[name="prenom"]', 'Jean');
    await page.fill('input[name="dateNaissance"]', '1990-01-01');
    await page.getByLabel('Sexe :');
    // radio button
    await page.getByTestId('sexe-homme').check();
    await expect(page.getByTestId('sexe-homme')).toBeChecked();
    await expect(page.getByTestId('sexe-femme')).not.toBeChecked();

    await page.fill('input[name="communeNaissance"]', 'Montpellier');
    await page.fill('input[name="departementNaissance"]', '34');
    await page.fill('input[name="adresse"]', '123 rue de la Paix');
    await page.fill('input[name="codePostal"]', '34000');
    await page.fill('input[name="ville"]', 'Montpellier');
    await page.fill('input[name="telephone"]', '0612345678');
    await page.fill('input[name="email"]', 'jean.dupont@example.com');
    await page.getByRole('button', { name: 'Suivant' }).click();

    // Étape 4 : Activités
    // Carte réseau
    await page.getByTestId('carteReseau-oui').check();
    await expect(page.getByTestId('carteReseau-oui')).toBeChecked();
    await expect(page.getByTestId('carteReseau-non')).not.toBeChecked();
    // Première activité
    await page.fill('input[name="designation-0"]', 'Yoga');
    await page.selectOption('select[id="jour-0"]', 'Lundi');
    await page.selectOption('select[id="horaireDebut-heures-0"]', '10');
    await page.selectOption('select[id="horaireDebut-minutes-0"]', '00');
    await page.selectOption('select[id="horaireFin-heures-0"]', '11');
    await page.selectOption('select[id="horaireFin-minutes-0"]', '00');
    await page.fill('input[id="prix-0"]', '50');

    // Ajouter une deuxième activité
    await page.getByRole('button', { name: 'Ajouter une activité' }).click();
    await page.fill('input[name="designation-1"]', 'Judo');
    await page.selectOption('select[id="jour-1"]', 'Mardi');
    await page.selectOption('select[id="horaireDebut-heures-1"]', '10');
    await page.selectOption('select[id="horaireDebut-minutes-1"]', '00');
    await page.selectOption('select[id="horaireFin-heures-1"]', '11');
    await page.selectOption('select[id="horaireFin-minutes-1"]', '00');
    await page.fill('input[id="prix-1"]', '50');

    // Ajouter une troisième activité
    await page.getByRole('button', { name: 'Ajouter une activité' }).click();
    await page.fill('input[name="designation-2"]', 'Natation');
    await page.selectOption('select[id="jour-2"]', 'Mercredi');
    await page.selectOption('select[id="horaireDebut-heures-2"]', '10');
    await page.selectOption('select[id="horaireDebut-minutes-2"]', '00');
    await page.selectOption('select[id="horaireFin-heures-2"]', '11');
    await page.selectOption('select[id="horaireFin-minutes-2"]', '00');
    await page.fill('input[id="prix-2"]', '50');

    // Ajouter une quatrième activité
    await page.getByRole('button', { name: 'Ajouter une activité' }).click();
    await page.fill('input[name="designation-3"]', 'Boxe');
    await page.selectOption('select[id="jour-3"]', 'Jeudi');
    await page.selectOption('select[id="horaireDebut-heures-3"]', '10');
    await page.selectOption('select[id="horaireDebut-minutes-3"]', '00');
    await page.selectOption('select[id="horaireFin-heures-3"]', '11');
    await page.selectOption('select[id="horaireFin-minutes-3"]', '00');
    await page.fill('input[id="prix-3"]', '50');

    // Vérifier que le bouton d'ajout est désactivé après 4 activités
    await expect(page.getByRole('button', { name: 'Ajouter une activité' })).not.toBeVisible();

    // Mode de règlement
    await page.getByLabel('3 fois*').check();
    await page.selectOption('select[id="saison"]', '2024');
  });
});
