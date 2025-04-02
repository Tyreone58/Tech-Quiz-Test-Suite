describe('Quiz Component', () => {
  const startQuiz =  () => {
    cy.visit('/');
    cy.get('button').contains('Start Quiz').click();
  };

  const answerQuestion = (answer = '1', totalQuestions = 10) => {
    for (let i = 1; i <= totalQuestions; i++) {
      cy.get('button').contains(answer).click();
    }
  };
  it('should start the quiz and display the first question', () => {
    startQuiz();
  cy.get('h2').should('not.be.empty'); // first question is displayed
  });
  

  it('should answer questions and complete the quiz', () => {
  startQuiz();
  answerQuestion();
  cy.get('h2').contains('Quiz Completed');
  });

  it('should restart the quiz after completion', () => {
  startQuiz();
  answerQuestion();
  cy.get('button').contains('Take New Quiz').click(); // new quiz button
  cy.get('h2').should('not.be.empty'); // verify first question is displayed
  cy.get('button').contains('1'); // verify the presence of an answer option with text '1'
  cy.get('h2').should('not.be.empty'); // first question is displayed
  });
});
