const { JSDOM } = require('jsdom');
const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const script = fs.readFileSync('script.js', 'utf8');

const dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
const { window } = dom;

window.eval(script);

const secret = window.secretNumber;
const input = window.document.getElementById('guessInput');
const button = window.document.getElementById('guessButton');
const message = window.document.getElementById('message');

if (!(secret >= 1 && secret <= 100)) {
  throw new Error(`Número secreto fora do intervalo: ${secret}`);
}

if (window.document.getElementById('attempts').textContent.trim() !== 'Tentativas restantes: 10') {
  throw new Error('Número inicial de tentativas incorreto');
}

input.value = '101';
button.click();

if (!message.textContent.includes('Digite um número válido')) {
  throw new Error('Validação de entrada falhou');
}

input.value = String(secret);
button.click();

if (!message.textContent.includes('Você acertou!')) {
  throw new Error('Acerto não foi reconhecido');
}

if (window.document.getElementById('attempts').textContent.trim() !== 'Tentativas restantes: 9') {
  throw new Error('Contador de tentativas após vitória na primeira tentativa incorreto');
}

console.log('VERIFICACAO_OK');
console.log(JSON.stringify({ secret, attempts: window.document.getElementById('attempts').textContent, message: message.textContent }));
