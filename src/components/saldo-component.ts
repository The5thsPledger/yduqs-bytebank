import { TipoTransacao } from "../types/transacao/TipoTransacao.js";
import { Transacao } from "../types/transacao/Transacao";

const elementoSaldo = document.querySelector(".saldo-valor .valor") as HTMLElement;
const elementoDataAcesso = document.querySelector(".block-saldo time") as HTMLElement;

const SaldoComponent = {
    atualizar(transacao: Transacao) {
        console.log("SaldoComponent: atualizar!")

        let saldo = elementoSaldo.innerHTML.split(" ");
        let saldoFloat = parseFloat(saldo[1].replace(".", "").replace(",", "."));
        if (saldo[0].startsWith("-")) {
            saldoFloat *= -1;
        }

        if (transacao.tipoTransacao == TipoTransacao.DEPOSITO) {
            saldoFloat += transacao.valor;
        }
        else if (
                transacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO 
            ||  transacao.tipoTransacao == TipoTransacao.TRANSFERENCIA
        ) {
            saldoFloat -= transacao.valor;
        }
        if (saldoFloat >= 0) {
            elementoSaldo.innerHTML = "R$ " + saldoFloat.toLocaleString("pt-br");
        }
        else {
            elementoSaldo.innerHTML = "-R$ " + saldoFloat.toLocaleString("pt-br");
        }
    }
}

export default SaldoComponent;