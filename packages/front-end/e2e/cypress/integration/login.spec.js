describe('Login', () => {
  beforeEach(() => {
    cy.server();

    cy.route(
      'POST',
      'https://apps-int.bca.fr/doc-num-front/api/auth/login',
      'fixture:login-success.json'
    ).as('login');
  });

  it('success with keyboard', () => {
    cy.visit('/login');

    cy.get('input[name=username]').type('DOCNUM');
    cy.get('input[name=password]').type('Docnum_*17062020*{enter}');

    cy.wait('@login').its('requestBody').should('deep.equal', {
      username: 'DOCNUM',
      password: 'Docnum_*17062020*'
    });

    cy.get('.slds-button.slds-button_icon-inverse').click();
    cy.url().should('not.include', '/login');
  });

  it('required fields', () => {
    cy.visit('/login');

    cy.get('button[type=submit]').click();

    cy.get(
      'form .slds-form-element:nth-child(2) .slds-form-element__help'
    ).contains('Ce champs est obligatoire');

    cy.get(
      'form .slds-form-element:nth-child(3) .slds-form-element__help'
    ).contains('Ce champs est obligatoire');

    cy.get('input[name=username]').type('DOCNUM');

    cy.get(
      'form .slds-form-element:nth-child(2) .slds-form-element__help'
    ).should('not.exist');

    cy.get(
      'form .slds-form-element:nth-child(3) .slds-form-element__help'
    ).contains('Ce champs est obligatoire');

    cy.get('input[name=password]').type('Docnum_*17062020*{enter}');

    cy.get(
      'form .slds-form-element:nth-child(2) .slds-form-element__help'
    ).should('not.exist');

    cy.get(
      'form .slds-form-element:nth-child(3) .slds-form-element__help'
    ).should('not.exist');
  });

  it('wrong credential', () => {
    cy.route({
      method: 'POST',
      url: 'https://apps-int.bca.fr/doc-num-front/api/auth/login',
      response: 'fixture:login-error.json',
      status: 403
    });

    cy.visit('/login');

    cy.get('input[name=username]').type('DOCNUM1');
    cy.get('input[name=password]').type('Docnum_*17062020*{enter}');
    cy.get('button[type=submit]').click();
    cy.get('center').contains('Login et/ou Mot de passe incorrect');
  });

  it('success with mouse', () => {
    cy.visit('/login');

    cy.get('input[name=username]').type('DOCNUM');
    cy.get('input[name=password]').type('Docnum_*17062020*');

    cy.get('button[type=submit]').click();
    cy.url().should('not.include', '/login');
  });

  it('protected route', () => {
    cy.visit('/documents');
    cy.url().should('include', '/login');
  });

  it('redirect after login', () => {
    cy.visit('/documents');

    cy.get('input[name=username]').type('DOCNUM');
    cy.get('input[name=password]').type('Docnum_*17062020*{enter}');

    cy.url().should('include', '/documents');
  });
});
