'use client';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          TrendWise
        </Link>
        
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <Link href="/admin" className="text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
              <button 
                onClick={() => signOut()}
                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link 
              href="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}