import { Ad } from 'src/app/models/ad';
import { IUser } from './iuser';

export interface Organization extends IUser {
  adsList: Ad[];
  acceptedUsers: Map<number, number>;
}
