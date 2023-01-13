import {
  getJobById,
  getUserById,
  getCompanyById,
  getCompanyJobsById,
  getCompaniesByName,
  getUsersByFullname,
  getJobsByTitle,
  getAllJobs,
  getAllUsers,
  getAllCompanies,
} from '../utils/queries.js';

export const resolvers = {
  Query: {
    jobs: () => getAllJobs(),
    users: () => getAllUsers(),
    companies: () => getAllCompanies(),
    job: (_root, { id }) => getJobById(id),
    user: (_root, { id }) => getUserById(id),
    company: (_root, { id }) => getCompanyById(id),
    jobsByTitle: (_root, { text }) => getJobsByTitle(text),
    companiesByName: (_root, { text }) => getCompaniesByName(text),
    usersByFullname: (_root, { text }) => getUsersByFullname(text),
  },
  User: {
    company: (user) => {
      return getCompanyById(user?.companyId);
    },
    job: (user) => {
      return getJobById(user?.jobId);
    },
  },
  Company: {
    availableJobs: (company) => {
      return getCompanyJobsById(company.id);
    },
  },
};
