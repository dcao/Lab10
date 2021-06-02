// script.js

import { router } from './router.js';

const headerText = document.querySelector('header > h1');
const settings = document.querySelector('header > img');

var sdk = splitio({
    core: {
        authorizationKey: 'b4u06qfp6bhvsbk775i783mb546q0cf954d5',
        key: '87d669d0-c3f2-11eb-9072-0e264c9979ad'
    }
});

var client = sdk.client();

function onReady() {
    var treatment = client.getTreatment('double_column');
    console.log(treatment);

    if (treatment == 'off') {
        document.querySelector("main").className = "";
    }
}

// Evaluate treatment when the SDK is ready to operate.
client.on(client.Event.SDK_READY, onReady);

// When the back button is hit, set the state with the new page
window.addEventListener('popstate', e => {
  if (e.state?.page && e.state.page.startsWith('entry')) {
    router.setState('entry', true, Number(e.state.page.substr(5, e.state.page.length)));
  } else {
    router.setState(e.state?.page, true);
  }
});

// Go to header page when header button is clicked
headerText.addEventListener('click', () => {
  router.setState('home', false);
});

// Go to settings page when settings button is clicked
settings.addEventListener('click', () => {
  router.setState('settings', false);
});

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        newPost.addEventListener('click', () => {
          let numEntry = Array.from(document.querySelector('main').childNodes).indexOf(newPost);
          router.setState('entry', false, numEntry + 1);
        });
        document.querySelector('main').appendChild(newPost);
      });
    });
});
