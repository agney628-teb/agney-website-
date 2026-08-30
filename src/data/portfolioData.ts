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
  name: "AGNEY",
  tagline: "Designer · Developer · Co-Founder",
  headline: "I design digital experiences and build them into reality.",
  subheadline: "Co-Founder of TEB Innovations. Working at the intersection of UI/UX design, web engineering, video editing, and creative technology.",
  location: "Malappuram, Kerala, India",
  availability: "Available for selected collaborations",
  email: "contact@agney.dev",
  tebWebsite: "https://tebinnovations.in",
  awardsWebsite: "https://awards.tebinnovations.in",
  socials: {
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    instagram: "https://instagram.com",
    twitter: "https://x.com",
  },
  manifesto: [
    "I believe great digital products are born when design intuition and engineering precision come together.",
    "From the first wireframe sketch to the final line of code and motion frame, I stay involved across every detail of the build.",
    "No unnecessary filler, no fake hype — just functional craftsmanship that works."
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "edu-bot-ai",
    number: "01",
    title: "Edu Bot AI",
    category: "AI Platform / UI/UX Design",
    year: "2025",
    role: "Lead UI/UX Designer & Web Engineer",
    client: "TEB Innovations & Regional STEM Initiative",
    summary: "An intuitive conversational AI platform designed for student robotics and coding labs.",
    description: "Edu Bot AI simplifies hardware code syntax and electronic schematics for high school students in Atal Tinkering Labs (ATL). Featured in regional media (Nattuvartha News) for its positive impact on student innovation.",
    tags: ["UI/UX", "Next.js", "AI Integration", "Tailwind CSS"],
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80"
    ],
    accentColor: "#E53E3E",
    caseStudy: {
      overview: "Edu Bot AI is an interactive conversational learning tool built to guide high school students through robotics, micro-controller wiring, and Python/C++ code generation.",
      problem: "Students entering robotics labs often get stuck on complex microcontroller syntax and wiring bugs, leading to frustration and abandoned projects.",
      research: "Direct observations at student innovation centers showed that combining natural language AI explanations with visual circuit diagrams reduced project setup time by over 60%.",
      idea: "Design a clean, split-pane workspace with real-time AI code generation on the left and dynamic circuit schematics on the right.",
      design: "Created an ultra-minimalist, high-contrast visual system with clear typographic hierarchy and distraction-free layouts.",
      build: "Engineered with Next.js, Framer Motion, and WebSocket streaming for instant AI response rendering with offline fallback modes.",
      iterations: "Tested across multiple student cohorts, refining node diagram interaction and simplifying syntax highlights based on feedback.",
      finalExperience: "A fast, tactile assistant that makes building electronics feel natural and accessible.",
      result: "Adopted by 12+ student technology camps and used by 500+ active student builders across Kerala.",
      learnings: "When designing for learning, reducing visual clutter and providing instant feedback is infinitely more effective than adding features."
    }
  },
  {
    id: "teb-innovations",
    number: "02",
    title: "TEB Innovations Platform",
    category: "Brand Identity / Web Engineering",
    year: "2024",
    role: "Co-Founder & Creative Lead",
    client: "TEB Innovations",
    summary: "Brand ecosystem and digital web portal for TEB Innovations co-founded on June 20, 2024.",
    description: "Built to deliver agency-grade digital experiences, client web platforms, and youth robotics incubator programs in Malappuram, Kerala.",
    tags: ["Co-Founder", "Web Engineering", "Design System", "Brand"],
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80"
    ],
    accentColor: "#3182CE",
    caseStudy: {
      overview: "TEB Innovations is a technology and design firm co-founded by Agney to build custom web applications, brand identities, and student robotics ecosystems.",
      problem: "Emerging businesses and educational initiatives in the region lacked access to modern, high-performance digital platforms.",
      research: "Analyzed international design studio frameworks to craft a visual language that pairs Swiss layout structure with modern web performance.",
      idea: "Establish a unified digital home for client showcases, internal R&D products, and student competition achievements.",
      design: "Monochrome editorial foundations paired with subtle electric blue accents and restrained typography.",
      build: "Developed with React, Next.js, and CSS grid layouts to achieve fast 60fps page transitions.",
      iterations: "Evolved through client iterations into a clean, high-contrast studio showcase.",
      finalExperience: "An authoritative digital platform that presents client work and youth robotics achievements with clarity.",
      result: "50+ projects delivered, 100+ students mentored, establishing TEB Innovations as a key regional technology hub.",
      learnings: "Co-founding a studio teaches you to make design choices that directly drive business outcomes and user trust."
    }
  },
  {
    id: "pyrolink",
    number: "03",
    title: "Pyrolink UI Canvas",
    category: "Creative Tech / Developer Tools",
    year: "2026",
    role: "Product Designer & Front-End Developer",
    client: "Open Source R&D",
    summary: "An experimental visual editor for kinetic typography and interactive canvas graphics.",
    description: "Pyrolink bridges creative motion design and front-end engineering, allowing developers to generate interactive web graphics directly into React components.",
    tags: ["Creative Tech", "Canvas", "TypeScript", "UI Tools"],
    coverImage: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80"
    ],
    accentColor: "#D69E2E",
    caseStudy: {
      overview: "Pyrolink is an open-source visual tool for generating reactive web canvas shaders and kinetic type.",
      problem: "Translating motion graphics into web-friendly, 60fps code usually requires writing repetitive WebGL boilerplate.",
      research: "Studied real-time canvas rendering pipelines to isolate bottlenecks in browser frame rates.",
      idea: "Build a node-based editor that exports clean, zero-dependency canvas animation loops.",
      design: "Minimalist dark interface optimized for precise parameter control.",
      build: "Built using HTML5 Canvas, WebGL2, and TypeScript.",
      iterations: "Optimized render loops for smooth performance on low-power mobile devices.",
      finalExperience: "A responsive visual editor for crafting custom interactive web backgrounds.",
      result: "Used internally across TEB Innovations web builds and open-sourced for developers.",
      learnings: "Performance optimization is an essential prerequisite for beautiful web animation."
    }
  }
];

