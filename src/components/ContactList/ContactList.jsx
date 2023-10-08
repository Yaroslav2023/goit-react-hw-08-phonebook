import React from 'react';
import Contact from './Contact';
import cl from './contactList.module.css';

const ContactList = () => {
  return (
    <div className={cl.contacts}>
      <ul>
        <Contact />
      </ul>
    </div>
  );
};

export default ContactList;
