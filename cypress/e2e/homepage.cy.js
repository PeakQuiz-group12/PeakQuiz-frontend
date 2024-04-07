describe('Home Page Tests', () => {
    beforeEach(() => {

        cy.visit('/profile', {
            onBeforeLoad: (window) => {
                window.sessionStorage.setItem('username', 'newuser');
                window.sessionStorage.setItem('accessToken', 'newAccessToken');
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
        cy.url().should('include', '/');
    });

    it('displays quiz cards and allows scrolling through quizzes', () => {
        cy.get('.quizzes').should('have.length.greaterThan', 0);
        cy.get('.quiz-row-main').should('exist');
        cy.get('.quiz-card-main').should('exist');

        // Scroll through quizzes
        cy.get('.next').click({ multiple: true });
        cy.get('.prev').click({ multiple: true});

        // More actions and assertions here
    });


    it('allows navigation to profile page', () => {
        // Navigate to profile page
        cy.get('.profile-img').click();
        cy.get('.profileView-container').should('exist');
        cy.intercept('POST', 'http://localhost:8080/refreshToken', {
            statusCode: 200, // Or whatever status code represents a successful refresh
            body: { accessToken: 'accessToken' }
        }).as('refreshTokenRequest');

    });

});
