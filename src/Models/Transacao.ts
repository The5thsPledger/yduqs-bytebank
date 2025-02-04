import { TipoTransacao } from "../types/transacao/TipoTransacao.js";
import Titular from "./Titular.js";

class Transacao {
    private id              : number        = JSON.parse(localStorage.getItem("transacaoId"));
    private tipoTransacao   : TipoTransacao = JSON.parse(localStorage.getItem("transacaoTipo"));
    private valor           : number        = JSON.parse(localStorage.getItem("transacaoValor")) || 0;
    private data            : Date          = JSON.parse(
        localStorage.getItem("transacaoData"), (key: string, value: string) => {
            if (key === "data") {
                return new Date(value);
            }
            return value;
        }
    );
    private titular         : Titular       = new Titular(JSON.parse(localStorage.getItem("titularId")));
    
    public getTransacoes(id : number) {
        return this;
    }
}
export default Transacao;