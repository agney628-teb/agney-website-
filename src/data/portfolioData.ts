export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  role: string;
  client?: string;
  summary: string;
  description: string;
  tags: string[];
  coverImage: string;
  galleryImages: string[];
  accentColor: string;
  link?: string;
  caseStudy?: {
    overview: string;
    problem: string;
    research: string;
    idea: string;
    design: string;
    build: string;
    iterations: string;
    finalExperience: string;
    result: string;
    learnings: string;
  };
}

export interface Achievement {
  id: string;
  year: string;
  title: string;
  organization: string;
  category: string;
  description: string;
  badge?: string;
  link?: string;
}

export interface ExperienceItem {
  id: string;
  year: string;
  role: string;
  organization: string;
  location: string;
  description: string;
  highlights: string[];
}

export interface PlaygroundItem {
  id: string;
  title: string;
  category: 'CANVAS' | 'UI' | 'MOTION' | '3D';
  year: string;
  description: string;
  type: 'particle' | 'typography' | 'shader' | 'video' | 'interaction';
  previewImage: string;
}

export interface MotionItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  year: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
}

export interface Note {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  content: string;
}

export const PERSONAL_INFO = {
  name: "AGNEY A",
  student: "Plus One Bio Science",
  school: "PMSAPTHSS Kakkove",
  location: "Kerala, India",
  tagline: "Designer · Developer · Video Editor · Robotics Innovator · Co-Founder & MD of TEB Innovations",
  headline: "Building real-world projects at the intersection of Technology, Design, AI, and Robotics.",
  subheadline: "Co-Founder & Managing Director (MD) of TEB Innovations. Started robotics in 9th standard through the ATL Lab at PMSAPTHSS Kakkove, building Edu Bot AI, Dr. Zoe, Eye Sight AI, and scaling student-led technological ventures.",
  availability: "Available for ambitious collaborations & tech projects",
  email: "contact@tebinnovations.in",
  tebWebsite: "https://tebinnovations.in",
  awardsWebsite: "https://awards.tebinnovations.in",
  socials: {
    linkedin: "https://linkedin.com",
    github: "https://github.com/agney628-teb",
    instagram: "https://instagram.com",
    twitter: "https://x.com",
  },
  manifesto: [
    "Started robotics in 9th standard through the ATL Lab at PMSAPTHSS Kakkove with a burning passion to solve real-world problems.",
    "Edu Bot AI gave our 4-student founding team the strength, confidence, and courage to start TEB Innovations as a full startup.",
    "Driven by combining technology, design, AI, and robotics to build functional products that empower people."
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "edu-bot-ai",
    number: "01",
    title: "Edu Bot AI",
    category: "AI Teacher Robot / Robotics & Custom OS",
    year: "2024 — 2025",
    role: "Core Innovator & Developer (Hardware, AI, OS, Design)",
    client: "TEB Innovations & ATL PMSAPTHSS Kakkove",
    summary: "An advanced AI Teacher Robot featuring a custom-built OS, inbuilt projection system, and 20+ interactive educational capabilities.",
    description: "Edu Bot AI is an AI teacher project engineered with a custom-built OS, integrated projector, and over 20+ interactive pedagogical features. It gave our 4-student team the confidence and courage to found TEB Innovations.",
    tags: ["Robotics", "Custom OS", "AI Teacher", "Inbuilt Projector", "20+ Features"],
    coverImage: "/edu-bot-ai.jpg",
    galleryImages: [
      "/edu-bot-ai.jpg",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80"
    ],
    accentColor: "#E53E3E",
    caseStudy: {
      overview: "Edu Bot AI is a flagship AI teacher robot engineered to revolutionize interactive classroom education with multimodal AI, an onboard optical projection engine, and a bespoke operating system.",
      problem: "Traditional educational setups often lack engaging, interactive technological tools that can deliver dynamic visual demonstrations and instant multi-subject explanations to students in real time.",
      research: "Observed classroom dynamics at PMSAPTHSS Kakkove and ATL labs to identify requirements for an all-in-one AI teaching assistant capable of autonomous instruction.",
      idea: "Design and build a physical teacher robot equipped with a custom-built OS, integrated projector for dynamic lesson display, and 20+ purpose-built AI learning modules.",
      design: "Created an intuitive, approachable robotic chassis and clean user interface for students and educators.",
      build: "Engineered across all domains: custom OS kernel integration, hardware schematics, projector optical assembly, voice recognition, and real-time AI inference.",
      iterations: "Continuously refined response speed, projector thermal management, and expanded feature count to over 20+ capabilities.",
      finalExperience: "An intelligent autonomous robotic teacher delivering dynamic projected lessons, interactive Q&A, and practical demonstrations.",
      result: "Won state-level awards (YIP State Winner, BYKM Olympics of Robotics Top 7) and inspired the founding of TEB Innovations.",
      learnings: "Working across all areas of a complex hardware/software AI robotics project teaches true multidisciplinary problem solving."
    }
  },
  {
    id: "dr-zoe",
    number: "02",
    title: "Dr. Zoe",
    category: "AI Medical Assistant & Diagnostics",
    year: "2025",
    role: "Lead Hardware & AI System Architect",
    client: "TEB Innovations Health Initiative",
    summary: "Intelligent AI doctor assistant that captures comprehensive vitals, provides automated diagnostics, and streamlines medical documentation.",
    description: "Dr. Zoe collects vital biometric data (height, weight, pulse, body temperature, etc.), features an AI Doctor consultation engine, generates diagnostic reports, and functions as an automated medical sheet generator.",
    tags: ["HealthTech", "AI Doctor", "Biometrics", "Medical Sheet Automator", "Diagnostics"],
    coverImage: "/dr-zoe.jpg",
    galleryImages: [
      "/dr-zoe.jpg",
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1200&q=80"
    ],
    accentColor: "#3182CE",
    caseStudy: {
      overview: "Dr. Zoe is an AI-powered diagnostic kiosk and medical assistant engineered to automate preliminary clinical examinations and generate structured medical sheets.",
      problem: "Primary healthcare clinics and school medical rooms face time-consuming manual triage and vital signs record-keeping, causing delays in medical assessments.",
      research: "Analyzed standard triage workflows to determine essential diagnostic parameters: height, weight, pulse rate, SpO2, and body temperature.",
      idea: "Create an integrated smart kiosk that measures vitals in seconds, inputs data into an AI Doctor inference engine, and outputs instant printed/digital diagnostic summary sheets.",
      design: "Designed a clean medical UI with large high-contrast visual readouts and intuitive sensor guides for patients.",
      build: "Integrated multi-sensor telemetry with embedded micro-controllers and an AI diagnostic logic layer.",
      iterations: "Calibrated sensor accuracy against clinical benchmark devices to ensure high diagnostic precision.",
      finalExperience: "A fast, automated medical station that collects vitals, generates diagnostic reports, and automates patient record sheets seamlessly.",
      result: "Demonstrated at state science expos with high acclaim for practical healthcare accessibility.",
      learnings: "Combining hardware sensor integration with AI diagnostic logic creates life-improving real-world solutions."
    }
  },
  {
    id: "eye-sight-ai",
    number: "03",
    title: "Eye Sight AI",
    category: "Computer Vision & Assistive Tech",
    year: "2025",
    role: "AI & Computer Vision Developer",
    client: "TEB Innovations R&D",
    summary: "An AI-powered computer vision system designed for intelligent visual assistance, spatial awareness, and accessibility.",
    description: "Eye Sight AI leverages real-time computer vision models to detect objects, read text, and provide spatial navigation assistance for visually impaired users.",
    tags: ["Computer Vision", "Accessibility", "AI", "Real-Time Inference"],
    coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80"
    ],
    accentColor: "#38A169",
    caseStudy: {
      overview: "Eye Sight AI is an assistive computer vision system engineered to provide real-time environmental audio feedback and scene interpretation for accessibility.",
      problem: "Visually impaired individuals face daily navigation obstacles in unfamiliar surroundings without assistive vision tools.",
      research: "Studied lightweight edge computer vision models capable of low-latency object recognition and text-to-speech transcription.",
      idea: "Build an edge AI vision pipeline that identifies obstacles, recognizes text signs, and communicates spatial guidance instantly.",
      design: "Focused on minimal latency, intuitive voice synthesis feedback, and clean companion interfaces.",
      build: "Implemented using Python, OpenCV, edge neural networks, and synthesized audio narration.",
      iterations: "Optimized model quantization for rapid processing on portable compute hardware.",
      finalExperience: "An intelligent visual companion enhancing independent navigation and accessibility.",
      result: "Recognized as a premier inclusive innovation across student technology competitions.",
      learnings: "Accessible design requires prioritizing speed, reliability, and human-centric feedback."
    }
  },
  {
    id: "pyrolink",
    number: "04",
    title: "Pyrolink",
    category: "IoT, Telemetry & Developer Tools",
    year: "2026",
    role: "Full-Stack Developer & Hardware Lead",
    client: "TEB Innovations Suite",
    summary: "Advanced IoT hardware telemetry suite and web portal connecting micro-controllers with cloud dashboards in real time.",
    description: "Pyrolink bridges hardware micro-controllers and web applications, enabling instant telemetry streaming, sensor visualization, and remote robotic control.",
    tags: ["IoT", "Hardware Telemetry", "WebSockets", "Cloud Dashboard"],
    coverImage: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
    ],
    accentColor: "#D69E2E",
    caseStudy: {
      overview: "Pyrolink provides seamless communication channels between physical robotic hardware and responsive web interfaces.",
      problem: "Transmitting multi-sensor robotics telemetry to remote web dashboards often introduces latency and complex network configuration.",
      research: "Evaluated lightweight WebSocket and MQTT protocols for high-frequency sensor streaming.",
      idea: "Create a modular telemetry library and web dashboard with zero-config hardware pairing.",
      design: "High-density data visualization interface with real-time graphs and hardware status indicators.",
      build: "Built with TypeScript, Next.js, Node.js WebSockets, and embedded C++ libraries.",
      iterations: "Refined packet compression to maintain 60fps graph updates over low-bandwidth cellular networks.",
      finalExperience: "A rock-solid telemetry platform for managing remote robotic deployments in real time.",
      result: "Deployed as the backbone communication suite for TEB Innovations robotic products.",
      learnings: "Robust IoT engineering requires treating network latency as a core design constraint."
    }
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach-1",
    year: "2025",
    title: "YIP 7.0 State Winner",
    organization: "Young Innovators Programme (Kerala Govt)",
    category: "State Level Innovation",
    description: "Awarded State Winner at YIP 7.0 for groundbreaking robotics and AI innovation.",
    badge: "State Winner 🏆",
    link: "https://awards.tebinnovations.in"
  },
  {
    id: "ach-2",
    year: "2025",
    title: "BYKM Olympics of Robotics — Top 7 Project",
    organization: "BYKM Robotics Championship",
    category: "Robotics Excellence",
    description: "Selected among the Top 7 projects nationally at the prestigious Olympics of Robotics competition.",
    badge: "Top 7 National 🏅",
    link: "https://awards.tebinnovations.in"
  },
  {
    id: "ach-3",
    year: "2025",
    title: "38th Kerala Science Congress National Expo",
    organization: "Kerala Science Congress",
    category: "National Science Expo",
    description: "Featured innovation at the prestigious 38th Kerala Science Congress National Expo.",
    badge: "National Expo 🌟",
    link: "https://awards.tebinnovations.in"
  },
  {
    id: "ach-4",
    year: "2024",
    title: "YIP Section Winner & Multiple Recognitions",
    organization: "Young Innovators Programme",
    category: "Section Winner",
    description: "Recognized as Section Winner at YIP and awarded multiple state and district technology honors.",
    badge: "Section Winner 🎖️",
    link: "https://awards.tebinnovations.in"
  }
];

