import axios from 'axios';

const Api = {
  fetchImages: () => axios.get('https://jsonplaceholder.typicode.com/photos'),
  fetchPosts: () => axios.get('https://jsonplaceholder.typicode.com/posts'),
  fetchUsers: () => axios.get('https://jsonplaceholder.typicode.com/users'),
};

export default Api;
