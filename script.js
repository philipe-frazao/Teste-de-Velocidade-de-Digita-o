/*DARK_LIGHT*/
let trilho = document.getElementById("trilho");
let body = document.querySelector("body");
let main = document.getElementById("container");
let result = document.getElementById("result");

trilho.addEventListener("click", () => {
    trilho.classList.toggle("dark");
    body.classList.toggle("dark");
    main.classList.toggle("dark");
    result.classList.toggle("dark");
});

/*FUNCIONALIDADE*/

let text = document.querySelector("#text");
const entrada = document.querySelector("#entrada");
const reset = document.querySelector("#reset");
const storage = document.querySelector("#storage");

const phrases = [
    "As estrelas são faróis no céu noturno.",
    "Planetas orbitam ao redor do sol.",
    "Galáxias formam tapeçarias cósmicas.",
    "Buracos negros desafiam a gravidade.",
    "Cometas são viajantes solitários.",
    "A lua ilumina as noites escuras.",
    "Marte é o planeta vermelho.",
    "Saturno ostenta seus anéis majestosos.",
    "O sol é uma estrela em chamas.",
    "Astronomia desvenda os mistérios do universo."
];

function random_text() {
    const index = Math.floor(Math.random() * phrases.length);
    text.textContent = phrases[index];
}

function atualizarteste() {
    iniciar();

    if (entrada.value === text.textContent) {
        verificar();
    }
}

function iniciar() {
    let statusDoTeste = JSON.parse(localStorage.getItem("testeEmAndamento"));

    if (!statusDoTeste) {
        localStorage.setItem("tempoInicial", new Date().getTime());
        localStorage.setItem("testeEmAndamento", true);
    }
}

function verificar() {
    const tempoFinal = new Date().getTime();
    const tempoInicial = parseInt(localStorage.getItem("tempoInicial"));
    const tempoGasto = (tempoFinal - tempoInicial) / 1000;

    result.textContent = `Parabéns! Você levou ${tempoGasto} segundos!`;

    adicionarAoHistorico(text.textContent, tempoGasto);

    localStorage.setItem("testeEmAndamento", false);
    entrada.value = "";
    random_text();
}

function adicionarAoHistorico(textoDigitado, tempoGasto) {
    const itemHistorico = document.createElement("p");

    itemHistorico.textContent = `Texto "${textoDigitado}" - Tempo: ${tempoGasto}`;

    storage.appendChild(itemHistorico);
}

function reiniciarTeste() {
    entrada.value = "";
    result.textContent = "";
    random_text(); // Corrigindo chamada para a função random_text()
    localStorage.setItem("testeEmAndamento", false);
    storage.innerHTML = "";
}

entrada.addEventListener("keyup", atualizarteste);
reset.addEventListener("click", reiniciarTeste); // Corrigindo o nome do evento de clique para 'addEventListener'

random_text();
