

import Vue from 'vue'

Vue.directive('namefocus',{
    update: function (el, {value}) {
        if(value){
            let ele = {el}.el.children[0]
            ele.focus();
        }
    }
})

Vue.directive('pwdfocus',{
    update: function (el, {value}) {
        if(value){
            let ele = {el}.el.children[0]
            ele.focus();
        }
    }
})