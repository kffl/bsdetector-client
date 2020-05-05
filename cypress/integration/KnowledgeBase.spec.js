/// <reference types="Cypress" />
describe('Knowledge base', () => {
	it('should have a title', () => {
		cy.visit('/#/knowledge-base');
		cy.get('h1')
			.contains('Knowledge base', { matchCase: false });
	});
	it('should allow users to navigate between smell docs', () => {
		cy.get('a')
			.contains('Line too long', { matchCase: false })
			.click();
		cy.get('h1')
			.contains('Line too long', { matchCase: false });
		cy.get('a')
			.contains('too many parameters for an arrow function', { matchCase: false })
			.click();
		cy.get('h1')
			.contains('too many parameters for an arrow function', { matchCase: false });
	});
});