export const TEB_ECOSYSTEM = {
  foundedDate: "9th Standard by 4 Students",
  location: "Kerala, India",
  founders: "Agney A (Co-Founder & MD) with 3 student co-founders",
  description: "TEB Innovations was founded by 4 students in 9th standard. The team took distinct roles and worked together as a startup. Edu Bot AI gave the team the strength, confidence, and courage to build TEB Innovations into an award-winning innovation startup.",
  stats: [
    { label: "Co-Founded In", value: "9th Standard" },
    { label: "Founding Team", value: "4 Students" },
    { label: "Major Projects", value: "Edu Bot AI · Dr. Zoe" },
    { label: "State Honors", value: "YIP 7.0 State Winner" }
  ],
  pillars: [
    {
      title: "Robotics & AI Innovation",
      desc: "Edu Bot AI (AI Teacher with custom OS & projector), Dr. Zoe (AI Doctor), and Eye Sight AI."
    },
    {
      title: "Full-Stack Development & IoT",
      desc: "Pyrolink telemetry suite, custom web platforms, and interactive digital interfaces."
    },
    {
      title: "Design & Video Craft",
      desc: "UI/UX design systems, graphic design, and cinematic video editing."
    }
  ]
};

export const CAPABILITIES = [
  {
    category: "ROBOTICS & AI",
    subtitle: "Hardware, AI & Custom OS",
    skills: ["Robotics Engineering", "AI Teacher Systems", "Custom OS Development", "Sensor Telemetry", "Computer Vision"],
    description: "Building intelligent physical robots and AI systems like Edu Bot AI, Dr. Zoe, and Eye Sight AI."
  },
  {
    category: "DEVELOPMENT",
    subtitle: "Web & IoT Engineering",
    skills: ["Full-Stack Development", "TypeScript & React", "Tailwind CSS", "IoT & Telemetry", "WebSocket Streaming"],
    description: "Crafting fast, responsive web applications and real-time hardware telemetry dashboards."
  },
  {
    category: "DESIGN & UI/UX",
    subtitle: "Visual & Interface Systems",
    skills: ["UI / UX Design", "Graphic Designing", "Design Systems", "Typography", "Prototyping"],
    description: "Designing clean, minimalist digital interfaces with stark hierarchy and thoughtful user flows."
  },
  {
    category: "VIDEO & CREATIVE",
    subtitle: "Motion & Media Production",
    skills: ["Video Editing", "Motion Graphics", "Showreels", "Color Grading", "Creative Storytelling"],
    description: "Producing cinematic video edits, motion graphics, and compelling startup brand narratives."
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-1",
    year: "9th Std — Present",
    role: "Co-Founder & Managing Director (MD)",
    organization: "TEB Innovations",
    location: "Kerala, India",
    description: "Co-founded TEB Innovations with 3 student peers in 9th standard. Leading technological direction across robotics, AI products (Edu Bot AI, Dr. Zoe, Eye Sight AI), web development, and design systems.",
    highlights: [
      "Co-founded startup with 4 students in 9th standard",
      "Led development of Edu Bot AI (custom OS, projector, 20+ features)",
      "Engineered Dr. Zoe AI Doctor Assistant & Medical Sheet Automator",
      "Won YIP 7.0 State Winner & BYKM Olympics of Robotics Top 7"
    ]
  },
  {
    id: "exp-2",
    year: "9th Std — Present",
    role: "Robotics Innovator & Student Leader",
    organization: "PMSAPTHSS Kakkove ATL Lab",
    location: "Kerala, India",
    description: "Started robotics in 9th standard through the Atal Tinkering Lab (ATL) at PMSAPTHSS Kakkove, building state and national award-winning innovations.",
    highlights: [
      "Started robotics journey at ATL PMSAPTHSS Kakkove",
      "Built multiple award-winning robotics and AI prototypes",
      "Currently pursuing Plus One Bio Science at PMSAPTHSS Kakkove"
    ]
  }
];

