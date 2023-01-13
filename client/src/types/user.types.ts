import { IJob } from './job.types';

export interface IUser {
  id: string;
  name: string;
  avatar: string;
  job: IJob;
  type: string;
  description: string;
  company?: {
    id: string;
    name: string;
    description: string;
    availableJobs: IJob[];
  };
}
