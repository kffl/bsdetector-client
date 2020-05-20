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
		cy.get('.v-expansion-panels', { timeout: 20000 })
			.contains('Too many parameters for a function declaration', { matchCase: false })
			.click()
			.get('.occurrence-container')
			.should(($container) => {
				expect($container).to.have.length(2);
			});
	});
});
