export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POSTS_SUCCESSFUL = 'FETCH_POSTS_SUCCESSFUL';
export const FETCH_POSTS_FAILED = 'FETCH_POSTS_FAILED';

export function fetchPosts() {
  return {
    type: FETCH_POSTS,
  };
}
