import { ChangeEvent, useState, FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";

export default function Signin() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const [error, setError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const redirect = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    if (error) setError(false);
    if (message) setMessage('');

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
      setTimeout(() => redirect('/'), 2000)
    } catch (error) {
      setMessage(error.response.data);
      setError(true);
    }
  }

  return (
    <main className="Signin">
      <div className="form-div">
        <form onSubmit={handleSubmit} className="log-sign-form">
          <div className="input-div">
            <label htmlFor="name">Nome</label>
            {nameError && <p className="error-msg">Nome é obrigatório</p>}
            <input type="name" placeholder="Nome" name="name"
              value={name}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-div">
            <label htmlFor="email">Email</label>
            {emailError && <p className="error-msg">Email é obrigatório</p>}
            <input type="email" placeholder="email" name="email"
              value={email}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-div">
            <label htmlFor="password">Senha</label>
            {passwordError && <p className="error-msg">Senha é obrigatória</p>}
            <input type="password" placeholder="senha" name="password"
              value={password}
              onChange={handleInputChange} />
          </div>
          {!!message && <p className={`${error ? 'error-msg' : 'success-msg'} main-msg`}>{message}</p>}
          <button>Cadastrar</button>
        </form>
        <p className='form-msg'>Já tem cadastro? <Link to={'/'}>Clique aqui</Link></p>
      </div>
    </main>
  )
}
