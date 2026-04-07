import { NextApiRequest, NextApiResponse } from 'next';
import { adminDb } from '../../../utils/firebaseAdmin';
import { requireAuth } from '../../../utils/adminAuth';

const initialProjects = [
  {
    order: 0,
    slideNumberImg: '/assets/portfolio/1.svg',
    projectTitle: 'Oracle CPQ',
    projectDescription: `I currently lead the frontend development of a modernized version of Oracle CPQ (Configure, Price, Quote). A dynamic application that helps over 500 large customers to configure complex products and services, price them according to the rules and constraints, and generate quotes and proposals.`,
    slideHeight: '100vh',
    projectImg: '/assets/portfolio/orcl/orcl.png',
    projectMobileImg: '/assets/portfolio/orcl/oracle-cpq.webp',
    liveLink: 'https://www.oracle.com/ca-en/cx/sales/cpq',
    githubLink: '',
    projectTechnologies: [
      'Javascript',
      'Web Components',
      'Service Workers',
      'Redux',
    ],
    techIconNames: [
      'SiTypescript',
      'SiJavascript',
      'SiRedux',
      'SiMongodb',
      'SiElasticsearch',
    ],
    slideBgColor: '#010606',
  },
  {
    order: 1,
    slideNumberImg: '/assets/portfolio/2.svg',
    projectTitle: 'CX Sales',
    projectDescription: `I have contributed to the biggest customer facing applications and services of Oracle CX. I prototyped, designed and helped my team to build a Zoom application integration for Oracle CX Sales (CRM Selling System) from scratch. Played a key role in the modernization and re-implementation of biggest Oracle's CRM - CX Sales.`,
    slideHeight: '100vh',
    projectImg: '/assets/portfolio/orcl/orclcloud.png',
    projectMobileImg: '/assets/portfolio/orcl/cxcloud.webp',
    liveLink: 'https://www.oracle.com/ca-en/cx/sales/',
    githubLink: '',
    projectTechnologies: [
      'Javascript',
      'JET',
      'Web Components',
      'Service Workers',
      'Redux',
    ],
    techIconNames: [
      'SiTypescript',
      'SiJavascript',
      'SiRedux',
      'SiMongodb',
      'SiElasticsearch',
    ],
    slideBgColor: '#010606',
  },
  {
    order: 2,
    slideNumberImg: '/assets/portfolio/3.svg',
    projectTitle: 'Sneaker Maniacs',
    projectDescription: `Sneaker-maniacs is a custom e-commerce platform powered by Next.js, Redux and MongoDB. My main goal was to build a web app that employs the best latest practices and on mobile feels like a rich native application. Try it out!`,
    slideHeight: '100vh',
    projectImg: '/assets/portfolio/projectOne/SneakerManiacs.png',
    projectMobileImg: '/assets/portfolio/projectOne/sneakerManiacsPhone.png',
    githubLink: '',
    liveLink: 'https://sneaker-maniacs.vercel.app/',
    projectTechnologies: [
      'Next.js',
      'React',
      'Redux',
      'Mongo DB',
      'Styled Components',
    ],
    techIconNames: [
      'SiTypescript',
      'SiReact',
      'SiNextdotjs',
      'SiRedux',
      'SiMongodb',
      'SiStorybook',
    ],
    slideBgColor: '#010606',
  },
  {
    order: 3,
    slideNumberImg: '/assets/portfolio/4.svg',
    projectTitle: 'Department of Optics | Web-portal',
    projectDescription: `A sneak peak of a project that I'm currently building. This is a full-stack portal with 70+ pages designed and built for the department of Optics (Chernivtsi National University). It is powered by Next.js and Node.js on backend.`,
    slideHeight: '100vh',
    projectImg: '/assets/portfolio/projectTwo/vpsFullHd.png',
    projectMobileImg: '/assets/portfolio/projectTwo/vpsMobile.png',
    githubLink: '',
    liveLink: 'https://optics-vps.vercel.app/',
    projectTechnologies: ['Next.js', 'React', 'Redux', 'Mongo DB', 'Express'],
    techIconNames: [
      'SiTypescript',
      'SiReact',
      'SiNextdotjs',
      'SiRedux',
      'SiNodedotjs',
      'SiMongodb',
    ],
    slideBgColor: '#4831d4',
  },
];

const initialResume = {
  personalInfo: {
    name: 'Tahir',
    suffix: '',
    title: 'Full-Stack Web Developer',
    website: '',
    email: '',
    phone: '',
    location: '',
    linkedinUrl: '',
    githubUrl: '',
    cvPdfUrl: '',
  },
  summary:
    'Accomplished, highly-qualified, and results-driven Software Engineer with proven hands-on experience in designing, building, debugging, and implementing performant and scalable web applications.',
  experienceIntro: `I've worked on a handful of projects, some of which were for the following organizations:`,
  keyTechSkills: [
    {
      text: 'JavaScript',
      iconUrl: '/assets/portfolio/skills/javascript-original.svg',
    },
    {
      text: 'Node.js',
      iconUrl: '/assets/portfolio/skills/nodejs-original.svg',
    },
    {
      text: 'TypeScript',
      iconUrl: '/assets/portfolio/skills/typescript-original.svg',
    },
    { text: 'React', iconUrl: '/assets/portfolio/skills/react-original.svg' },
    {
      text: 'Next.js',
      iconUrl: '/assets/portfolio/skills/nextjs-original.svg',
    },
  ],
  otherSkills: [
    { text: 'AWS', iconUrl: '/assets/portfolio/skills/aws.svg' },
    {
      text: 'Responsive Web Design',
      iconUrl: '/assets/portfolio/skills/responsive.png',
    },
    { text: 'GitHub', iconUrl: '/assets/portfolio/skills/github-original.svg' },
    { text: 'Git', iconUrl: '/assets/portfolio/skills/git-original.svg' },
    { text: 'Figma', iconUrl: '/assets/portfolio/skills/figma-original.svg' },
  ],
  experience: [],
  education: [
    {
      degree: 'Bachelor of Computer Engineering',
      field: 'Computer Science',
      institution: '',
    },
  ],
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' });
  if (!(await requireAuth(req, res))) return;

  const { target } = req.query as { target?: string };

  if (!target || target === 'projects') {
    const col = adminDb.collection('portfolio_projects');
    const existing = await col.get();
    if (!existing.empty) {
      return res
        .status(400)
        .json({
          error: 'Projects already seeded. Delete existing docs first.',
        });
    }
    const batch = adminDb.batch();
    for (const project of initialProjects) {
      batch.set(col.doc(), project);
    }
    await batch.commit();
  }

  if (!target || target === 'resume') {
    const docRef = adminDb.collection('portfolio_resume').doc('data');
    const existing = await docRef.get();
    if (!existing.exists) {
      await docRef.set(initialResume);
    }
  }

  return res.status(200).json({ success: true });
}
