/// <reference types="Cypress" />
describe('Code editor', () => {
	it('should require code input', () => {
		cy.visit('/#/editor');
		cy.get('button')
			.contains('Detect', { matchCase: false })
			.click();
		cy.get('.v-snack__content')
			.contains('required', { matchCase: false })
			.should('be.visible');
	});
	it('should detect code smells', () => {
		cy.get('.CodeMirror textarea')
			.type('function l(a,b,c,d,e,f,g) {};\nfunction k(a,b,d,e,f,g,h) {}', { force: true });
		cy.get('button')
			.contains('Detect', { matchCase: false })
			.click();
		cy.get('.v-expansion-panels', { timeout: 20000 })
			.contains('Too many parameters for a function declaration', { matchCase: false })
			.click();
		cy.get('.v-expansion-panels')
			.contains('Too many parameters for a function declaration', { matchCase: false })
			.parent()
			.find('.vue-codemirror')
			.should('have.length', 2);
	});
});
