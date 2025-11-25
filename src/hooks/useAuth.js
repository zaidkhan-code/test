import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogin = (credentials) => {
    // Simple authentication - in production, validate against backend
    const user = {
      email: credentials.email,
      name: 'Admin',
      id: '1',
    };
    dispatch(login(user));
    navigate('/dashboard');
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return {
    user,
    isAuthenticated,
    handleLogin,
    handleLogout,
  };
};
