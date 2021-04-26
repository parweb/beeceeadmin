describe('Edit document', () => {
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

    cy.route(
      'PATCH',
      'https://apps-int.bca.fr/doc-num-front/api/document/photo',
      'success'
    ).as('uploadDocument');
  });

  it('cancel edit', () => {
    const mission = 87987049;
    cy.visit(`/mission/${mission}`);

    cy.get('#document-item-3 #edit-document').click();
    cy.get('#document-item-3 #select-name').click();

    cy.get('#document-item-3 #select-name-listbox ')
      .contains('Carte grise')
      .click();

    cy.get('#document-item-3 button').contains('Annuler').click();
    cy.get('#document-item-3 #name-text').contains('Experveo');
  });

  it('name', () => {
    const mission = 87987049;
    cy.visit(`/mission/${mission}`);

    cy.get('#document-item-3 #edit-document').click();
    cy.get('#document-item-3 #select-name').click();

    cy.get('#document-item-3 #select-name-listbox ')
      .contains('Carte grise')
      .click();

    cy.get('#document-item-3 button').contains('Enregistrer').click();

    cy.get('#confirm-action').click();

    cy.wait('@uploadDocument').its('requestBody').should('deep.equal', {
      codeQualification: 'CGRI',
      idDocNum: 3,
      numDos: 34378195,
      photo418: false,
      photoAO: false,
      photoRapport: true
    });

    cy.get('#document-item-3 #name-text').contains('Carte grise');
  });

  it('one tag', () => {
    const mission = 87987049;
    cy.visit(`/mission/${mission}`);

    cy.get('#document-item-3 #edit-tag').click();
    cy.get('#document-item-3 #tag-RA').click();
    cy.get('#document-item-3 #tag-CO').click();
    cy.get('#document-item-3 button').contains('Enregistrer').click();
    cy.get('#confirm-action').click();

    cy.wait('@uploadDocument').its('requestBody').should('deep.equal', {
      codeQualification: 'EXVO',
      idDocNum: 3,
      numDos: 34378195,
      photo418: true,
      photoAO: false,
      photoRapport: false
    });
  });

  it('two tags', () => {
    const mission = 87987049;

    cy.visit(`/mission/${mission}`);

    cy.get('#document-item-3 #edit-tag').click();
    cy.get('#document-item-3 #tag-AO').click();
    cy.get('#document-item-3 button').contains('Enregistrer').click();
    cy.get('#confirm-action').click();

    cy.wait('@uploadDocument').its('requestBody').should('deep.equal', {
      codeQualification: 'EXVO',
      idDocNum: 3,
      numDos: 34378195,
      photo418: false,
      photoAO: true,
      photoRapport: true
    });
  });

  it('all tags', () => {
    const mission = 87987049;

    cy.visit(`/mission/${mission}`);

    cy.get('#document-item-3 #edit-tag').click();
    cy.get('#document-item-3 #tag-AO').click();
    cy.get('#document-item-3 #tag-CO').click();
    cy.get('#document-item-3 button').contains('Enregistrer').click();
    cy.get('#confirm-action').click();

    cy.wait('@uploadDocument').its('requestBody').should('deep.equal', {
      codeQualification: 'EXVO',
      idDocNum: 3,
      numDos: 34378195,
      photo418: true,
      photoAO: true,
      photoRapport: true
    });
  });
});
