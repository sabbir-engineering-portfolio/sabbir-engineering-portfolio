import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft, BookOpen, Check, ChevronRight, CircleUserRound, Clock3,
  ExternalLink, FileImage, ImagePlus, LogIn, LogOut, MessageCircle,
  Search, Send, ShieldCheck, Sparkles, Upload, Video, X
} from 'lucide-react';
import { supabase, supabaseConfigured } from '../supabaseClient';

const fallbackProjects = [
  {
    id: 'demo-plc',
    title: 'PLC Training Platform',
    category: 'Industrial Automation',
    year: '2023',
    summary: 'A practical PLC training platform combining controller programming, field wiring, hardware connection and troubleshooting exercises.',
    description: 'Developed as an experiment-oriented learning system for PLC programming and hardware practice. The platform supports structured demonstrations, repeatable wiring exercises and trainer-led troubleshooting sessions.',
    technologies: ['Delta PLC', 'WPLSoft', 'PLC I/O', 'Training'],
    image_urls: ['/assets/10438.jpg', '/assets/10439.jpg'],
    video_url: '',
    project_url: '',
    created_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 'demo-docs',
    title: 'QR-Enabled Trainer Documentation',
    category: 'Technical Documentation',
    year: '2022–Present',
    summary: 'A QR-based documentation workflow connecting physical trainer boards with digital manuals and experiment resources.',
    description: 'Introduced QR access across trainer systems to make manuals easier to retrieve and maintain. The documentation workflow covers operation, connection, experiments, safety and troubleshooting.',
    technologies: ['QR workflow', 'User manuals', 'Experiment guides', 'Version control'],
    image_urls: ['/assets/manuals-folder.png', '/assets/10444.jpg'],
    video_url: '',
    project_url: '',
    created_at: '2022-01-01T00:00:00Z'
  }
];

