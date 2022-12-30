import {
  getUsers,
  getJobs,
  getJobById,
  getUserById,
  getCompanyById,
  getCompanyJobsById,
  getCompaniesByName,
  getUsersByFullname,
  getJobsByTitle,
} from '../utils/queries.js';

export const resolvers = {
  Query: {
    jobs: () => getJobs(),
    users: () => getUsers(),
    job: (_root, { id }) => getJobById(id),
    user: (_root, { id }) => getUserById(id),
    company: (_root, { id }) => getCompanyById(id),
    usersByFullname: (_root, { text }) => getUsersByFullname(text),
    jobsByTitle: (_root, { text }) => getJobsByTitle(text),
    companiesByName: (_root, { text }) => getCompaniesByName(text),
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
