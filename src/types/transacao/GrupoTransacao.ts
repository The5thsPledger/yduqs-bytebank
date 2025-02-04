import Transacao from "../../Models/Transacao.js";

export type GrupoTransacao = {
    label: string;
    transacoes: Transacao[];
}