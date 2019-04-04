import * as model from './model.js';
import {Parser} from './parser.js';
import Vue from 'vue/dist/vue.esm.browser.js';

function init() {
  var app = new Vue({ 
    el: '#app',
    data: {
      message: 'Hello Vue!'
    }
  });
}

export {init}