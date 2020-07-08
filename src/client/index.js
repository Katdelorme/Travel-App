/*import { runAPIs } from './js/app'

import './styles/styles.scss'

//If we are exporting functions from our application.js file, our event listeners can’t go there. Where can we put them? To call that exported function?
  document.getElementById('generate').addEventListener('click', runAPIs);

export {
    runAPIs,
}*/


import { runAPIs } from "./js/app";
//Event Listener to show resulsts

import './styles/styles.scss'
document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('.continue').addEventListener('click', runAPIs);
});
export {
    runAPIs
}
