# PeakQuiz-frontend

PeakQuiz is an educational quiz application meant for sharing and playing quizzes. It was created during the spring semester of 2024 at NTNU for the course IDATT2105. This repository serves as the frontend side of the application.

## Requirements ## 
To run the application, you need to have the following installed:
- npm

## Getting started
1. Clone the repository:
```
git@github.com:PeakQuiz-group12/PeakQuiz-frontend.git
```
2. Navigate to the repository root:
```
cd PeakQuiz-frontend
```
3. Install dependencies

```
npm install
```
4. Run application
```
npm run dev
```
## Using the application
The application is already populated with testdata. 
You can log in with the following credentials: 
```
- Username: test
- Password: Aa12345!
```
Once logged in, there should be a quiz ready to be played!

## Accessing the database
To log into the database, paste this URL into your browser
```
localhost:8080/console
```
Change the ```JDBC URL``` field to 
```
jdbc:h2:file:./data/myDB
```
Credentials: 
```
- Username: sa
- Password: password
```

## Other commands

- ```npm run build``` Type-Check, Compile and Minify for Production
- ```npm run test:unit``` Run unit tests
- ```npm run test:e2e``` End to end testing
- ```npm run lint ``` Lint with [ESLint](https://eslint.org/)

## License
Distributed under the MIT License. See LICENSE.txt for more information.