function cleanVideoUrl(value = '') {
  if (!value) return '';
  if (value.includes('youtube.com/embed/')) return value;
  try {
    const url = new URL(value);
    if (url.hostname.includes('youtu.be')) return `https://www.youtube.com/embed/${url.pathname.slice(1)}`;
    if (url.hostname.includes('youtube.com')) {
      const id = url.searchParams.get('v');
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
  } catch {}
  return value;
}

function ProjectModal({ project, onClose, session }) {
  const [comments, setComments] = useState([]);
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ author_name: '', author_email: '', body: '' });
  const [message, setMessage] = useState('');

  const loadComments = async () => {
    if (!supabaseConfigured || String(project.id).startsWith('demo-')) return;
    const { data } = await supabase.from('comments').select('*').eq('project_id', project.id).eq('approved', true).order('created_at', { ascending: true });
    setComments(data || []);
    if (session) {
      const { data: p } = await supabase.from('comments').select('*').eq('project_id', project.id).eq('approved', false).order('created_at', { ascending: true });
      setPending(p || []);
    }
  };

  useEffect(() => { loadComments(); }, [project.id, session]);

  const submitComment = async () => {
    if (!form.author_name.trim() || !form.body.trim()) {
      setMessage('Please enter your name and comment.');
      return;
    }
    if (!supabaseConfigured || String(project.id).startsWith('demo-')) {
      setMessage('Comments will become live after the free Supabase backend is connected.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.from('comments').insert({
      project_id: project.id,
      author_name: form.author_name.trim(),
      author_email: form.author_email.trim() || null,
      body: form.body.trim(),
      approved: false
    });
    setLoading(false);
    if (error) return setMessage(error.message);
    setForm({ author_name: '', author_email: '', body: '' });
    setMessage('Comment submitted. It will appear after approval.');
  };

  const moderate = async (id, action) => {
    if (!supabaseConfigured || !session) return;
    if (action === 'approve') await supabase.from('comments').update({ approved: true }).eq('id', id);
    else await supabase.from('comments').delete().eq('id', id);
    loadComments();
  };

  const video = cleanVideoUrl(project.video_url);
  const images = project.image_urls || [];

  return <div className="journal-modal-backdrop" onClick={onClose}>
    <article className="journal-modal" onClick={e => e.stopPropagation()}>
      <button className="journal-close" onClick={onClose} aria-label="Close project"><X /></button>
      <div className="journal-modal-head">
        <div><span className="journal-pill">{project.category}</span><span className="journal-year">{project.year}</span></div>
        <h2>{project.title}</h2>
        <p>{project.description || project.summary}</p>
        <div className="journal-tech">{(project.technologies || []).map(t => <span key={t}>{t}</span>)}</div>
      </div>

      {images.length > 0 && <div className="journal-gallery">{images.map((src, i) => <img src={src} alt={`${project.title} view ${i + 1}`} key={src + i} />)}</div>}
      {video && <div className="journal-video"><iframe src={video} title={`${project.title} video`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>}
      {project.project_url && <a className="journal-project-link" href={project.project_url} target="_blank" rel="noreferrer">Open related resource <ExternalLink size={17}/></a>}

      <section className="journal-comments">
        <div className="journal-comments-title"><MessageCircle/><div><h3>Project comments</h3><p>Questions, observations and professional feedback.</p></div></div>
        {comments.length === 0 ? <div className="journal-empty-comment">No approved comments yet. Be the first to leave feedback.</div> : comments.map(c => <article className="journal-comment" key={c.id}><div className="comment-avatar"><CircleUserRound/></div><div><strong>{c.author_name}</strong><small>{new Date(c.created_at).toLocaleDateString()}</small><p>{c.body}</p></div></article>)}

        <div className="journal-comment-form">
          <div className="journal-form-row"><label>Your name<input value={form.author_name} onChange={e => setForm({...form, author_name:e.target.value})} placeholder="Name"/></label><label>Email (optional)<input type="email" value={form.author_email} onChange={e => setForm({...form, author_email:e.target.value})} placeholder="Email"/></label></div>
          <label>Comment<textarea value={form.body} onChange={e => setForm({...form, body:e.target.value})} rows="4" placeholder="Write a question, observation or feedback about this project..."/></label>
          <div className="journal-form-actions"><button className="btn primary" type="button" onClick={submitComment} disabled={loading}><Send size={17}/>{loading?'Submitting...':'Submit comment'}</button>{message&&<span>{message}</span>}</div>
        </div>

        {session && pending.length > 0 && <div className="moderation-panel"><div className="journal-comments-title"><ShieldCheck/><div><h3>Pending moderation</h3><p>Only you can see this queue.</p></div></div>{pending.map(c => <article className="pending-comment" key={c.id}><div><strong>{c.author_name}</strong><p>{c.body}</p></div><div><button onClick={() => moderate(c.id,'approve')}><Check size={16}/>Approve</button><button className="danger" onClick={() => moderate(c.id,'delete')}><X size={16}/>Delete</button></div></article>)}</div>}
      </section>
    </article>
  </div>;
}

