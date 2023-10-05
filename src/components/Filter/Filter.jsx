import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterChanges } from 'redux/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector(state => state.filter);

  const onChangeFilterValue = e => {
    dispatch(filterChanges(e.target.value));
  };
  return (
    <div>
      <input onChange={onChangeFilterValue} value={searchQuery}></input>
    </div>
  );
};
export default Filter;
