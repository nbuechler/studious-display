import React, { PropTypes, Component } from 'react';

export default class Posts extends Component {
  render () {
    return (
      <ul>
        {this.props.posts.map((post, i) =>
          // <li key={i}>{post.title + ' (Ups - ' + post.ups + ' )'}</li>
          <li key={i}>{post.thumbnail}</li>
        )}
      </ul>
    );
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
};
