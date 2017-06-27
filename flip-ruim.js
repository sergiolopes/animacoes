var lista = document.querySelector('.lista');
var cartoes = Array.prototype.slice.call(document.querySelectorAll('.cartao'));

cartoes.forEach((cartao) => cartao.querySelector('button').addEventListener('click', cartaoOnClick));

function cartaoOnClick() {
    var cartao = this.parentElement;
    cartao.classList.add('removeRuim');
    cartao.addEventListener('transitionend', aposAnimacao);
}

function aposAnimacao() {
    this.remove();
}