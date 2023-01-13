import { faker } from '@faker-js/faker';
import { jobs, pickMultipleRandomJobs } from './jobs.js';

export const companies = [];

for (let i = 0; i < 50; i++) {
  companies.push({
    id: 'c' + Math.random().toString(16).slice(2),
    name: faker.company.name(),
    description: faker.lorem.paragraph(3),
    availableJobs: pickMultipleRandomJobs(
      Math.floor(Math.random() * jobs.length)
    ),
  });
}

export const pickRandomCompany = () => {
  const randomCompanyIndex = Math.floor(Math.random() * companies.length);
  return companies[randomCompanyIndex].id;
};
