const quizForm = document.getElementById('quizForm');
const resultDiv = document.getElementById('result');

const answers = {
  q1: 'd',
  q2: 'a',
  q3: 'c',
  q4: 'a',
  q5: 'a',
  q6: 'd',
  q7: 'b',
  q8: 'a',
  q9: 'c',
  q10: 'd'
};

quizForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(quizForm);
  let score = 0;
  const totalQuestions = Object.keys(answers).length;

  for (let key in answers) {
    if (formData.get(key) === answers[key]) {
      score++;
    }
  }

  let message = `Você acertou ${score} de ${totalQuestions} perguntas! `;

  if (score === totalQuestions) {
    message += "Parabéns minha vida! Vc é simplesmente explendida!";
  } else if (score >= totalQuestions * 0.7) {
    message += "Mandou bem mas eu esperava mais que isso ein";
  } else if (score >= totalQuestions * 0.4) {
    message += "Legal! Mas dá pra melhorar, tamo passando mto pouco tempo junto só pode";
  } else {
    message += "Voce me odeia só acertando isso";
  }

  // Mostra a mensagem e esconde o formulário
  resultDiv.innerHTML = `<p>${message}</p><button id="playAgain">Jogar de novo</button>`;
  quizForm.style.display = 'none';

  // Adiciona evento ao botão "Jogar de novo"
  document.getElementById('playAgain').addEventListener('click', () => {
    quizForm.reset(); // limpa as respostas
    quizForm.style.display = 'block';
    resultDiv.textContent = '';
  });
});
