import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLoginMutation } from 'redux/auth';
import { setToken } from 'redux/auth/authSlice';
import cl from './login.module.css';
import Notiflix from 'notiflix';

const INITIAL_STATE = {
  email: '',
  password: '',
};

const Login = evt => {
  const [formData, setFormData] = useState({ ...evt });
  const [login] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const { data } = await login(formData);
      dispatch(setToken(data.token));
      navigate('/');
    } catch (error) {
      Notiflix.Notify.warning(`Invalid login or password`);
    }

    reset();
  };

  const reset = () => {
    setFormData(INITIAL_STATE);
  };

  return (
    <div className={cl.login}>
      <form onSubmit={handleSubmit} className={cl.form}>
        <h2 className={cl.text}>Sign in to your account</h2>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="123@test.ua"
          required
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
          placeholder="password..."
          required
        />
        <button type="submit">Sign in</button>
      </form>
      <p>Not a member?</p>
      <NavLink to="/register">Sign up</NavLink>
    </div>
  );
};
export default Login;
