import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';
import React from 'react';
import UserMenu from 'components/UserMenu';

const ContactPage = () => {
  return (
    <div>
      <UserMenu />
      <ContactForm />

      <Filter />
      <ContactList />
    </div>
  );
};

export default ContactPage;
