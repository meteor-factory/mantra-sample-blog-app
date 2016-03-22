import {Comments} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'comments.upvote'(_id) {
      check(_id, String);

      // Demo the latency compensations (Delete this in production)
      Meteor._sleepForMs(2000);

      Comments.update(_id, {$inc: {upvoteCount: 1}});
    }
  });
}
