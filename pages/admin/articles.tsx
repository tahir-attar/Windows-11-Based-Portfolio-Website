import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { TECH_ICONS } from '../../utils/techIcons';

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
  addBtn: {
    background: '#2bff88',
    color: '#000',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: '0.9rem',
    marginBottom: '24px',
  } as React.CSSProperties,
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: '20px',
  } as React.CSSProperties,
  card: {
    background: '#1a1a1a',
    border: '1px solid #2a2a2a',
    borderRadius: '12px',
    overflow: 'hidden',
  } as React.CSSProperties,
  cardImgWrap: {
    background: '#111',
    height: '160px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  } as React.CSSProperties,
  cardImg: {
    width: '100%',
    height: '160px',
    objectFit: 'cover' as const,
  } as React.CSSProperties,
  cardImgPlaceholder: {
    color: '#444',
    fontSize: '0.8rem',
  } as React.CSSProperties,
  cardBody: { padding: '16px' } as React.CSSProperties,
  cardTitle: {
    fontSize: '1rem',
    fontWeight: 700,
    marginBottom: '6px',
  } as React.CSSProperties,
  cardDesc: {
    color: '#888',
    fontSize: '0.8rem',
    marginBottom: '12px',
    lineHeight: 1.5,
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical' as const,
    overflow: 'hidden',
  } as React.CSSProperties,
  tags: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '6px',
    marginBottom: '12px',
  } as React.CSSProperties,
  tag: {
    background: '#2a2a2a',
    color: '#aaa',
    borderRadius: '4px',
    padding: '3px 8px',
    fontSize: '0.7rem',
    border: '1px solid #333',
  } as React.CSSProperties,
  cardActions: { display: 'flex', gap: '8px' } as React.CSSProperties,
  editBtn: {
    flex: 1,
    background: '#252525',
    color: '#fff',
    border: '1px solid #333',
    borderRadius: '6px',
    padding: '8px',
    cursor: 'pointer',
    fontSize: '0.8rem',
  } as React.CSSProperties,
  deleteBtn: {
    background: '#1a0a0a',
    color: '#ff4d4d',
    border: '1px solid #3a1a1a',
    borderRadius: '6px',
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '0.8rem',
  } as React.CSSProperties,
  overlay: {
    position: 'fixed' as const,
    inset: 0,
    background: 'rgba(0,0,0,0.8)',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    zIndex: 1000,
    overflowY: 'auto' as const,
    padding: '32px 16px',
  } as React.CSSProperties,
  modal: {
    background: '#1a1a1a',
    border: '1px solid #333',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '600px',
    padding: '32px',
  } as React.CSSProperties,
  modalTitle: {
    fontSize: '1.25rem',
    fontWeight: 700,
    marginBottom: '24px',
  } as React.CSSProperties,
  formRow: { marginBottom: '18px' } as React.CSSProperties,
  label: {
    display: 'block',
    color: '#aaa',
    fontSize: '0.75rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    marginBottom: '8px',
  } as React.CSSProperties,
  input: {
    width: '100%',
    background: '#252525',
    border: '1px solid #444',
    borderRadius: '8px',
    padding: '11px 14px',
    color: '#fff',
    fontSize: '0.9rem',
    outline: 'none',
    boxSizing: 'border-box' as const,
  } as React.CSSProperties,
  numberInput: {
    width: '100%',
    background: '#252525',
    border: '1px solid #444',
    borderRadius: '8px',
    padding: '11px 14px',
    color: '#fff',
    fontSize: '0.9rem',
    outline: 'none',
    boxSizing: 'border-box' as const,
  } as React.CSSProperties,
  textarea: {
    width: '100%',
    background: '#252525',
    border: '1px solid #444',
    borderRadius: '8px',
    padding: '11px 14px',
    color: '#fff',
    fontSize: '0.9rem',
    outline: 'none',
    boxSizing: 'border-box' as const,
    minHeight: '100px',
    resize: 'vertical' as const,
  } as React.CSSProperties,
  hint: {
    color: '#666',
    fontSize: '0.75rem',
    marginTop: '4px',
  } as React.CSSProperties,
  iconGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
    gap: '8px',
    maxHeight: '260px',
    overflowY: 'auto' as const,
    background: '#111',
    borderRadius: '8px',
    padding: '12px',
    border: '1px solid #333',
    marginTop: '12px',
  } as React.CSSProperties,
  iconItem: (selected: boolean) =>
    ({
      background: selected ? '#2bff88' : '#252525',
      color: selected ? '#000' : '#ccc',
      border: `1px solid ${selected ? '#2bff88' : '#333'}`,
      borderRadius: '8px',
      padding: '8px 4px',
      cursor: 'pointer',
      textAlign: 'center' as const,
      fontSize: '0.65rem',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      gap: '4px',
    } as React.CSSProperties),
  iconItemIcon: { fontSize: '1.4rem' } as React.CSSProperties,
  techSearch: {
    width: '100%',
    background: '#252525',
    border: '1px solid #444',
    borderRadius: '8px',
    padding: '9px 14px',
    color: '#fff',
    fontSize: '0.85rem',
    outline: 'none',
    boxSizing: 'border-box' as const,
    marginTop: '12px',
  } as React.CSSProperties,
  modalActions: {
    display: 'flex',
    gap: '12px',
    marginTop: '24px',
  } as React.CSSProperties,
  saveBtn: {
    flex: 1,
    background: '#2bff88',
    color: '#000',
    border: 'none',
    borderRadius: '8px',
    padding: '13px',
    fontWeight: 700,
    cursor: 'pointer',
    fontSize: '0.9rem',
  } as React.CSSProperties,
  cancelBtn: {
    background: 'transparent',
    color: '#888',
    border: '1px solid #333',
    borderRadius: '8px',
    padding: '13px 20px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  } as React.CSSProperties,
  empty: {
    textAlign: 'center' as const,
    padding: '80px 20px',
    color: '#555',
  } as React.CSSProperties,
  techTagList: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '6px',
    marginBottom: '10px',
  } as React.CSSProperties,
  techTagItem: {
    background: '#252525',
    color: '#ccc',
    border: '1px solid #333',
    borderRadius: '4px',
    padding: '3px 8px',
    fontSize: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  } as React.CSSProperties,
  removeTag: {
    cursor: 'pointer',
    color: '#ff6b6b',
    fontWeight: 700,
    marginLeft: '2px',
  } as React.CSSProperties,
  uploadBtn: {
    background: '#252525',
    color: '#2bff88',
    border: '1px solid #2bff88',
    borderRadius: '8px',
    padding: '11px 16px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '0.8rem',
    whiteSpace: 'nowrap' as const,
    flexShrink: 0,
  } as React.CSSProperties,
  uploadBtnDisabled: {
    background: '#1a1a1a',
    color: '#555',
    border: '1px solid #333',
    borderRadius: '8px',
    padding: '11px 16px',
    fontSize: '0.8rem',
    whiteSpace: 'nowrap' as const,
    flexShrink: 0,
  } as React.CSSProperties,
  imgPreview: {
    width: '60px',
    height: '45px',
    objectFit: 'cover' as const,
    borderRadius: '4px',
    border: '1px solid #333',
  } as React.CSSProperties,
};

