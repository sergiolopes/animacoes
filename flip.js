var lista = document.querySelector('.lista');
var cartoes = Array.prototype.slice.call(document.querySelectorAll('.cartao'));

cartoes.forEach((cartao) => cartao.querySelector('button').addEventListener('click', cartaoOnClick));

function cartaoOnClick() {
    var cartao = this.parentElement;
    preparaAnimacao(cartao);
    requestAnimationFrame(disparaAnimacao);
    cartao.addEventListener('transitionend', aposAnimacao);
}

function preparaAnimacao(cartaoARemover) {
    // (opcional) corner case pra multiplas colunas
    var posCartaoARemover = cartaoARemover.getBoundingClientRect();
    var posLista = lista.getBoundingClientRect();
    cartaoARemover.style.top = posCartaoARemover.top - posLista.top + 'px';
    cartaoARemover.style.left = posCartaoARemover.left - posLista.left + 'px';

    // pega posicoes dos elementos antes e depois da modificação
    var posInicial = cartoes.map((cartao) => cartao.getBoundingClientRect());
    cartaoARemover.classList.add('remove');

    // aplica um transform pra colocar cada cartao de volta no lugar dele
    cartoes.forEach((cartao, i) => {
        var posFinal = cartao.getBoundingClientRect();
        var x = posInicial[i].left - posFinal.left;
        var y = posInicial[i].top - posFinal.top;
        cartao.style.transform = `translate(${x}px, ${y}px)`;
    });
}

function disparaAnimacao() {
    cartoes.forEach((cartao) => cartao.style.transform = '' );
    lista.classList.add('anima');
}

function aposAnimacao() {
    lista.classList.remove('anima');
    this.remove();
}