import { Link, useNavigate } from 'react-router-dom';
import { useState, FormEvent, ChangeEvent } from 'react';
import { api } from '../../services/api';
import useUser from '../../hooks/useUser';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const { setUser, setToken, user } = useUser();

  const redirect = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === 'email') {
      if (emailError) setEmailError(false);
      setEmail(value)
    } else if (name === 'password') {
      if (passwordError) setPasswordError(false);
      setPassword(value)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('')
    if (!email) setEmailError(true);
    if (!password) setPasswordError(true);
    if (!email || !password) return;

    const credentials = { email, senha: password };

    try {
      const { data } = await api.post('/login', credentials);
      const { token } = data;
      const { usuario } = data;
      setUser(usuario);
      setToken(token);
      return redirect("/home");
    } catch (error) {
      setErrorMsg(error.response.data);
    }
  }

  return (
    <main>
      <div>
        <form onSubmit={handleSubmit}>
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
            <input type="password" placeholder="password" name="password"
              value={password}
              onChange={handleInputChange} />
          </div>
          {!!errorMsg && <p>{errorMsg}</p>}
          <button>Login</button>
        </form>

        <p>Não tem cadastro? <Link to={'/home'}>Clique aqui</Link></p>
      </div>
    </main >
  )
}
