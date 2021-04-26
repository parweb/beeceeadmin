describe('Roles', () => {
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

    cy.route({
      method: 'GET',
      url: `https://apps-int.bca.fr/doc-num-front/api/roles?mission=3333_null`,
      response: 'null'
    });

    cy.route({
      method: 'GET',
      url: `https://apps-int.bca.fr/doc-num-front/api/roles?mission=1111_error`,
      response: 'null',
      status: 500
    });

    cy.route(
      'GET',
      `https://apps-int.bca.fr/doc-num-front/api/roles?mission=2222_success`,
      'fixture:roles-success.json'
    );
  });

  it('Check role error message when no response', () => {
    const mission = '1111_error';
    cy.visit(`/mission/${mission}`);

    cy.get('#sign-item').click();

    cy.get('#modal-modal-content').contains(
      "Aucun acteurs n'est disponible pour la mission en cours"
    );
  });

  it('Check role error message when empty response', () => {
    const mission = '3333_null';
    cy.visit(`/mission/${mission}`);

    cy.get('#sign-item').click();

    cy.get('#modal-modal-content').contains(
      "Aucun acteurs n'est disponible pour la mission en cours"
    );
  });

  it('Check email warning message', () => {
    const mission = '2222_success';
    cy.visit(`/mission/${mission}`);

    cy.get('#sign-item').click();

    cy.get('#select-role').click();
    cy.get('#select-role-listbox').contains('role_missing_email').click();

    cy.get('#scope-notification').should(
      'have.text',
      "L'email est manquant pour l’acteur du dossier role_missing_email - Emetteur,voulez-vous envoyer la demande de signature uniquement par SMS?"
    );
  });

  it('Check phone error message', () => {
    const mission = '2222_success';
    cy.visit(`/mission/${mission}`);

    cy.get('#sign-item').click();

    cy.get('#select-role').click();
    cy.get('#select-role-listbox').contains('role_missing_phone').click();

    cy.get('#scope-notification').should(
      'have.text',
      'Le téléphone est manquant pour l’acteur du dossier role_missing_phone - Lésé,voulez-vous envoyer la demande de signature uniquement par Email?'
    );
  });

  it('Check phone and email error message', () => {
    const mission = '2222_success';
    cy.visit(`/mission/${mission}`);

    cy.get('#sign-item').click();

    cy.get('#select-role').click();
    cy.get('#select-role-listbox').contains('role_missing_both').click();

    cy.get('#signature-modal').contains(
      'Le téléphone est manquant pour l’acteur du dossier role_missing_both'
    );
    cy.get('#signature-modal').contains(
      "L'email est manquant pour l’acteur du dossier role_missing_both"
    );
  });

  it('Display role informations', () => {
    const mission = '2222_success';
    cy.visit(`/mission/${mission}`);

    cy.get('#sign-item').click();

    cy.get('#select-role').click();
    cy.get('#select-role-listbox').contains('role_success').click();

    cy.get('input[name="phone"]').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
  });

  it('Change color of message', () => {
    const mission = '2222_success';
    cy.visit(`/mission/${mission}`);

    cy.get('#sign-item').click();

    cy.get('#select-role').click();

    cy.get('#select-role-listbox').contains('role_missing_email').click();

    cy.get('#scope-notification > div').should(
      'have.css',
      'background-color',
      'rgb(112, 110, 107)'
    );

    cy.get('.slds-checkbox_faux').click();

    cy.get('#scope-notification > div').should(
      'have.css',
      'background-color',
      'rgb(4, 132, 75)'
    );

    cy.get('.slds-checkbox_faux').click();

    cy.get('#scope-notification > div').should(
      'have.css',
      'background-color',
      'rgb(112, 110, 107)'
    );
  });

  it('check disabled button', () => {
    const mission = '2222_success';
    cy.visit(`/mission/${mission}`);

    cy.get('#sign-item').click();

    cy.get('#select-role').click();

    cy.get('#select-role-listbox').contains('role_missing_email').click();

    cy.get('#apply-sign').should('be.disabled');
    cy.get('.slds-checkbox_faux').click();

    cy.get('#apply-sign').should('not.be.disabled');
  });
});
