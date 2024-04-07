describe('Profile View Tests', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.get('.login-signup-links h1').contains('Sign Up').click();
        cy.get('input[placeholder="Enter your username"]').type('newUser');
        cy.get('input[placeholder="Enter your email address"]').type('newUser@example.com');
        cy.get('input[placeholder="Enter your password"]').type('Newpassword!2');
        cy.log('Before clicking Sign up button');
        cy.get('.login-btn').contains('Sign up').click();
        cy.intercept('POST', 'http://localhost:8080/register', {
            statusCode: 200,
            body: { accessToken: 'newAccessToken', refreshToken: 'newRefreshToken' }
        }).as('registerRequest');
        cy.intercept('POST', 'http://localhost:8080/refreshToken', {
            statusCode: 200,
            body: { accessToken: 'newAccessToken', refreshToken: 'newRefreshToken' }
        }).as('refreshToken');
        // Add a wait for any redirection or additional async operation here if needed
        // cy.wait('@someOtherRequest'); // If there's another async operation to wait for
         cy.url().should('include', '/'); // Move this to the appropriate place if needed
        cy.get('.profile-img').click();
    });


    it('Should display profile elements with users username', () => {

        cy.get('.profileView-container').should('exist');
        cy.get('.profile-header').should('exist');
        cy.get('.profile-image').should('have.attr', 'src', '/src/assets/profile-picture.jpg');
        cy.get('.user-info h1').should('contain', 'newUser');
        cy.get('.stats .stat').should('contain', '0');
    });
    Cypress.on('uncaught:exception', () => {
        return false;
    });
    // Additional tests to cover all components and functionalities
});
