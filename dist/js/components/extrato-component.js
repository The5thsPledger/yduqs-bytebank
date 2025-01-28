import { Mes } from "../types/Mes.js";
import { TipoTransacao } from "../types/transacao/TipoTransacao.js";
import SaldoComponent from "./saldo-component.js";
const elementoRegistroTransacoesExtrato = document.querySelector(".extrato .registro-transacoes");
const ExtratoComponent = {
    atualizar(transacao) {
        console.log("ExtratoComponent: atualizar!");
        let tipo = document.createElement("span");
        tipo.className = "tipo";
        tipo.innerHTML = transacao.tipoTransacao;
        let valor = document.createElement("strong");
        valor.className = "valor";
        if (transacao.tipoTransacao == TipoTransacao.DEPOSITO) {
            valor.innerHTML = "R$ " + transacao.valor;
        }
        else if (transacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO
            || transacao.tipoTransacao == TipoTransacao.TRANSFERENCIA) {
            valor.innerHTML = "-R$ " + transacao.valor;
        }
        let divInfo = document.createElement("div");
        divInfo.className = "transacao-info";
        divInfo.appendChild(tipo);
        divInfo.appendChild(valor);
        let time = document.createElement("time");
        time.className = "data";
        time.innerHTML = transacao.data.getDate() + "/" + transacao.data.getMonth();
        let divItem = document.createElement("div");
        divItem.className = "transacao-item";
        divItem.appendChild(divInfo);
        divItem.appendChild(time);
        let mes = Mes[transacao.data.getMonth()];
        const itens = elementoRegistroTransacoesExtrato.children.length;
        let gravado = false;
        for (let i = 0; i < itens; i++) {
            let bloco = elementoRegistroTransacoesExtrato.children[i];
            if (bloco.children[0].innerHTML == mes) {
                bloco.appendChild(divItem);
                i = itens;
                gravado = true;
            }
        }
        if (!gravado) {
            let mesGroup = document.createElement("strong");
            mesGroup.className = "mes-group";
            mesGroup.innerHTML = mes;
            let group = document.createElement("div");
            group.className = "transacoes-group";
            group.appendChild(mesGroup);
            group.appendChild(divItem);
            elementoRegistroTransacoesExtrato.appendChild(group);
        }
        SaldoComponent.atualizar(transacao);
    }
};
export default ExtratoComponent;
