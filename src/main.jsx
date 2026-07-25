import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight, BriefcaseBusiness, CheckCircle2, ChevronDown, CircuitBoard,
  ClipboardCheck, Cpu, Download, ExternalLink, Factory, GraduationCap,
  Mail, MapPin, Menu, Network, Phone, ShieldCheck, Wrench, X, Zap
} from 'lucide-react';
import './styles.css';

const products = [
  { year:'2022', category:'Electrical', title:'DC Circuit & Network Trainer', desc:'Practical trainer for DC circuit analysis, component behavior and network experiments.' },
  { year:'2022', category:'Electrical', title:'AC Circuit & Network Trainer', desc:'Hands-on platform for AC circuit, phase and network investigations.' },
  { year:'2022', category:'Measurement', title:'Wheatstone Bridge Trainer', desc:'Trainer focused on bridge measurement principles and resistance experiments.' },
  { year:'2022', category:'Sensors', title:'Basic & Advanced Sensor Trainers', desc:'Progressive sensor-interfacing systems for practical learning and testing.' },
  { year:'2022', category:'Electronics', title:'Basic & Industrial Electronics Trainers', desc:'Training systems covering core electronic devices, testing and applications.' },
  { year:'2022', category:'Electrical', title:'Transformer Trainer', desc:'Practical transformer studies with measurement and operating exercises.' },
  { year:'2022', category:'Electronics', title:'Filter Circuit Trainer Series', desc:'High-pass, low-pass, band-pass and band-stop filter learning systems.' },
  { year:'2022', category:'Measurement', title:'RLC Decade Boxes', desc:'Resistance, inductance and capacitance decade boxes for laboratory experimentation.' },
  { year:'2023', category:'Embedded', title:'Arduino Development Board', desc:'Custom learning board for microcontroller programming and peripheral interfacing.' },
  { year:'2023', category:'IoT', title:'IoT Trainer', desc:'A practical training platform for connected-device concepts and sensor integration.' },
  { year:'2023', category:'Automation', title:'PLC Trainer Board', desc:'PLC hardware and programming platform supporting practical automation exercises.' },
  { year:'2023', category:'Protection', title:'Switchgear & Protection Trainer', desc:'Training system for switchgear, protection logic and electrical safety concepts.' },
  { year:'2023', category:'Renewable', title:'Solar Trainer Systems', desc:'Solar trainer board and kit for renewable-energy experiments and system understanding.' },
  { year:'2023', category:'Electrical', title:'Electrical Circuit & Network Total Lab', desc:'Integrated laboratory solution covering broad electrical network experiments.' },
  { year:'2024', category:'Digital', title:'Digital Logic & Digital Circuit Trainers', desc:'Hands-on trainers for logic gates, combinational and sequential digital circuits.' },
  { year:'2024', category:'Electrical', title:'Single & Three Phase Transformer Trainers', desc:'Dedicated platforms for transformer experiments across single- and three-phase systems.' },
  { year:'2024', category:'Networking', title:'LAN Trainer', desc:'Networking trainer for practical LAN configuration, hardware and troubleshooting.' },
  { year:'2024', category:'Service', title:'LED TV, PC Hardware & Laptop Trainers', desc:'Service-oriented training systems for electronic and computer hardware learning.' },
  { year:'2025–26', category:'Communication', title:'EPABX Trainer Board', desc:'Communication-system trainer for EPABX configuration and practical exercises.' },
  { year:'2025–26', category:'Robotics', title:'Robotics Trainer Board', desc:'Training platform for robotics fundamentals, control and practical integration.' }
];

const training = [
  ['Chapai Nawabganj Polytechnic Institute','Trainer-board orientation and technical training'],
  ['Dinajpur Polytechnic Institute','Trainer-board operation and practical knowledge transfer'],
  ['Rangpur Polytechnic Institute','Technical training for engineering laboratory systems'],
  ['Shariatpur Polytechnic Institute','Multiple trainer-board training sessions'],
  ['Sweden Polytechnic Institute','Trainer-board technical training'],
  ['PFI / Navy Base, Kaptai','Technical training and product familiarization'],
  ['Sirajganj Polytechnic Institute','LOGO! Soft Comfort, WPLSoft, PLC hardware connection, legacy trainer repair and pneumatic conveyor system'],
  ['Jashore Polytechnic Institute','LAN trainer training'],
  ['Satkhira Polytechnic Institute','Logic-gate trainer training']
];

