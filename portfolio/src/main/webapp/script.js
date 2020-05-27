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
