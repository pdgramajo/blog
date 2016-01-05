import Ember from 'ember';
const {set} = Ember; 
export default Ember.Component.extend({
    classNames: 'new',
    actions:{
        save:function(title, body){
            this.sendAction('save',title, body);
            set(this,'title','');
            set(this,'body','');

        }
    }
});
