import { User } from './user';

export interface Ad {
  id: number;
  title: string;
  description: string;
  likes: number[];
  type: AdType;
  category: AdCategory;
  appliedUsers: Map<number, CandidateState>;
  organization: number;
}

export enum AdType {
  partTime = 'part-time',
  fullTime = 'full-time',
  remote = 'remote',
}

export enum AdCategory {
  officeAdministration = 'Office administration',
  development = 'Development',
}

export enum CandidateState {
  NOT_VIEWED = 'Not viewed yet!',
  ACCEPTED = 'You are accepted!',
  REJECTED = 'You are rejected!',
}
