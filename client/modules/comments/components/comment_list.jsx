import React from 'react';
import CreateComment from '../containers/create_comment.js';

class CommentList extends React.Component {
  render() {
    const {comments, postId, error} = this.props;
    return (
      <div className="comments">
        {error ? this._renderError(error) : null}
        <div>
          <CreateComment postId={postId}/>
        </div>
        <div className="comment-list">
          {comments.length === 0 ? <p>No Comments Yet!</p> : null}
          {comments.map(comment => (
            <div key={comment._id} className="comment">
              <button onClick={this._upvote.bind(this, comment._id)}>
                Upvote {comment.upvoteCount}
              </button>
              <b>{comment.author}:</b> {comment.text}
              {comment.saving ? '...' : null}
            </div>
          ))}
        </div>
      </div>
    );
  }

  _upvote(_id) {
    const {upvote} = this.props;
    upvote(_id);
  }

  _renderError(error) {
    return (
      <div className='error'>
        {error}
      </div>
    );
  }

}

export default CommentList;
