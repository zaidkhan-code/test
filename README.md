# Hammad Real Estate CRM

A complete CRM mini-application built with Vite, React, Chakra UI, Redux Toolkit, and LocalStorage.

## Features

### 🔐 Authentication

- Login page with email/password
- User session stored in LocalStorage
- Private routes with automatic redirect to login
- "Forgot Password" modal functionality

### 👥 Contacts Module

- Full CRUD operations (Create, Read, Update, Delete)
- Searchable contacts table with pagination
- Contact fields: name, email, phone, company
- Favorite contacts feature
- Skeleton loading states
- "No results" state for empty searches
- Add Contact modal
- Edit Contact modal (pre-filled with existing data)
- Delete confirmation modal
- All data persisted in LocalStorage

### 📊 Dashboard

- Stats cards showing:
  - Total contacts
  - Contacts added today
  - Favorite contacts count
  - Target achievement percentage
- Interactive line chart showing contact growth
- Online users status indicator
- Responsive card layout

### ⏱️ Activity Timeline

- Automatic activity tracking for:
  - Contact additions
  - Contact edits
  - Contact deletions
- Timeline view with timestamps
- Activity type indicators (color-coded)
- Complete history stored in LocalStorage

## Tech Stack

- **Frontend Framework**: React 18 with Vite
- **UI Library**: Chakra UI
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Charts**: Chart.js with react-chartjs-2
- **Storage**: LocalStorage for data persistence
- **Styling**: Chakra UI with custom gold theme

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Folder Structure

```
src/
├── components/
│   ├── Contacts/         # Contact-related modals
│   ├── Dashboard/        # Dashboard components
│   └── Layout/          # Layout components (Sidebar, Header)
├── hooks/               # Custom hooks
│   ├── useAuth.js
│   ├── useContacts.js
│   └── useLocalStorageState.js
├── pages/               # Page components
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Contacts.jsx
│   └── Timeline.jsx
├── store/               # Redux store & slices
│   ├── slices/
│   │   ├── authSlice.js
│   │   ├── contactsSlice.js
│   │   └── uiSlice.js
│   └── store.js
├── theme/               # Chakra UI theme
│   └── theme.js
└── App.tsx              # Main app component
```

## Usage

### Login

1. Navigate to `/login`
2. Enter any email and password
3. Click "SIGN IN" to access the dashboard

### Managing Contacts

1. Go to the Contacts page
2. Use the search bar to filter contacts
3. Click "Add Contact" to create new contacts
4. Use the action buttons to edit, delete, or favorite contacts
5. Navigate through pages using pagination controls

### Viewing Dashboard

- See real-time statistics about your contacts
- View contact growth chart
- Monitor today's activity

### Activity Timeline

- View complete history of all contact operations
- See timestamps and activity types
- Track changes over time

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy with default settings

Or use Vercel CLI:

```bash
npm install -g vercel
vercel
```

## LocalStorage Keys

- `crm_user`: User authentication data
- `crm_contacts`: All contact records
- `crm_activities`: Activity timeline events

## Features Implementation

### Redux Slices

- **authSlice**: Manages user authentication state
- **contactsSlice**: Handles contacts data and operations
- **uiSlice**: Controls UI state (modals, sidebar)

### Custom Hooks

- **useAuth**: Authentication logic and user management
- **useContacts**: Contact operations and derived state
- **useLocalStorageState**: Generic localStorage state management

### Private Routes

- Automatic redirect to login for unauthenticated users
- Preserved intended destination after login

### Color Mode

- Light/dark mode toggle
- System preference detection
- Persistent user preference

## Customization

### Theme Colors

Edit `src/theme/theme.js` to customize the gold color palette and other theme settings.

### Contact Fields

Modify the contact schema in `src/store/slices/contactsSlice.js` to add or remove fields.

### Chart Data

Update `src/components/Dashboard/ContactsChart.jsx` to customize chart appearance and data.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Lazy loading for chart components
- Optimized Redux selectors with useMemo
- Efficient pagination
- Skeleton loading states

## License

MIT

## Author
