// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */
function addRandomFact() {
  const personalFacts = [
      'I used to play Varsity Soccer in High School.',
      'I grew up in Germany for the first half of my life.',
      'I\'m minoring in Physics along with my Computer Science Major.',
      'I love competing in Hackathons and other types of Programming Competitions.',
      'I love watching and competing in eSports competitions and leagues.'
  ];

  // Pick a random fact about me.
  const fact = personalFacts[Math.floor(Math.random() * personalFacts.length)];

  // Add it to the page.
  const factContainer = document.getElementById('fact-container');
  factContainer.innerText = fact;
}

function playRandomSportsScene() {
  const favoriteMoments = [
      'https://www.youtube.com/embed/a7IMPsyQg6k?origin=localhost', // Germany vs Brazil 7-1
      'https://www.youtube.com/embed/1QJ6P8Yxil4?origin=localhost', // Germany World Cup Winning Goal
      'https://www.youtube.com/embed/ZPCfoCVCx3U?origin=localhost', // Faker vs Ryu Duel
      'https://www.youtube.com/embed/LOynR3gj8rE?origin=localhost', // Amazing Ping Pong Rally
      'https://www.youtube.com/embed/9APFll-hxVY?origin=localhost' // Yugoslavia insane Volleyball play
  ];

  // Pick a random video from one of my favorite moments
  const sportsMoment = favoriteMoments[Math.floor(Math.random() * favoriteMoments.length)];

  // Creates an iframe and adds it to the DOM
  var iframe;

  iframe = document.createElement('iframe');
  iframe.src = sportsMoment;
  iframe.width = 720;
  iframe.height = 480;

  // Embed the video on the Page
  const videoContainer = document.getElementById('video-container');
  videoContainer.innerHTML = '';
  videoContainer.appendChild(iframe);
}

async function loadCommentsToDOM() {
  // Clear out previous comments
  const servletContainer = document.getElementById('comment-section');
  servletContainer.innerHTML = '';

  // Get specified number of comments
  const selection = document.getElementById('comment_count');
  const requestURL = '/data?comment-count=' + selection.options[selection.selectedIndex].value;
  const response = await fetch(requestURL);
  const content = await response.json();
  
  // Load comments on to the page
  for(let i = 0; i < content.length; i++) {
    servletContainer.appendChild(createParagraph(content[i]));
  }
}

async function deleteAllComments() {
  // Clear out previous comments
  const servletContainer = document.getElementById('comment-section');
  servletContainer.innerHTML = '';

  // Delete the comments in the datastore
  const request = new Request('/delete-data', {method: 'POST'});
  const response = await fetch(request);

}

function createParagraph(text) {
  const paragraph = document.createElement("p");
  const node = document.createTextNode(text);
  paragraph.appendChild(node);
  return paragraph;
}