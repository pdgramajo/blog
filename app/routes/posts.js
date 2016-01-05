import Ember from 'ember';  
import cleanURI from '../utils/clean';  
import getOrCreateUser from '../utils/getOrCreateUser';  
const {get} = Ember;

export default Ember.Route.extend({  
    model:function(param) {
        return this.store.query('post', {orderBy: 'titleURL',equalTo: param.titleURL });
    },
    actions:{
        delete:function(post){
            post.deleteRecord();
            post.save();
            this.transitionTo('index');
        },
        save:function(post){
            let titleURL = cleanURI(post.get('title'));
            post.set('titleURL',titleURL);
            post.save();
            this.transitionTo('index');
        },
        createComment:function(author, body,post){
            let user = null;
            let comment = this.store.createRecord('comment', {
                body: body
            });
            let uid = author.get('uid');
            user = getOrCreateUser(uid,
                    get(this,'session.currentUser.username'),
                    get(this,'session.currentUser.profileImageURL'),
                    this.store);

            user.then(function(userData){
                userData.get('comments').addObject(comment);
                post.get('comments').addObject(comment);
                console.log('test');
                return comment.save().then(function(){
                    console.log('comment saved succesfully');
                    return post.save();
                })
                                        .catch(function(error){
                                            console.log('comment:  ${error}');
                                            comment.rollbackAttributes();
                                        })
                                        .then(function(){
                                            console.log('post saved successfuly');
                                            return userData.save();
                                        })
                                                .catch(function(error){
                                                    console.log('post:  ${error}');
                                                    post.rollbackAttributes();
                                                })
                                                .then(function(){
                                                    console.log('user saved successfuly');
                                                })
                                                .catch(function(error){
                                                    console.log('user:  ${error}');
                                                    user.rollbackAttributes();
                                                });


            });

        }
    }
});