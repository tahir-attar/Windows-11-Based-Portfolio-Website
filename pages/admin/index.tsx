import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const S = {
  page: {
    minHeight: '100vh',
    background: '#0d0d0d',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Poppins', sans-serif",
  } as React.CSSProperties,
  card: {
    background: '#1a1a1a',
    border: '1px solid #333',
    borderRadius: '12px',
    padding: '48px',
    width: '100%',
    maxWidth: '400px',
  } as React.CSSProperties,
  logo: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#fff',
    marginBottom: '8px',
  } as React.CSSProperties,
  logoAccent: { color: '#2bff88' } as React.CSSProperties,
  sub: {
    color: '#888',
    fontSize: '0.875rem',
    marginBottom: '32px',
  } as React.CSSProperties,
  label: {
    display: 'block',
    color: '#ccc',
    fontSize: '0.8rem',
    marginBottom: '8px',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
  } as React.CSSProperties,
  input: {
    width: '100%',
    background: '#252525',
    border: '1px solid #444',
    borderRadius: '8px',
    padding: '12px 16px',
    color: '#fff',
    fontSize: '1rem',
    outline: 'none',
    boxSizing: 'border-box' as const,
    marginBottom: '20px',
  } as React.CSSProperties,
  btn: {
    width: '100%',
    background: '#2bff88',
    color: '#000',
    border: 'none',
    borderRadius: '8px',
    padding: '14px',
    fontSize: '1rem',
    fontWeight: 700,
    cursor: 'pointer',
    letterSpacing: '1px',
  } as React.CSSProperties,
  error: {
    color: '#ff4d4d',
    fontSize: '0.85rem',
    marginBottom: '16px',
  } as React.CSSProperties,
};

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push('/admin/projects');
      } else {
        const data = await res.json();
        setError(data.error || 'Login failed');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Admin — Tahir Attar</title>
      </Head>
      <div style={S.page}>
        <div style={S.card}>
          <div style={S.logo}>
            <span style={S.logoAccent}>T</span>AHIR
          </div>
          <p style={S.sub}>Admin Panel · Sign in to continue</p>

          <form onSubmit={handleSubmit}>
            <label style={S.label}>Password</label>
            <input
              style={S.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              autoFocus
            />
            {error && <p style={S.error}>{error}</p>}
            <button style={S.btn} type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
