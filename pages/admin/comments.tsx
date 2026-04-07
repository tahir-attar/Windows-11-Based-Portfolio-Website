import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const S = {
  page: {
    minHeight: '100vh',
    background: '#0d0d0d',
    fontFamily: "'Poppins', sans-serif",
    color: '#fff',
  } as React.CSSProperties,
  header: {
    background: '#111',
    borderBottom: '1px solid #222',
    padding: '16px 32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    flexWrap: 'wrap' as const,
  } as React.CSSProperties,
  logo: { fontSize: '1.4rem', fontWeight: 700 } as React.CSSProperties,
  logoAccent: { color: '#2bff88' } as React.CSSProperties,
  nav: {
    display: 'flex',
    gap: '8px',
    rowGap: '8px',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    width: '100%',
    overflowX: 'auto' as const,
    paddingBottom: '4px',
  } as React.CSSProperties,
  navBtn: (active: boolean) =>
    ({
      background: active ? '#2bff88' : '#252525',
      color: active ? '#000' : '#fff',
      border: '1px solid #333',
      borderRadius: '6px',
      padding: '8px 14px',
      cursor: 'pointer',
      fontWeight: active ? 700 : 400,
      fontSize: '0.82rem',
      whiteSpace: 'nowrap' as const,
      flex: '0 0 auto',
    } as React.CSSProperties),
  logoutBtn: {
    background: 'transparent',
    color: '#888',
    border: '1px solid #333',
    borderRadius: '6px',
    padding: '8px 14px',
    cursor: 'pointer',
    fontSize: '0.82rem',
    whiteSpace: 'nowrap' as const,
    flex: '0 0 auto',
  } as React.CSSProperties,
  content: { padding: '32px' } as React.CSSProperties,
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    marginBottom: '8px',
  } as React.CSSProperties,
  sectionSub: {
    color: '#888',
    fontSize: '0.875rem',
    marginBottom: '24px',
  } as React.CSSProperties,
  filters: {
    display: 'flex',
    gap: '10px',
    marginBottom: '24px',
    flexWrap: 'wrap' as const,
  } as React.CSSProperties,
  filterBtn: (active: boolean) =>
    ({
      background: active ? '#2bff88' : '#1a1a1a',
      color: active ? '#000' : '#aaa',
      border: `1px solid ${active ? '#2bff88' : '#333'}`,
      borderRadius: '6px',
      padding: '7px 16px',
      cursor: 'pointer',
      fontSize: '0.8rem',
      fontWeight: active ? 700 : 400,
    } as React.CSSProperties),
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    background: '#1a1a1a',
    borderRadius: '12px',
    overflow: 'hidden',
  } as React.CSSProperties,
  th: {
    background: '#111',
    padding: '14px 16px',
    textAlign: 'left' as const,
    fontSize: '0.75rem',
    color: '#666',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    borderBottom: '1px solid #222',
  } as React.CSSProperties,
  td: {
    padding: '14px 16px',
    borderBottom: '1px solid #1e1e1e',
    fontSize: '0.875rem',
    verticalAlign: 'top' as const,
  } as React.CSSProperties,
  author: { fontWeight: 600, color: '#fff' } as React.CSSProperties,
  commentText: { color: '#aaa', lineHeight: 1.5 } as React.CSSProperties,
  badge: (approved: boolean) =>
    ({
      display: 'inline-block',
      background: approved ? 'rgba(43,255,136,0.15)' : 'rgba(255,77,77,0.15)',
      color: approved ? '#2bff88' : '#ff4d4d',
      border: `1px solid ${approved ? '#2bff88' : '#ff4d4d'}`,
      borderRadius: '4px',
      padding: '2px 8px',
      fontSize: '0.7rem',
      fontWeight: 600,
    } as React.CSSProperties),
  actions: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  } as React.CSSProperties,
  approveBtn: {
    background: 'rgba(43,255,136,0.1)',
    color: '#2bff88',
    border: '1px solid #2bff88',
    borderRadius: '6px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '0.75rem',
  } as React.CSSProperties,
  rejectBtn: {
    background: 'rgba(255,77,77,0.1)',
    color: '#ff4d4d',
    border: '1px solid #ff4d4d',
    borderRadius: '6px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '0.75rem',
  } as React.CSSProperties,
  deleteBtn: {
    background: 'transparent',
    color: '#555',
    border: '1px solid #333',
    borderRadius: '6px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '0.75rem',
  } as React.CSSProperties,
  empty: {
    textAlign: 'center' as const,
    padding: '80px 20px',
    color: '#555',
  } as React.CSSProperties,
  loading: {
    textAlign: 'center' as const,
    padding: '80px 20px',
    color: '#555',
  } as React.CSSProperties,
  date: { color: '#555', fontSize: '0.75rem' } as React.CSSProperties,
  genderBadge: {
    display: 'inline-block',
    background: '#252525',
    color: '#888',
    borderRadius: '4px',
    padding: '2px 6px',
    fontSize: '0.7rem',
    marginLeft: '6px',
  } as React.CSSProperties,
  stats: {
    display: 'flex',
    gap: '16px',
    marginBottom: '24px',
    flexWrap: 'wrap' as const,
  } as React.CSSProperties,
  stat: {
    background: '#1a1a1a',
    border: '1px solid #2a2a2a',
    borderRadius: '10px',
    padding: '16px 24px',
    flex: '0 0 auto',
  } as React.CSSProperties,
  statNum: {
    fontSize: '1.8rem',
    fontWeight: 700,
    color: '#2bff88',
  } as React.CSSProperties,
  statLabel: {
    color: '#666',
    fontSize: '0.75rem',
    marginTop: '4px',
  } as React.CSSProperties,
};

