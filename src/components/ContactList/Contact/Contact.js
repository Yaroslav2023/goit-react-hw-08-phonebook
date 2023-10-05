import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../../redux/API/contactsApi';
import { selectContacts } from 'redux/contactSlice';
import { selectFilterContacts } from 'redux/selectors';
import cl from './contact.module.css';

const Contact = () => {
  const { items, isLoading, error } = useSelector(selectContacts);
  const { filter } = useSelector(selectFilterContacts);
  const dispatch = useDispatch();

  const onDelete = id => dispatch(deleteContact(id));

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

  let arrayContacts = [];
  if (filter === '') {
    arrayContacts = items;
  } else {
    const normalizedFilter = filter.toLocaleLowerCase();
    arrayContacts = items.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  }

  return (
    <div>
      {arrayContacts.map(el => (
        <li key={el.id} className={cl.item}>
          {el.name} {el.number}
          <button
            className={cl.btn}
            name="delete"
            onClick={() => onDelete(el.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </div>
  );
};

export default Contact;
