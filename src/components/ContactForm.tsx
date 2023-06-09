import { ChangeEvent, useState, FormEvent } from "react"
import { api, apiAuthorizationHeaders } from "../services/api";
import useUser from "../hooks/useUser";
import { IContact } from "../interfaces";


export default function ContactForm({ data, closeModal }: { data: IContact, closeModal: VoidFunction }) {
  const edititing = data ? true : false;
  const [name, setName] = useState<string>(data?.nome || '');
  const [telephone, setTelephone] = useState<string>(data?.telefone || '');
  const [email, setEmail] = useState<string>(data?.email || '');

  const [nameError, setNameError] = useState<boolean>(false);
  const [telephoneError, setTelephoneError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const { token, contacts, setContacts } = useUser();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    switch (name) {
      case 'name':
        setName(value);
        if (nameError) setNameError(false);
        break;
      case 'telephone':
        setTelephone(value);
        if (telephoneError) setTelephoneError(false);
        break;
      case 'email':
        setEmail(value);
        if (emailError) setEmailError(false);
        break;
    }
    return
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name) setNameError(true);
    if (!telephone) setTelephoneError(true);
    if (!email) setEmailError(true);
    if (!name || !telephone || !email) return

    const credentials = { nome: name, telefone: telephone, email };
    const headers = apiAuthorizationHeaders(token);

    try {
      if (edititing) {
        const response = await api.put(`/contatos/${data.id}`, credentials, headers);

        const filteredContacts = contacts.filter((c: IContact) => c.id != data.id);
        setContacts([...filteredContacts, { ...data, ...credentials }]);

        setMessage('Contato atualizado com sucesso!');
      } else {
        const { data } = await api.post('/contatos', credentials, headers);

        setMessage('Contato cadastrado com sucesso!');
        const localContacts = [...contacts, ...data];
        setContacts(localContacts);

      }
    } catch (error) {
      console.log(error)
      setMessage(error.response.data)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome</label>
          {nameError && <p>Nome é obrigatório</p>}
          <input type="name" placeholder="Nome" name="name"
            value={name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="telephone">Telefone</label>
          {telephoneError && <p>Telefone é obrigatória</p>}
          <input type="tel-----" placeholder="Telefone" name="telephone"
            value={telephone}
            onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          {emailError && <p>Email é obrigatório</p>}
          <input type="email" placeholder="email" name="email"
            value={email}
            onChange={handleInputChange}
          />
        </div>
        {!!message && <p>{message}</p>}
        <button>{edititing ? 'Editar' : 'Cadastrar'}</button>
      </form >
      {edititing && <button onClick={() => closeModal()}>Fechar</button>}
    </>
  )
}
