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

export interface IUserContext {
    setToken: (arg0: string) => void,
    removeToken: () => void,
    token: string,
    user: IUser["user"],
    setUser: (arg0: IUser["user"] | null) => void,
    contacts: IContactArray,
    setContacts: (arg0: Array<IContact>) => void
}

export interface IContact {
    id: number;
    usuario_id: number;
    nome: string;
    email: string;
    telefone: string;
}

export type IContactArray = Array<IContact>