export const TEB_ECOSYSTEM = {
  foundedDate: "June 20, 2024",
  location: "Malappuram, Kerala",
  founders: "Haseef Muhammed (CEO) & Agney (Co-Founder & Creative Director)",
  description: "TEB Innovations is a design firm, software lab, and robotics incubator. We build custom web applications, digital identity systems, and educational tech platforms.",
  stats: [
    { label: "Founded", value: "20 June 2024" },
    { label: "Projects Delivered", value: "50+" },
    { label: "Students Mentored", value: "100+" },
    { label: "Regional Awards", value: "12+" }
  ],
  pillars: [
    {
      title: "Digital Product Studio",
      desc: "Bespoke web platforms, SaaS applications, and modern user interfaces."
    },
    {
      title: "Robotics & AI Education",
      desc: "Atal Tinkering Lab (ATL) mentorship, Edu Bot AI, and student coding bootcamps."
    },
    {
      title: "Motion & Visual Identity",
      desc: "Clean brand systems, video edits, launch teasers, and motion graphics."
    }
  ]
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach-1",
    year: "2026",
    title: "First Global Tech Camp Selection",
    organization: "First Global Robotics Council",
    category: "Robotics & Leadership",
    description: "Appointed to lead design identity and digital platform for the First Global Challenge project camp.",
    badge: "International Selection"
  },
  {
    id: "ach-2",
    year: "2025",
    title: "Edu Bot AI Regional Media Coverage",
    organization: "Nattuvartha News",
    category: "AI & Education",
    description: "Edu Bot AI platform featured in regional news for transforming student robotics learning in Kerala.",
    badge: "Media Feature"
  },
  {
    id: "ach-3",
    year: "2024",
    title: "Co-Founded TEB Innovations",
    organization: "TEB Innovations",
    category: "Entrepreneurship",
    description: "Co-founded TEB Innovations on 20 June 2024 to build design & software solutions in Malappuram.",
    badge: "Founding Milestone"
  },
  {
    id: "ach-4",
    year: "2024",
    title: "Atal Tinkering Lab Tech Mentorship",
    organization: "ATL Initiative",
    category: "Robotics",
    description: "Recognized for conducting student workshops on micro-controllers and web-connected hardware.",
    badge: "Excellence Award"
  }
];

export const CAPABILITIES = [
  {
    category: "DESIGN",
    subtitle: "UI/UX & Visual Systems",
    skills: ["UI / UX Design", "Design Systems", "Typography", "Brand Identity", "Information Architecture"],
    description: "Crafting structured, minimalist interfaces with clear visual hierarchy and attention to detail."
  },
  {
    category: "BUILD",
    subtitle: "Web Engineering",
    skills: ["Front-End Development", "React / Next.js", "Tailwind CSS", "TypeScript", "Canvas Graphics"],
    description: "Building fast, responsive web products with clean code architecture and accessibility."
  },
  {
    category: "CREATE",
    subtitle: "Motion & Video",
    skills: ["Motion Graphics", "Video Editing", "3D Typography", "Color Grading", "Sound Design"],
    description: "Editing video reels, crafting kinetic motion graphics, and bringing digital brands to life."
  },
  {
    category: "EXPLORE",
    subtitle: "Creative Technology",
    skills: ["AI Integration", "Experimental UI", "Hardware Interfaces", "Shader Art"],
    description: "Exploring real-time canvas graphics, AI-assisted tools, and physical-digital interfaces."
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-1",
    year: "2024 — Present",
    role: "Co-Founder & Lead Designer",
    organization: "TEB Innovations",
    location: "Malappuram, Kerala",
    description: "Leading creative direction, UI/UX design, brand identity, and web engineering across client platforms, student bootcamps, and products like Edu Bot AI.",
    highlights: [
      "Co-founded company on June 20, 2024",
      "Directed 50+ web and branding projects",
      "Designed and launched Edu Bot AI platform"
    ]
  },
  {
    id: "exp-2",
    year: "2023 — Present",
    role: "Creative Technologist & Video Editor",
    organization: "Independent",
    location: "Remote",
    description: "Producing motion graphics showreels, video edits, and interactive landing pages for selected clients.",
    highlights: [
      "Produced 30+ motion graphics teasers",
      "Built interactive canvas shader components",
      "Crafted startup visual identities"
    ]
  },
  {
    id: "exp-3",
    year: "2023 — 2024",
    role: "Robotics & Tech Mentor",
    organization: "Atal Tinkering Labs",
    location: "Kerala",
    description: "Mentored high school students in microcontroller programming, UI prototyping, and hardware integration.",
    highlights: [
      "Trained 100+ student innovators",
      "Guided winning robotics competition entries"
    ]
  }
];

