describe('Quiz Component Tests', () => {
    beforeEach(() => {
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

        cy.get('.quiz-card-main').first().click(); // Clicks the first quiz card

    });

    it('allows a user to complete a quiz', () => {
        // Assuming each question has a unique selector or class
        cy.get('.question-box').should('exist'); // Check if the question box is displayed

        // Simulate answering a question
        // This part will be dependent on how your UI is structured and may need adjustments
        cy.get('.answer-options-btn').first().click(); // Clicks the first answer option
        cy.get('.next-btn').click(); // Navigates to the next question

        cy.contains('button', 'Give up').click();
        // Check for summary display
        cy.get('.summary').should('exist');
        // More assertions can be added here to validate the summary
    });

    // Additional test cases for different scenarios, such as incorrect answers,
    // time expiration, etc., can also be added.
});