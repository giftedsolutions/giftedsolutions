'use client';

import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';
import { auth, isAdminEmail } from '@/lib/firebase';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';
import { LogIn, AlertCircle, CheckCircle } from 'lucide-react';

/**
 * Admin Login Page
 * 
 * Handles authentication for admin users
 * Only whitelisted emails can access admin panel
 */
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const { user, isAdmin, setUser, setIsAdmin, setLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoadingState] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  useEffect(() => {
    // Check if already logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && isAdminEmail(user.email || '')) {
        setUser(user);
        setIsAdmin(true);
        setLoading(false);
        router.push('/admin/dashboard');
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router, setUser, setIsAdmin, setLoading]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoadingState(true);

    try {
      // Check if email is whitelisted
      if (!isAdminEmail(email)) {
        throw new Error('Access denied. You are not authorized as an admin.');
      }

      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setIsAdmin(true);
      
      // Redirect to dashboard
      router.push('/admin/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoadingState(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoadingState(true);

    try {
      // Check if email is whitelisted
      if (!isAdminEmail(email)) {
        throw new Error('This email is not authorized as an admin.');
      }

      // Send password reset email
      await sendPasswordResetEmail(auth, email);
      setSuccess(`Password reset email sent to ${email}. Please check your inbox.`);
      setShowResetPassword(false);
    } catch (err: any) {
      console.error('Password reset error:', err);
      setError(err.message || 'Failed to send password reset email.');
    } finally {
      setLoadingState(false);
    }
  };

  if (user && isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p>Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-primary rounded-full flex items-center justify-center">
            <LogIn className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Admin Login</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access the admin dashboard
          </p>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={showResetPassword ? handlePasswordReset : handleLogin}>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-600">{success}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#4b0082] focus:border-[#4b0082]"
                placeholder="peternondo1@gmail.com"
              />
            </div>

            {!showResetPassword && (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#4b0082] focus:border-[#4b0082]"
                  placeholder="••••••••"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#4b0082] hover:bg-[#3a0066] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4b0082] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (showResetPassword ? 'Sending...' : 'Signing in...') : (showResetPassword ? 'Send Reset Email' : 'Sign In')}
          </button>

          {/* Toggle Password Reset */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setShowResetPassword(!showResetPassword);
                setError('');
                setSuccess('');
              }}
              className="text-sm text-[#4b0082] hover:text-[#3a0066] font-medium"
            >
              {showResetPassword ? '← Back to Login' : 'Forgot Password?'}
            </button>
          </div>
        </form>

        <div className="text-center">
          <Link href="/" className="text-sm text-primary hover:text-primary-dark">
            ← Back to Store
          </Link>
        </div>
      </div>
    </div>
  );
}

