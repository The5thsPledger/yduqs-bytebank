import { TipoTransacao } from "../types/transacao/TipoTransacao.js";
import ExtratoComponent from "./extrato-component.js";
const elementoFormulario = document.querySelector(".block-nova-transacao form");
elementoFormulario.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("NovaTransacaoComponent: cadastrar!");
    const elementoSelect = elementoFormulario.querySelector("#tipoTransacao");
    const elementoValorTransacao = elementoFormulario.querySelector("#valor");
    const elementoDataTransacao = document.querySelector("#data");
    let tipo;
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
    const transacao = {
        tipoTransacao: tipo,
        valor: parseFloat(elementoValorTransacao.value),
        data: new Date(elementoDataTransacao.value)
    };
    console.log(transacao);
    ExtratoComponent.atualizar(transacao);
    elementoFormulario.reset();
});
