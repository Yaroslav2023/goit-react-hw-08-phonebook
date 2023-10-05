import React, { useState } from 'react';
import cl from './contactForm.module.css';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/API/contactsApi';
import { nanoid } from 'nanoid';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();

  const handleSubmitForm = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const number = e.target.number.value;
    dispatch(addContact({ id: nanoid(), name, number }));
    setName('');
    setNumber('');
  };

  const handleChangeInput = ({ target }) => {
    const { name, value } = target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  return (
    <form className={cl.form} onSubmit={handleSubmitForm}>
      <label className={cl.inputItem}>
        Name <br />
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChangeInput}
          pattern="^[a-zA-Zа-яА-ЯІіЇїҐґ' \-\u0400-\u04FF]+$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={cl.inputItem}>
        Number
        <br />
        <input
          type="tel"
          name="number"
          value={number}
          onChange={handleChangeInput}
          pattern="^[+]?[0-9\\.\\-\\s]{1,15}$"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          placeholder="123-45-67"
          required
        />
      </label>
      <button type="submit" className={cl.btn}>
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
