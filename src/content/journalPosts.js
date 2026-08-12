export const journalPosts = [
  {
    slug:'designing-an-engineering-trainer',
    title:'Designing an Engineering Trainer: From Requirement to Classroom Use',
    category:'Product Development',
    date:'August 2026',
    readTime:'7 min read',
    cover:'/assets/10447.jpg',
    excerpt:'A practical look at how an educational trainer moves from a learning objective to a tested, documented and teachable engineering product.',
    tags:['Product Development','Trainer Design','Testing','Documentation'],
    sections:[
      {heading:'Start with the learning outcome', body:'A trainer should not begin as a collection of components. I first identify what the learner must observe, connect, measure and troubleshoot. That requirement drives the circuit, panel layout, protection and documentation.'},
      {heading:'Design for repeated practical use', body:'Educational hardware is handled repeatedly by different users. Connection points, labels, protection devices and test access therefore need to be understandable and robust—not only electrically correct.'},
      {heading:'Documentation is part of the product', body:'The trainer is not finished after functional testing. Experiment steps, wiring guidance, safety notes and troubleshooting information are part of the engineering deliverable.'}
    ],
    gallery:['/assets/10447.jpg','/assets/10449.jpg','/assets/10450.jpg']
  },
  {
    slug:'qr-enabled-technical-documentation',
    title:'Why I Added QR-Enabled Documentation to Engineering Trainer Boards',
    category:'Technical Documentation',
    date:'August 2026',
    readTime:'5 min read',
    cover:'/assets/manuals-folder.png',
    excerpt:'How QR-linked manuals connect physical laboratory equipment with controlled digital instructions and make technical support easier.',
    tags:['QR','User Manuals','Documentation','Engineering Education'],
    sections:[
      {heading:'The problem with paper-only manuals', body:'Printed documentation is useful, but it can be misplaced and becomes difficult to update. A QR code on the physical trainer provides a direct path from the equipment to its current digital documentation.'},
      {heading:'A consistent documentation system', body:'I use the QR workflow alongside structured manuals containing safety information, connection steps, experiments, diagrams, observations and troubleshooting guidance.'},
      {heading:'AI as an accelerator—not the engineer', body:'I was creating trainer manuals before generative AI became publicly available. I later adopted AI tools to accelerate drafting and layout work, while keeping engineering review and technical responsibility in the workflow.'}
    ],
    gallery:['/assets/manuals-folder.png','/assets/10438.jpg','/assets/10444.jpg']
  },
  {
    slug:'practical-plc-training',
    title:'What Makes PLC Training Practical Instead of Only Theoretical?',
    category:'PLC & Automation',
    date:'August 2026',
    readTime:'6 min read',
    cover:'/assets/10441.jpg',
    excerpt:'Programming is only one part of PLC competence. Hardware wiring, I/O understanding, troubleshooting and real sequences are equally important.',
    tags:['PLC','Delta','Siemens LOGO!','WPLSoft'],
    sections:[
      {heading:'Software and hardware must meet', body:'A learner may understand ladder logic and still struggle with field wiring. Effective PLC training connects program logic to actual inputs, outputs, relays, sensors and actuators.'},
      {heading:'Fault finding belongs in the lesson', body:'Training becomes more useful when learners are required to identify wiring mistakes, I/O problems and sequence faults instead of only downloading a correct program.'},
      {heading:'Teach a complete workflow', body:'My training experience includes LOGO! Soft Comfort, WPLSoft, hardware connection, PLC trainer repair and pneumatic conveyor-belt support. The objective is to connect software decisions to physical machine behaviour.'}
    ],
    gallery:['/assets/10441.jpg','/assets/10440.jpg','/assets/10443.jpg']
  }
];
