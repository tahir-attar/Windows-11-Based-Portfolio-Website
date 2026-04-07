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
    WebkitLineClamp: 2,
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
    maxWidth: '700px',
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
    marginBottom: '10px',
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
  seedBtn: {
    background: '#252525',
    color: '#2bff88',
    border: '1px solid #2bff88',
    borderRadius: '8px',
    padding: '12px 24px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '0.9rem',
    marginLeft: '12px',
  } as React.CSSProperties,
  orderRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
  } as React.CSSProperties,
  orderBtn: {
    background: '#252525',
    color: '#aaa',
    border: '1px solid #333',
    borderRadius: '6px',
    padding: '4px 10px',
    cursor: 'pointer',
    fontSize: '0.75rem',
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
  sectionDivider: {
    borderTop: '1px solid #2a2a2a',
    margin: '24px 0 20px',
    paddingTop: '20px',
  } as React.CSSProperties,
  sectionLabel: {
    fontSize: '0.8rem',
    fontWeight: 700,
    color: '#2bff88',
    letterSpacing: '1.5px',
    textTransform: 'uppercase' as const,
    marginBottom: '6px',
  } as React.CSSProperties,
  sectionNote: {
    color: '#555',
    fontSize: '0.72rem',
    marginBottom: '18px',
  } as React.CSSProperties,
  imgPreview: {
    width: '60px',
    height: '45px',
    objectFit: 'cover' as const,
    borderRadius: '4px',
    border: '1px solid #333',
  } as React.CSSProperties,
};

interface Project {
  id?: string;
  order: number;
  projectTitle: string;
  projectDescription: string;
  projectImg: string;
  projectMobileImg: string;
  slideBgColor: string;
  slideHeight: string;
  githubLink: string;
  liveLink: string;
  projectTechnologies: string[];
  techIconNames: string[];
  desktopImgWidth: number;
  desktopImgHeight: number;
  mobileImgWidth: number;
  mobileImgHeight: number;
  role: string;
  goal: string;
  outcome: string;
  detailsImg: string;
}

const EMPTY_PROJECT: Omit<Project, 'id'> = {
  order: 0,
  projectTitle: '',
  projectDescription: '',
  projectImg: '',
  projectMobileImg: '',
  slideBgColor: '#010606',
  slideHeight: '100vh',
  githubLink: '',
  liveLink: '',
  projectTechnologies: [],
  techIconNames: [],
  desktopImgWidth: 800,
  desktopImgHeight: 800,
  mobileImgWidth: 300,
  mobileImgHeight: 580,
  role: '',
  goal: '',
  outcome: '',
  detailsImg: '',
};

