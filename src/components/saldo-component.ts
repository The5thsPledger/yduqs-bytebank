import Conta from "../Models/Conta.js";

const elementoSaldo = document.querySelector(".saldo-valor .valor") as HTMLElement;

renderizarSaldo(new Conta());

const SaldoComponent = {
    atualizar(conta: Conta) {
        console.log("SaldoComponent: atualizar!")
        renderizarSaldo(conta);
    }
}

export default SaldoComponent;

function renderizarSaldo(conta: Conta) {
    const saldo = conta.getSaldo();
    if (saldo >= 0) {
        elementoSaldo.innerHTML = "R$ " + saldo.toLocaleString("pt-br");
    }
    else {
        elementoSaldo.innerHTML = "-R$ " + saldo.toLocaleString("pt-br");
    }
}