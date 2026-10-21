export type Project = {
  category: string;
  title: string;
  blurb?: string;
  problem?: string;
  solution?: string;
  impact?: string;
  tags: string[];
  repo: string;
};

export const PROJECTS: Project[] = [
  {
    category: 'Enterprise resource system',
    title: 'IU-LEMMS Lab Management System',
    problem:
      'Manual tracking of university laboratory equipment caused missing inventory records and inefficient audit cycles.',
    solution:
      'Engineered a full-stack tracking platform with structured MongoDB schemas and robust TypeScript workflows.',
    impact: 'Streamlined asset tracking and significantly reduced administrative overhead.',
    tags: ['TypeScript', 'MERN Stack', 'UML Architecture'],
    repo: 'https://github.com/mulatumuler82-ui/lab-equipment-system',
  },
  {
    category: 'Distributed network architecture',
    title: 'Distributed Banking Protocol',
    problem: 'Need for secure, concurrent remote procedure calls across distributed server nodes.',
    solution:
      'Developed a Java RMI and socket-based client-server prototype focusing on network synchronization and stub-skeleton mechanics.',
    impact: 'Ensured reliable transaction execution and thread-safe remote method invocation.',
    tags: ['Java RMI', 'JDBC', 'IntelliJ IDEA'],
    repo: 'https://github.com/mulatumuler82-ui/try-git',
  },
  {
    category: 'Fintech web application',
    title: 'Personal Cost Management App',
    blurb:
      'Web-based personal finance and expense tracking application featuring user authentication, secure database queries, and data visualization dashboards.',
    tags: ['PHP', 'MySQL', 'Bootstrap'],
    repo: 'https://github.com/mulatumuler82-ui/cost-management-system',
  },
  {
    category: 'Machine learning pipeline',
    title: 'Loan Approval Prediction Model',
    blurb:
      'Supervised machine learning classification pipeline evaluating financial risk metrics using Logistic Regression, Decision Trees, and Random Forests.',
    tags: ['Python', 'Scikit-Learn', 'Classification'],
    // NOTE: this repo name says "mern-portfolio" – double-check it's the right link for this project.
    repo: 'https://github.com/mulatumuler82-ui/loan-approval-prediction',
  },
];
