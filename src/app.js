"use strict";
import Utils from './utils/utils.js';
import About from './views/pages/about.js';
import Home from './views/pages/home.js';
import Login from './views/pages/login.js';
import Profile from './views/pages/profile.js';
import Register from './views/pages/register.js';
import Navbar from './views/components/navbar.js';
import setUp from './firebase/authState.js';

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
  '/': Home,
  '/register': Register,
  '/login': Login,
  '/about': About,
  '/profile': Profile

};
// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const init = () => {
  //initFirebase();
  setUp();
  // Listen on hash change:
  window.addEventListener('hashchange', router);
  // Listen on page load:
  window.addEventListener('load', router);
  router();
}

const router = async () => {

  const header = null || document.getElementById('header_container');
  const content = null || document.getElementById('page_container');
  
  // Render the Header and footer of the page
  header.innerHTML = await Navbar.render();
  await Navbar.after_render();

  // Get the parsed URl from the addressbar
  let request = Utils.parseRequestURL()

  // Parse the URL and if it has an id part, change it with the string ":id"
  let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
  
  // If the parsed URL is not in our list of supported routes, select the 404 page instead
  let page = routes[parsedURL] ? routes[parsedURL] : Error404
  content.innerHTML = await page.render();
  await page.after_render();
}
window.addEventListener('load', init);