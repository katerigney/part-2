//Separate JS file -- this works independently from the main JS functionality

//REGISTER SERVICE WORKER
    //attaches this service worker to this app/site and defines "scope"
    
if ('serviceWorker' in navigator) { //check if browser supports
    window.addEventListener('load', function () { //listening for page load
        navigator.serviceWorker.register('./serviceWorker.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            // registration did not work
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

//INSTALL SERVICE WORKER
    //this is where we set up our cache and get the service worker going

var CACHE_NAME = 'kitties-cache'; 
var urlsToCache = [ //define all the items we want to cache
    './',
    './index.html',
    './index2.html',
    './screen.css',
    './main.js',
    './serviceWorker.js',
    './images/kitten1.jpg',
    './images/kitten2.jpg'
];

//uses "cache" interface to achieve a lot of this
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            }) 
    ); 
});
//you can do a number of CRUD operations 
//in tandem with user interaction, updates, connectivity changes


//MAGIC - CALL AND MATCH THE CACHED FILES SO THE SITE RUNS EVEN WHEN OFFLINE
self.addEventListener('fetch', function (event) {
    console.log(event.request.url);
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response;
        })
    );
});