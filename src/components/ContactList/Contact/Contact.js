import { useSelector } from 'react-redux';
import {
  useDeleteContactMutation,
  useGetContactsQuery,
} from 'redux/API/contactsApi';
import cl from './contact.module.css';

const Contact = () => {
  const token = useSelector(state => state.auth.token);
  const { data: contacts, isLoading, error } = useGetContactsQuery(token);
  const { filter } = useSelector(state => state.filter);
  const [deleteContact] = useDeleteContactMutation();

  if (isLoading && !error) {
    return (
      <div>
        <p>Load...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Ooops!!! Something went wrong!</p>
        <p>Error:{error}</p>
      </div>
    );
  }

  const getFilteredContacts = () => {
    return (contacts || []).filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <>
      {filteredContacts.map(({ id, name, number }) => (
        <li key={id} className={cl.item}>
          {name}: {number}
          <button
            className={cl.btn}
            type="button"
            onClick={() => deleteContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </>
  );
};

export default Contact;
