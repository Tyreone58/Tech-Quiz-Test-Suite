import Quiz from '../../client/src/components/Quiz';

describe('Quiz Component', () => {

  // Start quiz.
  const startQuiz = () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
  };

  // answer questions.
  const answerQuestion = (answerText) => {
    cy.get('button').contains(answerText).click();
  };

  // verify quiz completion.
  const verifyQuizCompletion = (score) => {
    cy.get('div.alert').should('contain.text', `Your Total score: ${score}`);
    cy.get('h2').should('contain.text', 'Quiz Completed');
  };

  // callback function to intercept the API call.
  beforeEach(() => {
    cy.fixture('questions.json').then((questions) => {
      cy.intercept('GET', '/api/questions/random', questions).as('getRandomQuestions');
    });
  });

  // Verify the quiz starts and the first question is displayed.
  it('should start the quiz and display the first question', () => {
    startQuiz();
    cy.get('h2').should('contain.text', 'Which is the correct answer?');
    cy.get('button').contains('1').should('exist');
  });

  // Verify that the quiz can be completed.
  it('should answer questions and complete the quiz', () => {
    startQuiz();
    answerQuestion('1');
    verifyQuizCompletion('1/1');
  });

  // Verify that the quiz can be restarted.
  it('should restart the quiz after completion', () => {
    startQuiz();
    answerQuestion('1');
    verifyQuizCompletion('1/1');
    cy.get('button').contains('Take New Quiz').click();
    cy.get('h2').should('contain.text', 'Which is the correct answer?');
    cy.get('button').contains('1').should('exist');
  });
});