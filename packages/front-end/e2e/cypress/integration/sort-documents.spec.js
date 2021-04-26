const names = el => `.document-item:nth-child(${el}) #name-text`;

describe('Sort document', () => {
  beforeEach(() => {
    cy.server();

    cy.route(
      'GET',
      'https://apps-int.bca.fr/doc-num-front/api/documents/*',
      'fixture:documents-sortable.json'
    );

    cy.route(
      'GET',
      'https://apps-int.bca.fr/doc-num-front/api/record/?dossier=*',
      'fixture:record-dossier.json'
    );

    const mission = 87987049;
    cy.visit(`/mission/${mission}`);
  });

  it('by default date:desc', () => {
    cy.get('.document-item #name-text').eq(0).contains('Experveo');
    cy.get('.document-item #name-text').eq(1).contains('Déclaration assuré');
    cy.get('.document-item #name-text').eq(2).contains('Devis pointé');
  });

  it('by date', () => {
    cy.get('.slds-dropdown-trigger').click().contains('Date').click();
    cy.get('.document-item #name-text').eq(0).contains('Devis pointé');
    cy.get('.document-item #name-text').eq(1).contains('Déclaration assuré');
    cy.get('.document-item #name-text').eq(2).contains('Experveo');

    cy.get('.slds-dropdown-trigger').click().contains('Date').click();
    cy.get('.document-item #name-text').eq(0).contains('Experveo');
    cy.get('.document-item #name-text').eq(1).contains('Déclaration assuré');
    cy.get('.document-item #name-text').eq(2).contains('Devis pointé');
  });

  it('by type', () => {
    cy.get('.slds-dropdown-trigger').click().contains('Type').click();
    cy.get('.document-item #name-text').eq(0).contains('Devis pointé');
    cy.get('.document-item #name-text').eq(1).contains('Déclaration assuré');
    cy.get('.document-item #name-text').eq(2).contains('Experveo');

    cy.get('.slds-dropdown-trigger').click().contains('Type').click();
    cy.get('.document-item #name-text').eq(0).contains('Experveo');
    cy.get('.document-item #name-text').eq(1).contains('Déclaration assuré');
    cy.get('.document-item #name-text').eq(2).contains('Devis pointé');
  });

  it('by name', () => {
    cy.get('.slds-dropdown-trigger').click().contains('Nom').click();
    cy.get('.document-item #name-text').eq(0).contains('Devis pointé');
    cy.get('.document-item #name-text').eq(1).contains('Déclaration assuré');
    cy.get('.document-item #name-text').eq(2).contains('Experveo');

    cy.get('.slds-dropdown-trigger').click().contains('Nom').click();
    cy.get('.document-item #name-text').eq(0).contains('Experveo');
    cy.get('.document-item #name-text').eq(1).contains('Déclaration assuré');
    cy.get('.document-item #name-text').eq(2).contains('Devis pointé');
  });
});
