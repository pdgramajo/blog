// app/features/application/route.js
import Ember from 'ember';  
const {get} = Ember;

export default Ember.Route.extend({  
    beforeModel:function(){
        return get(this,'session').fetch().catch(function(){});
    },
    model:function(){
        return this.store.findAll('post');
    },
    actions:{
        login:function(){
            get(this,'session').open('firebase', { provider: 'twitter'}).then(function(data) {
                console.log(data);
            });
        },
        logout:function(){
            get(this,'session').close();
        }
    }
});