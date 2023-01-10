import { jobs } from '../data/jobs.js';
import { users } from '../data/users.js';
import { companies } from '../data/companies.js';

// Queries for Users
export const getUsers = () => users;
export const getUserById = (id) => users.find((user) => user.id === id);
export const getUsersByFullname = (fullname) =>
  users.filter((user) => user.fullname.toLowerCase().includes(fullname));

// Queries for Jobs
export const getJobs = () => jobs;
export const getJobById = (id) => jobs.find((job) => job.id === id);
export const getJobsByTitle = (title) =>
  jobs.filter((job) => job.title.toLowerCase().includes(title));

// Queries for Companies
export const getCompanies = () => companies;
export const getCompanyById = (id) =>
  companies.find((company) => company.id === id);
export const getCompanyJobsById = (id) =>
  getCompanyById(id).availableJobs.map((jobId) => getJobById(jobId));
export const getCompaniesByName = (name) =>
  companies.filter((company) => company.name.toLowerCase().includes(name));
