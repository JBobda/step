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

google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['Work',     8],
    ['Eat',      2],
    ['Playing Video Games',  4],
    ['Family Time', 3],
    ['Sleep',    7]
  ]);

  var options = {
    width: '100%',
    height: 300,
    pieHole: 0.2,
  };

  var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
  chart.draw(data, options);
}

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
  let iframe = document.getElementById('video');
  iframe.src = sportsMoment;
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

function createMap() {
  // Center the Map around the University of Arkansas (36.068275,-94.173127,15)
  const map = new google.maps.Map(
    document.getElementById('map'),
    {center: {lat: 36.068275, lng: -94.173127}, zoom: 15});
  const hugos_marker = new google.maps.Marker({position: {lat: 36.062620, lng: -94.160650}, map: map, title: 'Hugo\'s Burger Restaurant'});
  const wilson_marker = new google.maps.Marker({position: {lat: 36.073002, lng: -94.163239}, map: map, title: 'Wilson Park'});
  const walton_marker = new google.maps.Marker({position: {lat: 36.060619, lng: -94.178452}, map: map, title: 'Bud Walton Arena'});
  const eng_marker = new google.maps.Marker({position: {lat: 36.065970, lng: -94.173780}, map: map, title: 'University of Arkansas CS Dept.'});

  const hugos_content = '<h1>Hugo\s Burger Restaurant</h1>' +
                        '<p class="description">Hugo\'s is a speakeasy still burger restaurant that is literally situated in an underground location. One of my favorite restaurants in town.</p>';
  addInfoWindowToMarker(hugos_content, hugos_marker, map);

  const wilson_content = '<h1>Wilson Park</h1>' +
                         '<img src="/images/soccer_wilson_park.jpg" style="width: 50%"></img>' +
                         '<p class="description">Wilson Park is a great place to play intramural sports or just hang out and play volleyball with Friends.' +
                         'I come here pretty often to play Intramural Soccer or just to run when trying to get back in shape.</p>';
  addInfoWindowToMarker(wilson_content, wilson_marker, map);

  const walton_content = '<h1>Bud Walton Arena</h1>' +
                         '<p class="description">Bud Walton Arena is the biggest Basketball Arena in the city and lot\'s of events are held here from University and High School Graduation,' +
                         ' to Career Fairs and other private events.</p>';
  addInfoWindowToMarker(walton_content, walton_marker, map);

  const eng_content = '<h1>University of Arkansas CS Dept.</h1>' +
                         '<img src="/images/hackathon_win.jpg" style="width: 50%"></img>' +
                         '<p class="description">Most of my classes are held here and lot\'s of Computer Science related events are held here' +
                         'The picture was taken after we won a hackathon that was being hosted in the building.</p>';
  addInfoWindowToMarker(eng_content, eng_marker, map);
}

function addInfoWindowToMarker(contentString, marker, map) {
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}

function onloadInterests() {
  loadCommentsToDOM();
  playRandomSportsScene();
}

function createParagraph(text) {
  const div = document.createElement("div");
  const paragraph = document.createElement("p");
  const node = document.createTextNode(text);
  paragraph.appendChild(node);
  div.appendChild(paragraph);
  div.classList.add("comment");
  return div;
}