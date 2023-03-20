import { insertProjects } from "./ui"

/* Routing */
function onRouteChange() {
    const hash = window.location.hash
    const routerView = document.querySelector("body") as HTMLBodyElement
  
    // If no hash is returned, default it back to the homepage
    if(window.location.hash == '' ){
      window.location.hash = '#home'
    }
  
    // Checks for a routerView on the page and returns an error if none is found
    if (!(routerView instanceof HTMLElement)) {
          throw new ReferenceError("No router view element available for rendering")
    }
  
    switch (hash) {
        case "#home":
            console.log('and back at it again')
        //   fetch('views/home.html')
        //   .then((response) => response.text())
        //   .then(html => routerView.innerHTML = html)
          break;
  
         case "#my-work":
            console.log('at my work')
          fetch('views/mywork.html')
          .then((response) => response.text())
          .then(html => routerView.innerHTML = html)
          insertProjects()
          break;
     
         default:
        //   fetch('views/error.html')
        //   .then((response) => response.text())
        //   .then(html => routerView.innerHTML = html)
          break;
       }
  }
  
  window.addEventListener("hashchange", onRouteChange)
  
  export default onRouteChange;