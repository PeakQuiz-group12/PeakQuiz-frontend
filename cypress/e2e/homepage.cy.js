describe('Home Page Tests', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('.login-signup-links h1').contains('Sign Up').click();
        cy.get('input[placeholder="Enter your username"]').type('testUser1');
        cy.get('input[placeholder="Enter your email address"]').type('testUser1@example.com');
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

    });

    it('visits the home page', () => {
        // Scroll through quizzes
        cy.url().should('include', '/'); // Move this to the appropriate place if needed

        // More actions and assertions here
    });


});
