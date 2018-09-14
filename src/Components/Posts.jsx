import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Input,
  Card,
} from 'antd';
import 'antd/dist/antd.css';
import { fetchImages } from '../Actions/images';
import { fetchPosts } from '../Actions/posts';
import { fetchUsers } from '../Actions/users';

class Posts extends Component {
  static propTypes = {
    imagesReducer: PropTypes.arrayOf(PropTypes.object),
    postsReducer: PropTypes.arrayOf(PropTypes.object),
    usersReducer: PropTypes.arrayOf(PropTypes.object),
    onFetchImages: PropTypes.func,
    onFetchPosts: PropTypes.func,
    onFetchUsers: PropTypes.func,
  }

  static defaultProps = {
    imagesReducer: [],
    postsReducer: [],
    usersReducer: [],
    onFetchImages: () => {},
    onFetchPosts: () => {},
    onFetchUsers: () => {},
  }

  constructor(props) {
    super(props);
    const {
      onFetchImages,
      onFetchPosts,
      onFetchUsers,
    } = this.props;
    onFetchImages();
    onFetchPosts();
    onFetchUsers();
  }

  state = {
    howManyCardsShouldLoad: 6,
    filterInput: '',
  }

  onFilterChange = (value) => {
    this.setState(
      prevState => ({ ...prevState, filterInput: value }),
    );
  }

  getCard = (image, post, user) => (
    <Col key={`Post ${post.id}`} span={8}>
      <Card
        cover={<img alt={image.title} src={image.thumbnailUrl} />}
      >
        <p>{post.title}</p>
        <p>{post.body}</p>
        <p>{`Autor: ${user.name}`}</p>
        <p>{`Empresa: ${user.company.name}`}</p>
      </Card>
    </Col>
  )

  // this solution wasn't good, but to do it in a better way
  // we needed a better structure of data or a complicated reduce function on reducer
  getCards = () => {
    const {
      imagesReducer,
      postsReducer,
      usersReducer,
    } = this.props;
    const {
      filterInput,
      howManyCardsShouldLoad,
    } = this.state;
    const arrayIterator = Array.from(Array(howManyCardsShouldLoad + 1).keys());
    return arrayIterator.map((id) => {
      const imageObject = imagesReducer.filter((image) => {
        if (image.id === id) {
          return true;
        }
        return false;
      })[0];
      const postObject = postsReducer.filter((post) => {
        if (post.id === id) {
          return true;
        }
        return false;
      })[0];
      if (postObject !== undefined && postObject !== null
        && imageObject !== undefined && imageObject !== null) {
        const userObject = usersReducer.filter((user) => {
          if (postObject.userId === user.id) {
            return true;
          }
          return false;
        })[0];
        if (userObject !== undefined && userObject !== null) {
          if (filterInput !== null && filterInput !== '') {
            if (postObject.title.includes(filterInput)
              || postObject.body.includes(filterInput)
              || userObject.name.includes(filterInput)
              || userObject.company.name.includes(filterInput)) {
              return this.getCard(imageObject, postObject, userObject);
            }
          } else {
            return this.getCard(imageObject, postObject, userObject);
          }
        }
      }
      return null;
    });
  }

  render() {
    return (
      <Row style={{ width: '80%' }}>
        <Col span={24}>
          <p>Busca de Posts</p>
          <Input
            placeholder="Digite o que você procura"
            onChange={value => this.onFilterChange(value.target.value)}
          />
          <Row>
            {this.getCards()}
          </Row>
        </Col>
      </Row>
    );
  }
}

export default connect(
  ({ imagesReducer, postsReducer, usersReducer }) => ({
    imagesReducer,
    postsReducer,
    usersReducer,
  }),
  {
    onFetchImages: fetchImages,
    onFetchPosts: fetchPosts,
    onFetchUsers: fetchUsers,
  },
)(Posts);
