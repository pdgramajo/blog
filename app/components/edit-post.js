import Ember from 'ember';
const {get, set} = Ember;
export default Ember.Component.extend({
    isEditing: false,
    classNames: 'edit',
    isAllowed: Ember.computed('model.firstObject.user.username','session.currentUser.username', function(){
        return get(this,'model.firstObject.user.username') === get(this,'session.currentUser.username');
    }),
    actions:{
        save:function(post){
            let sessionName = get(this,'session.currentUser.username');
            if(sessionName === post.get('user.username')){
                set(this, 'isEditing', false);
                this.sendAction('save',post);

            }
            else{
                alert('Sorry not authorized');
            }

        },
        edit:function(){
            set(this, 'isEditing', true);
        },
        delete:function(post){
            this.sendAction('delete',post);
            set(this,'isEditing',false);
        },
        createComment:function(author, body, post){
            this.sendAction('createComment',author, body, post);
        }
    }
});