function AdminStudio({ session, onSessionChange, onProjectCreated }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title:'', category:'', year:'', summary:'', description:'', technologies:'', video_url:'', project_url:'' });
  const [files, setFiles] = useState([]);

  const login = async () => {
    if (!supabaseConfigured) return setStatus('Connect Supabase first. See SUPABASE_SETUP.md inside the ZIP.');
    setStatus('Signing in...');
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setStatus(error.message);
    onSessionChange(data.session);
    setStatus('Signed in.');
  };

  const logout = async () => {
    if (supabaseConfigured) await supabase.auth.signOut();
    onSessionChange(null); setOpen(false);
  };

  const uploadProject = async () => {
    if (!session || !supabaseConfigured) return setStatus('Admin login required.');
    if (!form.title.trim() || !form.category.trim() || !form.summary.trim()) return setStatus('Title, category and summary are required.');
    setSaving(true); setStatus('Uploading project...');
    const uploaded = [];
    for (const file of files) {
      const safe = `${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name.replace(/[^a-zA-Z0-9._-]/g,'-')}`;
      const path = `projects/${safe}`;
      const { error } = await supabase.storage.from('project-media').upload(path, file, { cacheControl:'3600', upsert:false });
      if (error) { setSaving(false); return setStatus(error.message); }
      const { data } = supabase.storage.from('project-media').getPublicUrl(path);
      uploaded.push(data.publicUrl);
    }
    const payload = {
      title: form.title.trim(), category: form.category.trim(), year: form.year.trim() || null,
      summary: form.summary.trim(), description: form.description.trim() || form.summary.trim(),
      technologies: form.technologies.split(',').map(x=>x.trim()).filter(Boolean), image_urls: uploaded,
      video_url: form.video_url.trim() || null, project_url: form.project_url.trim() || null
    };
    const { data, error } = await supabase.from('projects').insert(payload).select().single();
    setSaving(false);
    if (error) return setStatus(error.message);
    setForm({ title:'', category:'', year:'', summary:'', description:'', technologies:'', video_url:'', project_url:'' }); setFiles([]);
    setStatus('Project published successfully.'); onProjectCreated(data); setOpen(false);
  };

  return <div className="journal-admin-wrap">
    <button className="journal-admin-trigger" onClick={() => setOpen(!open)}>{session?<><Upload size={17}/>Project Studio</>:<><LogIn size={17}/>Admin</>}</button>
    {open && <div className="journal-admin-panel">
      <div className="journal-admin-head"><div><small>Private control</small><h3>{session?'Publish a project':'Admin sign in'}</h3></div><button onClick={()=>setOpen(false)}><X/></button></div>
      {!session ? <>
        <label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Admin email"/></label>
        <label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password"/></label>
        <button className="btn primary" type="button" onClick={login}><LogIn size={17}/>Sign in</button>
      </> : <>
        <div className="journal-form-row"><label>Project title<input value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/></label><label>Year<input value={form.year} onChange={e=>setForm({...form,year:e.target.value})} placeholder="2026"/></label></div>
        <div className="journal-form-row"><label>Category<input value={form.category} onChange={e=>setForm({...form,category:e.target.value})} placeholder="Industrial Automation"/></label><label>Technologies<input value={form.technologies} onChange={e=>setForm({...form,technologies:e.target.value})} placeholder="PLC, WPLSoft, HMI"/></label></div>
        <label>Short summary<textarea rows="3" value={form.summary} onChange={e=>setForm({...form,summary:e.target.value})}/></label>
        <label>Full project story<textarea rows="6" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Purpose, your role, engineering approach, challenges, testing and outcome..."/></label>
        <label className="upload-box"><ImagePlus/><span><b>Upload project pictures</b><small>JPG, PNG or WebP. Multiple images supported.</small></span><input type="file" accept="image/*" multiple onChange={e=>setFiles([...e.target.files])}/></label>
        {files.length>0&&<div className="file-list"><FileImage size={17}/>{files.length} image(s) selected</div>}
        <div className="journal-form-row"><label>YouTube / video URL<input value={form.video_url} onChange={e=>setForm({...form,video_url:e.target.value})} placeholder="https://youtube.com/watch?v=..."/></label><label>Related link<input value={form.project_url} onChange={e=>setForm({...form,project_url:e.target.value})} placeholder="Optional resource URL"/></label></div>
        <div className="admin-actions"><button className="btn primary" onClick={uploadProject} disabled={saving}><Upload size={17}/>{saving?'Publishing...':'Publish project'}</button><button className="btn secondary" onClick={logout}><LogOut size={17}/>Sign out</button></div>
      </>}
      {status&&<p className="admin-status">{status}</p>}
    </div>}
  </div>;
}

