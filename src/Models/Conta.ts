import Transacao from "./Transacao.js";
import { TipoTransacao } from "../types/transacao/TipoTransacao.js";
import { GrupoTransacao } from "../types/transacao/GrupoTransacao.js";
import Titular from "./Titular.js";

class Conta {
    private titular             : Titular   = JSON.parse(localStorage.getItem("titular"));
    private dataAbertura        : Date      = JSON.parse(localStorage.getItem("dataAbertura"))  || new Date();
    private dataAcesso          : Date      = JSON.parse(localStorage.getItem("dataAcesso"))    || new Date();
    private dataEncerramento    : Date      = JSON.parse(localStorage.getItem("dataEncerramento"));
    private saldo               : number    = JSON.parse(localStorage.getItem("saldo"))     || 0;
    private limite              : number    = JSON.parse(localStorage.getItem("limite"))    || 0;
    private transacoes: Transacao[] = JSON.parse(localStorage.getItem("transacoes"), (key: string, value: string) => {
        if (key === "data") {
            return new Date(value);
        }
        return value;
    }).map(
        (data: { 
            tipoTransacao: TipoTransacao; valorTransacao: number; data: Date;
        }) => new Transacao(data.tipoTransacao, data.valorTransacao, data.data)
    ) || [];

    getTitular() {
        return this.titular;
    }

    setTitular(titular : Titular) {
        this.titular = titular;
    }

    getDataAbertura() {
        return this.dataAbertura;
    }

    setDataAbertura(dataAbertura? : Date) {
        this.dataAbertura = dataAbertura? dataAbertura : new Date();
    }

    getDataAcesso(): Date {
        return this.dataAcesso;
    };

    setDataAcesso(dataAcesso? : Date) {
        this.dataAcesso = dataAcesso? dataAcesso : new Date();
    }
    
    getDataEncerramento() {
        return this.dataEncerramento;
    }

    setDataEncerramento(dataEncerramento? : Date) {
        this.dataEncerramento = dataEncerramento? dataEncerramento : new Date();
    }

    getSaldo() {
        return this.saldo;
    };

    setSaldo(saldo : number) {
        this.saldo = saldo;
    }

    getLimite() {
        return this.limite;
    }

    setLimite(limite : number) {
        this.limite = limite;
    }

    getGruposTransacoes(): GrupoTransacao[] {
        const gruposTransacoes: GrupoTransacao[] = [];
        const listaTransacoes: Transacao[] = this.transacoes;
        console.log(listaTransacoes)
        const transacoesOrdenadas: Transacao[] = 
            listaTransacoes.sort((t1, t2) => t2.getDataTransacao().getTime() - t1.getDataTransacao().getTime());
        let labelAtualGrupoTransacao: string = "";

        for (let transacao of transacoesOrdenadas) {
            let labelGrupoTransacao: string = transacao.getDataTransacao().toLocaleDateString("pt-br", { year: "numeric" });
            if (labelAtualGrupoTransacao !== labelGrupoTransacao) {
                labelAtualGrupoTransacao = labelGrupoTransacao;
                gruposTransacoes.push({
                    label: labelGrupoTransacao,
                    transacoes: []
                });
            }
            gruposTransacoes.at(-1).transacoes.push(transacao);
        }

        return gruposTransacoes;
    };

    registrarTransacao(novaTransacao: Transacao): void {
        let tipoTransacao   = novaTransacao.getTipoTransacao();
        let valorTransacao  = novaTransacao.getValorTransacao();
        if (tipoTransacao == TipoTransacao.DEPOSITO) {
            this.depositar(valorTransacao);
        } 
        else if (tipoTransacao == TipoTransacao.TRANSFERENCIA || tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
            this.debitar(valorTransacao);
        } 
        else {
            throw new Error("Tipo de Transação é inválido!");
        }

        this.transacoes.push(novaTransacao);
        console.log(this.getGruposTransacoes());
        localStorage.setItem("transacoes", JSON.stringify(this.transacoes));
    };
    
    debitar(valor: number): void {
        if (valor <= 0) {
            throw new Error("O valor a ser debitado deve ser maior que zero!");
        }
        if (valor > this.saldo) {
            alert("Saldo insuficiente!");
            return;
        }
    
        this.saldo -= valor;
        localStorage.setItem("saldo", this.saldo.toString());
    }
    
    depositar(valor: number): void {
        if (valor <= 0) {
            throw new Error("O valor a ser depositado deve ser maior que zero!");
        }
    
        this.saldo += valor;
        localStorage.setItem("saldo", this.saldo.toString());
    }
}

export default Conta;