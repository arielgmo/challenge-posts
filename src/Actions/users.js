export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_SUCCESSFUL = 'FETCH_USERS_SUCCESSFUL';
export const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';

export function fetchUsers() {
  return {
    type: FETCH_USERS,
  };
}
