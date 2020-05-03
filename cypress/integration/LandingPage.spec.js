describe('Landing page tests', () => {
	it('Has a title', () => {
		cy.visit('/');
		cy.get('h1').contains('code smells detector', { matchCase: false });
	});
	it('contains our names in the footer', () => {
		cy.get('footer').contains('Paweł Kuffel').contains('Marcin Rochowiak').contains('Tomasz Pućka').contains('Bartosz Paulewicz');
	});
});
