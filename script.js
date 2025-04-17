// Referências DOM
const inicialInput = document.getElementById("inicialInput");
const errorMessage = document.getElementById("errorMessage");
const statusMessage = document.getElementById("statusMessage");
const btnIniciar = document.getElementById("btnIniciar");
const btnPerdi = document.getElementById("btnPerdi");
const btnGanhei = document.getElementById("btnGanhei");
const btnResetar = document.getElementById("btnResetar");
const btnFinalizarSessao = document.getElementById("btnFinalizarSessao");
const apostaAtualSpan = document.getElementById("apostaAtual");
const totalPerdidoSpan = document.getElementById("totalPerdido");
const lucroTotalSpan = document.getElementById("lucroTotal");
const tentativasSpan = document.getElementById("tentativas");

// Variáveis de estado
let valorInicial = 0;
let apostaAtual = 0;
let totalPerdidoSequencia = 0;
let lucroTotalGeral = 0;
let tentativasSequencia = 0;
let jogoIniciado = false;
let statusTimeout;

// Função formatarNumero
function formatarNumero(num) {
  if (isNaN(num) || num === null || typeof num === 'undefined') {
    return '-';
  }
  try {
       return num.toLocaleString('pt-PT', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  } catch (e) {
      return num.toString();
  }
}

// Função showStatusMessage
function showStatusMessage(message, type = 'info', duration = 3000) {
    clearTimeout(statusTimeout);
    statusMessage.textContent = message;
    statusMessage.className = ''; // Limpa classes anteriores
    statusMessage.classList.add(`status-${type}`, 'show');
    statusTimeout = setTimeout(() => {
        statusMessage.classList.remove('show');
         // Adiciona um pequeno delay antes de limpar o texto para a transição de opacidade completar
         setTimeout(() => {
             if (!statusMessage.classList.contains('show')) { // Verifica se outra msg não foi mostrada nesse meio tempo
                statusMessage.textContent = '';
                statusMessage.className = ''; // Limpa classes totalmente
             }
         }, 500); // Tempo deve ser igual ou maior que a duração da transição de opacidade no CSS
    }, duration);
}

// Função atualizarUI
 function atualizarUI() {
  apostaAtualSpan.textContent = jogoIniciado ? formatarNumero(apostaAtual) : '-';
  totalPerdidoSpan.textContent = jogoIniciado ? formatarNumero(totalPerdidoSequencia) : '-';
  lucroTotalSpan.textContent = formatarNumero(lucroTotalGeral);
  tentativasSpan.textContent = jogoIniciado ? tentativasSequencia : '-';

  const acoesHabilitadas = jogoIniciado && valorInicial > 0;
  btnPerdi.disabled = !acoesHabilitadas;
  btnGanhei.disabled = !acoesHabilitadas;
  btnResetar.disabled = !acoesHabilitadas;
  // Botão finalizar habilitado se tiver lucro OU se o jogo estiver iniciado (para permitir reset total)
  btnFinalizarSessao.disabled = lucroTotalGeral <= 0 && !jogoIniciado;

  btnIniciar.disabled = jogoIniciado;
  inicialInput.disabled = jogoIniciado;
}


// Função limparErro
function limparErro() {
    errorMessage.textContent = '';
}

// Função iniciarJogo
function iniciarJogo() {
  limparErro();
  const valorInput = parseFloat(inicialInput.value);

  if (isNaN(valorInput) || valorInput <= 0) {
    errorMessage.textContent = "Valor inicial inválido.";
    showStatusMessage("Erro: Insira um valor inicial positivo.", 'error');
    jogoIniciado = false; // Garante que o estado está correto
    atualizarUI(); // Atualiza a UI para refletir o estado não iniciado
    return;
  }

  valorInicial = valorInput;
  apostaAtual = valorInicial;
  totalPerdidoSequencia = 0;
  lucroTotalGeral = 0; // Resetar lucro geral ao iniciar uma NOVA sessão
  tentativasSequencia = 0;
  jogoIniciado = true;

  showStatusMessage(`Jogo iniciado! Aposta: ${formatarNumero(valorInicial)} Kz`, 'info');
  atualizarUI();
}

// Função registrarPerda
function registrarPerda() {
  if (!jogoIniciado) return;

  totalPerdidoSequencia += apostaAtual;
  const apostaAnterior = apostaAtual;
  apostaAtual *= 2;
  tentativasSequencia++;

  showStatusMessage(`Perdeu ${formatarNumero(apostaAnterior)} Kz. Próxima: ${formatarNumero(apostaAtual)} Kz`, 'error');
  atualizarUI();
}

// Função registrarGanho
function registrarGanho() {
  if (!jogoIniciado) return;

  // O lucro da sequência é sempre o valor inicial definido
  const lucroSequencia = valorInicial;
  lucroTotalGeral += lucroSequencia; // Acumula o lucro no total geral

  showStatusMessage(`Ganhou! Lucro: ${formatarNumero(lucroSequencia)} Kz. Sequência reiniciada.`, 'success');

  // Resetar para a próxima sequência
  resetarSequenciaAtual(false); // Reinicia sem msg adicional, a msg de ganho já foi mostrada
  atualizarUI();
}

// Função resetarSequenciaAtual
function resetarSequenciaAtual(showMessage = true) {
   if (!jogoIniciado) return;

    // Não reseta lucroTotalGeral aqui, apenas a sequência
    apostaAtual = valorInicial;
    totalPerdidoSequencia = 0;
    tentativasSequencia = 0;

    if (showMessage) {
        showStatusMessage("Sequência atual resetada para aposta inicial.", 'info');
    }
    atualizarUI();
}

// Função finalizarSessao
 function finalizarSessao() {
    const lucroFinal = lucroTotalGeral;
    const msgFinal = lucroFinal > 0
        ? `Sessão finalizada! Lucro total: ${formatarNumero(lucroFinal)} Kz.`
        : "Sessão finalizada sem lucro."; // Mensagem ajustada para clareza

    showStatusMessage(msgFinal + " Calculadora resetada.", 'success', 4000);

    // Reset completo do estado
    valorInicial = 0;
    apostaAtual = 0;
    totalPerdidoSequencia = 0;
    lucroTotalGeral = 0;
    tentativasSequencia = 0;
    jogoIniciado = false;
    inicialInput.value = ''; // Limpa o campo de input
    limparErro();
    atualizarUI(); // Atualiza a UI para o estado inicial/resetado
}

// Event Listeners
// Garante que o DOM está pronto antes de adicionar listeners
document.addEventListener('DOMContentLoaded', () => {
  // Verifica se os elementos existem antes de adicionar listeners (boa prática)
  if (btnIniciar) btnIniciar.addEventListener('click', iniciarJogo);
  if (btnPerdi) btnPerdi.addEventListener('click', registrarPerda);
  if (btnGanhei) btnGanhei.addEventListener('click', registrarGanho);
  if (btnResetar) btnResetar.addEventListener('click', () => resetarSequenciaAtual(true)); // Passa true para mostrar msg
  if (btnFinalizarSessao) btnFinalizarSessao.addEventListener('click', finalizarSessao);

  // Limpa o erro ao digitar no input
  if(inicialInput) {
    inicialInput.addEventListener('input', limparErro);
  }

  // Define o estado inicial da UI ao carregar a página
  atualizarUI();
});
