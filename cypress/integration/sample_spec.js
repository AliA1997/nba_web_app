describe('first Test', () => {
    it('does not do too much', () => {
        expect(true).to.equal(true);
    })
})
//Relevent Test
const myApp = 'http://localhost:3000/#/';
describe('my next test', () => {
    it('visits my app', () => {
        cy.visit(myApp);
        cy.contains('NBA');
    })
})

// describe('clicks on Login', () => {
//     it('clicks on Login', () => {
//         cy.visit(myApp);
//         //chains the url, and should function to check if it d the right url.
//         cy.url().should('include', '/')
//         //Check if the element being clicked on contains Login
//         cy.contains('Login' || 'Logout').click();
//         cy.request('')
//     })
// })
// describe('Check if there is an image', () => {
//     it('image is showing', () => {
//         //chains the url, and should function to check if it is the right url.
//         cy.url().should('include', '/');
//     })
// })
// describe('Types Ali Alhaddad into Returning User username field', () => {
//     it('types names into returning username field', () => {
//         cy.visit(myApp);
//         cy.get('input:first').should('have.attr', 'placehoslder', 'Username')
//         .type('bob');
//     })
// });