import Conta from "../Models/Conta.js";
import { Mes } from "../types/Mes.js";
import { GrupoTransacao } from "../types/transacao/GrupoTransacao.js";
import { TipoTransacao } from "../types/transacao/TipoTransacao.js";
import Transacao from "../Models/Transacao.js";
import SaldoComponent from "./saldo-component.js";

const elementoRegistroTransacoesExtrato: HTMLElement = document.querySelector(".extrato .registro-transacoes");

renderizarExtrato();

function renderizarExtrato() {
    elementoRegistroTransacoesExtrato.innerHTML = "";
    const conta = new Conta();
    const gruposTransacoes = conta.getGruposTransacoes();
    
    if (gruposTransacoes.length == 0) {
        const semTransacoes = document.createElement("p");
        semTransacoes.className = "semTransacoes";
        semTransacoes.innerHTML = "Sem transações!";

        elementoRegistroTransacoesExtrato.appendChild(semTransacoes);
    }
    else {
        gruposTransacoes.sort((a, b) => a.transacoes.data );

    }
}

const ExtratoComponent = {
    atualizar(transacao: Transacao): void {
        console.log("ExtratoComponent: atualizar!");
        
        let tipo : HTMLSpanElement = document.createElement("span");
        tipo.className = "tipo";
        tipo.innerHTML = transacao.tipoTransacao;

        let valor : HTMLElement = document.createElement("strong");
        valor.className = "valor";
        if (transacao.tipoTransacao == TipoTransacao.DEPOSITO) {
            valor.innerHTML = "R$ " + transacao.valor;
        }
        else if (
                transacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO 
            ||  transacao.tipoTransacao == TipoTransacao.TRANSFERENCIA
        ) {
            valor.innerHTML = "-R$ " + transacao.valor;
        }

        let divInfo : HTMLDivElement = document.createElement("div");
        divInfo.className = "transacao-info";
        divInfo.appendChild(tipo)
        divInfo.appendChild(valor)

        let time : HTMLTimeElement = document.createElement("time");
        time.className = "data";
        time.innerHTML = transacao.data.getDate() + "/" + transacao.data.getMonth();
        
        let divItem : HTMLDivElement = document.createElement("div");
        divItem.className = "transacao-item";
        divItem.appendChild(divInfo)
        divItem.appendChild(time)

        let ano = transacao.data.getFullYear();
        let mes = Mes[transacao.data.getMonth()];
        const itens = elementoRegistroTransacoesExtrato.children.length;
        let appended = false;

        // WIP - Criar anos novos e desordenados
        for (let i = 0; i < itens; i++) {
            let blocoAno = elementoRegistroTransacoesExtrato.children[i];
            if (blocoAno.children[0].innerHTML == ano.toString()) {
                let anos = blocoAno.children[i].children.length;
                for (let j = 0; j < anos; j++) {
                    let blocoMes = blocoAno.children[i].children[j];

                    if (blocoMes.children[0].innerHTML == mes) {
                        blocoMes.appendChild(divItem);
                        i = itens;
                        j = anos;
                        appended = true;
                    }
                }
            }
        }

        if (!appended) {
            let mesGroup : HTMLElement = document.createElement("strong");
            mesGroup.className = "mes-group";
            mesGroup.innerHTML = mes;
            
            let group : HTMLDivElement = document.createElement("div");
            group.className = "transacoes-group";
            group.appendChild(mesGroup)
            group.appendChild(divItem)

            elementoRegistroTransacoesExtrato.appendChild(group);
        }

        SaldoComponent.atualizar(transacao);
    }
}

export default ExtratoComponent;