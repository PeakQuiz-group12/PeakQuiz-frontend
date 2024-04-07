describe('Profile View Tests', () => {

    beforeEach(() => {
        cy.visit('/profile', {
            onBeforeLoad: (window) => {
                window.sessionStorage.setItem('username', 'newuser');
                // Set any other required sessionStorage items here
            }
        });

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

        cy.get('.profile-img').click();


        // Mock any necessary API calls if needed
    });

    it('Should display profile elements with users username', () => {

        cy.get('.profileView-container').should('exist');
        cy.get('.profile-header').should('exist');
        cy.get('.profile-image').should('have.attr', 'src', '/src/assets/profile-picture.jpg');
        cy.get('.user-info h1').should('contain', 'newuser');
        cy.get('.stats .stat').should('contain', '4.5');
    });



    // Additional tests to cover all components and functionalities
});
