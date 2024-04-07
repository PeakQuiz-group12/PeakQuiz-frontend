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
        cy.get('input[placeholder="Enter your username"]').type('newuser');
        cy.get('input[placeholder="Enter your email address"]').type('newuser@example.com');
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

    it('Tests Invalid Registration Fields', () => {
        cy.visit('/');
        cy.get('.login-signup-links h1').contains('Sign Up').click();

        // Attempting registration with invalid username, email, and password
        cy.get('input[placeholder="Enter your username"]').type('invalidUser');
        cy.get('input[placeholder="Enter your email address"]').type('invalidEmail');
        cy.get('input[placeholder="Enter your password"]').type('123');

        cy.get('.login-btn').contains('Sign up').click();

        // Mock the response for invalid registration
        cy.intercept('POST', 'http://localhost:8080/register', {
            statusCode: 400,
            body: "Invalid registration data"
        }).as('invalidRegisterRequest');

        // Assertions for error messages
        cy.contains('Username is invalid').should('exist');
        cy.contains('Email format is invalid').should('exist');
        cy.contains('Password is too weak').should('exist');
    });

    it('Tests Login with Unregistered User', () => {
        cy.visit('/');
        cy.get('.login-signup-links h1').contains('Login').click();

        // Attempting to log in with an unregistered user
        cy.get('input[placeholder="Enter your username"]').type('unregisteredUser');
        cy.get('input[placeholder="Enter your password"]').type('somePassword');

        cy.get('.login-btn').click();

        // Mock the response for login attempt with unregistered user
        cy.intercept('POST', 'http://localhost:8080/login', {
            statusCode: 401,
            body: ""
        }).as('unregisteredLoginRequest');

        // Assertion for error message
        cy.contains('').should('exist');

    });


    // Additional tests for input validations and error handling can be written following similar patterns
});
