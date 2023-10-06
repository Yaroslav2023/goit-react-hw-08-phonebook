import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLoginMutation, useRegisterMutation } from 'redux/auth';
import { setToken } from '../../redux/auth/authSlice';

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
      const response = await register(formData);

      if (response) {
        const { data } = await login({
          email: formData.email,
          password: formData.password,
        });
        dispatch(setToken(data.token));
        navigate('/');
      }
    }
    reset();
  };

  const reset = () => {
    setFormData(INITIAL_STATE);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        <div>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            autoComplete="name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>
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
