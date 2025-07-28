const btnSim = document.getElementById('btnSim');
const btnNao = document.getElementById('btnNao');
const messageDiv = document.getElementById('message');
const buttonsDiv = document.querySelector('.buttons');

let clickCount = 0;
let firstMove = true;

btnSim.addEventListener('mouseenter', () => {
  if (firstMove) {
    btnSim.style.position = 'absolute';
    const rect = btnSim.getBoundingClientRect();
    const parentRect = buttonsDiv.getBoundingClientRect();
    btnSim.style.left = (rect.left - parentRect.left) + 'px';
    btnSim.style.top = (rect.top - parentRect.top) + 'px';
    firstMove = false;
  }

  if (clickCount < 9) {
    const containerWidth = buttonsDiv.clientWidth;
    const containerHeight = buttonsDiv.clientHeight;

    const btnSimWidth = btnSim.offsetWidth;
    const btnSimHeight = btnSim.offsetHeight;

    const btnNaoRect = btnNao.getBoundingClientRect();
    const containerRect = buttonsDiv.getBoundingClientRect();

    const naoLeft = btnNaoRect.left - containerRect.left;
    const naoTop = btnNaoRect.top - containerRect.top;
    const naoRight = naoLeft + btnNao.offsetWidth;
    const naoBottom = naoTop + btnNao.offsetHeight;

    const margin = 10; // margem extra para evitar que fique MUITO perto do "Não"

    let newLeft, newTop;
    let attempts = 0;
    let safePosition = false;

    while (!safePosition && attempts < 200) {
      newLeft = Math.floor(Math.random() * (containerWidth - btnSimWidth));
      newTop = Math.floor(Math.random() * (containerHeight - btnSimHeight));

      const simRight = newLeft + btnSimWidth;
      const simBottom = newTop + btnSimHeight;

      const overlapX = !(simRight + margin < naoLeft || newLeft - margin > naoRight);
      const overlapY = !(simBottom + margin < naoTop || newTop - margin > naoBottom);

      // Só considera seguro se NÃO houver sobreposição nas duas direções ao mesmo tempo
      if (!(overlapX && overlapY)) {
        safePosition = true;
      }

      attempts++;
    }

    // Se não achou posição segura após 200 tentativas, posiciona no canto superior esquerdo
    if (!safePosition) {
      newLeft = 0;
      newTop = 0;
    }

    btnSim.style.left = newLeft + 'px';
    btnSim.style.top = newTop + 'px';

    clickCount++;
    messageDiv.textContent = '';
  } else if (clickCount === 9) {
    btnSim.style.position = 'static';
    messageDiv.textContent = 'Brincadeira! Pode clicar agora. Vamos começar o quiz!';

    buttonsDiv.innerHTML = `
      <button id="startQuiz">Começar Quiz</button>
    `;

    const startQuizBtn = document.getElementById('startQuiz');
    startQuizBtn.addEventListener('click', () => {
      window.location.href = 'quiz.html';
    });

    clickCount++;
  }
});

btnNao.addEventListener('click', () => {
  messageDiv.textContent = 'Tudo bem, volte quando estiver preparado(a)! ❤️';
});
