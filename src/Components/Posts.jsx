import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BottomScrollListener from 'react-bottom-scroll-listener';
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
import './Posts.css';

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
    howManyCardsShouldLoad: 9,
    filterInput: '',
  }

  onFilterChange = (value) => {
    this.setState(
      prevState => ({ ...prevState, filterInput: value }),
    );
  }

  onLoadMoreCards = () => {
    this.setState(
      prevState => ({ ...prevState, howManyCardsShouldLoad: prevState.howManyCardsShouldLoad + 3 }),
    );
  }

  getCard = (image, post, user) => (
    <Col key={`Post ${post.id}`} span={8}>
      <Card
        className="post-card"
        cover={<img className="post-image" alt={image.title} src={image.url} />}
      >
        <p className="card-title">{post.title}</p>
        <p className="default-text">{post.body}</p>
        <div className="card-footer-container">
          <p className="card-author">
            Autor:
          </p>
          <p className="default-text">
            {user.name}
          </p>
        </div>
        <div className="card-footer-container">
          <p className="card-company">
            {'Empresa: '}
          </p>
          <p className="default-text">
            {user.company.name}
          </p>
        </div>
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
      <BottomScrollListener onBottom={this.onLoadMoreCards}>
        <Row className="posts-container-row">
          <Col className="posts-container-col" span={24}>
            <p className="container-title">Busca de Posts</p>
            <Input
              className="input-filter"
              placeholder="Digite o que você procura"
              onChange={value => this.onFilterChange(value.target.value)}
            />
            <Row>
              {this.getCards()}
            </Row>
          </Col>
        </Row>
      </BottomScrollListener>
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
