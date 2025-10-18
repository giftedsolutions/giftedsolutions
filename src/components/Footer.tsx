'use client';

import { env } from '@/config/env';

/**
 * Footer Component
 * 
 * Business information and contact details
 */
export function Footer() {
  return (
    <footer className="bg-[#4b0082] p-6 mt-8 text-center">
      <p className="text-sm text-gray-200">
        Countrywide delivery available. FREE delivery up to K50 (T&Cs apply).
      </p>
      <p className="text-xs text-gray-400 mt-2">
        Website: <a href="https://giftedsolutions-53124.web.app/" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">giftedsolutions-53124.web.app</a>
      </p>
    </footer>
  );
}

