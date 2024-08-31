import { UserType } from './user-type';

export interface UserDto {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  user_type: UserType;
  password?: string;
}
