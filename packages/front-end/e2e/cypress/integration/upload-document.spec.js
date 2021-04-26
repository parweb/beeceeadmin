describe('Upload document', () => {
  beforeEach(() => {
    cy.server();

    cy.route(
      'GET',
      'https://apps-int.bca.fr/doc-num-front/api/documents/*',
      'fixture:documents-before-upload.json'
    );

    cy.route(
      'GET',
      'https://apps-int.bca.fr/doc-num-front/api/record/?dossier=*',
      'fixture:record-dossier.json'
    );

    cy.route(
      'POST',
      'https://apps-int.bca.fr/doc-num-front/api/documents/upload*',
      'Documents téléchargés avec succès'
    ).as('postUpload');

    cy.route(
      'GET',
      'https://apps-int.bca.fr/doc-num-front/api/documents/?id=87987048&last=true',
      'fixture:documents-after-upload.json'
    ).as('getLast');

    cy.route(
      'GET',
      'https://apps-int.bca.fr/doc-num-front/api/documents/?id=87987040&last=true',
      'fixture:documents-after-upload-multiple.json'
    ).as('getLast');
  });

  it('Wrong upload', () => {
    const mission = '87987048';
    cy.visit(`/mission/${mission}/`);

    cy.get('#toolbar button').contains('Charger').click();

    cy.get('.modal-primary').contains('Ajouter').click();

    cy.get('.modal-primary').contains('Veuillez sélectionner un fichier');
    cy.get('.modal-primary button')
      .contains('Valider')
      .should('have.attr', 'disabled', 'disabled');

    cy.get('.slds-input[type="file"]').attachFile('document.pdf');
    cy.get('.modal-primary button').contains('Valider');
    cy.get('.modal-primary').contains(
      'Veuillez sélectionner une qualification'
    );
    cy.get('.modal-primary button')
      .contains('Valider')
      .should('have.attr', 'disabled', 'disabled');
  });

  it('success PDF', () => {
    const mission = '87987048';
    cy.visit(`/mission/${mission}/`);

    cy.get('#toolbar button').contains('Charger').click();

    cy.get('.slds-input[type="file"]').attachFile('document.pdf');

    cy.get('.slds-modal__content .slds-combobox input').click();
    cy.get('.slds-modal__content .slds-combobox')
      .contains('Carte grise')
      .click();
    cy.get('.slds-modal__container')
      .contains('Valider')
      .should('have.attr', 'disabled', 'disabled');
    cy.get('.slds-modal__content').contains('Ajouter').click();
    cy.get('.slds-modal__container').contains('Valider').click();
    cy.wait('@postUpload')
      .its('url')
      .should(
        'equal',
        `https://apps-int.bca.fr/doc-num-front/api/documents/upload?typeDocument=GPJ&numMission=${mission}&codeQualification=CGR`
      );

    cy.get('.modal-primary').should('not.exist');
    cy.get('#document-item-1 #name-text').contains('Devis pointé');
    cy.get('#document-item-3 #name-text').contains('Devis pointé');
  });

  it('success PDF multiple', () => {
    const mission = '87987040';
    cy.visit(`/mission/${mission}/`);

    cy.get('#toolbar button').contains('Charger').click();

    cy.get('.slds-input[type="file"]').attachFile('document.pdf');

    cy.get('.slds-modal__content .slds-combobox input').click();
    cy.get('.slds-modal__content .slds-combobox')
      .contains('Carte grise')
      .click();
    cy.get('.slds-modal__content').contains('Ajouter').click();

    cy.get('.slds-input[type="file"]').attachFile('document.pdf');

    cy.get('.slds-modal__content .slds-combobox input').click();
    cy.get('.slds-modal__content .slds-combobox')
      .contains('Carte grise')
      .click();
    cy.get('.slds-modal__content').contains('Ajouter').click();

    cy.get('.slds-modal__container').contains('Valider').click();
    cy.wait('@postUpload')
      .its('url')
      .should(
        'equal',
        `https://apps-int.bca.fr/doc-num-front/api/documents/upload?typeDocument=GPJ&numMission=${mission}&codeQualification=CGR`
      );

    cy.get('.modal-primary').should('not.exist');
    cy.get('#document-item-1 #name-text').contains('Devis pointé');
    cy.get('#document-item-2 #name-text').contains('Devis pointé');
    cy.get('#document-item-3 #name-text').contains('Devis pointé');
  });

  it('success JPG', () => {
    const mission = '87987048';
    cy.visit(`/mission/${mission}/`);

    cy.get('#toolbar button').contains('Charger').click();

    cy.get('.slds-modal__container')
      .contains('Valider')
      .should('have.attr', 'disabled', 'disabled');

    cy.get('.slds-input[type="file"]').attachFile('image.jpg');

    cy.get('.slds-modal__container')
      .contains('Valider')
      .should('have.attr', 'disabled', 'disabled');
    cy.get('.slds-modal__content .slds-combobox input').click();
    cy.get('.slds-modal__content .slds-combobox')
      .contains('Carte grise')
      .click();
    cy.get('.slds-modal__container')
      .contains('Valider')
      .should('have.attr', 'disabled', 'disabled');
    cy.get('.slds-modal__content').contains('Ajouter').click();
    cy.get('.slds-modal__container').contains('Valider').click();
    cy.wait('@postUpload')
      .its('url')
      .should(
        'equal',
        `https://apps-int.bca.fr/doc-num-front/api/documents/upload?typeDocument=PHO&numMission=${mission}&codeQualification=CGRI`
      );
  });

  it('Delete document', () => {
    const mission = '87987048';
    cy.visit(`/mission/${mission}/`);

    cy.get('#toolbar button').contains('Charger').click();
    cy.get('.slds-input[type="file"]').attachFile('image.jpg');
    cy.get('.slds-modal__content .slds-combobox input').click();
    cy.get('.slds-modal__content .slds-combobox')
      .contains('Carte grise')
      .click();
    cy.get('.slds-modal__content').contains('Ajouter').click();

    cy.get('#upload-tree .delete-upload-item:nth-child(1)').click();
    cy.get('#upload-tree').should('not.contain', 'Carte grise');
  });

  it('cancel upload', () => {
    const mission = '87987048';
    cy.visit(`/mission/${mission}/`);

    cy.get('#toolbar button').contains('Charger').click();
    cy.get('.slds-modal__container')
      .contains('Valider')
      .should('have.attr', 'disabled', 'disabled');
    cy.get('.slds-input[type="file"]').attachFile('image.jpg');
    cy.get('.slds-modal__container')
      .contains('Valider')
      .should('have.attr', 'disabled', 'disabled');
    cy.get('.slds-modal__content .slds-combobox input').click();
    cy.get('.slds-modal__content .slds-combobox')
      .contains('Carte grise')
      .click();
    cy.get('.slds-modal__container')
      .contains('Valider')
      .should('have.attr', 'disabled', 'disabled');
    cy.get('.slds-modal__content').contains('Ajouter').click();
    cy.get('.slds-modal__container').contains('Annuler').click();
  });
});
