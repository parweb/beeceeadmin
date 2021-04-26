describe('Navigation', () => {
  beforeEach(() => {
    cy.server();

    cy.route(
      'GET',
      'https://apps-int.bca.fr/doc-num-front/api/documents/?id=87987048',
      'fixture:document-navigation.json'
    );

    cy.route(
      'GET',
      'https://apps-int.bca.fr/doc-num-front/api/documents/?id=87987049',
      'fixture:documents-navigation.json'
    );

    cy.route({
      method: 'GET',
      url: 'https://apps-int.bca.fr/doc-num-front/api/documents/?id=8791111',
      response: 'fixture:documents-error.json',
      status: 500
    });

    cy.route({
      method: 'GET',
      url: 'https://apps-int.bca.fr/doc-num-front/api/documents/?id=87987051',
      response: []
    });

    cy.route(
      'GET',
      'https://apps-int.bca.fr/doc-num-front/api/documents/?id=100',
      'fixture:documents-signed.json'
    );

    cy.route(
      'GET',
      'https://apps-int.bca.fr/doc-num-front/api/record/?dossier=*',
      'fixture:record-dossier.json'
    );

    cy.route(
      'POST',
      'https://apps-int.bca.fr/doc-num-front/api/auth/login',
      'fixture:login-success.json'
    );
  });

  it('has no documents for the mission', () => {
    const mission = 8791111;
    cy.visit(`/mission/${mission}`);

    cy.get('#document-error').contains(
      "Le numéro de mission n'est pas reconnu!"
    );
  });

  it('return zero document', () => {
    const mission = 87987051;
    cy.visit(`/mission/${mission}`);

    cy.get('.Badge-all').contains('0 document');
    cy.get('.Badge-photos').contains('0 photo');
    cy.get('.Badge-others').contains('0 autre');
    cy.get('#document-none').contains(
      'Aucun document correspond à ce numéro de mission!'
    );
  });

  it('Check the number of one document', () => {
    const mission = 87987048;
    cy.visit(`/mission/${mission}`);

    cy.get('.document-item').should('have.length', 1);
  });

  it('Check the number of many documents', () => {
    const mission = 87987049;
    cy.visit(`/mission/${mission}`);

    cy.get('.document-item').should('have.length', 24);
  });

  it('Navigation with carousel-legend', () => {
    cy.get('#document-item-4').should('be.visible');
    cy.get('#document-item-7').should('not.be.visible');

    cy.get('#CarouselLegend-1').click();

    cy.get('#document-item-4').should('not.be.visible');
    cy.get('#document-item-7').should('be.visible');
  });

  it('Navigation with arrows', () => {
    cy.get('#CarouselLegend-0').click();

    cy.get('#document-item-4').should('be.visible');
    cy.get('#document-item-7').should('not.be.visible');

    cy.get('#carousel-frame #carousel-arrow-right button').click();

    cy.get('#document-item-4').should('not.be.visible');
    cy.get('#document-item-7').should('be.visible');

    cy.get('#carousel-frame #carousel-arrow-right button').click();

    cy.get('#document-item-4').should('not.be.visible');
    cy.get('#document-item-7').should('be.visible');

    cy.get('#carousel-frame #carousel-arrow-left button').click();

    cy.get('#document-item-4').should('be.visible');
    cy.get('#document-item-7').should('not.be.visible');

    cy.get('#carousel-frame #carousel-arrow-left button').click();

    cy.get('#document-item-4').should('be.visible');
    cy.get('#document-item-7').should('not.be.visible');
  });

  it('Open the second modal', () => {
    cy.get('#document-item-22').click();
    cy.get('#open-editor-advanced').click();

    cy.get('#toolbar-editor #rotate').contains('Pivoter');
  });

  it('Navigation with arrows in the second modal', () => {
    cy.get('.modal-primary #carousel-arrow-right button').click();
    cy.get('#editor-thumbnails img:nth-child(7)').should(
      'have.css',
      'border',
      '3px solid rgb(0, 112, 210)'
    );

    cy.get('.modal-primary #carousel-arrow-left button').click();
    cy.get('#editor-thumbnails img:nth-child(6)').should(
      'have.css',
      'border',
      '3px solid rgb(0, 112, 210)'
    );
  });

  it('Navigation with preview documents ', () => {
    cy.get('#editor-thumbnails img:nth-child(21)').click();

    cy.get('#editor-thumbnails img:nth-child(21)').should(
      'have.css',
      'border',
      '3px solid rgb(0, 112, 210)'
    );

    cy.get('#editor-thumbnails img:nth-child(20)').click();

    cy.get('#editor-thumbnails img:nth-child(20)').should(
      'have.css',
      'border',
      '3px solid rgb(0, 112, 210)'
    );
  });

  it('can filter by type on document list', () => {
    const mission = 87987049;
    cy.visit(`/mission/${mission}`);

    cy.get('.Badge-all').contains('24 documents');
    cy.get('.Badge-photos').contains('18 photos');
    cy.get('.Badge-others').contains('6 autres');

    cy.get('.Badge-photos').should('not.have.class', 'slds-badge_inverse');
    cy.get('.Badge-others').should('not.have.class', 'slds-badge_inverse');

    cy.get('.Badge-photos').first().click();
    cy.get('.Badge-photos').first().click();
    cy.get('.Badge-photos').first().click();

    cy.get('.Badge-photos').should('have.class', 'slds-badge_inverse');
    cy.get('.Badge-others').should('not.have.class', 'slds-badge_inverse');
    cy.get('#btn-filter').click();
    cy.get('#filter-by-type-all').should('have.class', 'slds-button_neutral');
    cy.get('#filter-by-type-photos').should('have.class', 'slds-button_brand');
    cy.get('#filter-by-type-others').should(
      'have.class',
      'slds-button_neutral'
    );
    cy.get('#cancel-filter').click();

    cy.get('.Badge-others').first().click();

    cy.get('.Badge-photos').should('not.have.class', 'slds-badge_inverse');
    cy.get('.Badge-others').should('have.class', 'slds-badge_inverse');
    cy.get('#btn-filter').click();
    cy.get('#filter-by-type-all').should('have.class', 'slds-button_neutral');
    cy.get('#filter-by-type-photos').should(
      'have.class',
      'slds-button_neutral'
    );
    cy.get('#filter-by-type-others').should('have.class', 'slds-button_brand');
    cy.get('#cancel-filter').click();
  });

  it('can expand canvas on double click', () => {
    const mission = 87987049;
    cy.visit(`/mission/${mission}`);

    cy.get('#document-item-22').click();
    cy.url()
      .should('not.include', '/expanded')
      .should('not.include', '/advanced');

    cy.get('canvas.canvas-ready').should('exist');

    cy.get('canvas').dblclick();
    cy.url().should('include', '/expanded');
    cy.get('canvas.canvas-ready').should('exist');

    cy.get('canvas').dblclick();
    cy.url()
      .should('not.include', '/expanded')
      .should('not.include', '/advanced');

    cy.get('#toolbar-editor #open-editor-advanced').click();

    cy.get('canvas.canvas-ready').should('exist');

    cy.url().should('include', '/advanced');
    cy.get('canvas').dblclick();
    cy.url().should('include', '/expanded');

    cy.get('canvas.canvas-ready').should('exist');
    cy.get('canvas').dblclick();
    cy.url().should('include', '/advanced');
  });

  it('navigate email attachments', () => {
    const mission = 87987049;
    cy.visit(`/mission/${mission}`);

    cy.get('#document-item-24').click();
    cy.get('#editor-attachments img:nth-child(2)').click();
  });

  it('navigate from /documents with keyboard', () => {
    cy.visit(`/documents`);

    cy.get('input[name=username]').type('DOCNUM');
    cy.get('input[name=password]').type('Docnum_*17062020*{enter}');

    cy.get('#input-search').type('87987049{enter}');
  });

  it('navigate from /documents with mouse', () => {
    cy.visit(`/documents`);

    cy.get('input[name=username]').type('DOCNUM');
    cy.get('input[name=password]').type('Docnum_*17062020*{enter}');

    cy.get('#input-search').type('87987049');
    cy.get('.slds-button_icon').click();
  });

  it('navigate from salesforce to an mission', () => {
    cy.visit(`/?numMission=87987049`);

    cy.url().should('include', '/mission/87987049');
  });

  it('close first modal', () => {
    const mission = 87987049;
    cy.visit(`/mission/${mission}`);

    cy.get('#document-item-22').click();
    cy.get('.modal-primary header button').click();
    cy.get('.modal-primary').should('not.exist');
  });

  it('close second modal', () => {
    const mission = 87987049;
    cy.visit(`/mission/${mission}`);

    cy.get('#document-item-22').click();
    cy.get('#open-editor-advanced').click();
    cy.get('.modal-primary header button').click();
    cy.get('.modal-primary').should('not.exist');
  });

  it('navigate from disscoiate to signed', () => {
    const mission = 100;
    cy.visit(`/mission/${mission}`);

    cy.get('#document-filter-dissociation').click();

    cy.get('#document-filter-signing').click();

    cy.get('#signed-item').should('not.exist');
  });

  it('uncheck documents', () => {
    const mission = 100;
    cy.visit(`/mission/${mission}`);

    cy.get('#document-filter-signing').click();

    cy.get('#document-item-5').click();
    cy.get('#document-item-5').click();

    cy.get('#document-filter-dissociation').click();

    cy.get('#check-btn').should('not.exist');
  });

  it('check color of toolbar button', () => {
    const mission = 100;
    cy.visit(`/mission/${mission}`);

    cy.get('#document-filter-dissociation').should(
      'have.css',
      'background-color',
      'rgb(255, 255, 255)'
    );
    cy.get('#document-filter-signing').should(
      'have.css',
      'background-color',
      'rgb(255, 255, 255)'
    );

    cy.get('#document-filter-signing').click();

    cy.get('#document-filter-dissociation').should(
      'have.css',
      'background-color',
      'rgb(255, 255, 255)'
    );

    cy.get('#document-filter-signing').should(
      'have.css',
      'background-color',
      'rgb(0, 95, 178)'
    );

    cy.get('#document-filter-dissociation').click();
    cy.get('#document-filter-dissociation').should(
      'have.css',
      'background-color',
      'rgb(0, 95, 178)'
    );

    cy.get('#document-filter-signing').should(
      'have.css',
      'background-color',
      'rgb(255, 255, 255)'
    );
    cy.get('#document-filter-dissociation').click();
    cy.get('#document-filter-signing').should(
      'have.css',
      'background-color',
      'rgb(255, 255, 255)'
    );
  });

  it('check number of signing documents', () => {
    const mission = 100;
    cy.visit(`/mission/${mission}`);

    cy.get('#document-filter-signing').click();

    cy.get('.Badge-all').contains('2/7 document');
  });
});