export const PLAYGROUND_ITEMS: PlaygroundItem[] = [
  {
    id: "play-1",
    title: "Magnetic Particle Simulation",
    category: "CANVAS",
    year: "2026",
    description: "HTML5 canvas physics simulation with interactive particles responding to cursor velocity.",
    type: "particle",
    previewImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "play-2",
    title: "Kinetic Typography Engine",
    category: "UI",
    year: "2026",
    description: "Dynamic variable font distortion driven by mouse scroll speed.",
    type: "typography",
    previewImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "play-3",
    title: "Liquid WebGL Wave",
    category: "3D",
    year: "2025",
    description: "Fragment shader generating real-time organic wave distortions.",
    type: "shader",
    previewImage: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80"
  }
];

export const MOTION_REELS: MotionItem[] = [
  {
    id: "reel-1",
    title: "Motion & Editing Reel 2026",
    category: "Showreel",
    duration: "01:24",
    year: "2026",
    description: "A fast-paced montage of kinetic typography, video edits, and visual graphics.",
    thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    id: "reel-2",
    title: "TEB Innovations Launch Film",
    category: "Brand Film",
    duration: "00:45",
    year: "2024",
    description: "Launch teaser for TEB Innovations highlighting digital craftsmanship and tech solutions.",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  }
];

export const NOTES: Note[] = [
  {
    id: "note-1",
    title: "What I Learned Co-Founding TEB Innovations",
    date: "Aug 2026",
    readTime: "4 min read",
    category: "Entrepreneurship",
    excerpt: "Building a design and software studio on June 20, 2024 taught me that design builds trust before words are read.",
    content: `When we launched TEB Innovations on June 20, 2024 in Malappuram, we had a simple conviction: design and engineering shouldn't be separated.

Co-founding TEB Innovations meant balancing multiple roles: product architect, front-end developer, and client strategist.

Three key lessons from the journey:
1. **Details create trust**: Crisp typography alignment, smooth transitions, and zero layout shift communicate competence before words are read.
2. **Build products that empower**: Developing Edu Bot AI showed us that technology is most rewarding when it simplifies learning for students.
3. **Focus over noise**: Real creative quality comes from focused iteration rather than rushing out unrefined templates.`
  },
  {
    id: "note-2",
    title: "Why Code is the Ultimate Design Medium",
    date: "Jun 2026",
    readTime: "5 min read",
    category: "Design & Code",
    excerpt: "Static tools give you frames; code gives you state, velocity, and life. Why designers should build what they imagine.",
    content: `Static design tools are essential for ideation, but they hit a wall when designing for dynamic human interaction.

When you treat code as your primary design medium:
- Hover interactions are felt in real time with physics.
- Typography responds dynamically to viewport velocity.
- Shaders and canvas physics open generative visual possibilities that static tools cannot replicate.`
  }
];


export const PERSONAL_INTERESTS = [
  {
    title: "Minimalist Swiss Typography",
    category: "Aesthetics",
    tag: "Design System",
    image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&w=600&q=80",
    description: "Structure, stark contrast, and grids that let content speak with authority."
  },
  {
    title: "Hardware Micro-controllers",
    category: "Robotics",
    tag: "TEB Labs",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    description: "Wiring sensors and ESP32 chips to bridge code into physical motion."
  }
];

export const PHOTO_JOURNAL = [
  {
    id: "pj-1",
    date: "2026",
    location: "Studio Session",
    caption: "Agney - Co-Founder & Creative Lead at TEB Innovations.",
    imageUrl: "/images/agney-avatar.jpg"
  },
  {
    id: "pj-2",
    date: "2026",
    location: "Kerala, India",
    caption: "Designing and engineering hardware & web platforms.",
    imageUrl: "/images/agney-studio.jpg"
  },
  {
    id: "pj-3",
    date: "2026",
    location: "Outdoor Research",
    caption: "Exploring creative technology and visual systems.",
    imageUrl: "/images/agney-outdoor.jpg"
  }
];
