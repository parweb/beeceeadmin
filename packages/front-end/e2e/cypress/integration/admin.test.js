describe('Test  admin', () => {
  beforeEach(() => {
    cy.server();

    cy.route(
      'GET',
      'https://apps-int.bca.fr/doc-num-front/api/documents/*',
      'fixture:documents-admin.json'
    );
  });

  it('unique', () => {
    cy.visit(`/admin`);
    cy.get('input[name=username]').type('DOCNUM');
    cy.get('input[name=password]').type('Docnum_*17062020*{enter}');

    cy.get('div:nth-child(4) label:nth-child(1) .slds-checkbox_faux').click();
    cy.get('slds-checkbox > #diplay-6').click();
  });

  it('Ajouter une extension', () => {
    cy.get('#select-extension-2').click();
    cy.get(
      '#select-extension-2-listbox-option-1 .slds-listbox__option-text'
    ).click();
    cy.get('#btn-2').click();
  });
});