interface Comment {
  _id: string;
  author: string;
  comment: string;
  gender: string;
  is_approved: boolean;
  createdAt: string;
}

type Filter = 'all' | 'approved' | 'pending';

export default function AdminComments() {
  const router = useRouter();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>('all');
  const [acting, setActing] = useState<string | null>(null);

  useEffect(() => {
    loadComments();
  }, []);

  async function loadComments() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/comments');
      if (res.status === 401) {
        router.push('/admin');
        return;
      }
      const data = await res.json();
      setComments(data.comments || []);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  }

  async function toggleApproval(id: string, current: boolean) {
    setActing(id);
    try {
      await fetch('/api/admin/comments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_approved: !current }),
      });
      setComments((prev) =>
        prev.map((c) => (c._id === id ? { ...c, is_approved: !current } : c))
      );
    } finally {
      setActing(null);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this comment permanently?')) return;
    setActing(id);
    try {
      await fetch(`/api/admin/comments?id=${id}`, { method: 'DELETE' });
      setComments((prev) => prev.filter((c) => c._id !== id));
    } finally {
      setActing(null);
    }
  }

  const filtered = comments.filter((c) => {
    if (filter === 'approved') return c.is_approved;
    if (filter === 'pending') return !c.is_approved;
    return true;
  });

  const approvedCount = comments.filter((c) => c.is_approved).length;
  const pendingCount = comments.filter((c) => !c.is_approved).length;

  function formatDate(iso: string) {
    try {
      return new Date(iso).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return iso;
    }
  }

  return (
    <>
      <Head>
        <title>Comments — Admin</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
        />
      </Head>
      <div style={S.page}>
        <header style={S.header}>
          <div style={S.logo}>
            <span style={S.logoAccent}>T</span>AHIR Admin
          </div>
          <nav style={S.nav}>
            <button
              style={S.navBtn(false)}
              onClick={() => router.push('/admin/projects')}
            >
              Projects
            </button>
            <button
              style={S.navBtn(false)}
              onClick={() => router.push('/admin/resume')}
            >
              Resume
            </button>
            <button
              style={S.navBtn(false)}
              onClick={() => router.push('/admin/about')}
            >
              About
            </button>
            <button
              style={S.navBtn(true)}
              onClick={() => router.push('/admin/comments')}
            >
              Comments
            </button>
            <button
              style={S.navBtn(false)}
              onClick={() => router.push('/admin/articles')}
            >
              Articles
            </button>
            <button style={S.logoutBtn} onClick={handleLogout}>
              Sign Out
            </button>
          </nav>
        </header>

        <div style={S.content}>
          <div style={S.sectionTitle}>Comments</div>
          <div style={S.sectionSub}>
            Moderate user comments that appear in the portfolio ticker.
          </div>

          <div style={S.stats}>
            <div style={S.stat}>
              <div style={S.statNum}>{comments.length}</div>
              <div style={S.statLabel}>Total</div>
            </div>
            <div style={S.stat}>
              <div style={{ ...S.statNum, color: '#2bff88' }}>
                {approvedCount}
              </div>
              <div style={S.statLabel}>Approved</div>
            </div>
            <div style={S.stat}>
              <div style={{ ...S.statNum, color: '#ff4d4d' }}>
                {pendingCount}
              </div>
              <div style={S.statLabel}>Pending</div>
            </div>
          </div>

          <div style={S.filters}>
            <button
              style={S.filterBtn(filter === 'all')}
              onClick={() => setFilter('all')}
            >
              All ({comments.length})
            </button>
            <button
              style={S.filterBtn(filter === 'approved')}
              onClick={() => setFilter('approved')}
            >
              Approved ({approvedCount})
            </button>
            <button
              style={S.filterBtn(filter === 'pending')}
              onClick={() => setFilter('pending')}
            >
              Pending ({pendingCount})
            </button>
          </div>

          {loading ? (
            <div style={S.loading}>Loading comments...</div>
          ) : filtered.length === 0 ? (
            <div style={S.empty}>No comments found.</div>
          ) : (
            <table style={S.table}>
              <thead>
                <tr>
                  <th style={S.th}>Author</th>
                  <th style={S.th}>Comment</th>
                  <th style={S.th}>Status</th>
                  <th style={S.th}>Date</th>
                  <th style={S.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr
                    key={c._id}
                    style={{
                      opacity: acting === c._id ? 0.5 : 1,
                      transition: 'opacity 0.2s',
                    }}
                  >
                    <td style={S.td}>
                      <div style={S.author}>{c.author}</div>
                      <span style={S.genderBadge}>{c.gender}</span>
                    </td>
                    <td style={{ ...S.td, maxWidth: '400px' }}>
                      <div style={S.commentText}>{c.comment}</div>
                    </td>
                    <td style={S.td}>
                      <span style={S.badge(c.is_approved)}>
                        {c.is_approved ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                    <td style={S.td}>
                      <div style={S.date}>{formatDate(c.createdAt)}</div>
                    </td>
                    <td style={S.td}>
                      <div style={S.actions}>
                        {c.is_approved ? (
                          <button
                            style={S.rejectBtn}
                            disabled={acting === c._id}
                            onClick={() => toggleApproval(c._id, c.is_approved)}
                          >
                            Reject
                          </button>
                        ) : (
                          <button
                            style={S.approveBtn}
                            disabled={acting === c._id}
                            onClick={() => toggleApproval(c._id, c.is_approved)}
                          >
                            Approve
                          </button>
                        )}
                        <button
                          style={S.deleteBtn}
                          disabled={acting === c._id}
                          onClick={() => handleDelete(c._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
