/// <reference types="Cypress" />
describe('Code editor', () => {
	it('should require code input', () => {
		cy.visit('/#/editor');
		cy.get('button')
			.contains('Detect', { matchCase: false })
			.click();
		cy.get('.v-messages__message')
			.contains('required', { matchCase: false })
			.should('be.visible');
	});
	it('should detect code smells', () => {
		cy.get('textarea')
			.type('function l(a,b,c,d,e,f,g) {};\nfunction k(a,b,d,e,f,g,h) {}');
		cy.get('button')
			.contains('Detect', { matchCase: false })
			.click();
		cy.get('button.v-expansion-panel-header')
			.contains('TOO MANY PARAMETERS FOR A FUNCTION DECLARATION')
			.click()
			.get('.occurrence-container')
			.should(($container) => {
				expect($container).to.have.length(2);
			});
	});
});
