import { useSelector, useDispatch } from 'react-redux';
import {
  addContact,
  updateContact,
  deleteContact,
  toggleFavorite,
  setSearchQuery,
  setCurrentPage,
} from '../store/slices/contactsSlice';
import { useMemo } from 'react';

export const useContacts = () => {
  const dispatch = useDispatch();
  const { contacts, searchQuery, currentPage, itemsPerPage, activities } = useSelector(
    (state) => state.contacts
  );

  const filteredContacts = useMemo(() => {
    if (!searchQuery) return contacts;
    const query = searchQuery.toLowerCase();
    return contacts.filter(
      (contact) =>
        contact.name?.toLowerCase().includes(query) ||
        contact.email?.toLowerCase().includes(query) ||
        contact.company?.toLowerCase().includes(query) ||
        contact.phone?.toLowerCase().includes(query)
    );
  }, [contacts, searchQuery]);

  const paginatedContacts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredContacts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredContacts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);

  const todayContacts = useMemo(() => {
    const today = new Date().toDateString();
    return contacts.filter(
      (c) => new Date(c.createdAt).toDateString() === today
    ).length;
  }, [contacts]);

  const favoriteContacts = useMemo(() => {
    return contacts.filter((c) => c.isFavorite).length;
  }, [contacts]);

  return {
    contacts,
    filteredContacts,
    paginatedContacts,
    searchQuery,
    currentPage,
    totalPages,
    itemsPerPage,
    activities,
    totalContacts: contacts.length,
    todayContacts,
    favoriteContacts,
    addContact: (contact) => dispatch(addContact(contact)),
    updateContact: (contact) => dispatch(updateContact(contact)),
    deleteContact: (id) => dispatch(deleteContact(id)),
    toggleFavorite: (id) => dispatch(toggleFavorite(id)),
    setSearchQuery: (query) => dispatch(setSearchQuery(query)),
    setCurrentPage: (page) => dispatch(setCurrentPage(page)),
  };
};
