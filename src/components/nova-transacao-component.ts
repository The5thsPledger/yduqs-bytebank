import { TipoTransacao } from "../types/transacao/TipoTransacao.js";
import Transacao from "../Models/Transacao.js";
import ExtratoComponent from "./extrato-component.js";
import Titular from "../Models/Titular.js";

const elementoFormulario = document.querySelector(".block-nova-transacao form") as HTMLFormElement;

elementoFormulario.addEventListener("submit", function(event) {
    event.preventDefault();
    console.log("NovaTransacaoComponent: cadastrar!");

    const elementoSelect = elementoFormulario.querySelector("#tipoTransacao") as HTMLSelectElement;
    const elementoValorTransacao = elementoFormulario.querySelector("#valor") as HTMLInputElement;
    const elementoDataTransacao = document.querySelector("#data") as HTMLInputElement;
    let tipo : TipoTransacao;

    if (!elementoFormulario.checkValidity()) {
        alert("Todos os campos têm preenchimento obrigatório!");
        if (elementoSelect.selectedIndex == 0) {
            elementoSelect.focus();
            return false;
        }
        else if (elementoValorTransacao.value == "") {
            elementoValorTransacao.focus();
            return false;
        }
        else if (elementoDataTransacao.value == "") {
            elementoDataTransacao.focus();
            return false;
        }
    }
    else {
        if (elementoSelect.selectedOptions[0].value == "Depósito") {
            tipo = TipoTransacao.DEPOSITO;
        }
        else if (elementoSelect.selectedOptions[0].value == "Transferência") {
            tipo = TipoTransacao.TRANSFERENCIA;
        }
        else if (elementoSelect.selectedOptions[0].value == "Pagamento de Boleto") {
            tipo = TipoTransacao.PAGAMENTO_BOLETO;
        }
    }
    
    const transacao : Transacao = new Transacao(
        tipo, 
        parseFloat(elementoValorTransacao.value), 
        new Date(elementoDataTransacao.value)
    );
    console.log(transacao);
    ExtratoComponent.atualizar(transacao);
    elementoFormulario.reset();
});