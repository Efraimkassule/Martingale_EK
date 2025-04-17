# Martingale_EK
Domine a estratégia Martingale nas apostas
# EK PICTURES - Calculadora de Estratégia Martingale

Esta é uma calculadora web simples desenvolvida por Efraim Kassule (EK PICTURES) para auxiliar na aplicação e acompanhamento da estratégia de apostas Martingale.

## Objetivo

A ferramenta permite que o usuário defina um valor de aposta inicial. A cada perda registrada, a calculadora dobra o valor da aposta seguinte. Ao registrar um ganho, a sequência é considerada bem-sucedida, o lucro (equivalente à aposta inicial) é adicionado ao total geral, e a sequência é reiniciada com a aposta inicial. A calculadora mantém o controle do investimento total na sequência atual e do lucro acumulado durante a sessão.

# Funcionalidades

   **Definir Aposta Inicial:** Campo para inserir o valor da primeira aposta da sequência (em Kz).
   **Iniciar Sessão:** Botão para começar a calcular com base na aposta inicial.
   **Registrar Perda ("Perdi"):** Incrementa o total investido na sequência, dobra a aposta atual e aumenta o contador de tentativas da sequência.
   **Registrar Ganho ("Ganhei"):** Adiciona o valor da aposta inicial ao lucro total geral, reinicia a aposta atual para o valor inicial, zera o total investido na sequência e o número de tentativas.
   **Resetar Sequência ("Resetar Seq."):** Reinicia a aposta atual para o valor inicial, zerando o total investido e as tentativas *da sequência atual*, sem afetar o lucro total geral. Útil para abandonar uma sequência específica sem finalizar a sessão.
   **Finalizar Sessão ("Finalizar"):** Zera todos os contadores (aposta atual, investimento na sequência, tentativas, lucro total geral), limpa o campo de entrada e retorna a calculadora ao estado inicial. Exibe uma mensagem com o lucro total acumulado na sessão.
   **Feedback Visual:**
       Exibição clara da Aposta Atual, Lucro Total, Total Investido na Sequência e Tentativas na Sequência.
    *   Mensagens de status dinâmicas para informar o usuário sobre ações (início, perda, ganho, reset, finalização) e erros (valor inicial inválido).
    *   Desabilitação/habilitação de botões conforme o estado do jogo (iniciado/não iniciado).
*   **Validação:** Impede o início com valores de aposta inválidos (não numéricos, zero ou negativos).

## Como Usar

1.  **Download/Clone:** Baixe os arquivos `index.html`, `style.css` e `script.js` ou clone este repositório.
2.  **Localização:** Certifique-se de que os três arquivos (`index.html`, `style.css`, `script.js`) estejam na mesma pasta (diretório).
3.  **Abrir:** Abra o arquivo `index.html` no seu navegador web preferido (Google Chrome, Firefox, Edge, etc.).

**Instruções de Operação:**

1.  Digite o valor da sua aposta inicial no campo "Aposta inicial (Kz)".
2.  Clique no botão "Iniciar".
3.  Após cada rodada da sua aposta externa:
    *   Se perdeu, clique em "Perdi". A calculadora mostrará a próxima aposta necessária.
    *   Se ganhou, clique em "Ganhei". A calculadora registrará o lucro e reiniciará a sequência.
4.  Use "Resetar Seq." se quiser abandonar a sequência atual e voltar à aposta inicial sem registrar ganho ou finalizar a sessão.
5.  Quando quiser encerrar completamente, clique em "Finalizar".

## Tecnologias Utilizadas

*   HTML5
*   CSS3 (com Grid Layout para organização)
*   JavaScript (Vanilla JS - sem frameworks/bibliotecas externas)
