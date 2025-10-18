'use client';

import { useEffect, useState } from 'react';
import { auth, analytics } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import Link from 'next/link';

/**
 * Firebase Connection Test Page
 * Tests Firebase authentication and analytics initialization
 */
export default function FirebaseTestPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [firebaseStatus, setFirebaseStatus] = useState({
    auth: false,
    analytics: false,
    config: false,
  });

  useEffect(() => {
    // Check Firebase configuration
    setFirebaseStatus(prev => ({
      ...prev,
      config: !!auth && !!auth.app,
      auth: !!auth,
      analytics: typeof window !== 'undefined' && !!analytics,
    }));

    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            🔥 Firebase Connection Test
          </h1>

          <div className="space-y-6">
            {/* Firebase Status Section */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Connection Status
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatusCard
                  title="Configuration"
                  status={firebaseStatus.config}
                  description="Firebase app initialized"
                />
                <StatusCard
                  title="Authentication"
                  status={firebaseStatus.auth}
                  description="Auth module loaded"
                />
                <StatusCard
                  title="Analytics"
                  status={firebaseStatus.analytics}
                  description="Analytics enabled"
                />
              </div>
            </div>

            {/* Firebase Config Section */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Firebase Configuration
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <ConfigItem
                  label="Project ID"
                  value={auth.app.options.projectId || 'Not set'}
                />
                <ConfigItem
                  label="Auth Domain"
                  value={auth.app.options.authDomain || 'Not set'}
                />
                <ConfigItem
                  label="Storage Bucket"
                  value={auth.app.options.storageBucket || 'Not set'}
                />
                <ConfigItem
                  label="Messaging Sender ID"
                  value={auth.app.options.messagingSenderId || 'Not set'}
                />
                <ConfigItem
                  label="App ID"
                  value={auth.app.options.appId || 'Not set'}
                  masked
                />
              </div>
            </div>

            {/* Authentication Status Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Authentication Status
              </h2>
              {loading ? (
                <div className="flex items-center space-x-2 text-gray-600">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  <span>Checking authentication...</span>
                </div>
              ) : user ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-semibold mb-2">
                    ✓ User Authenticated
                  </p>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p>
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                      <strong>UID:</strong>{' '}
                      <span className="font-mono text-xs">{user.uid}</span>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800">
                    No user authenticated (this is normal for initial setup)
                  </p>
                </div>
              )}
            </div>

            {/* Success Message */}
            {firebaseStatus.config && firebaseStatus.auth && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                <p className="text-blue-800 font-semibold mb-2">
                  🎉 Firebase is Connected!
                </p>
                <p className="text-blue-700 text-sm">
                  Your application is successfully connected to Firebase. You can
                  now use Firebase Authentication, Analytics, and other services.
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-6 border-t flex gap-4">
            <Link
              href="/"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/admin"
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Admin Panel
            </Link>
          </div>
        </div>

        {/* Documentation Section */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            📚 Next Steps
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>
                <strong>Enable Authentication:</strong> Go to Firebase Console →
                Authentication → Sign-in method and enable Email/Password
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>
                <strong>Add Admin User:</strong> Create your admin account and add
                the email to NEXT_PUBLIC_ADMIN_EMAIL in .env.local
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>
                <strong>Configure Supabase:</strong> Add your Supabase credentials
                to .env.local
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>
                <strong>Deploy:</strong> Your app is ready to deploy to Vercel or
                your preferred hosting platform
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function StatusCard({
  title,
  status,
  description,
}: {
  title: string;
  status: boolean;
  description: string;
}) {
  return (
    <div
      className={`rounded-lg p-4 ${
        status
          ? 'bg-green-50 border border-green-200'
          : 'bg-red-50 border border-red-200'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <span className="text-2xl">{status ? '✓' : '✗'}</span>
      </div>
      <p
        className={`text-sm ${status ? 'text-green-700' : 'text-red-700'}`}
      >
        {description}
      </p>
    </div>
  );
}

function ConfigItem({
  label,
  value,
  masked = false,
}: {
  label: string;
  value: string;
  masked?: boolean;
}) {
  return (
    <div className="py-2 border-b border-gray-200 last:border-0">
      <span className="text-gray-600">{label}:</span>{' '}
      <span className="text-gray-900">
        {masked ? value.substring(0, 20) + '...' : value}
      </span>
    </div>
  );
}

