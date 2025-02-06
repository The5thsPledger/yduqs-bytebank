import { TipoTransacao } from "../types/transacao/TipoTransacao.js";
import Titular from "./Titular.js";

class Transacao {
    private tipoTransacao   : TipoTransacao = JSON.parse(localStorage.getItem("transacaoTipo"));
    private dataTransacao   : Date          = JSON.parse(
        localStorage.getItem("dataTransacao"), (key: string, value: string) => {
            if (key === "data") {
                return new Date(value);
            }
            return value;
        }
    ) || new Date();
    private valorTransacao  : number  = JSON.parse(localStorage.getItem("valorTransacao")) || 0;
    private titularOrigem   : Titular = new Titular(JSON.parse(localStorage.getItem("titularOrigem")));
    private titularDestino  : Titular = new Titular(JSON.parse(localStorage.getItem("titularDestino")));
    private id              : number  = JSON.parse(localStorage.getItem("transacaoId"));
    
    constructor(tipo : TipoTransacao, valor : number, dataTransacao : Date);
    
    constructor (
        tipo : TipoTransacao, valor : number, 
        dataTransacao? : Date, titularOrigem? : Titular, titularDestino? : Titular, id? : number
    ) {
        this.tipoTransacao  = tipo;
        this.valorTransacao = valor;
        this.dataTransacao  = dataTransacao? dataTransacao : new Date();
        this.titularOrigem  = titularOrigem;
        this.titularDestino = titularDestino;
        this.id             = id//? id : this.getNextId();
    }
    
    getTipoTransacao() {
        return this.tipoTransacao;
    }

    setTipoTransacao(tipoTransacao : TipoTransacao) {
        this.tipoTransacao = tipoTransacao;
    }

    public getDataTransacao() {
        return this.dataTransacao;
    }

    setDataTransacao(dataTransacao : Date) {
        this.dataTransacao = dataTransacao;
    }

    getValorTransacao() {
        return this.valorTransacao;
    }

    setValor(valor : number) {
        this.valorTransacao = valor;
    }

    getTitularOrigem() {
        return this.titularOrigem;
    }

    setTitularOrigem(titularOrigem : Titular) {
        this.titularOrigem = titularOrigem;
    }

    getTitularDestino() {
        return this.titularDestino;
    }

    setTitularDestino(titularDestino : Titular) {
        this.titularDestino = titularDestino;
    }

    public getTransacoes() {
        return this;
    }

    getNextId(): number {
        throw new Error("Function not implemented.");
    }
}
export default Transacao;