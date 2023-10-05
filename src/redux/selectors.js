export const selectContacts = state => {
  return {
    items: state.contacts.contacts.items,
    isLoading: state.contacts.contacts.isLoading,
    error: state.contacts.contacts.error,
  };
};

export const selectContactsItems = state => state.contacts.contacts;

export const selectFilterContacts = state => state.filter;
