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

    constructor (id? : number, nomeCompleto? : string, cpf? : number, dataNascimento? : Date) {
        this.id             = id;
        this.cpf            = cpf;
        this.dataNascimento = dataNascimento;
        this.nomeCompleto   = nomeCompleto;
    }
}

export default Titular;