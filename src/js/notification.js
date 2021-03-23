import * as PNotify from '../../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';


const onKeyword = function onKeyword() {
  PNotify.notice({
    text: 'What do you need to find?',
    delay: 1500,
  });
};

export default { onKeyword };