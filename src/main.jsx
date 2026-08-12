import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight, Award, BookOpen, BriefcaseBusiness, CheckCircle2, ChevronRight,
  CircuitBoard, ClipboardCheck, Cpu, Download, ExternalLink, Factory,
  FileText, GraduationCap, Layers3, Mail, MapPin, Menu, Network, Phone,
  Search, Settings2, ShieldCheck, Sparkles, Wrench, X, Zap, Newspaper
} from 'lucide-react';
import './styles.css';

const products = [
  { year:'2022', category:'Electrical', title:'DC Circuit & Network Trainer', desc:'A structured practical platform for DC laws, component behaviour and network-analysis experiments.', role:'Product development · testing · documentation', tech:['Circuit design','Measurement','Lab training'] },
  { year:'2022', category:'Measurement', title:'Wheatstone Bridge Trainer', desc:'Experiment-oriented trainer for resistance measurement, bridge balancing and instrumentation principles.', role:'Development · validation · user manual', tech:['Bridge circuit','Calibration','Documentation'] },
  { year:'2022', category:'Sensors', title:'Basic & Advanced Sensor Trainers', desc:'Progressive sensor-learning systems for transducer behaviour, interfacing and practical measurement.', role:'Hardware development · testing', tech:['Sensors','Signal conditioning','Training'] },
  { year:'2022', category:'Electronics', title:'Industrial Electronics Trainer', desc:'Practical electronics system covering devices, testing, troubleshooting and industrial applications.', role:'Design support · assembly · training', tech:['Electronics','PCB','Troubleshooting'] },
  { year:'2023', category:'Embedded', title:'Arduino Development Board', desc:'Custom microcontroller learning platform for programming, peripheral interfacing and project development.', role:'PCB · firmware support · documentation', tech:['Arduino','Embedded C','PCB'] },
  { year:'2023', category:'IoT', title:'IoT Trainer', desc:'Connected-device training platform integrating sensors, wireless communication and cloud-oriented concepts.', role:'System integration · documentation', tech:['ESP32','Sensors','IoT'] },
  { year:'2023', category:'Automation', title:'PLC Trainer Board', desc:'Industrial automation learning platform for PLC programming, field wiring and hardware troubleshooting.', role:'Panel integration · PLC setup · training', tech:['Delta PLC','WPLSoft','I/O wiring'] },
  { year:'2023', category:'Protection', title:'Switchgear & Protection Trainer', desc:'Hands-on platform for protection devices, switching logic, safety and fault-analysis exercises.', role:'Hardware development · testing', tech:['Protection','Switchgear','Safety'] },
  { year:'2023', category:'Renewable', title:'Solar Trainer System', desc:'Renewable-energy trainer for solar fundamentals, measurements, charging and system-level understanding.', role:'Product support · experiment design', tech:['Solar PV','Measurement','Power'] },
  { year:'2024', category:'Digital', title:'Digital Logic Trainer Series', desc:'Experiment-oriented trainers for logic gates, combinational circuits and sequential systems.', role:'Design · validation · manuals', tech:['Digital logic','IC testing','Experiments'] },
  { year:'2024', category:'Networking', title:'LAN Trainer', desc:'Practical networking trainer for cabling, device configuration, topology and troubleshooting.', role:'Configuration · training · support', tech:['LAN','Networking','Diagnostics'] },
  { year:'2025–26', category:'Robotics', title:'Robotics Trainer Board', desc:'Modular learning platform for control, sensing, actuators and robotics-system integration.', role:'Development support · sourcing', tech:['Robotics','Sensors','Motor control'] }
];

const caseStudies = [
  { no:'01', title:'PLC Training Platform', type:'Industrial Automation', text:'Developed and supported a practical PLC training environment combining controller programming, I/O wiring, hardware connection and troubleshooting exercises.', impact:'Made automation concepts demonstrable through a repeatable one-student-one-setup workflow.', tags:['PLC','WPLSoft','Hardware I/O','Training'] },
  { no:'02', title:'QR-Enabled Technical Documentation', type:'Documentation System', text:'Introduced QR-linked manuals and experiment resources directly on trainer systems, reducing reliance on printed copies and improving access to updated instructions.', impact:'Connected physical equipment with controlled digital documentation and faster user support.', tags:['QR workflow','Manuals','Version control','User experience'] },
  { no:'03', title:'Trainer Product Lifecycle', type:'Product Engineering', text:'Worked across concept review, component sourcing, PCB and assembly support, testing, documentation, delivery and user training for educational engineering products.', impact:'Built practical understanding of how engineering products move from idea to repeatable production.', tags:['Product development','Manufacturing','QA','Delivery'] }
];

