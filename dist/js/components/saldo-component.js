import { TipoTransacao } from "../types/transacao/TipoTransacao.js";
const elementoSaldo = document.querySelector(".saldo-valor .valor");
const elementoDataAcesso = document.querySelector(".block-saldo time");
const SaldoComponent = {
    atualizar(transacao) {
        console.log("SaldoComponent: atualizar!");
        let saldo = elementoSaldo.innerHTML.split(" ");
        let saldoFloat = parseFloat(saldo[1].replace(".", "").replace(",", "."));
        if (saldo[0].startsWith("-")) {
            saldoFloat *= -1;
        }
        if (transacao.tipoTransacao == TipoTransacao.DEPOSITO) {
            saldoFloat += transacao.valor;
        }
        else if (transacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO
            || transacao.tipoTransacao == TipoTransacao.TRANSFERENCIA) {
            saldoFloat -= transacao.valor;
        }
        if (saldoFloat >= 0) {
            elementoSaldo.innerHTML = "R$ " + saldoFloat.toLocaleString("pt-br");
        }
        else {
            elementoSaldo.innerHTML = "-R$ " + saldoFloat.toLocaleString("pt-br");
        }
    }
};
export default SaldoComponent;
