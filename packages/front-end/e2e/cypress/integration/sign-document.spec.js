describe('Signature document', () => {
  beforeEach(() => {
    cy.server();

    cy.route(
      'GET',
      'https://apps-int.bca.fr/doc-num-front/api/documents/*',
      'fixture:documents-signed.json'
    );

    cy.route(
      'GET',
      'https://apps-int.bca.fr/doc-num-front/api/record/?dossier=*',
      'fixture:record-dossier.json'
    );

    cy.route(
      'GET',
      'https://apps-int.bca.fr/doc-num-front/api/roles?mission=34378195',
      'fixture:roles.json'
    );
  });

  it('filter documents signable', () => {
    const mission = 34378195;
    cy.visit(`/mission/${mission}`);

    cy.get('.document-item').should('have.length', 7);

    cy.get('#document-filter-signing').click();
    cy.get('.document-item').should('have.length', 2);

    cy.get('#document-filter-signing').click();
    cy.get('.document-item').should('have.length', 7);
  });

  it('button change style on toggle', () => {
    const mission = 34378195;
    cy.visit(`/mission/${mission}`);

    cy.get('#document-filter-signing').should(
      'have.class',
      'slds-button_neutral'
    );

    cy.get('#document-filter-signing').click();

    cy.get('#document-filter-signing').should(
      'have.class',
      'slds-button_brand'
    );
  });

  it('show toolbar when selected documents', () => {
    const mission = 34378195;
    cy.visit(`/mission/${mission}`);

    cy.get('#signature-actions').should('not.exist');

    cy.get('#document-filter-signing').click();

    cy.get('#document-item-7').click();
    cy.get('#signature-actions').should('be.visible');

    cy.get('#document-item-7').click();
    cy.get('#signature-actions').should('not.exist');
  });

  it('sign with direct button (one)', () => {
    const mission = 34378195;
    cy.visit(`/mission/${mission}`);

    cy.get('#document-item-7 #sign-item').click();
    cy.get('#apply-sign').should('be.disabled');

    cy.get('#select-role').click();
    cy.get('#select-role-listbox').contains('SERVICE CLIENT PT NANTES').click();

    cy.get('#apply-sign').should('not.be.disabled');
  });

  it('sign with multiple selection (multiple)', () => {
    const mission = 34378195;
    cy.visit(`/mission/${mission}`);

    cy.get('#document-filter-signing').click();
    cy.get('#document-item-7').click();
    cy.get('#signature-actions button')
      .contains('Envoi pour signature')
      .click();

    cy.get('.modal-primary header').contains(
      'Envoyer le document Gestion des RDV : repassage terrain, convocation de la mission 34378195 pour Signature'
    );

    cy.get('#apply-sign').should('be.disabled');

    cy.get('#select-role').click();
    cy.get('#select-role-listbox').contains('SERVICE CLIENT PT NANTES').click();

    cy.get('#apply-sign').should('not.be.disabled');
    cy.get('#cancel-sign').click();

    cy.get('#document-item-5').click();

    cy.get('#signature-actions button')
      .contains('Envoi pour signature')
      .click();

    cy.get('.modal-primary header').contains(
      'Envoyer les 2 documents sélectionnés de la mission 34378195'
    );
  });

  it('cancel uniq', () => {
    const mission = 34378195;
    cy.visit(`/mission/${mission}`);

    cy.get('#sign-item').click();

    cy.get('.modal-primary header').contains(
      `Envoyer le document Gestion des RDV : repassage terrain, convocation de la mission ${mission} pour Signature`
    );

    cy.get('#cancel-sign').click();

    cy.get('.modal-primary').should('not.exist');
  });

  it('cancel multiple', () => {
    const mission = 34378195;
    cy.visit(`/mission/${mission}`);

    cy.get('#document-filter-signing').click();

    cy.get('#signature-actions').should('not.exist');

    cy.get('#document-item-7').click();
    cy.get('#document-item-5').click();

    cy.get('#signature-actions').should('be.visible');

    cy.get('#signature-actions button').contains('Annuler').click();

    cy.get('#signature-actions').should('not.exist');
  });
});
