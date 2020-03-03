// Check if service worker is supported

if (navigator.serviceWorker){
   window.addEventListener('load', ()=>{
      navigator.serviceWorker
         .register('./sw_cached_pages.js')
         .then(reg => console.log('Service worker: Registered'))
         .catch(err => console.log(`Service Worker: Error: ${err}`))
   })
}