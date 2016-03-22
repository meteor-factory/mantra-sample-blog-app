export default function ({Collections, Meteor}) {
  Meteor.methods({
    'posts.createComment'(_id, postId, text) {
      const saving = true;
      const createdAt = new Date();
      const author = 'Me';
      const upvoteCount = 0;
      Collections.Comments.insert({
        _id, postId, text, saving, upvoteCount, createdAt, author
      });
    },
    'comments.upvote'(_id) {
      Collections.Comments.update(_id, {
        $inc: {upvoteCount: 1}
      });
    }
  });
}
