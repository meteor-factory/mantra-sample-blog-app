export default {
  create({Meteor, LocalState}, postId, text) {
    if (!text) {
      return LocalState.set('CREATE_COMMENT_ERROR', 'Comment text is required.');
    }

    if (!postId) {
      return LocalState.set('CREATE_COMMENT_ERROR', 'postId is required.');
    }

    LocalState.set('CREATE_COMMENT_ERROR', null);

    const id = Meteor.uuid();
    Meteor.call('posts.createComment', id, postId, text, (err) => {
      if (err) {
        return LocalState.set('CREATE_COMMENT_ERROR', err.message);
      }
    });
  },

  upvote({Meteor, LocalState}, commentId) {
    Meteor.call('comments.upvote', commentId, (err) => {
      if (err) {
        return LocalState.set('UPVOTE_COMMENT_ERROR', err.message);
      }
    });
  },

  clearErrors({LocalState}) {
    return LocalState.set('CREATE_COMMENT_ERROR', null);
  }
};
