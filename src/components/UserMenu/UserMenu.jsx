import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetCurrentUserQuery } from 'redux/auth';
import { logOut } from 'redux/auth/authSlice';
import cl from './userMenu.module.css';

function UserMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);
  const { data, isLoading } = useGetCurrentUserQuery(token);

  const handleLogOut = () => {
    dispatch(logOut());
    navigate('/login');
  };

  return (
    <div className={cl.item}>
      <h2 className={cl.text}>Phonebook</h2>
      <p className={cl.email}>
        Welcome {isLoading ? 'Your name ...' : <span>{data.email}</span>}
      </p>
      <button type="button" onClick={handleLogOut}>
        Logout
      </button>
    </div>
  );
}

export default UserMenu;
