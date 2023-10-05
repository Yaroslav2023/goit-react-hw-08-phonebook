import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
