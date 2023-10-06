import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLoginMutation } from 'redux/auth';
import { setToken } from 'redux/auth/authSlice';

const INITIAL_STATE = {
  email: '',
  password: '',
};

const Login = () => {
  const [formData, setFormData] = useState({ ...INITIAL_STATE });
  const [login] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const { data } = await login(formData);

    if (data) {
      dispatch(setToken(data.token));
      navigate('/');
    }

    reset();
  };

  const reset = () => {
    setFormData(INITIAL_STATE);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Sign in to your account</h2>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
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
