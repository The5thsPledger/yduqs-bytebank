class Titular {
    private id              : number    = JSON.parse(localStorage.getItem("titularId"));
    private nomeCompleto    : string    = JSON.parse(localStorage.getItem("titularNome"));
    private cpf             : number    = JSON.parse(localStorage.getItem("titularCpf")) || 0;
    private dataNascimento  : Date      = JSON.parse(
        localStorage.getItem("titularNascimento"), (key: string, value: string) => {
            if (key === "data") {
                return new Date(value);
            }
            return value;
        }
    );

    constructor (id : number) {
        let titular : Titular;
        titular.cpf = this.cpf;
        titular.dataNascimento = this.dataNascimento;
        titular.id = id;
        titular.nomeCompleto = this.nomeCompleto;

        return titular;
    }
}

export default Titular;