export default function AdminProjects() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<Omit<Project, 'id'>>({ ...EMPTY_PROJECT });
  const [saving, setSaving] = useState(false);
  const [iconSearch, setIconSearch] = useState('');
  const [techInput, setTechInput] = useState('');
  const [seeding, setSeeding] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const desktopFileRef = useRef<HTMLInputElement>(null);
  const mobileFileRef = useRef<HTMLInputElement>(null);
  const detailsFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/projects');
      if (res.status === 401) {
        router.push('/admin');
        return;
      }
      setProjects(await res.json());
    } finally {
      setLoading(false);
    }
  }

  function openAdd() {
    setEditing(null);
    setForm({ ...EMPTY_PROJECT, order: projects.length });
    setShowModal(true);
  }

  function openEdit(p: Project) {
    setEditing(p);
    setForm({
      order: p.order,
      projectTitle: p.projectTitle,
      projectDescription: p.projectDescription,
      projectImg: p.projectImg,
      projectMobileImg: p.projectMobileImg,
      slideBgColor: p.slideBgColor,
      slideHeight: p.slideHeight,
      githubLink: p.githubLink || '',
      liveLink: p.liveLink || '',
      projectTechnologies: [...p.projectTechnologies],
      techIconNames: [...(p.techIconNames || [])],
      desktopImgWidth: p.desktopImgWidth || 800,
      desktopImgHeight: p.desktopImgHeight || 800,
      mobileImgWidth: p.mobileImgWidth || 300,
      mobileImgHeight: p.mobileImgHeight || 580,
      role: p.role || '',
      goal: p.goal || '',
      outcome: p.outcome || '',
      detailsImg: p.detailsImg || '',
    });
    setShowModal(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      if (editing?.id) {
        await fetch(`/api/admin/projects/${editing.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      } else {
        await fetch('/api/admin/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      }
      setShowModal(false);
      await loadProjects();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this project? This cannot be undone.')) return;
    await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
    await loadProjects();
  }

  async function handleSeed() {
    if (
      !confirm(
        'This will seed the projects with sample data. Only works if no projects exist yet.'
      )
    )
      return;
    setSeeding(true);
    try {
      const res = await fetch('/api/admin/seed?target=projects', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) alert(data.error || 'Seed failed');
      else await loadProjects();
    } finally {
      setSeeding(false);
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  }

  function toggleIcon(name: string) {
    setForm((f) => ({
      ...f,
      techIconNames: f.techIconNames.includes(name)
        ? f.techIconNames.filter((n) => n !== name)
        : [...f.techIconNames, name],
    }));
  }

  function addTech() {
    const val = techInput.trim();
    if (!val) return;
    if (!form.projectTechnologies.includes(val)) {
      setForm((f) => ({
        ...f,
        projectTechnologies: [...f.projectTechnologies, val],
      }));
    }
    setTechInput('');
  }

  function removeTech(t: string) {
    setForm((f) => ({
      ...f,
      projectTechnologies: f.projectTechnologies.filter((x) => x !== t),
    }));
  }

  async function handleImageUpload(
    field: 'projectImg' | 'projectMobileImg',
    file: File
  ) {
    setUploading(field);
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
        setForm((f) => ({ ...f, [field]: url }));
      } else {
        const err = await res.json();
        alert('Upload failed: ' + (err.error || 'Unknown error'));
      }
    } catch (e: any) {
      alert('Upload error: ' + e.message);
    } finally {
      setUploading(null);
    }
  }

  const filteredIcons = iconSearch
    ? TECH_ICONS.filter((ic) =>
        ic.label.toLowerCase().includes(iconSearch.toLowerCase())
      )
    : TECH_ICONS;

  const isUploading = (field: string) => uploading === field;

  return (
    <>
      <Head>
        <title>Projects — Admin</title>
      </Head>
      <div style={S.page}>
        <header style={S.header}>
          <div style={S.logo}>
            <span style={S.logoAccent}>T</span>AHIR Admin
          </div>
          <nav style={S.nav}>
            <button
              style={S.navBtn(true)}
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
          <h1 style={S.sectionTitle}>Projects</h1>
          <p style={S.sectionSub}>
            Manage the projects shown in your portfolio. Changes are reflected
            immediately.
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
              + Add Project
            </button>
            {projects.length === 0 && (
              <button style={S.seedBtn} onClick={handleSeed} disabled={seeding}>
                {seeding ? 'Seeding...' : 'Seed Sample Data'}
              </button>
            )}
          </div>

          {loading ? (
            <p style={{ color: '#555' }}>Loading...</p>
          ) : projects.length === 0 ? (
            <div style={S.empty}>
              <p>
                No projects yet. Click "+ Add Project" or seed sample data to
                get started.
              </p>
            </div>
          ) : (
            <div style={S.grid}>
              {projects.map((p) => (
                <div key={p.id} style={S.card}>
                  <div style={S.cardImgWrap}>
                    {p.projectImg ? (
                      <img
                        src={p.projectImg}
                        style={S.cardImg}
                        alt={p.projectTitle}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <span style={S.cardImgPlaceholder}>No image</span>
                    )}
                  </div>
                  <div style={S.cardBody}>
                    <div style={S.cardTitle}>
                      {p.projectTitle || 'Untitled'}
                    </div>
                    <div style={S.cardDesc}>{p.projectDescription}</div>
                    <div style={S.tags}>
                      {(p.projectTechnologies || []).slice(0, 4).map((t) => (
                        <span key={t} style={S.tag}>
                          {t}
                        </span>
                      ))}
                      {(p.projectTechnologies || []).length > 4 && (
                        <span style={S.tag}>
                          +{(p.projectTechnologies || []).length - 4}
                        </span>
                      )}
                    </div>
                    <div style={S.cardActions}>
                      <button style={S.editBtn} onClick={() => openEdit(p)}>
                        Edit
                      </button>
                      <button
                        style={S.deleteBtn}
                        onClick={() => p.id && handleDelete(p.id)}
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
              {editing ? 'Edit Project' : 'Add New Project'}
            </h2>

            <div style={S.formRow}>
              <label style={S.label}>Project Title *</label>
              <input
                style={S.input}
                value={form.projectTitle}
                onChange={(e) =>
                  setForm((f) => ({ ...f, projectTitle: e.target.value }))
                }
                placeholder="e.g. My Awesome App"
              />
            </div>

            <div style={S.formRow}>
              <label style={S.label}>Description *</label>
              <textarea
                style={S.textarea}
                value={form.projectDescription}
                onChange={(e) =>
                  setForm((f) => ({ ...f, projectDescription: e.target.value }))
                }
                placeholder="Describe the project..."
              />
            </div>

            {/* Desktop Image */}
            <div style={S.formRow}>
              <label style={S.label}>Desktop Image</label>
              <div
                style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
              >
                {form.projectImg && (
                  <img
                    src={form.projectImg}
                    style={S.imgPreview}
                    alt="desktop preview"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                )}
                <input
                  style={S.input}
                  value={form.projectImg}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, projectImg: e.target.value }))
                  }
                  placeholder="/assets/portfolio/... or https://..."
                />
                <button
                  style={
                    isUploading('projectImg')
                      ? S.uploadBtnDisabled
                      : S.uploadBtn
                  }
                  disabled={isUploading('projectImg')}
                  onClick={() => desktopFileRef.current?.click()}
                >
                  {isUploading('projectImg') ? 'Uploading...' : '↑ Upload'}
                </button>
                <input
                  ref={desktopFileRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleImageUpload('projectImg', f);
                    e.target.value = '';
                  }}
                />
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                  marginTop: '10px',
                }}
              >
                <div>
                  <label style={{ ...S.label, marginBottom: '6px' }}>
                    Width (px)
                  </label>
                  <input
                    type="number"
                    style={S.numberInput}
                    value={form.desktopImgWidth}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        desktopImgWidth: +e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label style={{ ...S.label, marginBottom: '6px' }}>
                    Height (px)
                  </label>
                  <input
                    type="number"
                    style={S.numberInput}
                    value={form.desktopImgHeight}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        desktopImgHeight: +e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <p style={S.hint}>
                Default 800×800. Adjust to control how the image scales in the
                slide.
              </p>
            </div>

            {/* Mobile Image */}
            <div style={S.formRow}>
              <label style={S.label}>
                Mobile Image (used in details slide)
              </label>
              <div
                style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
              >
                {form.projectMobileImg && (
                  <img
                    src={form.projectMobileImg}
                    style={S.imgPreview}
                    alt="mobile preview"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                )}
                <input
                  style={S.input}
                  value={form.projectMobileImg}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, projectMobileImg: e.target.value }))
                  }
                  placeholder="/assets/portfolio/... or https://..."
                />
                <button
                  style={
                    isUploading('projectMobileImg')
                      ? S.uploadBtnDisabled
                      : S.uploadBtn
                  }
                  disabled={isUploading('projectMobileImg')}
                  onClick={() => mobileFileRef.current?.click()}
                >
                  {isUploading('projectMobileImg')
                    ? 'Uploading...'
                    : '↑ Upload'}
                </button>
                <input
                  ref={mobileFileRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleImageUpload('projectMobileImg', f);
                    e.target.value = '';
                  }}
                />
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                  marginTop: '10px',
                }}
              >
                <div>
                  <label style={{ ...S.label, marginBottom: '6px' }}>
                    Figure Width (px)
                  </label>
                  <input
                    type="number"
                    style={S.numberInput}
                    value={form.mobileImgWidth}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        mobileImgWidth: +e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label style={{ ...S.label, marginBottom: '6px' }}>
                    Figure Height (px)
                  </label>
                  <input
                    type="number"
                    style={S.numberInput}
                    value={form.mobileImgHeight}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        mobileImgHeight: +e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <p style={S.hint}>
                Default 300×580 (the floating mobile frame in the details
                slide).
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
              }}
            >
              <div style={S.formRow}>
                <label style={S.label}>GitHub Link</label>
                <input
                  style={S.input}
                  value={form.githubLink}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, githubLink: e.target.value }))
                  }
                  placeholder="https://github.com/..."
                />
              </div>
              <div style={S.formRow}>
                <label style={S.label}>Live / Explore Link *</label>
                <input
                  style={S.input}
                  value={form.liveLink}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, liveLink: e.target.value }))
                  }
                  placeholder="https://..."
                />
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
              }}
            >
              <div style={S.formRow}>
                <label style={S.label}>Background Color</label>
                <div
                  style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
                >
                  <input
                    type="color"
                    value={form.slideBgColor}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, slideBgColor: e.target.value }))
                    }
                    style={{
                      width: '44px',
                      height: '44px',
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      borderRadius: '6px',
                    }}
                  />
                  <input
                    style={{ ...S.input, marginBottom: 0 }}
                    value={form.slideBgColor}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, slideBgColor: e.target.value }))
                    }
                    placeholder="#010606"
                  />
                </div>
              </div>
              <div style={S.formRow}>
                <label style={S.label}>Slide Height</label>
                <input
                  style={S.input}
                  value={form.slideHeight}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, slideHeight: e.target.value }))
                  }
                  placeholder="100vh"
                />
              </div>
            </div>

            <div style={S.formRow}>
              <label style={S.label}>Technologies (text labels)</label>
              <div style={S.techTagList}>
                {form.projectTechnologies.map((t) => (
                  <span key={t} style={S.techTagItem}>
                    {t}
                    <span style={S.removeTag} onClick={() => removeTech(t)}>
                      ×
                    </span>
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  style={{ ...S.input, marginBottom: 0 }}
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === 'Enter' && (e.preventDefault(), addTech())
                  }
                  placeholder="Type a technology and press Enter"
                />
                <button
                  style={{ ...S.saveBtn, flex: 'none', padding: '11px 16px' }}
                  onClick={addTech}
                >
                  Add
                </button>
              </div>
            </div>

            <div style={S.formRow}>
              <label style={S.label}>Tech Stack Icons</label>
              <input
                style={S.techSearch}
                value={iconSearch}
                onChange={(e) => setIconSearch(e.target.value)}
                placeholder="Search icons (e.g. React, Node, Python...)"
              />
              <div style={S.iconGrid}>
                {filteredIcons.map((ic) => (
                  <div
                    key={ic.name}
                    style={S.iconItem(form.techIconNames.includes(ic.name))}
                    onClick={() => toggleIcon(ic.name)}
                    title={ic.label}
                  >
                    <span style={S.iconItemIcon}>{ic.component}</span>
                    <span>{ic.label}</span>
                  </div>
                ))}
              </div>
              <p style={S.hint}>{form.techIconNames.length} icon(s) selected</p>
            </div>

            {/* Project Details Section */}
            <div style={S.sectionDivider}>
              <div style={S.sectionLabel}>Project Details Section</div>
              <div style={S.sectionNote}>
                This creates an additional slide per project showing your role,
                goal, and outcome alongside the floating mobile image. Leave all
                three blank to hide this slide entirely.
              </div>

              <div style={S.formRow}>
                <label style={S.label}>
                  Floating Image (right side of this slide)
                </label>
                <div
                  style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
                >
                  {form.detailsImg && (
                    <img
                      src={form.detailsImg}
                      style={S.imgPreview}
                      alt="details preview"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                  <input
                    style={S.input}
                    value={form.detailsImg}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, detailsImg: e.target.value }))
                    }
                    placeholder="URL or upload — defaults to mobile image if blank"
                  />
                  <button
                    style={
                      isUploading('detailsImg')
                        ? S.uploadBtnDisabled
                        : S.uploadBtn
                    }
                    disabled={isUploading('detailsImg')}
                    onClick={() => detailsFileRef.current?.click()}
                  >
                    {isUploading('detailsImg') ? 'Uploading...' : '↑ Upload'}
                  </button>
                  <input
                    ref={detailsFileRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleImageUpload('detailsImg' as any, f);
                      e.target.value = '';
                    }}
                  />
                </div>
                <p style={S.hint}>
                  This image appears in the floating animation. Leave blank to
                  use the Mobile Image set above.
                </p>
              </div>

              <div style={S.formRow}>
                <label style={S.label}>My Role</label>
                <textarea
                  style={{ ...S.textarea, minHeight: '80px' }}
                  value={form.role}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, role: e.target.value }))
                  }
                  placeholder="Describe your role in this project..."
                />
              </div>

              <div style={S.formRow}>
                <label style={S.label}>The Goal</label>
                <textarea
                  style={{ ...S.textarea, minHeight: '80px' }}
                  value={form.goal}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, goal: e.target.value }))
                  }
                  placeholder="What was the goal of this project?"
                />
              </div>

              <div style={S.formRow}>
                <label style={S.label}>The Outcome</label>
                <textarea
                  style={{ ...S.textarea, minHeight: '80px' }}
                  value={form.outcome}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, outcome: e.target.value }))
                  }
                  placeholder="What was the outcome or result?"
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
                  ? 'Update Project'
                  : 'Add Project'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