const training = [
  ['Chapai Nawabganj Polytechnic Institute','Trainer-board orientation and technical knowledge transfer'],
  ['Dinajpur Polytechnic Institute','Trainer operation, experiments and practical laboratory use'],
  ['Rangpur Polytechnic Institute','Engineering laboratory systems and troubleshooting'],
  ['Shariatpur Polytechnic Institute','Multiple product-specific technical sessions'],
  ['Sweden Polytechnic Institute','Trainer-board operation and experiment guidance'],
  ['PFI / Navy Base, Kaptai','Technical familiarisation and product support'],
  ['Sirajganj Polytechnic Institute','LOGO! Soft Comfort, WPLSoft, PLC wiring and pneumatic conveyor support'],
  ['Jashore Polytechnic Institute','LAN trainer configuration and practical training'],
  ['Satkhira Polytechnic Institute','Digital logic and logic-gate trainer training']
];

const skills = [
  {name:'PLC & Automation', icon:Settings2, items:['Siemens LOGO!','Delta PLC','WPLSoft','PLC hardware wiring','HMI integration','Fault diagnosis']},
  {name:'Embedded Systems', icon:Cpu, items:['Arduino','STM32','ESP32','ESP8266','PIC','Sensor interfacing']},
  {name:'Electronics & PCB', icon:CircuitBoard, items:['Proteus','LTspice','EasyEDA','PCB design','Testing','Troubleshooting']},
  {name:'Manufacturing', icon:Factory, items:['PCB assembly','Trainer assembly','Industrial panels','Power supplies','Inspection','Production support']},
  {name:'Technical Documentation', icon:FileText, items:['User manuals','Experiment guides','Wiring diagrams','Installation guides','QR documentation','Troubleshooting']},
  {name:'Visual & Office Tools', icon:Layers3, items:['Microsoft Office','Photoshop','Illustrator','Premiere Pro','CapCut','Presentation design']}
];

const lifecycle = [
  ['01','Research',Search,'Define learning objectives and technical requirements.'],
  ['02','Design',CircuitBoard,'Develop circuits, layouts, interfaces and structure.'],
  ['03','Source',Network,'Select practical components and coordinate procurement.'],
  ['04','Build',Factory,'Support PCB, wiring, assembly and production execution.'],
  ['05','Validate',ShieldCheck,'Test functions, experiments, safety and usability.'],
  ['06','Document',ClipboardCheck,'Create manuals, diagrams and QR-linked resources.'],
  ['07','Train',GraduationCap,'Transfer product knowledge to teachers and users.']
];

function MouseAura(){
  useEffect(()=>{
    const fine=window.matchMedia('(pointer:fine)').matches;
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(!fine||reduced) return;
    const root=document.documentElement;
    let tx=window.innerWidth/2, ty=window.innerHeight/2, x=tx, y=ty, raf;
    const move=e=>{tx=e.clientX;ty=e.clientY;root.style.setProperty('--mouse-x',`${tx}px`);root.style.setProperty('--mouse-y',`${ty}px`)};
    const tick=()=>{x+=(tx-x)*.14;y+=(ty-y)*.14;root.style.setProperty('--cursor-x',`${x}px`);root.style.setProperty('--cursor-y',`${y}px`);raf=requestAnimationFrame(tick)};
    window.addEventListener('pointermove',move,{passive:true});tick();
    return()=>{window.removeEventListener('pointermove',move);cancelAnimationFrame(raf)};
  },[]);
  return <><div className="cursor-aura" aria-hidden="true"/><div className="cursor-dot" aria-hidden="true"/></>;
}

