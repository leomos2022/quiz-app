// Quiz Questions Array
const quizData = [
    {
      question: "I ____ to the store yesterday.",
      answers: [
        "go",
        "went",
        "gone",
        "going"
      ],
      correct: 1
    },
    {
      question: "She ____ her homework every day.",
      answers: [
        "do",
        "does",
        "did",
        "done"
      ],
      correct: 1
    },
    {
      question: "They ____ watching a movie right now.",
      answers: [
        "are",
        "is",
        "were",
        "be"
      ],
      correct: 0
    },
    {
      question: "He ____ finish his project by next week.",
      answers: [
        "will",
        "would",
        "has",
        "have"
      ],
      correct: 0
    },
    {
      question: "We ____ to the beach last summer.",
      answers: [
        "go",
        "going",
        "gone",
        "went"
      ],
      correct: 3
    },
    {
      question: "She ____ been studying for three hours.",
      answers: [
        "has",
        "have",
        "had",
        "having"
      ],
      correct: 0
    },
    {
      question: "I ____ a book when you called.",
      answers: [
        "read",
        "reads",
        "was reading",
        "will read"
      ],
      correct: 2
    },
    {
      question: "They ____ to the party if they finish work early.",
      answers: [
        "come",
        "comes",
        "will come",
        "came"
      ],
      correct: 2
    }
  ];
  
  // DOM Elements
  const quizContainer = document.getElementById('quiz');
  const questionEl = document.getElementById('question');
  const answerButtons = document.querySelectorAll('.answer-btn');
  const scoreContainer = document.getElementById('score-container');
  const scoreEl = document.getElementById('score');
  const restartBtn = document.getElementById('restart');
  
  let currentQuestion = 0;
  let score = 0;
  
  // Confirm script is running
  console.log("Script loaded.");
  
  // Initialize Quiz
  function loadQuestion() {
    console.log(`Loading question ${currentQuestion + 1}`);
    resetState();
    const currentQuiz = quizData[currentQuestion];
    questionEl.innerText = currentQuiz.question;
    answerButtons.forEach((button, index) => {
      button.innerText = currentQuiz.answers[index];
      button.classList.remove('correct', 'wrong');
      button.disabled = false;
      if (index === currentQuiz.correct) {
        button.dataset.correct = "true";
      } else {
        button.dataset.correct = "false";
      }
    });
  }
  
  // Reset State for New Question
  function resetState() {
    answerButtons.forEach(button => {
      button.classList.remove('correct', 'wrong');
      button.disabled = false;
    });
  }
  
  // Handle Answer Click
  answerButtons.forEach(button => {
    button.addEventListener('click', () => {
      const isCorrect = button.dataset.correct === "true";
      console.log(`Answer selected: ${button.innerText} - Correct: ${isCorrect}`);
      if (isCorrect) {
        button.classList.add('correct');
        score++;
        console.log(`Score incremented to: ${score}`);
      } else {
        button.classList.add('wrong');
        // Highlight the correct answer
        answerButtons.forEach(btn => {
          if (btn.dataset.correct === "true") {
            btn.classList.add('correct');
            console.log(`Highlighted correct answer: ${btn.innerText}`);
          }
        });
      }
  
      // Disable all buttons after an answer is selected
      answerButtons.forEach(btn => btn.disabled = true);
  
      // Move to next question after a short delay
      setTimeout(() => {
        currentQuestion++;
        console.log(`Moving to question ${currentQuestion + 1}`);
        if (currentQuestion < quizData.length) {
          loadQuestion();
        } else {
          showScore();
        }
      }, 1000);
    });
  });
  
  // Show Final Score
  function showScore() {
    console.log("showScore() called.");
    console.log("Showing score: ", score);
    quizContainer.classList.add('hide');
    scoreContainer.classList.remove('hide');
    scoreEl.innerText = score;
  }
  
  // Restart Quiz
  restartBtn.addEventListener('click', () => {
    console.log("Restarting quiz.");
    currentQuestion = 0;
    score = 0;
    scoreContainer.classList.add('hide');
    quizContainer.classList.remove('hide');
    loadQuestion();
  });
  
  // Start the quiz
  loadQuestion();
  