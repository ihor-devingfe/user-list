import { UserDto } from './types';

let users: UserDto[] = [
  {
    username: 'user1',
    first_name: 'John',
    last_name: 'Travolta',
    email: 'user1@gmail.com',
    user_type: 'Driver' as any,
  },
  {
    username: 'user2',
    first_name: 'Richard',
    last_name: 'Gere',
    email: 'user2@gmail.com',
    user_type: 'Admin' as any,
  },
  {
    username: 'user3',
    first_name: 'Leonardo',
    last_name: 'DiCaprio',
    email: 'user3@gmail.com',
    user_type: 'Admin' as any,
  },
];

export function getUsers(): UserDto[] {
  return [...users];
}

export function updateUsers(newUsers: UserDto[]): void {
  users = newUsers;
}