function App(){
  const [menu,setMenu]=useState(false);
  const [filter,setFilter]=useState('All');
  const [selected,setSelected]=useState(null);
  const [activeSection,setActiveSection]=useState('home');
  const [scrollProgress,setScrollProgress]=useState(0);
  const categories=['All',...new Set(products.map(p=>p.category))];
  const visible=useMemo(()=>filter==='All'?products:products.filter(p=>p.category===filter),[filter]);

  useEffect(()=>{
    const onScroll=()=>{
      const max=document.documentElement.scrollHeight-window.innerHeight;
      setScrollProgress(max>0?(window.scrollY/max)*100:0);
    };
    onScroll();
    window.addEventListener('scroll',onScroll,{passive:true});

    const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>e.isIntersecting&&e.target.classList.add('visible')),{threshold:.12});
    document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

    const sectionObserver=new IntersectionObserver(entries=>{
      const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(visible) setActiveSection(visible.target.id || 'home');
    },{rootMargin:'-35% 0px -55% 0px',threshold:[0,.2,.5]});
    document.querySelectorAll('main section[id], main[id]').forEach(el=>sectionObserver.observe(el));

    return()=>{ revealObserver.disconnect(); sectionObserver.disconnect(); window.removeEventListener('scroll',onScroll); };
  },[]);

  const nav=['About','Experience','Work','Manuals','Training','Skills','Contact'];
  return <>
    <MouseAura/>
    <div className="scroll-progress" style={{transform:`scaleX(${scrollProgress/100})`}} aria-hidden="true"/>
    <header className="nav-wrap">
      <nav className="nav container">
        <a href="#home" className="brand"><span>SS</span><div><b>Sabbir Shehab</b><small>Assistant Engineer</small></div></a>
        <div className="desktop-nav">{nav.map(n=><a key={n} className={activeSection===n.toLowerCase()?'active':''} href={'#'+n.toLowerCase()}>{n}</a>)}<a href="./journal.html" className="journal-nav"><Newspaper size={14}/> Journal</a></div>
        <a className="nav-cta desktop-nav" href="/cv/Sabbir_Ahmmed_Shehab_Assistant_Engineer_CV.pdf" download><Download size={16}/> Download CV</a>
        <button className="menu-btn" onClick={()=>setMenu(!menu)} aria-label="Toggle menu">{menu?<X/>:<Menu/>}</button>
      </nav>
      {menu&&<div className="mobile-menu">{nav.map(n=><a key={n} href={'#'+n.toLowerCase()} onClick={()=>setMenu(false)}>{n}</a>)}<a href="./journal.html" onClick={()=>setMenu(false)}>Journal</a><a href="/cv/Sabbir_Ahmmed_Shehab_Assistant_Engineer_CV.pdf" download>Download CV</a></div>}
    </header>

    <main id="home">
      <section className="hero">
        <div className="hero-mesh" aria-hidden="true"/><div className="signal-line" aria-hidden="true"/>
        <div className="circuit-field" aria-hidden="true">{[1,2,3,4,5,6,7,8].map(i=><span key={i} className={'circuit-node node-'+i}/>)}</div>
        <div className="hero-rings" aria-hidden="true"><i/><i/><i/></div>
        <div className="container hero-grid">
          <div className="hero-copy reveal visible">
            <div className="eyebrow"><span/> Assistant Engineer · Product Development</div>
            <h1>I turn engineering concepts into <em>working products, manuals and practical training.</em></h1>
            <p>Electronics, embedded systems, PLC automation and educational trainer development—supported from design and manufacturing through documentation and knowledge transfer.</p>
            <div className="hero-actions">
              <a className="btn primary" href="#work">View Selected Work <ArrowRight size={18}/></a>
              <a className="btn secondary" href="/cv/Sabbir_Ahmmed_Shehab_Assistant_Engineer_CV.pdf" download><Download size={18}/> Download CV</a>
            </div>
            <div className="micro-proof"><span><CheckCircle2/> Product Development</span><span><CheckCircle2/> PLC & Embedded</span><span><CheckCircle2/> Technical Manuals</span></div>
          </div>
          <div className="portrait-stage reveal visible float-stage">
            <div className="portrait-glow"/><div className="portrait-frame"><img src="/assets/profile.png" alt="Sabbir Ahmmed Shehab"/></div>
            <div className="floating-chip chip-one"><CircuitBoard/><span><b>Build</b> Practical trainer systems</span></div>
            <div className="floating-chip chip-two"><FileText/><span><b>Document</b> Experiment-oriented manuals</span></div>
            <div className="portrait-meta"><span>Available for engineering opportunities</span><b>Dhaka, Bangladesh</b></div>
          </div>
        </div>
      </section>

      <section className="metric-band">
        <div className="container metric-grid">
          <div><strong>2022–2026</strong><span>Product-development experience</span></div>
          <div><strong>12+</strong><span>Trainer-system categories</span></div>
          <div><strong>9</strong><span>Technical training locations</span></div>
          <div><strong>360°</strong><span>Design-to-training exposure</span></div>
        </div>
      </section>

      <section id="about" className="section container about-layout">
        <div className="section-index reveal">01 / Profile</div>
        <div className="reveal"><div className="section-kicker">Engineering profile</div><h2>Practical engineering ownership—not just task execution.</h2></div>
        <div className="about-story reveal"><p className="lead">I work where product development, manufacturing and technical education meet.</p><p>Since 2022, I have supported the development of educational and industrial trainer systems across electronics, electrical engineering, embedded systems, automation, networking and robotics. My contribution extends beyond hardware: I create experiment-oriented manuals, wiring guidance and QR-linked resources, then help users operate and troubleshoot the final systems.</p><p>This gives me an end-to-end perspective—understanding not only how a circuit or controller works, but how a complete product must be designed, assembled, validated, documented and delivered for reliable use.</p></div>
        <div className="capability-stack reveal">
          {[['Product engineering','Requirement to validated hardware'],['Technical documentation','Clear manuals and experiment workflows'],['Manufacturing support','Assembly, testing and quality checks'],['Knowledge transfer','Training, demonstrations and troubleshooting']].map(([a,b],i)=><div key={a}><span>0{i+1}</span><section><b>{a}</b><small>{b}</small></section></div>)}
        </div>
      </section>

      <section id="experience" className="section muted-section">
        <div className="container">
          <div className="section-head reveal"><div><div className="section-kicker">Career journey</div><h2>Experience shaped by hands-on responsibility.</h2></div><p>My career progression reflects increasing ownership across product development, service, documentation and technical training.</p></div>
          <div className="career-timeline animated-line">
            <article className="timeline-item reveal"><div className="timeline-marker"><Factory/></div><div className="timeline-meta"><span>2022—Present</span><small>Current</small></div><div className="timeline-body featured"><div className="role-line"><div><h3>Assistant Engineer</h3><h4>Fabotronix Limited · Dhaka</h4></div><span className="status-badge">Product Engineering</span></div><p>Supporting engineering trainer and automation product development across design review, manufacturing, validation, technical documentation and user training.</p><div className="timeline-columns"><ul><li>Develop and continuously improve educational engineering trainers.</li><li>Support PLC, embedded, PCB and panel-based systems.</li><li>Create experiment manuals, wiring guidance and QR-linked documentation.</li></ul><ul><li>Conduct product training for teachers and institutional users.</li><li>Support component sourcing and technical evaluation.</li><li>Assist production when workload requires full trainer assembly and testing.</li></ul></div></div></article>
            <article className="timeline-item reveal"><div className="timeline-marker"><Wrench/></div><div className="timeline-meta"><span>2023</span><small>6 months</small></div><div className="timeline-body"><div className="role-line"><div><h3>Service Engineer</h3><h4>Gazi International</h4></div><span className="status-badge muted">Field Service</span></div><p>Diagnosed and serviced peripheral, centrifugal, submersible and drainage pumps, motors and selected home appliances—strengthening systematic fault-finding and customer-facing technical support.</p><div className="career-tags"><span>Diagnostics</span><span>Pumps & motors</span><span>Service support</span></div></div></article>
            <article className="timeline-item reveal"><div className="timeline-marker"><GraduationCap/></div><div className="timeline-meta"><span>Ongoing</span><small>Academic</small></div><div className="timeline-body"><div className="role-line"><div><h3>B.Sc. in Electrical & Electronic Engineering</h3><h4>Manarat International University</h4></div><span className="status-badge muted">In progress</span></div><p>Continuing undergraduate study while applying a completed Diploma in Electronics Engineering in real product, manufacturing and automation environments.</p></div></article>
          </div>
        </div>
      </section>

      <section id="work" className="section container">
        <div className="section-head reveal"><div><div className="section-kicker">Selected work</div><h2>Engineering case studies.</h2></div><p>Examples of the systems and workflows that best represent how I approach engineering work.</p></div>
        <div className="case-grid">
          {caseStudies.map((c,i)=><article className="case-card reveal" key={c.no}><div className={'case-visual visual-'+(i+1)}><span>{c.no}</span><CircuitBoard/></div><div className="case-content"><div className="case-top"><small>{c.type}</small></div><h3>{c.title}</h3><p>{c.text}</p><div className="impact"><Sparkles/><span>{c.impact}</span></div><div className="case-tags">{c.tags.map(t=><span key={t}>{t}</span>)}</div></div></article>)}
        </div>

        <div className="portfolio-head reveal"><div><h3>Product portfolio</h3><p>Filter the systems below and open any item for role and technology details.</p></div><div className="filters">{categories.map(c=><button key={c} className={filter===c?'active':''} onClick={()=>setFilter(c)}>{c}</button>)}</div></div>
        <div className="product-grid">
          {visible.map((p,i)=><button className="product-card reveal" key={p.title} onClick={()=>setSelected(p)}><div className={'product-visual category-'+p.category.toLowerCase().replace(/[^a-z0-9]+/g,'-')}><span>{String(i+1).padStart(2,'0')}</span><CircuitBoard/></div><div className="product-content"><div className="card-top"><span>{p.year}</span><small>{p.category}</small></div><h3>{p.title}</h3><p>{p.desc}</p><div className="tech-preview">{p.tech.slice(0,2).map(t=><span key={t}>{t}</span>)}</div><div className="card-foot"><span>View details</span><ArrowRight size={17}/></div></div></button>)}
        </div>
      </section>

      <section id="manuals" className="section manuals-section">
        <div className="container manuals-layout">
          <div className="manual-copy reveal"><div className="section-kicker">Technical documentation</div><h2>Documentation engineered for actual use.</h2><p className="lead">A trainer is only complete when users can understand, connect, experiment and troubleshoot it correctly.</p><p>I develop user manuals and experiment guides covering safety, system overview, panel connection, circuit diagrams, operating procedures, observations and troubleshooting. I also implemented QR-based access to digital documentation on physical trainer systems.</p><div className="manual-points">{[['Experiment-oriented structure',BookOpen],['Wiring and circuit guidance',CircuitBoard],['QR-linked digital access',Network],['Troubleshooting support',Wrench]].map(([t,I])=><div key={t}><I/><span>{t}</span></div>)}</div></div>
          <div className="manual-collage reveal"><img className="manual-main" src="/assets/manuals-folder.png" alt="Technical manual library"/><img className="manual-small one" src="/assets/10438.jpg" alt="Manual records"/><img className="manual-small two" src="/assets/10444.jpg" alt="Documentation records"/><div className="doc-stat"><strong>Structured library</strong><span>Manuals organised by trainer and technology</span></div></div>
        </div>
      </section>

      <section className="section dark-section">
        <div className="container"><div className="section-head reveal"><div><div className="section-kicker light">Product lifecycle</div><h2>From requirement to reliable use.</h2></div><p>My value comes from understanding the complete chain—not only one isolated engineering stage.</p></div><div className="lifecycle-grid flow-grid">{lifecycle.map(([n,t,I,d])=><div className="life-card reveal" key={t}><span>{n}</span><I/><h3>{t}</h3><p>{d}</p></div>)}</div></div>
      </section>

      <section id="training" className="section container">
        <div className="section-head reveal"><div><div className="section-kicker">Knowledge transfer</div><h2>Technical training across Bangladesh.</h2></div><p>Product knowledge transferred through trainer operation, software, wiring, troubleshooting and experiment demonstrations.</p></div>
        <div className="training-layout"><div className="map-panel reveal"><div className="map-orbit"><div className="map-center">BD<span>Training footprint</span></div>{[1,2,3,4,5,6].map(i=><i key={i} className={'dot dot-'+i}/>)}</div><div className="map-caption"><MapPin/><span>Polytechnic and institutional training across multiple districts</span></div></div><div className="training-list">{training.map(([a,b],i)=><article className="training-card reveal" key={a}><span>{String(i+1).padStart(2,'0')}</span><div><h3>{a}</h3><p>{b}</p></div><ChevronRight/></article>)}</div></div>
      </section>

      <section id="skills" className="section muted-section">
        <div className="container"><div className="section-head reveal"><div><div className="section-kicker">Technical capability</div><h2>Tools supported by practical application.</h2></div><p>Skills are grouped by the engineering outcomes they help deliver.</p></div><div className="skills-grid">{skills.map(({name,icon:I,items})=><article className="skill-card reveal" key={name}><div className="skill-icon"><I/></div><h3>{name}</h3><div>{items.map(t=><span key={t}>{t}</span>)}</div></article>)}</div></div>
      </section>

      <section className="section container education-section">
        <div className="section-index reveal">07 / Education</div><div className="education-main reveal"><div className="section-kicker">Education & development</div><h2>Strong electronics foundation with continuing EEE study.</h2><div className="education-grid"><article><span>Completed</span><h3>Diploma in Electronics Engineering</h3><p>Foundation in electronics, circuits, measurement, digital systems, microcontrollers and practical laboratory work.</p></article><article><span>In progress</span><h3>B.Sc. in Electrical & Electronic Engineering</h3><p>Continuing academic development alongside full-time practical engineering exposure.</p></article><article><span>Continuous</span><h3>Industrial & Self-Directed Learning</h3><p>PLC systems, product development, PCB tools, technical documentation and manufacturing workflows.</p></article></div></div>
      </section>

      <section id="contact" className="contact-section">
        <div className="container contact-layout"><div className="reveal"><div className="section-kicker light">Let’s connect</div><h2>Looking for an engineer who can build, document and support real products?</h2><p>I am interested in product development, electronics, automation, technical documentation, manufacturing and engineering-support opportunities.</p><div className="contact-actions"><a className="btn white" href="mailto:sabbirahmmedshehab@gmail.com"><Mail/> Send Email</a><a className="btn outline" href="/cv/Sabbir_Ahmmed_Shehab_Assistant_Engineer_CV.pdf" download><Download/> Download CV</a></div></div><div className="contact-card reveal"><a href="mailto:sabbirahmmedshehab@gmail.com"><Mail/><span><small>Email</small><b>sabbirahmmedshehab@gmail.com</b></span></a><a href="tel:+8801635166768"><Phone/><span><small>Phone</small><b>+880 1635-166768</b></span></a><div><MapPin/><span><small>Location</small><b>Dhaka, Bangladesh</b></span></div><div><Award/><span><small>Target roles</small><b>Electronics · Automation · Product Engineering</b></span></div></div></div>
      </section>
    </main>

    <footer><div className="container"><span>© 2026 Sabbir Ahmmed Shehab</span><span>Assistant Engineer · Engineering Portfolio</span></div></footer>

    {selected&&<div className="modal-backdrop" onClick={()=>setSelected(null)}><article className="modal" onClick={e=>e.stopPropagation()}><button onClick={()=>setSelected(null)} aria-label="Close"><X/></button><div className="section-kicker">{selected.category} · {selected.year}</div><h2>{selected.title}</h2><p>{selected.desc}</p><div className="modal-block"><small>My contribution</small><strong>{selected.role}</strong></div><div className="modal-tech">{selected.tech.map(t=><span key={t}>{t}</span>)}</div><a href="#contact" className="btn primary" onClick={()=>setSelected(null)}>Discuss this work <ArrowRight/></a></article></div>}
  </>;
}

createRoot(document.getElementById('root')).render(<App/>);
