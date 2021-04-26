describe('Operations document', () => {
  beforeEach(() => {
    cy.server();

    cy.route(
      'GET',
      'https://apps-int.bca.fr/doc-num-front/api/documents/*',
      'fixture:documents-operations.json'
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
    ).as('postDocument');
  });

  it('Rotate document', () => {
    const mission = 87987049;
    cy.visit(`/mission/${mission}`);

    cy.get('#document-item-10').click();

    cy.get('canvas.canvas-ready').should('exist');

    cy.get('div:nth-child(1) > .slds-button_icon:nth-child(2)').click();

    cy.get('canvas').should(
      'have.css',
      'transform',
      'matrix(6.12323e-17, 1, -1, 6.12323e-17, 140, 0)'
    );
  });

  it('zoom with buttons', () => {
    const mission = 87987049;
    cy.visit(`/mission/${mission}`);

    cy.get('#document-item-10').click();

    cy.get('canvas.canvas-ready').should('exist');

    cy.get('#toolbar-editor #scale').click();

    cy.get('#scale input').invoke('val', 1).trigger('change');

    cy.get('#scale input').should('have.value', 1);
    cy.get('#scale #more').click();
    cy.get('#scale input').should('have.value', 1.1);
    cy.get('#scale #more').click();
    cy.get('#scale input').should('have.value', 1.2);
    cy.get('#scale #less').click();
    cy.get('#scale input').should('have.value', 1.1);
  });

  it('zoom with slider', () => {
    cy.get('#scale input').should('have.value', 1.1);
    cy.get('#scale input').invoke('val', 8).trigger('change');
    cy.get('#scale input').should('have.value', 8);
  });

  it('Saturation and brightness and contrast', () => {
    cy.get('#toolbar-editor #coloration').click();

    cy.get('#contrast input').should('have.value', 0);
    cy.get('#contrast input').invoke('val', 10).trigger('change');
    cy.get('#contrast input').should('have.value', 10);

    cy.get('#brightness input').should('have.value', 0);
    cy.get('#brightness input').invoke('val', 52).trigger('change');
    cy.get('#brightness input').should('have.value', 52);

    cy.get('#saturation input').should('have.value', 1);
    cy.get('#saturation input').invoke('val', 3).trigger('change');
    cy.get('#saturation input').should('have.value', 3);
  });

  it('Rotate document in the second modal', () => {
    cy.get('#toolbar-editor #open-editor-advanced').click();

    cy.get('canvas.canvas-ready').should('exist');

    cy.get('#toolbar-editor #rotate').click();

    cy.get('canvas').should(
      'have.css',
      'transform',
      'matrix(6.12323e-17, 1, -1, 6.12323e-17, 40, 0)'
    );
  });

  it('zoom with buttons in second modal', () => {
    cy.get('#scale input').should('have.value', 1);
    cy.get('#scale #more').click();
    cy.get('#scale input').should('have.value', 1.1);
    cy.get('#scale #more').click();
    cy.get('#scale input').should('have.value', 1.2);
    cy.get('#scale #less').click();
    cy.get('#scale input').should('have.value', 1.1);

    cy.get('#scale input').invoke('val', 8).trigger('change');
    cy.get('#scale input').should('have.value', 8);
  });

  it('zoom with slider in second modal', () => {
    cy.get('#scale input').invoke('val', 8).trigger('change');
    cy.get('#scale input').should('have.value', 8);
  });

  it('Saturation and brightness and contrast with buttons', () => {
    cy.get('#contrast #more').click();
    cy.get('#contrast input').should('have.value', 5);
    cy.get('#contrast #less').click();
    cy.get('#contrast input').should('have.value', 0);

    cy.get('#brightness #more').click();
    cy.get('#brightness input').should('have.value', 1);
    cy.get('#brightness #less').click();
    cy.get('#brightness input').should('have.value', 0);

    cy.get('#saturation #more').click();
    cy.get('#saturation input').should('have.value', 1.1);
    cy.get('#saturation #less').click();
    cy.get('#saturation input').should('have.value', 1);
  });

  it('Saturation and brightness and contrast with slider', () => {
    cy.get('#contrast input').invoke('val', 5).trigger('change');
    cy.get('#contrast input').should('have.value', 5);

    cy.get('#brightness input').invoke('val', 52).trigger('change');
    cy.get('#brightness input').should('have.value', 52);

    cy.get('#saturation input').invoke('val', 2.1).trigger('change');
    cy.get('#saturation input').should('have.value', 2.1);
  });

  it('Change name document', () => {
    cy.get('#toolbar-editor #edit-document').click();
    cy.get('#select-name').click();

    cy.get('#select-name-listbox').contains('Boite').click();

    cy.get('center > .slds-button_brand').click();
    cy.get('.slds-modal__footer > .slds-button_brand').click();

    cy.wait('@postDocument').its('requestBody').should('deep.equal', {
      codeQualification: 'BOIT',
      idDocNum: 10,
      numDos: 34378239,
      photo418: false,
      photoAO: false,
      photoRapport: true
    });

    cy.get('#toolbar-editor').contains('Boite');
  });

  it('scale with the mouse', () => {
    const mission = 87987049;
    const document = 11;

    cy.visit(`/mission/${mission}/document/${document}`);

    cy.get('canvas.canvas-ready').should('exist');

    cy.get('canvas').trigger('mousewheel');
  });

  it('translate with the mouse', () => {
    const mission = 87987049;
    const document = 11;

    cy.visit(`/mission/${mission}/document/${document}`);

    cy.get('canvas.canvas-ready').should('exist');

    cy.get('canvas')
      .trigger('mousedown', { clientX: 1, clientY: 1 })
      .trigger('mousemove', { clientX: 1, clientY: 1 })
      .trigger('mouseup');
  });
});
