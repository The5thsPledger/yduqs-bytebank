import Conta from "../Models/Conta.js";
import { Mes } from "../types/Mes.js";
import { GrupoTransacao } from "../types/transacao/GrupoTransacao.js";
import { TipoTransacao } from "../types/transacao/TipoTransacao.js";
import Transacao from "../Models/Transacao.js";
import SaldoComponent from "./saldo-component.js";

const elementoRegistroTransacoesExtrato: HTMLElement = document.querySelector(".extrato .registro-transacoes");
const conta = new Conta();

renderizarExtrato();

function renderizarExtrato() {
    elementoRegistroTransacoesExtrato.innerHTML = "";
    const gruposTransacoes = conta.getGruposTransacoes();
    
    if (gruposTransacoes.length == 0) {
        const semTransacoes = document.createElement("p");
        semTransacoes.className = "semTransacoes";
        semTransacoes.innerHTML = "Sem transações!";

        elementoRegistroTransacoesExtrato.appendChild(semTransacoes);
    }
    else {
        buildExtrato(gruposTransacoes);
    }
}

const ExtratoComponent = {
    atualizar(transacao: Transacao): void {
        console.log("ExtratoComponent: atualizar!");
        conta.registrarTransacao(transacao);
        renderizarExtrato();
        SaldoComponent.atualizar(conta);
    }
}

function buildExtrato(gruposTransacoes: GrupoTransacao[]) {
    let labelAno = "";
    for (let grupo of gruposTransacoes) {
        let labelMes = "";
        let divGrupo : HTMLDivElement;
        if (labelAno == grupo.label) {
            divGrupo = document.querySelector("#grupo" + grupo.label)
        }
        else {
            divGrupo = buildDivGrupo(grupo.label);
            elementoRegistroTransacoesExtrato.appendChild(divGrupo)
            labelAno = grupo.label;
        }

        let divPeriodo : HTMLDivElement;
        for (let transacao of grupo.transacoes) {
            let mes = Mes[transacao.data.getMonth()]
            if (labelMes != mes) {
                divPeriodo = buildDivPeriodo(mes);
                divGrupo.appendChild(divPeriodo)
                labelMes = mes
            }
            let divItem : HTMLDivElement = buildDivItem(transacao);
            divPeriodo.appendChild(divItem);
        }
        divGrupo.appendChild(divPeriodo);
    }
}

function buildDivGrupo(label: string): HTMLDivElement {
    let anoGrupo : HTMLElement = document.createElement("strong");
    anoGrupo.className = "ano-grupo";
    anoGrupo.innerHTML = label;

    let grupo : HTMLDivElement = document.createElement("div");
    grupo.className = "transacoes-grupo";

    grupo.appendChild(anoGrupo);
    return grupo;
}

function buildDivPeriodo(mes : string) : HTMLDivElement {
    let mesGrupo : HTMLElement = document.createElement("strong");
    mesGrupo.className = "mes-grupo";
    mesGrupo.innerHTML = mes;

    let transacaoPeriodo : HTMLDivElement = document.createElement("div");
    transacaoPeriodo.className = "transacao-periodo";

    transacaoPeriodo.appendChild(mesGrupo);
    return transacaoPeriodo;
}


function buildDivItem(transacao : Transacao): HTMLDivElement {
    let tipo : HTMLSpanElement = document.createElement("span");
    tipo.className = "tipo";
    tipo.innerHTML = transacao.tipoTransacao;
    
    let valor : HTMLElement = document.createElement("strong");
    valor.className = "valor";
    if (transacao.tipoTransacao == TipoTransacao.DEPOSITO) {
        valor.innerHTML = " R$ " + transacao.valor;
    }
    else if (
        transacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO 
        ||  transacao.tipoTransacao == TipoTransacao.TRANSFERENCIA
    ) {
        valor.innerHTML = " -R$ " + transacao.valor * -1;
    }
    
    let divInfo : HTMLDivElement = document.createElement("div");
    divInfo.className = "transacao-info";
    divInfo.appendChild(tipo)
    divInfo.appendChild(valor)
    
    let time : HTMLTimeElement = document.createElement("time");
    time.className = "data";
    time.innerHTML = 
                transacao.data.getDate().toString().padStart(2, "0") 
        + "/" + (transacao.data.getMonth() + 1).toString().padStart(2, "0");
    
    let divItem = document.createElement("div");
    divItem.className = "transacao-item";
    divItem.appendChild(divInfo)
    divItem.appendChild(time)
    return divItem;
}

export default ExtratoComponent;