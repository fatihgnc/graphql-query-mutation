import { jobs } from '../data/jobs.js';
import { users } from '../data/users.js';
import { companies } from '../data/companies.js';

export const getUsers = () => users;
export const getUserById = (id) => users.find((user) => user.id === id);
export const getUsersByFullname = (fullname) =>
  users.filter((user) => user.fullname.includes(fullname));

export const getJobs = () => jobs;
export const getJobById = (id) => jobs.find((job) => job.id === id);
export const getJobsByTitle = (title) =>
  jobs.filter((job) => job.title.includes(title));

export const getCompanies = () => companies;
export const getCompanyById = (id) =>
  companies.find((company) => company.id === id);
export const getCompanyJobsById = (id) =>
  getCompanyById(id).availableJobs.map((jobId) => getJobById(jobId));
export const getCompaniesByName = (name) =>
  companies.filter((company) => company.name.includes(name));
