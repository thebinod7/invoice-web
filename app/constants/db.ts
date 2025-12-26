export const CATEGORIES = ['All', 'Insights', 'Guide'];

export const BLOG_ARTICLES = [
  {
    id: 1,
    title: 'Free Invoice Generator Tool for Professional Invoices Generation',
    excerpt:
      'Use our free invoice generator tool to create professional invoices quickly and easily, without any cost.',
    author: 'Invomaker',
    date: 'July 3, 2025',
    category: 'Insights',
    readTime: '4 min read',
    image: '/images/logo.png',
    slug: 'free-invoice-generator-tool',
    tags: ['Invoice', 'Generator', 'Templates'],
  },
  {
    id: 2,
    title:
      'Top Mistakes to Avoid When Creating Invoices (and How a Free Generator Helps)',
    excerpt:
      'Many freelancers and small business owners make simple invoice mistakes that lead to late payments and unhappy clients. Learn the top invoicing mistakes to avoid and discover how a free invoice generator can help you create professional, error-free invoices quickly and easily.',
    author: 'Invomaker',
    date: 'July 5, 2025',
    category: 'Insights',
    readTime: '5 min read',
    image: '/images/logo.png',
    slug: 'mistakes-to-avoid-when-creating-invoice',
    tags: ['Freelancers', 'Free', 'Tool', 'Startup', 'Business'],
  },
  {
    id: 3,
    title:
      'How to Create a Professional Invoice in 5 Minutes (No Design Skills Needed)',
    excerpt:
      'Learn how to create a professional invoice in just 5 minutes with a free online invoice generator — no design skills needed! Get paid faster with easy, error-free invoices.',
    author: 'Invomaker',
    date: 'July 5, 2025',
    category: 'Guide',
    readTime: '5 min read',
    image: '/images/logo.png',
    slug: 'how-to-create-professional-invoice',
    tags: ['Business', 'Invoice', 'Online'],
  },
  {
    id: 4,
    title:
      'How to Create Invoice for International Clients (USA, CANADA and more). Brief PDF Guide',
    excerpt:
      'Learn how to create a professional PDF invoice for international clients (USA, Canada and more). Step-by-step guide + free invoice generator to get paid faster worldwide.',
    author: 'Invomaker',
    date: 'Sep 07, 2025',
    category: 'Guide',
    readTime: '7 min read',
    image: '/images/logo.png',
    slug: 'create-invoice-for-international-clients-pdf-guide',
    tags: ['International', 'Invoice', 'PDF'],
  },
  {
    id: 5,
    title:
      'How to Create an Invoice for Freelancers (Step-by-Step Guide + Free Templates)',
    excerpt:
      'Learn how to create an invoice for freelancers (step-by-step guide + free templates). Get paid faster with easy, error-free invoices.',
    author: 'Invomaker',
    date: 'Nov 23, 2025',
    category: 'Guide',
    readTime: '7 min read',
    image: '/images/logo.png',
    slug: 'how-to-create-invoice-for-freelancers',
    tags: ['Freelancers', 'Invoice', 'Templates'],
  },
];

export const PRICING = {
  FREE: {
    plan: 'Free',
    price: 'Free',
    features: [
      { text: 'Create Invoices Instantly', enabled: true },
      { text: 'No Signup Required', enabled: true },
      { text: 'Multiple Currency Support', enabled: true },
      { text: 'Download PDF', enabled: true },
      { text: 'Invoice History', enabled: false },
      { text: 'Edit Past Invoices', enabled: false },
      { text: 'Payment Tracking (Paid / Unpaid)', enabled: false },
      { text: 'Unlimited Downloads', enabled: false },
    ],
  },
  STARTER: {
    price: 'xxx',
    plan: 'Starter',
    features: [
      { text: 'Everything in Free', enabled: true },
      { text: 'Invoice History & Search', enabled: true },
      { text: 'Edit Past Invoices', enabled: true },
      { text: 'Payment Tracking (Paid / Unpaid)', enabled: true },
      { text: 'Save Clients & Business Details', enabled: true },
      { text: 'Unlimited Downloads', enabled: true },
    ],
  },
};
