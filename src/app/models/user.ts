import { Ad } from './ad';
import { IUser } from './iuser';

export interface User extends IUser {
  appliedAds: Ad[];
  ratedAds: Ad[];
}
