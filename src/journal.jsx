import React,{useEffect,useMemo,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {ArrowLeft,ArrowRight,BookOpen,CalendarDays,Clock,Download,Home,Mail,Menu,Newspaper,Search,Tag,X} from 'lucide-react';
import {journalPosts} from './content/journalPosts.js';
import './styles.css';

function MouseAura(){
  useEffect(()=>{
    const fine=window.matchMedia('(pointer:fine)').matches;
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(!fine||reduced) return;
    const root=document.documentElement; let tx=innerWidth/2,ty=innerHeight/2,x=tx,y=ty,raf;
    const move=e=>{tx=e.clientX;ty=e.clientY;root.style.setProperty('--mouse-x',`${tx}px`);root.style.setProperty('--mouse-y',`${ty}px`)};
    const tick=()=>{x+=(tx-x)*.14;y+=(ty-y)*.14;root.style.setProperty('--cursor-x',`${x}px`);root.style.setProperty('--cursor-y',`${y}px`);raf=requestAnimationFrame(tick)};
    addEventListener('pointermove',move,{passive:true});tick();
    return()=>{removeEventListener('pointermove',move);cancelAnimationFrame(raf)};
  },[]);
  return <><div className="cursor-aura" aria-hidden="true"/><div className="cursor-dot" aria-hidden="true"/></>;
}

function Article({post,onBack}){
  useEffect(()=>window.scrollTo({top:0,behavior:'instant'}),[post.slug]);
  return <main className="journal-article">
    <div className="article-hero container">
      <button className="article-back" onClick={onBack}><ArrowLeft size={17}/> Back to Journal</button>
      <div className="journal-kicker">{post.category}</div>
      <h1>{post.title}</h1>
      <div className="article-meta"><span><CalendarDays/> {post.date}</span><span><Clock/> {post.readTime}</span></div>
      <p className="article-deck">{post.excerpt}</p>
      <img className="article-cover" src={post.cover} alt="Engineering journal cover"/>
    </div>
    <article className="article-body container">
      <div className="article-copy">
        {post.sections.map(s=><section key={s.heading}><h2>{s.heading}</h2><p>{s.body}</p></section>)}
        <div className="article-gallery"><h2>Project visuals</h2><div>{post.gallery.map((img,i)=><img key={img} src={img} alt={`${post.title} visual ${i+1}`}/>)}</div></div>
        <div className="article-tags"><Tag/>{post.tags.map(t=><span key={t}>{t}</span>)}</div>
      </div>
      <aside className="article-aside"><div><Newspaper/><h3>Engineering Journal</h3><p>Notes from product development, automation, documentation, manufacturing and technical training.</p></div><a href="mailto:sabbirahmmedshehab@gmail.com"><Mail/> Discuss this topic</a></aside>
    </article>
  </main>
}

function Journal(){
  const [menu,setMenu]=useState(false); const [query,setQuery]=useState(''); const [category,setCategory]=useState('All');
  const params=new URLSearchParams(location.search); const initial=params.get('post');
  const [selected,setSelected]=useState(journalPosts.find(p=>p.slug===initial)||null);
  const categories=['All',...new Set(journalPosts.map(p=>p.category))];
  const filtered=useMemo(()=>journalPosts.filter(p=>(category==='All'||p.category===category)&&(`${p.title} ${p.excerpt} ${p.tags.join(' ')}`).toLowerCase().includes(query.toLowerCase())),[category,query]);
  const open=p=>{history.pushState({},'',`./journal.html?post=${p.slug}`);setSelected(p)};
  const back=()=>{history.pushState({},'','./journal.html');setSelected(null)};
  useEffect(()=>{const pop=()=>{const s=new URLSearchParams(location.search).get('post');setSelected(journalPosts.find(p=>p.slug===s)||null)};addEventListener('popstate',pop);return()=>removeEventListener('popstate',pop)},[]);
  return <><MouseAura/><header className="nav-wrap"><nav className="nav container"><a href="/" className="brand"><span>SS</span><div><b>Sabbir Shehab</b><small>Assistant Engineer</small></div></a><div className="desktop-nav journal-topnav"><a href="/"><Home size={14}/> Portfolio</a><a className="active" href="./journal.html"><Newspaper size={14}/> Journal</a></div><a className="nav-cta desktop-nav" href="/cv/Sabbir_Ahmmed_Shehab_Assistant_Engineer_CV.pdf" download><Download size={16}/> Download CV</a><button className="menu-btn" onClick={()=>setMenu(!menu)} aria-label="Toggle menu">{menu?<X/>:<Menu/>}</button></nav>{menu&&<div className="mobile-menu"><a href="/">Portfolio</a><a href="./journal.html">Journal</a><a href="/cv/Sabbir_Ahmmed_Shehab_Assistant_Engineer_CV.pdf" download>Download CV</a></div>}</header>
  {selected?<Article post={selected} onBack={back}/>:<main className="journal-page">
    <section className="journal-hero"><div className="journal-grid-bg"/><div className="container journal-hero-inner"><div><div className="journal-kicker"><span/>Engineering Journal</div><h1>Ideas, systems and lessons from <em>practical engineering work.</em></h1><p>Field notes on product development, PLC automation, technical documentation, electronics, manufacturing and engineering training.</p></div><div className="journal-monogram"><Newspaper/><span>SS / JOURNAL</span></div></div></section>
    <section className="container journal-list-section"><div className="journal-toolbar"><label className="journal-search"><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search journal…" aria-label="Search journal"/></label><div className="journal-filters">{categories.map(c=><button key={c} className={category===c?'active':''} onClick={()=>setCategory(c)}>{c}</button>)}</div></div>
      <div className="journal-featured">{filtered[0]&&<button onClick={()=>open(filtered[0])} className="featured-post"><img src={filtered[0].cover} alt="Featured engineering article"/><div><span>{filtered[0].category}</span><h2>{filtered[0].title}</h2><p>{filtered[0].excerpt}</p><small>{filtered[0].date} · {filtered[0].readTime}</small><b>Read article <ArrowRight/></b></div></button>}</div>
      <div className="journal-cards">{filtered.slice(1).map(p=><button className="journal-card" key={p.slug} onClick={()=>open(p)}><img src={p.cover} alt="Engineering journal article"/><div><small>{p.category}</small><h3>{p.title}</h3><p>{p.excerpt}</p><span>{p.readTime}<ArrowRight/></span></div></button>)}</div>
      {!filtered.length&&<div className="journal-empty"><BookOpen/><h3>No articles found</h3><p>Try another search or category.</p></div>}
    </section>
    <section className="journal-cta"><div className="container"><div><span>Engineering knowledge, documented.</span><h2>More field notes will be added as the portfolio grows.</h2></div><a href="mailto:sabbirahmmedshehab@gmail.com" className="btn white"><Mail/> Contact me</a></div></section>
  </main>}
  <footer><div className="container"><span>© 2026 Sabbir Ahmmed Shehab</span><span>Engineering Journal · Assistant Engineer</span></div></footer></>;
}
createRoot(document.getElementById('root')).render(<Journal/>);