export const PLAYGROUND_ITEMS: PlaygroundItem[] = [
  {
    id: "play-1",
    title: "Edu Bot AI Custom OS Visualizer",
    category: "UI",
    year: "2025",
    description: "Interactive UI engine simulating Edu Bot AI's custom OS and optical projection interface.",
    type: "interaction",
    previewImage: "/edu-bot-ai.jpg"
  },
  {
    id: "play-2",
    title: "Dr. Zoe Vitals Stream Simulator",
    category: "CANVAS",
    year: "2025",
    description: "Live real-time pulse and temperature waveform renderer with diagnostic classification.",
    type: "particle",
    previewImage: "/dr-zoe.jpg"
  },
  {
    id: "play-3",
    title: "Pyrolink WebSocket Telemetry Visualizer",
    category: "3D",
    year: "2026",
    description: "Hardware telemetry stream visualizer rendering sensor nodes in real time.",
    type: "shader",
    previewImage: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80"
  }
];

export const MOTION_REELS: MotionItem[] = [
  {
    id: "reel-1",
    title: "TEB Innovations & Robotics Reel",
    category: "Showreel",
    duration: "01:24",
    year: "2026",
    description: "Showreel of Edu Bot AI demonstrations, robotics hardware prototypes, and video editing craft.",
    thumbnail: "/edu-bot-ai.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  }
];

export const NOTES: Note[] = [
  {
    id: "note-1",
    title: "How 4 Students Started TEB Innovations in 9th Standard",
    date: "Aug 2026",
    readTime: "4 min read",
    category: "Startup Journey",
    excerpt: "Starting robotics at the ATL Lab of PMSAPTHSS Kakkove and how Edu Bot AI gave us the confidence to build TEB Innovations.",
    content: `Our journey began in 9th standard inside the Atal Tinkering Lab (ATL) at PMSAPTHSS Kakkove in Kerala.
    
We were fascinated by the potential of robotics and artificial intelligence. When we built Edu Bot AI — an AI teacher robot with a custom OS and inbuilt projector — it wasn't just a science project. It worked across 20+ features, caught state-wide attention, and proved to us that student innovators could build enterprise-grade hardware and software.

Edu Bot AI gave our 4-student founding team the strength, confidence, and courage to start TEB Innovations.

Since then, we have continued building Dr. Zoe, Eye Sight AI, and Pyrolink, winning YIP 7.0 State Winner and reaching the Top 7 at the BYKM Olympics of Robotics.`
  }
];

export const PERSONAL_INTERESTS = [
  {
    title: "Robotics & Hardware Systems",
    category: "Innovation",
    tag: "ATL Lab",
    image: "/edu-bot-ai.jpg",
    description: "Building physical robots, custom operating systems, and intelligent sensor arrays."
  },
  {
    title: "AI & Computer Vision",
    category: "Intelligence",
    tag: "TEB Innovations",
    image: "/dr-zoe.jpg",
    description: "Developing intelligent assistants and computer vision pipelines that help people in the real world."
  }
];

export const PHOTO_JOURNAL = [
  {
    id: "pj-1",
    date: "2026",
    location: "Kerala, India",
    caption: "Agney A — Co-Founder & MD of TEB Innovations, Plus One Bio Science at PMSAPTHSS Kakkove.",
    imageUrl: "/agney-avatar.jpg"
  }
];
