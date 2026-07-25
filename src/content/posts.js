export const posts = [
  {
    slug: 'designing-a-practical-plc-training-platform',
    title: 'Designing a Practical PLC Training Platform',
    excerpt: 'A structured approach to combining controller programming, field wiring, I/O testing and repeatable experiments in one learning system.',
    category: 'PLC & Automation',
    date: '2026-07-25',
    readTime: '7 min read',
    image: '/assets/10438.jpg',
    tags: ['PLC','WPLSoft','Hardware I/O','Training'],
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    body: [
      {type:'paragraph',text:'A useful PLC trainer must do more than power a controller. It should guide the learner through safe wiring, digital and analog I/O, program download, testing and troubleshooting.'},
      {type:'heading',text:'Design objectives'},
      {type:'list',items:['One-student-one-setup practical workflow','Clear terminal identification','Protected power and field connections','Repeatable experiments and fault-finding exercises']},
      {type:'image',src:'/assets/10443.jpg',caption:'Example trainer and practical laboratory hardware.'},
      {type:'heading',text:'Documentation matters'},
      {type:'paragraph',text:'The platform becomes complete only when the user can understand the wiring, follow experiments and diagnose mistakes without depending entirely on an instructor.'}
    ]
  },
  {
    slug: 'qr-enabled-technical-documentation',
    title: 'QR-Enabled Technical Documentation for Engineering Trainers',
    excerpt: 'How QR-linked manuals can improve access, version control and troubleshooting support for physical training equipment.',
    category: 'Technical Documentation',
    date: '2026-07-18',
    readTime: '5 min read',
    image: '/assets/manuals-folder.png',
    tags: ['QR','Manuals','User Experience','Version Control'],
    body: [
      {type:'paragraph',text:'Printed manuals are useful, but they become outdated, misplaced or separated from the equipment. A controlled QR workflow keeps the latest manual connected to the trainer.'},
      {type:'heading',text:'Recommended content structure'},
      {type:'list',items:['Safety and system overview','On-board connection guidance','Circuit and wiring diagrams','Experiment procedure and observation table','Troubleshooting and maintenance']},
      {type:'image',src:'/assets/10460.png',caption:'A structured digital documentation library.'}
    ]
  },
  {
    slug: 'product-lifecycle-for-educational-trainers',
    title: 'The Product Lifecycle of an Educational Engineering Trainer',
    excerpt: 'From requirement analysis and sourcing through assembly, testing, documentation, training and delivery.',
    category: 'Product Development',
    date: '2026-07-10',
    readTime: '8 min read',
    image: '/assets/10449.jpg',
    tags: ['Product Development','Manufacturing','QA','Delivery'],
    body: [
      {type:'paragraph',text:'Educational trainers sit at the intersection of engineering, manufacturing and pedagogy. A reliable product must satisfy technical, safety and learning requirements at the same time.'},
      {type:'heading',text:'Lifecycle'},
      {type:'list',items:['Requirement analysis','Circuit and system design','Component sourcing','Prototype assembly','Functional testing','Documentation','User training','Delivery and support']},
      {type:'image',src:'/assets/10450.jpg',caption:'Assembly and validation are essential before final delivery.'}
    ]
  }
]
