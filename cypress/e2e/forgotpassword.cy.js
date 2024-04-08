describe('Forgot Password Tests', () => {
    it('allows a user to submit an email for password reset', () => {
        // Visit the Forgot Password page
        cy.visit('/forgotPassword');

        // Fill in the email
        cy.get('.email-input').type('testuser@example.com');

        // Stub the POST request to the forgot password endpoint
        cy.intercept('POST', 'http://localhost:8080/forgotPassword', {
            statusCode: 200,
            body: 'Password reset email sent successfully.'
        }).as('forgotPasswordRequest');

        // Click the submit button
        cy.get('.submit-btn').click();

        // Wait for and assert the request
        cy.wait('@forgotPasswordRequest').its('request.body').should('include', 'email=testuser%40example.com');

        // Assert redirection to the login page
        cy.url().should('include', '/login');

    });

    // Additional tests can be added here
});
