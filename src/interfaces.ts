export interface IUser {
    user: {
        id: number,
        nome: string,
        email: string
    },
    setUser: () => void,
    token: string,
    setToken: () => void
}

export interface IContact {
    id: number;
    usuario_id: number;
    nome: string;
    email: string;
    telefone: string;
}

export interface IContactArray extends Array<IContact> { }
