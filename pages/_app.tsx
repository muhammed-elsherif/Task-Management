"use client";
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
// import { UserProvider } from '@/contexts/UserContext';
import Navbar from '@/components/Navbar';
import '../src/app/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && router.pathname !== '/login' && router.pathname !== '/register') {
      router.push('/login');
    } else if (token && (router.pathname === '/' || router.pathname === '/login' || router.pathname === '/register')) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
