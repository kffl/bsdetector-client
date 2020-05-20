/// <reference types="Cypress" />
describe('Repo analysis', () => {
	it('should require repo details input', () => {
		cy.visit('/#/public-github-repo-analysis');
		cy.get('button').contains('Detect', { matchCase: false }).click();
		cy.get('.v-messages__message').first().contains('required.', { matchCase: false }).should('be.visible');
	});
	it('should detect code smells', () => {
		cy.get('.v-input').contains('Username').parents().eq(2).find('input').type('kffl');
		cy.get('.v-input').contains('Repository').parents().eq(2).find('input').type('bsdetector-client');
		cy.get('button').contains('Detect', { matchCase: false }).click();
		cy.get('.v-expansion-panels', { timeout: 20000 })
			.contains('Line too long', { matchCase: false })
			.get('.occurrence-container').should('have.descendants', 'code');
	});
});
