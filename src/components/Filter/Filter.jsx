import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterChanges } from 'redux/filterSlice';
import cl from './filter.module.css';

const Filter = () => {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector(state => state.filter);

  const onChangeFilterValue = e => {
    dispatch(filterChanges(e.target.value));
  };
  return (
    <div className={cl.filter}>
      <h2>Contacts:</h2>
      <input
        onChange={onChangeFilterValue}
        value={searchQuery}
        placeholder="Find..."
      ></input>
    </div>
  );
};
export default Filter;
