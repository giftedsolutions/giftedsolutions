import { create } from 'zustand';
import { User } from 'firebase/auth';

/**
 * Auth Store
 * 
 * Global state management for authentication
 * Tracks current user and admin status
 */

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAdmin: false,
  loading: true,

  setUser: (user) => set({ user }),
  
  setIsAdmin: (isAdmin) => set({ isAdmin }),
  
  setLoading: (loading) => set({ loading }),
  
  logout: () => set({ user: null, isAdmin: false }),
}));

