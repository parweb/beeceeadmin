describe('Filters', () => {
  beforeEach(() => {
    cy.server();

    cy.route(
      'GET',
      'https://apps-int.bca.fr/doc-num-front/api/documents/*',
      'fixture:documents-filtered.json'
    );

    cy.route(
      'GET',
      'https://apps-int.bca.fr/doc-num-front/api/record/?dossier=*',
      'fixture:record-dossier.json'
    );
  });

  afterEach(() => {
    cy.get('.slds-modal__footer > #cancel-filter').click();
  });

  it('select type', () => {
    const mission = 34378195;
    cy.visit(`/mission/${mission}`);

    cy.get('#btn-filter').click();

    cy.get('#filter-by-extension-pdf').click();

    cy.get('.document-item').should('have.length', 4);
  });

  it('Check if the element  exist in the list', () => {
    cy.get('#btn-filter').click();

    cy.get('#filter-by-documentName').type('ca');

    cy.get('#filter-by-documentName-listbox').contains(
      'Gestion des RDV : repassage terrain, convocation'
    );
    cy.get('#filter-by-documentName-listbox').contains('Carte grise');

    cy.get('#filter-by-documentName-listbox')
      .contains('Gestion des RDV : repassage terrain, convocation')
      .click();

    cy.get('#filter-by-documentName').type('ca');
    cy.get('#filter-by-documentName-listbox').contains('Carte grise').click();
    cy.get('#filter-by-documentName-selected-listbox').contains(
      'Gestion des RDV : repassage terrain, convocation'
    );
    cy.get('#filter-by-documentName-selected-listbox').contains('Carte grise');

    cy.get(
      '#filter-by-documentName-selected-listbox li:nth-child(1) .slds-pill__remove'
    ).click();

    cy.get('#filter-by-documentName-selected-listbox').should(
      'not.contain',
      'Gestion des RDV : repassage terrain, convocation'
    );
    cy.get('#filter-by-documentName-selected-listbox').should(
      'contain',
      'Carte grise'
    );
  });

  it('select affichage', () => {
    cy.get('#btn-filter').click();

    cy.get('#filter-by-type-photos').click();

    cy.get('.document-item').should('have.length', 4);
  });

  it('select tag', () => {
    cy.get('#btn-filter').click();

    cy.get('#filter-by-tag-photoAO').click();
    cy.get('#filter-by-tag-photoAO').click();
    cy.get('#filter-by-tag-photoAO').click();

    cy.get('.document-item').should('have.length', 1);
  });

  it('select photo', () => {
    cy.get('#btn-filter').click();

    cy.get('#filter-by-photoName').click();
    cy.get('#filter-by-photoName-listbox').contains('Boite').click();

    cy.get('.document-item').should('have.length', 2);
  });

  it('select photos autres', () => {
    cy.get('#btn-filter').click();

    cy.get('#filter-by-photoName').click();
    cy.get('#filter-by-photoName-listbox').contains('Autres').click();

    cy.get('.document-item').should('have.length', 1);
  });

  it('select documents divers', () => {
    cy.get('#btn-filter').click();

    cy.get('#filter-by-documentName').click();
    cy.get('#filter-by-documentName-listbox').contains('Divers').click();

    cy.get('.document-item').should('have.length', 1);
  });

  it('select type photo, affichage photo et nom de la photo', () => {
    cy.get('#btn-filter').click();

    cy.get('section:nth-child(2)').click();

    cy.get('#filter-by-extension-image').click();

    cy.get('#filter-by-type-photos').click();

    cy.get('#filter-by-photoName').click();

    cy.get(
      '#filter-by-photoName-listbox-option-BOIT .slds-listbox__option-text'
    ).click();

    cy.get('#filter-by-photoName').click();

    cy.get(
      '#filter-by-photoName-listbox-option-ARD .slds-listbox__option-text'
    ).click();

    cy.get('.document-item').should('have.length', 3);
  });

  it('select type pdf, affichage autres et nom du document', () => {
    cy.get('#btn-filter').click();
    cy.get('#filter-by-extension-pdf').click();

    cy.get('#filter-by-type-others').click();

    cy.get('#filter-by-documentName').click();

    cy.get(
      '#filter-by-documentName-listbox-option-DEP .slds-listbox__option-text'
    ).click();

    cy.get('#filter-by-documentName').click();

    cy.get(
      '#filter-by-documentName-listbox-option-FAR .slds-listbox__option-text'
    ).click();

    cy.get('.document-item').should('have.length', 1);
  });

  it('select affichage tous, nom de document carte grise et nom de photo 3/4 Arrière Gauche', () => {
    cy.get('#btn-filter').click();

    cy.get('#filter-by-documentName').click();

    cy.get(
      '#filter-by-documentName-listbox-option-CGR .slds-listbox__option-text'
    ).click();

    cy.get('.document-item').should('have.length', 3);

    cy.get('#filter-by-photoName').click();

    cy.get(
      '#filter-by-photoName-listbox-option-ARG .slds-listbox__option-text'
    ).click();

    cy.get('.document-item').should('have.length', 0);
  });
});

describe('Filters without cancel ', () => {
  it('select affichage photos et tag RA', () => {
    cy.server();

    cy.route(
      'GET',
      'https://apps-int.bca.fr/doc-num-front/api/documents/*',
      'fixture:documents-filtered.json'
    );

    cy.route(
      'GET',
      'https://apps-int.bca.fr/doc-num-front/api/record/?dossier=*',
      'fixture:record-dossier.json'
    );

    const mission = 34378195;

    cy.visit(`/mission/${mission}`);
    cy.get('#btn-filter').click();

    cy.get('#filter-by-type-photos').click();

    cy.get('#filter-by-tag-photoRapport').click();

    cy.get('#apply-filter').click();

    cy.get('#tag-RA.slds-button_brand').should('have.length', 3);
  });
});
