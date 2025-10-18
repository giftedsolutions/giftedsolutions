'use client';

import { env } from '@/config/env';

/**
 * Footer Component
 * 
 * Business information and contact details
 */
export function Footer() {
  return (
    <footer className="bg-gray-100 p-6 mt-12">
      <div className="container mx-auto text-center text-sm text-gray-600">
        <p className="font-bold text-primary mb-2">{env.businessName}</p>
        <p>Location: {env.businessLocation}</p>
        <p>
          Contact (WhatsApp):{' '}
          <a
            href={`https://wa.me/${env.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {env.whatsappNumber}
          </a>
        </p>
        <p className="mt-3 text-xs">
          Countrywide delivery available. Electronics Projects & Consultation Services Offered.
        </p>
        <p className="mt-2 text-xs text-gray-500">
          &copy; {new Date().getFullYear()} {env.businessName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

