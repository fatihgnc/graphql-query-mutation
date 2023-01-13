import { faker } from '@faker-js/faker';

export const jobs = [];

for (let i = 0; i < 50; i++) {
  jobs.push({
    id: 'j' + Math.random().toString(16).slice(2),
    title: faker.name.jobTitle(),
    description: faker.commerce.productDescription(),
  });
}

export const pickRandomJob = () => {
  const randomJobIndex = Math.floor(Math.random() * jobs.length);
  return jobs[randomJobIndex].id;
};

export const pickMultipleRandomJobs = (amount = 4) => {
  const data = [];
  const clonedJobs = [...jobs];
  for (let index = 0; index < amount; index++) {
    const randomJobIndex = Math.floor(Math.random() * clonedJobs.length);
    data.push(clonedJobs[randomJobIndex].id);
    clonedJobs.splice(randomJobIndex, 1);
  }
  return data;
};
