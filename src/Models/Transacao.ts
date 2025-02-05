import { TipoTransacao } from "../types/transacao/TipoTransacao.js";
import Titular from "./Titular.js";

class Transacao {
    private id              : number        = JSON.parse(localStorage.getItem("transacaoId"));
    public  tipoTransacao   : TipoTransacao = JSON.parse(localStorage.getItem("transacaoTipo"));
    public  valor           : number        = JSON.parse(localStorage.getItem("transacaoValor")) || 0;
    public  data            : Date          = JSON.parse(
        localStorage.getItem("transacaoData"), (key: string, value: string) => {
            if (key === "data") {
                return new Date(value);
            }
            return value;
        }
    ) || new Date();
    private titular         : Titular       = new Titular(JSON.parse(localStorage.getItem("titularId")));
    
    constructor(tipo : TipoTransacao, valor : number, dataTransacao : Date);

    constructor (tipo : TipoTransacao, valor : number, dataTransacao? : Date, id? : number) {
        this.id             = id//? id : this.getNextId();
        this.tipoTransacao  = tipo;
        this.data           = dataTransacao? dataTransacao : new Date();
        this.valor          = valor;
    }

    public getTransacoes() {
        return this;
    }

    getNextId(): number {
        throw new Error("Function not implemented.");
    }
}
export default Transacao;