const BASE_URL = 'https://remotive.com/api/remote-jobs';

// Available job categories from Remotive API
export const CATEGORIES = [
  { label: 'All Jobs', value: '' },
  { label: 'Software Dev', value: 'software-dev' },
  { label: 'Design', value: 'design' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Customer Support', value: 'customer-support' },
  { label: 'Sales', value: 'sales' },
  { label: 'Product', value: 'product' },
  { label: 'Data', value: 'data' },
  { label: 'Writing', value: 'writing' },
  { label: 'HR', value: 'hr' },
  { label: 'Finance', value: 'finance' },
  { label: 'DevOps', value: 'devops-sysadmin' },
  { label: 'QA', value: 'qa' },
];

const MOCK_JOBS = [
  {
    id: 101,
    title: 'Senior React Native Developer',
    company_name: 'TechCorp Global',
    company_logo: 'https://remotive.com/job/avatar/101',
    category: 'software-dev',
    job_type: 'full_time',
    publication_date: new Date().toISOString(),
    candidate_required_location: 'Worldwide / Remote',
    salary: '$110,000 - $140,000 USD',
    url: 'https://remotive.com',
    tags: ['React Native', 'Expo', 'JavaScript', 'Redux', 'Mobile'],
    description: 'We are seeking an experienced React Native Engineer to build mobile applications for millions of users worldwide.',
  },
  {
    id: 102,
    title: 'Frontend Engineer (React / Next.js)',
    company_name: 'CloudPulse Systems',
    company_logo: '',
    category: 'software-dev',
    job_type: 'full_time',
    publication_date: new Date(Date.now() - 86400000).toISOString(),
    candidate_required_location: 'India / Remote',
    salary: '$80,000 - $100,000 USD',
    url: 'https://remotive.com',
    tags: ['React', 'TypeScript', 'Next.js', 'Tailwind'],
    description: 'Build fast, responsive web apps with React and Next.js in a high-growth remote startup.',
  },
  {
    id: 103,
    title: 'UI/UX Product Designer',
    company_name: 'CreativeMind Studios',
    company_logo: '',
    category: 'design',
    job_type: 'full_time',
    publication_date: new Date(Date.now() - 172800000).toISOString(),
    candidate_required_location: 'Worldwide',
    salary: '$70,000 - $95,000 USD',
    url: 'https://remotive.com',
    tags: ['Figma', 'UI/UX', 'Mobile Design', 'Design Systems'],
    description: 'Design intuitive interfaces and seamless user flows for modern web and mobile apps.',
  },
  {
    id: 104,
    title: 'Full Stack JavaScript Engineer',
    company_name: 'DataFlow Labs',
    company_logo: '',
    category: 'software-dev',
    job_type: 'full_time',
    publication_date: new Date(Date.now() - 259200000).toISOString(),
    candidate_required_location: 'US / Europe / India',
    salary: '$95,000 - $125,000 USD',
    url: 'https://remotive.com',
    tags: ['Node.js', 'React', 'MongoDB', 'GraphQL'],
    description: 'Join our team as a Full Stack JavaScript Engineer working on high-throughput backend APIs and modern frontend applications.',
  },
  {
    id: 105,
    title: 'Growth Marketing Manager',
    company_name: 'ScaleUp Media',
    company_logo: '',
    category: 'marketing',
    job_type: 'full_time',
    publication_date: new Date(Date.now() - 345600000).toISOString(),
    candidate_required_location: 'Worldwide',
    salary: '$65,000 - $85,000 USD',
    url: 'https://remotive.com',
    tags: ['SEO', 'Content Strategy', 'Google Ads', 'Analytics'],
    description: 'Lead growth marketing campaigns, optimize acquisition funnels, and expand brand presence across global markets.',
  }
];

/**
 * Fetch jobs from Remotive API with robust error fallback
 */
export async function fetchJobs(category = '', search = '', limit = 50) {
  try {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (search) params.append('search', search);
    if (limit) params.append('limit', limit.toString());

    const queryString = params.toString();
    const url = queryString ? `${BASE_URL}?${queryString}` : BASE_URL;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.jobs && data.jobs.length > 0) {
      return data.jobs;
    }
    return getFilteredMockJobs(category, search);
  } catch (error) {
    console.warn('API fetch warning, using fallback jobs:', error.message);
    return getFilteredMockJobs(category, search);
  }
}

function getFilteredMockJobs(category, search) {
  let list = MOCK_JOBS;
  if (category) {
    list = list.filter((j) => j.category === category);
  }
  if (search) {
    const s = search.toLowerCase();
    list = list.filter(
      (j) =>
        j.title.toLowerCase().includes(s) ||
        j.company_name.toLowerCase().includes(s) ||
        j.tags.some((t) => t.toLowerCase().includes(s))
    );
  }
  return list;
}

/**
 * Format the publication date to a readable string
 */
export function formatDate(dateString) {
  if (!dateString) return 'Recent';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Recent';
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

/**
 * Strip HTML tags from job description
 */
export function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n\s*\n/g, '\n\n')
    .trim();
}
