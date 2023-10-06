import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import {
  useAddContactMutation,
  useGetContactsQuery,
} from 'redux/API/contactsApi';
import Notiflix from 'notiflix';
import cl from './contactForm.module.css';

const ContactForm = () => {
  const [addContact] = useAddContactMutation();
  const { data: contacts } = useGetContactsQuery();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = event => {
    const { name, value } = event.currentTarget;
    name === 'name' ? setName(value) : setNumber(value);
  };

  const handleFormSubmit = evt => {
    evt.preventDefault();
    const contact = { id: nanoid(), name, number };
    const normalizedFind = name.toLocaleLowerCase();
    contacts.find(
      contact => contact.name.toLocaleLowerCase() === normalizedFind
    )
      ? Notiflix.Notify.warning(`${name} is already in contacts!`)
      : addContact(contact);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={cl.form} onSubmit={handleFormSubmit}>
      <label className={cl.inputItem}>
        Name <br />
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
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
          onChange={handleInputChange}
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
