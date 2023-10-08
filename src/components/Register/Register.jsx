import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLoginMutation, useRegisterMutation } from 'redux/auth';
import { setToken } from '../../redux/auth/authSlice';
import cl from './register.module.css';
import Notiflix from 'notiflix';

const INITIAL_STATE = {
  email: '',
  name: '',
  password: '',
};

const Register = () => {
  const [formData, setFormData] = useState({ ...INITIAL_STATE });
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (formData.email && formData.name && formData.password) {
      try {
        const response = await register(formData);

        if (response) {
          const { data } = await login({
            email: formData.email,
            password: formData.password,
          });
          dispatch(setToken(data.token));
          navigate('/');
        }
      } catch (error) {
        Notiflix.Notify.warning(
          `This user is already registered. Please Sign in to your account`
        );
      }
    }
    reset();
  };

  const reset = () => {
    setFormData(INITIAL_STATE);
  };

  return (
    <div className={cl.login}>
      <form onSubmit={handleSubmit} className={cl.form}>
        <h2 className={cl.text}>Sign up</h2>
        <label htmlFor="name">Name:</label>
        <input
          name="name"
          type="text"
          autoComplete="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Yaroslav"
        />

        <label htmlFor="email">Email:</label>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="123@test.ua"
        />

        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
          placeholder="password..."
        />

        <button type="submit">Sign up</button>
      </form>
      <p>Already have an account?</p>
      <div>
        <NavLink to="/login">Sign in</NavLink>
      </div>
    </div>
  );
};

export default Register;
