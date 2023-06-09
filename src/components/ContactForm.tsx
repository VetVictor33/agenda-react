import { ChangeEvent, useState, FormEvent, useEffect } from "react"
import { api, apiAuthorizationHeaders } from "../services/api";
import useUser from "../hooks/useUser";
import { IContact } from "../interfaces";


export default function ContactForm({ data, closeModal }: { data: IContact | null, closeModal: VoidFunction }) {
  const edititing = data ? true : false;
  const [name, setName] = useState<string>(data?.nome || '');
  const [telephone, setTelephone] = useState<string>(data?.telefone || '');
  const [email, setEmail] = useState<string>(data?.email || '');

  const [nameError, setNameError] = useState<boolean>(false);
  const [telephoneError, setTelephoneError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);

  const [error, setError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const { token, contacts, setContacts } = useUser();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    if (message) setMessage('');
    if (error) setError(false);

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
        await api.put(`/contatos/${data?.id}`, credentials, headers);

        const filteredContacts = contacts.filter((c: IContact) => c.id != data.id);
        setContacts([...filteredContacts, { ...data, ...credentials }]);

        setMessage('Contato atualizado com sucesso!');
      } else {
        const { data } = await api.post('/contatos', credentials, headers);

        setMessage('Contato cadastrado com sucesso!');
        const localContacts = [...contacts, ...data];
        setContacts(localContacts);
        setName('');
        setTelephone('');
        setEmail('');
      }
    } catch (error) {
      console.log(error)
      setMessage(error.response.data)
      setError(true);
    }
  }

  const handleModalClose = () => {
    if (message) setMessage('');
    if (error) setError(false);
    closeModal()
  }

  return (
    <div className="form-div">
      <form onSubmit={handleSubmit} className="log-sign-form">
        <p className="x-close-bt" onClick={handleModalClose}>X</p>
        <div className="input-div">
          <label htmlFor="name">Nome</label>
          {nameError && <p className="error-msg">Nome é obrigatório</p>}
          <input type="name" placeholder="Nome" name="name"
            value={name}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-div">
          <label htmlFor="telephone">Telefone</label>
          {telephoneError && <p className="error-msg">Telefone é obrigatória</p>}
          <input type="tel-----" placeholder="Telefone" name="telephone"
            value={telephone}
            onChange={handleInputChange} />
        </div>
        <div className="input-div">
          <label htmlFor="email">Email</label>
          {emailError && <p className="error-msg">Email é obrigatório</p>}
          <input type="email" placeholder="email" name="email"
            value={email}
            onChange={handleInputChange}
          />
        </div>
        {!!message && <p className={`${error ? 'error-msgn' : 'success-msg'} main-msg`}>{message}</p>}
        <button className={`${edititing ? 'edit-bt' : 'add-bt'}`}>
          {edititing ? 'Editar' : 'Cadastrar'}
        </button>
        <button className="close-bt" type="button" onClick={handleModalClose}>Fechar</button>
      </form >
    </div>
  )
}
