import { faker } from '@faker-js/faker';
import { pickRandomCompany } from './companies.js';
import { pickRandomJob } from './jobs.js';

export const users = [];

for (let i = 0; i < 50; i++) {
  users.push({
    id: 'u' + Math.random().toString(16).slice(2),
    fullname: faker.name.fullName(),
    avatar: faker.image.avatar(),
    jobId: pickRandomJob(),
    companyId: pickRandomCompany(),
  });
}