const skills = {
  'PLC & Automation':['Siemens LOGO!','Delta PLC','WPLSoft','PLC/HMI hardware setup','Communication setup','Troubleshooting'],
  'Embedded Systems':['Arduino','STM32','ESP32','ESP8266','PIC','Sensor interfacing'],
  'Electronics & PCB':['Proteus','LTspice','EasyEDA','PCB design','Electronic troubleshooting'],
  'Manufacturing':['Trainer assembly','PCB assembly','Industrial panels','Power supplies','Testing & inspection','Quality checks'],
  'Documentation':['User manuals','Experiment manuals','Wiring diagrams','Installation guides','Troubleshooting guides','QR documentation'],
  'Design & Productivity':['Microsoft Office','Adobe Photoshop','Illustrator','Premiere Pro','CapCut']
};

function App(){
  const [menu,setMenu]=useState(false);
  const [filter,setFilter]=useState('All');
  const categories=['All',...new Set(products.map(p=>p.category))];
  const visible=useMemo(()=>filter==='All'?products:products.filter(p=>p.category===filter),[filter]);
  useEffect(()=>{
    const obs=new IntersectionObserver(entries=>entries.forEach(e=>e.isIntersecting&&e.target.classList.add('visible')),{threshold:.12});
    document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
    return()=>obs.disconnect();
  },[]);
  const nav=['About','Experience','Products','Manuals','Training','Skills','Contact'];
  return <>
    <header className="nav-wrap">
      <nav className="nav container">
        <a href="#home" className="brand"><span>SS</span><div><b>Sabbir Shehab</b><small>Assistant Engineer</small></div></a>
        <div className="desktop-nav">{nav.map(n=><a key={n} href={'#'+n.toLowerCase()}>{n}</a>)}</div>
        <a className="nav-cta desktop-nav" href="/cv/Sabbir_Ahmmed_Shehab_Assistant_Engineer_CV.pdf" download><Download size={16}/> Download CV</a>
        <button className="menu-btn" onClick={()=>setMenu(!menu)} aria-label="Toggle menu">{menu?<X/>:<Menu/>}</button>
      </nav>
      {menu&&<div className="mobile-menu">{nav.map(n=><a key={n} href={'#'+n.toLowerCase()} onClick={()=>setMenu(false)}>{n}</a>)}<a href="/cv/Sabbir_Ahmmed_Shehab_Assistant_Engineer_CV.pdf" download>Download CV</a></div>}
    </header>

    <main id="home">
      <section className="hero">
        <div className="circuit-bg" aria-hidden="true"><span/><span/><span/><span/><span/></div>
        <div className="container hero-grid">
          <div className="hero-copy reveal visible">
            <div className="eyebrow"><span/> Assistant Engineer · Dhaka, Bangladesh</div>
            <h1>I develop engineering products from <em>concept</em> to classroom and industry use.</h1>
            <p>Product development, industrial automation, technical documentation, manufacturing support and engineering training—combined across the full product lifecycle.</p>
            <div className="hero-actions">
              <a className="btn primary" href="#products">Explore Engineering Work <ArrowRight size={18}/></a>
              <a className="btn secondary" href="/cv/Sabbir_Ahmmed_Shehab_Assistant_Engineer_CV.pdf" download><Download size={18}/> Download CV</a>
            </div>
            <div className="hero-pills"><span>Siemens LOGO!</span><span>Delta PLC</span><span>Embedded Systems</span><span>Technical Manuals</span></div>
          </div>
          <div className="portrait-card reveal visible">
            <div className="portrait-frame"><img src="/assets/profile.png" alt="Sabbir Ahmmed Shehab"/></div>
            <div className="portrait-meta"><b>Sabbir Ahmmed Shehab</b><span>Product Development · Automation · Documentation</span></div>
          </div>
        </div>
      </section>

      <section className="proof-strip">
        <div className="container proof-grid">
          <div><b>9 PLC brands</b><span>covered through technical documentation</span></div>
          <div><b>2022–2026</b><span>multi-year product-development record</span></div>
          <div><b>Nationwide</b><span>polytechnic teacher-training exposure</span></div>
          <div><b>Full lifecycle</b><span>design, build, test, document and train</span></div>
        </div>
      </section>

      <section id="about" className="section container split">
        <div className="section-tag reveal">About</div>
        <div className="reveal"><h2>Engineering depth built through practical ownership.</h2><p className="lead">My work sits at the intersection of product engineering, technical education and industrial execution.</p></div>
        <div className="about-copy reveal"><p>Since 2022, I have designed and improved engineering trainer systems across electrical, electronics, automation, embedded systems, networking, renewable energy and robotics. I also established QR-enabled documentation practices and began creating experiment-oriented user manuals before generative AI became publicly available.</p><p>I later adopted AI-assisted workflows to accelerate documentation while retaining engineering review, accuracy and usability. Because I design the systems, I also train teachers and users on operation, programming, hardware connection, troubleshooting and maintenance.</p></div>
        <div className="principles reveal">
          {[['Concept to Product',CircuitBoard],['Document for Use',ClipboardCheck],['Build & Validate',Factory],['Train & Support',GraduationCap]].map(([t,I])=><div key={t}><I/><b>{t}</b><span>Practical ownership across every stage.</span></div>)}
        </div>
      </section>

      <section id="experience" className="section soft">
        <div className="container"><div className="section-head reveal"><div><span className="section-tag">Experience</span><h2>Career journey</h2></div><p>Progressive technical responsibility across product development, service engineering and practical training.</p></div>
          <div className="timeline">
            <article className="timeline-item reveal"><div className="time">Current</div><div><h3>Assistant Engineer</h3><h4>Fabotronix Limited</h4><p>Engineering product development, PLC and embedded systems, trainer design, documentation, production support, testing, technical training and supplier communication.</p><ul><li>Owns product concepts through assembly, testing, documentation and training.</li><li>Maintains QR-enabled product documentation.</li><li>Supports international technical sourcing for robotics and tender requirements.</li></ul></div></article>
            <article className="timeline-item reveal"><div className="time">2023 · 6 months</div><div><h3>Service Engineer</h3><h4>Gazi International</h4><p>Hands-on servicing exposure across peripheral, centrifugal, submersible and drainage pumps, electric motors and home appliances, excluding motor rewinding.</p></div></article>
            <article className="timeline-item reveal"><div className="time">Feb 2022</div><div><h3>Engineering Product Development</h3><h4>Fabotronix Limited</h4><p>Joined Fabotronix and began hands-on work in trainer-board development, design improvement, technical documentation, production support and user training.</p></div></article>
          </div>
        </div>
      </section>

      <section id="products" className="section container">
        <div className="section-head reveal"><div><span className="section-tag">Product Development</span><h2>Selected engineering systems</h2></div><p>A representative portfolio organized by year and technical domain.</p></div>
        <div className="filters reveal">{categories.map(c=><button className={filter===c?'active':''} onClick={()=>setFilter(c)} key={c}>{c}</button>)}</div>
        <div className="product-grid">{visible.map((p,i)=><article className="product-card reveal" key={p.title}><div className="card-top"><span>{p.year}</span><small>{p.category}</small></div><h3>{p.title}</h3><p>{p.desc}</p><div className="card-foot"><span>Engineering product</span><ArrowRight size={17}/></div></article>)}</div>
      </section>

      <section id="manuals" className="section manuals-section">
        <div className="container manuals-grid">
          <div className="reveal"><span className="section-tag">Technical Documentation</span><h2>Documentation designed as part of the product—not an afterthought.</h2><p className="lead">User manuals, experiment procedures, wiring diagrams, installation guidance, troubleshooting and QR-enabled access.</p><div className="manual-points"><div><CheckCircle2/>Started manual development before public generative AI tools.</div><div><CheckCircle2/>Adopted AI later to improve speed while preserving engineering review.</div><div><CheckCircle2/>Documentation experience spans multiple PLC platforms and trainer categories.</div></div></div>
          <div className="manual-visual reveal"><img src="/assets/manuals-folder.png" alt="Technical user manual portfolio folders"/><div className="floating-note"><ClipboardCheck/><b>Living documentation system</b><span>Continually updated with products and revisions.</span></div></div>
        </div>
      </section>

      <section id="training" className="section container">
        <div className="section-head reveal"><div><span className="section-tag">Technical Training</span><h2>Knowledge transfer across Bangladesh</h2></div><p>Teacher and user training based on direct product-design ownership.</p></div>
        <div className="training-grid">{training.map(([place,topic])=><article className="training-card reveal" key={place}><MapPin/><div><h3>{place}</h3><p>{topic}</p></div></article>)}</div>
      </section>

      <section className="section dark-section">
        <div className="container lifecycle">
          <div className="reveal"><span className="section-tag light-tag">Engineering Lifecycle</span><h2>One engineer. Multiple stages. One continuous feedback loop.</h2></div>
          <div className="lifecycle-row reveal">{[['01','Define',BriefcaseBusiness],['02','Design',CircuitBoard],['03','Build',Wrench],['04','Test',ShieldCheck],['05','Document',ClipboardCheck],['06','Train',GraduationCap]].map(([n,t,I])=><div key={t}><span>{n}</span><I/><b>{t}</b></div>)}</div>
        </div>
      </section>

      <section id="skills" className="section container">
        <div className="section-head reveal"><div><span className="section-tag">Technical Skills</span><h2>Capability matrix</h2></div><p>Grouped by engineering function rather than generic percentage bars.</p></div>
        <div className="skills-grid">{Object.entries(skills).map(([k,v])=><article className="skill-card reveal" key={k}><h3>{k}</h3><div>{v.map(x=><span key={x}>{x}</span>)}</div></article>)}</div>
      </section>

      <section className="section soft projects">
        <div className="container"><div className="section-head reveal"><div><span className="section-tag">Practical Projects</span><h2>Selected hands-on work</h2></div></div>
          <div className="project-list reveal">{['IR-based light and fan control system','Conveyor belt using DC series motors, servo motors and gearbox','Arduino four-way traffic signal controller','Six-axis robotic arm programming and control','PLC automation trainer','Relay protection trainer','Arduino path-finding robot'].map((p,i)=><div key={p}><span>{String(i+1).padStart(2,'0')}</span><b>{p}</b><ExternalLink size={17}/></div>)}</div>
        </div>
      </section>

      <section className="section container education">
        <div className="section-head reveal"><div><span className="section-tag">Education</span><h2>Academic foundation</h2></div></div>
        <div className="edu-grid">
          <article className="reveal"><GraduationCap/><span>Running</span><h3>B.Sc. in Electrical & Electronic Engineering</h3><p>Manarat International University</p></article>
          <article className="reveal"><GraduationCap/><span>2021 · CGPA 3.35</span><h3>Diploma in Electronics Engineering</h3><p>Rangpur Polytechnic Institute</p></article>
          <article className="reveal"><GraduationCap/><span>2017 · GPA 4.59</span><h3>Secondary School Certificate, Science</h3><p>Al-Hera Institute</p></article>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="container contact-grid">
          <div className="reveal"><span className="section-tag light-tag">Contact</span><h2>Let’s discuss engineering, product development or technical collaboration.</h2><p>Based in Dhaka, Bangladesh. Open to relevant engineering and multinational opportunities.</p></div>
          <div className="contact-card reveal"><a href="mailto:sabbirahmmedshehab@gmail.com"><Mail/> <span><small>Email</small><b>sabbirahmmedshehab@gmail.com</b></span></a><a href="tel:+8801635166768"><Phone/> <span><small>Phone</small><b>+880 1635-166768</b></span></a><a href="/cv/Sabbir_Ahmmed_Shehab_Assistant_Engineer_CV.pdf" download><Download/> <span><small>Resume</small><b>Download CV</b></span></a></div>
        </div>
      </section>
    </main>

    <footer><div className="container"><span>© 2026 Sabbir Ahmmed Shehab</span><span>Assistant Engineer · Product Development · Industrial Automation</span></div></footer>
  </>
}

createRoot(document.getElementById('root')).render(<App/>);
