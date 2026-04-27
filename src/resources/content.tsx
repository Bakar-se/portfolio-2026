import {
  About,
  Blog,
  Contact,
  Gallery,
  Home,
  Person,
  Social,
  Work,
} from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Muhammad",
  lastName: "Abu Bakar",
  name: `Muhammad Abu Bakar`,
  role: "Lead Software Engineer",
  avatar: "/images/pfp.jpeg",
  email: "ironsamurai786@gmail.com",
  location: "Asia/Karachi", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English"], // optional: Leave the array empty if you don't want to display languages
};

const contact: Contact = {
  display: true,
  title: <>Get in touch</>,
  description: <>Send a message and I will reply by email.</>,
  labels: {
    name: "Name",
    email: "Email",
    description: "Description",
  },
  submit: "Send message",
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/Bakar-se",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/its-bakar/",
    essential: true,
  },
  // {
  //   name: "Instagram",
  //   icon: "instagram",
  //   link: "https://www.instagram.com/once_ui/",
  //   essential: false,
  // },
  // {
  //   name: "Threads",
  //   icon: "threads",
  //   link: "https://www.threads.com/@once_ui",
  //   essential: true,
  // },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Building bridges between design and code</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Once UI</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
      I'm {person.lastName}, a{" "}
      <Text as="span" size="xl" weight="strong">
        {person.role}
      </Text>
      , who builds reliable systems and intuitive user experiences. <br />
      After hours, I work on my own projects.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        {person.name} is a Pakistan-based {person.role.toLowerCase()} focused on
        turning complex problems into clear, maintainable software—from APIs and
        full-stack systems to polished product interfaces where engineering
        meets thoughtful design.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Expert Tutor",
        timeframe: "Dec 2025 – Present",
        role: "Lead Software Engineer",
        achievements: [
          <>
            Architected and scaled a microservices-based online tutoring SaaS on
            AWS using SST (IaC), focusing on high availability and performance.
          </>,
          <>
            Improved backend efficiency and reliability through database
            optimization, service tuning, and CI/CD automation.
          </>,
        ],
        images: [
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "Expert Tutor platform",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Future Dev Solutions",
        timeframe: "May 2024 – Nov 2025",
        role: "Senior Software Engineer",
        achievements: [
          <>
            Led development of scalable POS systems, SaaS platforms, and
            AI-driven products serving high-traffic users.
          </>,
          <>
            Reduced API latency by 30% and mentored developers while enforcing
            clean architecture and engineering best practices.
          </>,
        ],
        images: [],
      },
      {
        company: "VisionvBird Technologies",
        timeframe: "Feb 2023 – Apr 2024",
        role: "Full Stack Software Engineer",
        achievements: [
          <>
            Built scalable dashboards and CRM platforms using React, Next.js,
            Node.js, and MongoDB.
          </>,
          <>
            Improved performance and maintainability through component
            optimization and close collaboration across teams.
          </>,
        ],
        images: [],
      },
      {
        company: "WittySol",
        timeframe: "Sept 2022 – Feb 2023",
        role: "Junior Unity Game Developer",
        achievements: [
          <>
            Developed and optimized Unity-based game features, improving
            gameplay performance and stability.
          </>,
        ],
        images: [],
      },
      {
        company: "Codek Technologies",
        timeframe: "Feb 2021 – Jul 2021",
        role: "Front-end React Developer",
        achievements: [
          <>
            Built responsive React components and integrated APIs to deliver
            production-ready user interfaces.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "University of Gujrat",
        description: (
          <>
            BS in Software Engineering (GPA: 3.08 / 4.00), 2018–2022 — Gujrat,
            Punjab. Coursework included data structures &amp; algorithms, OOP,
            database systems, operating systems, computer networks, software
            engineering, web engineering, and software design &amp;
            architecture.
          </>
        ),
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Programming & frameworks",
        description: (
          <>
            Day-to-day stack for ES6+ JavaScript and TypeScript, Python where it
            fits, and Node services—React and Next.js on the front, Express and
            NestJS on the back, with clean architecture and pragmatic system
            design.
          </>
        ),
        tags: [
          { name: "JavaScript", icon: "javascript" },
          { name: "TypeScript", icon: "typescript" },
          { name: "Python", icon: "python" },
          { name: "React", icon: "react" },
          { name: "Next.js", icon: "nextjs" },
          { name: "Node.js", icon: "nodejs" },
          { name: "Express", icon: "express" },
          { name: "NestJS", icon: "nestjs" },
        ],
        images: [
          // {
          //   src: "/images/projects/project-01/cover-02.jpg",
          //   alt: "Application development",
          //   width: 16,
          //   height: 9,
          // },
          // {
          //   src: "/images/projects/project-01/cover-03.jpg",
          //   alt: "Full-stack work",
          //   width: 16,
          //   height: 9,
          // },
        ],
      },
      {
        title: "Cloud, data & AI",
        description: (
          <>
            MongoDB and PostgreSQL in production, AWS with Docker, SST, and
            IaC-style workflows, CI/CD, REST and JWT/OAuth, microservices—and
            agent tooling with LangChain, LangGraph, and models via OpenAI,
            OpenRouter, Claude, Gemini, and Ollama.
          </>
        ),
        tags: [
          { name: "MongoDB", icon: "mongodb" },
          { name: "PostgreSQL", icon: "postgresql" },
          { name: "AWS", icon: "aws" },
          { name: "Docker", icon: "docker" },
          { name: "OpenAI", icon: "openai" },
          { name: "LangChain" },
          { name: "LangGraph" },
          { name: "GitHub", icon: "github" },
        ],
        images: [
          // {
          //   src: "/images/projects/project-01/cover-04.jpg",
          //   alt: "Infrastructure and tooling",
          //   width: 16,
          //   height: 9,
          // },
        ],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, contact, home, about, blog, work, gallery };
