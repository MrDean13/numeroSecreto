let listasDeNumerosSorteados = [];
let numeroLimite = 50;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});
}
function exibirMensagemInicial() {
    exibirTextoNaTela("h1", "Joguinho Besta");
    exibirTextoNaTela("p", `Escolha um número entre 1 e ${numeroLimite}.`);
}
exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector("input").value;
    if (chute == numeroSecreto) {
        let palavraTentativa = tentativas > 1 ? `tentativas` : `tentativa`;
        let mensagemTentativas = `Você descobriu o número secreto em ${tentativas} ${palavraTentativa}`
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled")
    }
    else if (chute < numeroSecreto) {
        exibirTextoNaTela("p", `O número ${chute} é menor que o número secreto`);
    } else {
        exibirTextoNaTela("p", `O número ${chute} é maior que o número secreto`);
    }
    tentativas++;
    limparCampo();
}


function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listasDeNumerosSorteados.length;
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listasDeNumerosSorteados = [];
    }

    if (listasDeNumerosSorteados.includes(numeroEscolhido)) {
        gerarNumeroAleatorio();
    } else {
        listasDeNumerosSorteados.push(numeroEscolhido);
        console.log(listasDeNumerosSorteados);
        return numeroEscolhido;
    }
}
function limparCampo() {
    chute = document.querySelector("input");
    chute.value = "";
}
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", "true");
}