export default function JournalPage({ onBack }) {
  const [projects, setProjects] = useState(fallbackProjects);
  const [session, setSession] = useState(null);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(supabaseConfigured);

  const loadProjects = async () => {
    if (!supabaseConfigured) return;
    setLoading(true);
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending:false });
    if (!error && data) setProjects(data.length ? data : fallbackProjects);
    setLoading(false);
  };

  useEffect(() => {
    if (!supabaseConfigured) return;
    supabase.auth.getSession().then(({data})=>setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s)=>setSession(s));
    loadProjects();
    return () => listener.subscription.unsubscribe();
  }, []);

  const categories = ['All', ...new Set(projects.map(p=>p.category).filter(Boolean))];
  const visible = useMemo(()=>projects.filter(p => {
    const hitCategory = category==='All' || p.category===category;
    const q = search.trim().toLowerCase();
    const hitSearch = !q || `${p.title} ${p.summary} ${(p.technologies||[]).join(' ')}`.toLowerCase().includes(q);
    return hitCategory && hitSearch;
  }),[projects,search,category]);

  return <div className="journal-page">
    <header className="journal-nav"><div className="container"><button className="journal-back" onClick={onBack}><ArrowLeft size={18}/>Portfolio</button><div className="journal-brand"><span>SA</span><div><b>Engineering Journal</b><small>Sabbir Ahmmed Shehab</small></div></div><AdminStudio session={session} onSessionChange={setSession} onProjectCreated={p=>setProjects(prev=>[p,...prev])}/></div></header>

    <main>
      <section className="journal-hero"><div className="container"><div className="journal-kicker"><Sparkles size={17}/>Projects · Build Notes · Engineering Learning</div><h1>Engineering work, documented beyond the final product.</h1><p>A growing journal of trainer development, automation, electronics, technical documentation and practical engineering work. Open any project to see its story, media and professional discussion.</p><div className="journal-status"><span><BookOpen/>Project journal</span><span><MessageCircle/>Moderated comments</span><span><Video/>Image & video ready</span>{!supabaseConfigured&&<span className="setup-badge"><ShieldCheck/>Demo mode · backend setup required</span>}</div></div></section>

      <section className="journal-directory container">
        <div className="journal-toolbar"><div className="journal-search"><Search size={18}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search projects, technology, category..."/></div><div className="journal-filters">{categories.map(c=><button key={c} className={category===c?'active':''} onClick={()=>setCategory(c)}>{c}</button>)}</div></div>
        <div className="journal-directory-head"><div><small>PROJECT DIRECTORY</small><h2>{loading?'Loading projects...':`${visible.length} project${visible.length===1?'':'s'}`}</h2></div><p>Each entry can include multiple images, detailed engineering notes, video, technologies and moderated comments.</p></div>
        <div className="journal-project-grid">{visible.map((p,i)=><button className="journal-project-card" key={p.id} onClick={()=>setSelected(p)}>
          <div className="journal-project-image">{p.image_urls?.[0]?<img src={p.image_urls[0]} alt={p.title}/>:<div className="journal-image-placeholder"><FileImage/><span>Project media</span></div>}<span>{p.category}</span></div>
          <div className="journal-project-copy"><div className="journal-card-meta"><span>{p.year || 'Project'}</span><small><Clock3 size={14}/>Engineering journal</small></div><h3>{p.title}</h3><p>{p.summary}</p><div className="journal-tech small">{(p.technologies||[]).slice(0,3).map(t=><span key={t}>{t}</span>)}</div><div className="journal-open">Open project <ChevronRight size={17}/></div></div>
        </button>)}</div>
      </section>
    </main>

    <footer className="journal-footer"><div className="container"><span>© 2026 Sabbir Ahmmed Shehab</span><button onClick={onBack}>Return to portfolio</button></div></footer>
    {selected&&<ProjectModal project={selected} onClose={()=>setSelected(null)} session={session}/>} 
  </div>;
}
