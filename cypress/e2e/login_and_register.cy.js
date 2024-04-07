describe('Login and Registration Component Tests', () => {
    it('Tests Login Functionality', () => {
        cy.visit('/'); // Adjust URL as necessary
        cy.get('.login-signup-links h1').contains('Login').click();
        cy.get('input[placeholder="Enter your username"]').type('testuser');
        cy.get('input[placeholder="Enter your password"]').type('testpassword');
        cy.get('.login-btn').click();

        cy.intercept('POST', 'http://localhost:8080/login', {
            statusCode: 200,
            body: { accessToken: 'newAccessToken', refreshToken: 'newRefreshToken' }
        }).as('loginRequest');

        cy.get('.login-btn').contains('Log in').click();

        cy.wait('@loginRequest').its('response.body').should('include.keys', ['accessToken', 'refreshToken']);



        // Add more assertions as needed
    });

    it('Tests Sign Up Functionality', () => {
        cy.visit('/');
        cy.get('.login-signup-links h1').contains('Sign Up').click();
        cy.get('input[placeholder="Enter your username"]').type('newuser2');
        cy.get('input[placeholder="Enter your email address"]').type('newuser2@example.com');
        cy.get('input[placeholder="Enter your password"]').type('Newpassword!1');

        // Debug before the click action
        cy.log('Before clicking Sign up button');

        cy.get('.login-btn').contains('Sign up').click();


        cy.intercept('POST', 'http://localhost:8080/register', {
            statusCode: 200,
            body: { accessToken: 'newAccessToken', refreshToken: 'newRefreshToken' }
        }).as('registerRequest');

        cy.get('.login-btn').contains('Sign up').click();

        cy.wait('@registerRequest').its('response.body').should('include.keys', ['accessToken', 'refreshToken']);

    });


    // Additional tests for input validations and error handling can be written following similar patterns
});
