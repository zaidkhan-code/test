import { createSlice } from '@reduxjs/toolkit';

const loadContacts = () => {
  const stored = localStorage.getItem('crm_contacts');
  return stored ? JSON.parse(stored) : [];
};

const loadActivities = () => {
  const stored = localStorage.getItem('crm_activities');
  return stored ? JSON.parse(stored) : [];
};

const initialState = {
  contacts: loadContacts(),
  activities: loadActivities(),
  searchQuery: '',
  currentPage: 1,
  itemsPerPage: 10,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action) => {
      const newContact = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        isFavorite: false,
      };
      state.contacts.unshift(newContact);
      localStorage.setItem('crm_contacts', JSON.stringify(state.contacts));
      
      // Add activity
      const activity = {
        id: Date.now().toString(),
        type: 'add',
        contactName: newContact.name,
        timestamp: new Date().toISOString(),
      };
      state.activities.unshift(activity);
      localStorage.setItem('crm_activities', JSON.stringify(state.activities));
    },
    updateContact: (state, action) => {
      const index = state.contacts.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.contacts[index] = { ...state.contacts[index], ...action.payload };
        localStorage.setItem('crm_contacts', JSON.stringify(state.contacts));
        
        // Add activity
        const activity = {
          id: Date.now().toString(),
          type: 'edit',
          contactName: state.contacts[index].name,
          timestamp: new Date().toISOString(),
        };
        state.activities.unshift(activity);
        localStorage.setItem('crm_activities', JSON.stringify(state.activities));
      }
    },
    deleteContact: (state, action) => {
      const contact = state.contacts.find(c => c.id === action.payload);
      state.contacts = state.contacts.filter(c => c.id !== action.payload);
      localStorage.setItem('crm_contacts', JSON.stringify(state.contacts));
      
      // Add activity
      if (contact) {
        const activity = {
          id: Date.now().toString(),
          type: 'delete',
          contactName: contact.name,
          timestamp: new Date().toISOString(),
        };
        state.activities.unshift(activity);
        localStorage.setItem('crm_activities', JSON.stringify(state.activities));
      }
    },
    toggleFavorite: (state, action) => {
      const contact = state.contacts.find(c => c.id === action.payload);
      if (contact) {
        contact.isFavorite = !contact.isFavorite;
        localStorage.setItem('crm_contacts', JSON.stringify(state.contacts));
      }
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  addContact,
  updateContact,
  deleteContact,
  toggleFavorite,
  setSearchQuery,
  setCurrentPage,
} = contactsSlice.actions;

export default contactsSlice.reducer;
