import { ChangeEvent, useState, FormEvent } from "react"
import { Link } from "react-router-dom";
import { api } from "../../services/api";

export default function Signin() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    switch (name) {
      case 'name':
        setName(value);
        if (nameError) setNameError(false);
        break;
      case 'email':
        setEmail(value);
        if (emailError) setEmailError(false);
        break;
      case 'password':
        setPassword(value);
        if (passwordError) setPasswordError(false);
        break;
    }
    return
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name) setNameError(true);
    if (!email) setEmailError(true);
    if (!password) setPasswordError(true);
    if (!name || !email || !password) return

    const credentials = { nome: name, email, senha: password };

    try {
      await api.post('/usuarios', credentials);
      setMessage('Cadastro realizado com sucesso!');
    } catch (error) {
      setMessage(error.response.data)
    }
  }

  return (
    <main>
      <div>
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
            <label htmlFor="email">Email</label>
            {emailError && <p>Email é obrigatório</p>}
            <input type="email" placeholder="email" name="email"
              value={email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="password">Senha</label>
            {passwordError && <p>Senha é obrigatória</p>}
            <input type="password" placeholder="senha" name="password"
              value={password}
              onChange={handleInputChange} />
          </div>
          {!!message && <p>{message}</p>}
          <button>Cadastrar</button>
        </form>

        <p>Já tem cadastro? <Link to={'/'}>Clique aqui</Link></p>
      </div>
    </main>
  )
}
