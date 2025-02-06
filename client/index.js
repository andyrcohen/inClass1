/*****************************************************************************/
//
// (c) 2025 andrew r. cohen
// arc334@drexel.edu
// sample client file for web security 2025
// fragmented code for specific examples, not general use
//
/*****************************************************************************/

// Runs when the window is first open
window.onload = function () {

    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API/Using_XMLHttpRequest
    function reqListener() {
        console.log(this.responseText);
      }
      
      const req = new XMLHttpRequest();
      req.addEventListener("load", reqListener);
      req.open("GET", "http://localhost:3000/auth/google");
      req.send();

} //onload

