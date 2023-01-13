import { IJob } from './job.types';

export interface ICompany {
  id: string;
  name: string;
  description: string;
  availableJobs: IJob[];
  type: string;
}
