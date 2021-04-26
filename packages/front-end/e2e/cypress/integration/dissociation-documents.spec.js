describe('Dissociate document', () => {
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
      'POST',
      'https://apps-int.bca.fr/doc-num-front/api/document/dissociate*',
      'success'
    ).as('deleteDocument');
  });

  it('unique', () => {
    const mission = 34378195;
    cy.visit(`/mission/${mission}`);

    cy.get('#document-filter-dissociation').click();

    cy.get('#document-item-3 #dissociate-item').click();

    cy.get('.slds-text-heading_medium').contains('Confirmation dissociation');
    cy.get('.slds-modal__content section').contains(
      `Voulez-vous dissocier Experveo de la mission ${mission} ?`
    );

    cy.get('#confirm-action').click();

    cy.wait('@deleteDocument')
      .its('url')
      .should(
        'include',
        `/doc-num-front/api/document/dissociate?numDos=${mission}&idDocNum=3`
      );
  });

  it('group', () => {
    const mission = 34378195;
    cy.visit(`/mission/${mission}`);

    cy.get('#document-filter-dissociation').click();

    cy.get('#document-item-3').click();
    cy.get('#document-item-2').click();
    cy.get('#document-item-2').click();
    cy.get('#document-item-2').click();

    cy.get('#dissociation-actions button').contains('Dissocier').click();

    cy.get('.slds-text-heading_medium').contains('Confirmation dissociation');
    cy.get('.slds-modal__content section').contains(
      `Voulez-vous dissocier les 2 documents sélectionnés de la mission ${mission}?`
    );

    cy.get('#confirm-action').click();

    cy.wait('@deleteDocument')
      .its('url')
      .should(
        'include',
        `/doc-num-front/api/document/dissociate?numDos=${mission}&idDocNum=3`
      );
    cy.wait('@deleteDocument')
      .its('url')
      .should(
        'include',
        `/doc-num-front/api/document/dissociate?numDos=${mission}&idDocNum=2`
      );
  });

  it('cancel', () => {
    const mission = 34378195;
    cy.visit(`/mission/${mission}`);

    cy.get('#document-filter-dissociation').click();

    cy.get('#document-item-3 #dissociate-item').click();

    cy.get('.modal-secondary header').contains('Confirmation dissociation');
    cy.get('.modal-secondary section').contains(
      `Voulez-vous dissocier Experveo de la mission ${mission} ?`
    );

    cy.get('.modal-secondary button').contains('Annuler').click();

    cy.get('.modal-secondary').should('not.visible');
  });

  it('toggle dissociable', () => {
    const mission = 34378195;
    cy.visit(`/mission/${mission}`);

    cy.get('#document-item-1').should('be.visible');
    cy.get('#document-item-2').should('be.visible');
    cy.get('#document-item-3').should('be.visible');
    cy.get('#document-filter-dissociation').should(
      'have.class',
      'slds-button_neutral'
    );

    cy.get('#document-filter-dissociation').click();

    cy.get('#document-item-1').should('not.exist');
    cy.get('#document-item-2').should('be.visible');
    cy.get('#document-item-3').should('be.visible');
    cy.get('#document-filter-dissociation').should(
      'have.class',
      'slds-button_brand'
    );
  });

  it('can be selected when dissociation active', () => {
    const mission = 34378195;
    cy.visit(`/mission/${mission}`);

    cy.get('#dissociation-actions').should('not.exist');

    cy.get('#document-filter-dissociation').click();

    cy.get('#dissociation-actions').should('not.exist');

    cy.get('#document-item-3 .document-item-image').should(
      'have.css',
      'border',
      '1px solid rgb(221, 219, 218)'
    );

    cy.get('#document-item-2 .document-item-image').should(
      'have.css',
      'border',
      '1px solid rgb(221, 219, 218)'
    );

    cy.get('#document-item-2 .document-item-image').click();

    cy.get('#document-item-3 .document-item-image').should(
      'have.css',
      'border',
      '1px solid rgb(221, 219, 218)'
    );
    cy.get('#document-item-2 .document-item-image').should(
      'have.css',
      'border',
      '1px solid rgb(0, 112, 210)'
    );

    cy.get('#dissociation-actions').should('be.visible');
    cy.get('#dissociation-actions').contains('Annuler').click();
    cy.get('#dissociation-actions').should('not.exist');

    cy.get('#document-item-3 .document-item-image').should(
      'have.css',
      'border',
      '1px solid rgb(221, 219, 218)'
    );

    cy.get('#document-item-2 .document-item-image').should(
      'have.css',
      'border',
      '1px solid rgb(221, 219, 218)'
    );
  });
});
