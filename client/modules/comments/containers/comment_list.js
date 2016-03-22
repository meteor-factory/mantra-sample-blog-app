import {
  useDeps, composeWithTracker, composeAll
} from 'mantra-core';
import Component from '../components/comment_list.jsx';

export const composer = ({context, clearErrors, postId}, onData) => {
  const {Meteor, Collections, LocalState} = context();
  const error = LocalState.get('UPVOTE_COMMENT_ERROR');
  if (Meteor.subscribe('posts.comments', postId).ready()) {
    const options = {
      sort: {upvoteCount: -1}
    };
    const comments = Collections.Comments.find({postId}, options).fetch();
    onData(null, {comments, error});
  } else {
    onData();
  }
};

export const depsMapper = (context, actions) => ({
  upvote: actions.comments.upvote,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Component);
