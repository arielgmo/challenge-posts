import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchImages } from '../Actions/images';
import { fetchPosts } from '../Actions/posts';
import { fetchUsers } from '../Actions/users';

class Posts extends Component {
  componentWillMount() {
    const {
      onFetchImages,
      onFetchPosts,
      onFetchUsers,
    } = this.props;
    onFetchImages();
    onFetchPosts();
    onFetchUsers();
  }

  render() {
    return (
      <div>
        <p>teste</p>
      </div>
    );
  }
}

export default connect(null, {
  onFetchImages: fetchImages,
  onFetchPosts: fetchPosts,
  onFetchUsers: fetchUsers,
})(Posts);
