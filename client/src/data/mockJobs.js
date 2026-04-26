export const MOCK_JOBS = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    company: 'TechCorp',
    logoLetter: 'T',
    location: 'Remote',
    salary: '$120k - $150k',
    type: 'Full-Time',
    category: 'Engineering',
    postedAt: '2d ago',
    description: 'We are looking for an experienced Frontend Engineer with deep React knowledge to lead our UI architecture.',
    requirements: [
      '5+ years of experience with React.js and modern JavaScript',
      'Strong understanding of web performance profiling',
      'Experience with state management libraries (Redux, Zustand)',
      'A keen eye for pixel-perfect design and CSS/Tailwind architecture'
    ],
    responsibilities: [
      'Lead the frontend architecture and establish best practices',
      'Collaborate with designers to implement dynamic UI components',
      'Optimize the application for maximum speed and scalability'
    ]
  },
  {
    id: '2',
    title: 'Product Designer',
    company: 'CreativeFlow',
    logoLetter: 'C',
    location: 'San Francisco, CA',
    salary: '$110k - $140k',
    type: 'Full-Time',
    category: 'Design',
    postedAt: '3d ago',
    description: 'Join our design system team to build beautiful, accessible components for our next-generation web applications.',
    requirements: [
      '3+ years of product design experience',
      'Strong portfolio featuring responsive web and mobile layouts',
      'Proficiency in Figma and interactive prototyping',
      'Understanding of HTML/CSS is a big plus'
    ],
    responsibilities: [
      'Create intuitive, user-centric interfaces and workflows',
      'Maintain and expand our core design system',
      'Conduct user research and translate findings into design decisions'
    ]
  },
  {
    id: '3',
    title: 'Backend Developer (Node.js)',
    company: 'Serverless Solutions',
    logoLetter: 'S',
    location: 'Remote',
    salary: '$130k - $160k',
    type: 'Contract',
    category: 'Engineering',
    postedAt: '1w ago',
    description: 'Help us scale our microservices backend using Node.js, Express, and MongoDB. AWS experience is a plus.',
    requirements: [
      'Strong proficiency in Node.js and Express',
      'Experience building scalable REST APIs',
      'Background in MongoDB database design and aggregation',
      'Ability to write clean, test-driven code'
    ],
    responsibilities: [
      'Develop robust and secure API endpoints',
      'Manage database schemas and query optimizations',
      'Integrate third-party services and cloud infrastructure'
    ]
  },
  {
    id: '4',
    title: 'DevOps Specialist',
    company: 'CloudWorks',
    logoLetter: 'C',
    location: 'New York, NY',
    salary: '$140k - $170k',
    type: 'Full-Time',
    category: 'Engineering',
    postedAt: '1w ago',
    description: 'We need a DevOps expert to manage our Kubernetes clusters and CI/CD pipelines across multiple environments.',
    requirements: [
      'Deep knowledge of Kubernetes, Docker, and containerization',
      'Experience setting up CI/CD workflows using GitHub Actions/GitLab',
      'Familiarity with AWS, Terraform, and infrastructure as code'
    ],
    responsibilities: [
      'Streamline the code deployment process',
      'Monitor application metrics and automate scaling',
      'Provide rapid incident response for live systems'
    ]
  },
  {
    id: '5',
    title: 'Marketing Manager',
    company: 'GrowthHackers',
    logoLetter: 'G',
    location: 'Austin, TX (Hybrid)',
    salary: '$90k - $120k',
    type: 'Full-Time',
    category: 'Marketing',
    postedAt: '4h ago',
    description: 'Lead our inbound marketing strategy, working closely with the sales and product teams.',
    requirements: [
      '4+ years in B2B tech marketing',
      'Proven track record of managing SEO and content distribution pipelines',
      'Expertise in Google Analytics and modern marketing CRM stacks'
    ],
    responsibilities: [
      'Design targeted campaigns for enterprise clients',
      'Analyze conversion metrics and refine advertising budgets',
      'Mentor junior marketers and copywriters'
    ]
  },
  {
    id: '6',
    title: 'Freelance Copywriter',
    company: 'ContentKings',
    logoLetter: 'C',
    location: 'Remote',
    salary: '$40 - $60/hr',
    type: 'Part-Time',
    category: 'Marketing',
    postedAt: 'Just now',
    description: 'Seeking a creative copywriter for tech-focused blogs, landing pages, and email campaigns.',
    requirements: [
      'Exceptional written English skills and grammatical accuracy',
      'Ability to translate complex technical concepts into accessible copy',
      'Basic knowledge of SEO copywriting principles'
    ],
    responsibilities: [
      'Produce up to 3 blog articles per week',
      'Draft engaging ad copy and email newsletters',
      'Collaborate with the SEO team for content planning'
    ]
  }
];

export const fetchMockJobs = async (query = '', filter = 'All') => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  let filteredJobs = MOCK_JOBS;

  // Search logic
  if (query) {
    const lowerQuery = query.toLowerCase();
    filteredJobs = filteredJobs.filter(job => 
      job.title.toLowerCase().includes(lowerQuery) ||
      job.company.toLowerCase().includes(lowerQuery)
    );
  }

  // Filter logic
  if (filter !== 'All') {
    filteredJobs = filteredJobs.filter(job => job.type === filter);
  }

  return filteredJobs;
};

export const fetchMockJobById = async (id) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const job = MOCK_JOBS.find(j => j.id === id);
  if (!job) throw new Error("Job not found");
  
  return job;
};

// Simulated API Call for applying to a job
export const applyToMockJob = async (jobId, userId) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Persist the application in localStorage
  const existingApps = JSON.parse(localStorage.getItem('hirehub_applications') || '[]');
  
  // Check if already applied
  if (existingApps.some(app => app.jobId === jobId && app.userId === userId)) {
    throw new Error('You have already applied for this position.');
  }

  const newApp = {
    id: Date.now().toString(),
    jobId,
    userId,
    appliedAt: new Date().toISOString(),
    status: 'Pending'
  };

  localStorage.setItem('hirehub_applications', JSON.stringify([...existingApps, newApp]));
  return newApp;
};