interface Article {
  id?: string;
  order: number;
  title: string;
  description: string;
  published_at: string;
  slug: string;
  url: string;
  comments_count: number;
  public_reactions_count: number;
  positive_reactions_count: number;
  page_views_count: number;
  cover_image: string;
  tag_list: string[];
}

const EMPTY_ARTICLE: Omit<Article, 'id'> = {
  order: 0,
  title: '',
  description: '',
  published_at: new Date().toISOString().split('T')[0],
  slug: '',
  url: '',
  comments_count: 0,
  public_reactions_count: 0,
  positive_reactions_count: 0,
  page_views_count: 0,
  cover_image: '',
  tag_list: [],
};

export default function AdminArticles() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Article | null>(null);
  const [form, setForm] = useState<Omit<Article, 'id'>>({ ...EMPTY_ARTICLE });
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [iconSearch, setIconSearch] = useState('');
  const [uploading, setUploading] = useState<boolean>(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadArticles();
  }, []);

  async function loadArticles() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/articles');
      if (res.status === 401) {
        router.push('/admin');
        return;
      }
      setArticles(await res.json());
    } finally {
      setLoading(false);
    }
  }

  function openAdd() {
    setEditing(null);
    setForm({ ...EMPTY_ARTICLE, order: articles.length });
    setShowModal(true);
  }

  function openEdit(a: Article) {
    setEditing(a);
    setForm({
      order: a.order,
      title: a.title,
      description: a.description,
      published_at: a.published_at,
      slug: a.slug,
      url: a.url,
      comments_count: a.comments_count,
      public_reactions_count: a.public_reactions_count,
      positive_reactions_count: a.positive_reactions_count,
      page_views_count: a.page_views_count,
      cover_image: a.cover_image,
      tag_list: [...(a.tag_list || [])],
    });
    setShowModal(true);
  }

  async function handleSave() {
    if (!form.title) return alert('Title is required');
    setSaving(true);
    try {
      if (editing?.id) {
        await fetch(`/api/admin/articles/${editing.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      } else {
        await fetch('/api/admin/articles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      }
      setShowModal(false);
      await loadArticles();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this article? This cannot be undone.')) return;
    await fetch(`/api/admin/articles/${id}`, { method: 'DELETE' });
    await loadArticles();
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  }

  function addTag() {
    const val = tagInput.trim();
    if (!val) return;
    if (!form.tag_list.includes(val)) {
      setForm((f) => ({ ...f, tag_list: [...f.tag_list, val] }));
    }
    setTagInput('');
  }

  function removeTag(t: string) {
    setForm((f) => ({ ...f, tag_list: f.tag_list.filter((x) => x !== t) }));
  }

  async function handleImageUpload(file: File) {
    setUploading(true);
    try {
      const data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data,
          filename: file.name,
          contentType: file.type,
        }),
      });
      if (res.ok) {
        const { url } = await res.json();
        setForm((f) => ({ ...f, cover_image: url }));
      } else {
        const err = await res.json();
        alert('Upload failed: ' + (err.error || 'Unknown error'));
      }
    } catch (e: any) {
      alert('Upload error: ' + e.message);
    } finally {
      setUploading(false);
    }
  }

  function toggleTag(label: string) {
    if (form.tag_list.includes(label)) {
      setForm((f) => ({
        ...f,
        tag_list: f.tag_list.filter((t) => t !== label),
      }));
    } else {
      setForm((f) => ({ ...f, tag_list: [...f.tag_list, label] }));
    }
  }

  const filteredIcons = iconSearch
    ? TECH_ICONS.filter((ic) =>
        ic.label.toLowerCase().includes(iconSearch.toLowerCase())
      )
    : TECH_ICONS;

  return (
    <>
      <Head>
        <title>Articles — Admin</title>
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
              style={S.navBtn(false)}
              onClick={() => router.push('/admin/comments')}
            >
              Comments
            </button>
            <button
              style={S.navBtn(true)}
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
          <h1 style={S.sectionTitle}>Articles</h1>
          <p style={S.sectionSub}>
            Manage the articles shown in your portfolio. Replaces the Dev.to
            integration.
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '24px',
            }}
          >
            <button style={S.addBtn} onClick={openAdd}>
              + Add Article
            </button>
          </div>

          {loading ? (
            <p style={{ color: '#555' }}>Loading...</p>
          ) : articles.length === 0 ? (
            <div style={S.empty}>
              <p>
                No articles yet. Click "+ Add Article" to write your first one.
              </p>
            </div>
          ) : (
            <div style={S.grid}>
              {articles.map((a) => (
                <div key={a.id} style={S.card}>
                  <div style={S.cardImgWrap}>
                    {a.cover_image ? (
                      <img
                        src={a.cover_image}
                        style={S.cardImg}
                        alt={a.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <span style={S.cardImgPlaceholder}>No cover image</span>
                    )}
                  </div>
                  <div style={S.cardBody}>
                    <div style={S.cardTitle}>{a.title || 'Untitled'}</div>
                    <div style={S.cardDesc}>{a.description}</div>
                    <div
                      style={{
                        fontSize: '0.75rem',
                        color: '#666',
                        marginBottom: '8px',
                      }}
                    >
                      💖 {a.positive_reactions_count} · 💬 {a.comments_count} ·
                      📅 {a.published_at}
                    </div>
                    <div style={S.tags}>
                      {(a.tag_list || []).slice(0, 4).map((t) => (
                        <span key={t} style={S.tag}>
                          {t}
                        </span>
                      ))}
                      {(a.tag_list || []).length > 4 && (
                        <span style={S.tag}>
                          +{(a.tag_list || []).length - 4}
                        </span>
                      )}
                    </div>
                    <div style={S.cardActions}>
                      <button style={S.editBtn} onClick={() => openEdit(a)}>
                        Edit
                      </button>
                      <button
                        style={S.deleteBtn}
                        onClick={() => a.id && handleDelete(a.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div
          style={S.overlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <div style={S.modal}>
            <h2 style={S.modalTitle}>
              {editing ? 'Edit Article' : 'Add New Article'}
            </h2>

            <div style={S.formRow}>
              <label style={S.label}>Article Title *</label>
              <input
                style={S.input}
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="e.g. 5 CSS Tricks"
              />
            </div>

            <div style={S.formRow}>
              <label style={S.label}>Short Description</label>
              <textarea
                style={{ ...S.textarea, minHeight: '80px' }}
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="A short excerpt..."
              />
            </div>

            <div style={S.formRow}>
              <label style={S.label}>Cover Image</label>
              <div
                style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
              >
                {form.cover_image && (
                  <img
                    src={form.cover_image}
                    style={S.imgPreview}
                    alt="cover preview"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                )}
                <input
                  style={S.input}
                  value={form.cover_image}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, cover_image: e.target.value }))
                  }
                  placeholder="https://..."
                />
                <button
                  style={uploading ? S.uploadBtnDisabled : S.uploadBtn}
                  disabled={uploading}
                  onClick={() => fileRef.current?.click()}
                >
                  {uploading ? 'Uploading...' : '↑ Upload'}
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleImageUpload(f);
                    e.target.value = '';
                  }}
                />
              </div>
            </div>

            <div style={S.formRow}>
              <label style={S.label}>Article URL *</label>
              <input
                style={S.input}
                value={form.url}
                onChange={(e) =>
                  setForm((f) => ({ ...f, url: e.target.value }))
                }
                placeholder="https://dev.to/your-name/your-article"
              />
              <p style={S.hint}>
                Where should users be redirected when they click "Read More"?
              </p>
            </div>

            <div style={S.formRow}>
              <label style={S.label}>Tags</label>
              <div style={S.techTagList}>
                {form.tag_list.map((t) => (
                  <span key={t} style={S.techTagItem}>
                    #{t}
                    <span style={S.removeTag} onClick={() => removeTag(t)}>
                      ×
                    </span>
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  style={{ ...S.input, marginBottom: 0 }}
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === 'Enter' && (e.preventDefault(), addTag())
                  }
                  placeholder="e.g. react, css, nextjs (press Enter)"
                />
                <button
                  style={{ ...S.saveBtn, flex: 'none', padding: '11px 16px' }}
                  onClick={addTag}
                >
                  Add
                </button>
              </div>
              <input
                style={S.techSearch}
                value={iconSearch}
                onChange={(e) => setIconSearch(e.target.value)}
                placeholder="Or select an icon from all available SVGs (e.g. React, Node, Python...)"
              />
              <div style={S.iconGrid}>
                {filteredIcons.map((ic) => (
                  <div
                    key={ic.name}
                    style={S.iconItem(
                      form.tag_list.includes(ic.label) ||
                        form.tag_list.includes(ic.label.toLowerCase())
                    )}
                    onClick={() => toggleTag(ic.label)}
                    title={ic.label}
                  >
                    <span style={S.iconItemIcon}>{ic.component}</span>
                    <span>{ic.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '16px',
              }}
            >
              <div style={S.formRow}>
                <label style={S.label}>Likes Count</label>
                <input
                  type="number"
                  style={S.numberInput}
                  value={form.positive_reactions_count}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      positive_reactions_count: +e.target.value,
                    }))
                  }
                />
              </div>
              <div style={S.formRow}>
                <label style={S.label}>Comments Count</label>
                <input
                  type="number"
                  style={S.numberInput}
                  value={form.comments_count}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, comments_count: +e.target.value }))
                  }
                />
              </div>
              <div style={S.formRow}>
                <label style={S.label}>Publish Date</label>
                <input
                  type="text"
                  style={S.input}
                  value={form.published_at}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, published_at: e.target.value }))
                  }
                  placeholder="2026-04-05"
                />
              </div>
            </div>

            <div style={S.modalActions}>
              <button style={S.cancelBtn} onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button style={S.saveBtn} onClick={handleSave} disabled={saving}>
                {saving
                  ? 'Saving...'
                  : editing
                  ? 'Update Article'
                  : 'Add Article'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
