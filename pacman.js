var pos = 0;
const pacArray = [
  'images/PacMan1.png', 'images/PacMan2.png',
  'images/PacMan3.png', 'images/PacMan4.png'
];
var direction = 0;
var focus = 0;
const pacMen = []; // This array holds all the pacmen

// This function returns an object with random values
function setToRandom(scale) {
    return {
      x: Math.random() * scale,
      y: Math.random() * scale,
    };
  }

  // Factory to make a PacMan at a random position with random velocity
  function makePac() { 
    let velocity = setToRandom(10); 
    let position = setToRandom(200);
    let game = document.getElementById('game');
    let newimg = document.createElement('img');
    newimg.style.position = 'absolute';
    newimg.src = pacArray[0];
    newimg.width = 100;
    newimg.style.left = position.x + "px";
    newimg.style.top = position.y + "px";
    // adding new Child image to game
    game.appendChild(newimg);
    // return details in an object
    return {
      position,
      velocity,
      newimg
    };
  }
  
  function update() {
    // loop over pacmen array and move each one and move image in DOM
    pacMen.forEach((item) => {
      checkCollisions(item);

      if(direction == 1){
        focus = ((focus + 1) % 2) + 2;
        console.log(focus);
        item.newimg.src = pacArray[focus];
      }
      else {
          focus = (focus + 1) % 2;
          item.newimg.src = pacArray[focus];
        }

      item.position.x += item.velocity.x;
      item.position.y += item.velocity.y;
  
      item.newimg.style.left = item.position.x + "px";
      item.newimg.style.top = item.position.y + "px";
     
    });

    setTimeout(update, 50);
   
  } 
  function checkCollisions(item) {

    if(item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
      item.position.x + item.velocity.x < 0)
      {
      item.velocity.x = -item.velocity.x;
      direction = 1;   
      }
      //else if(item.position.x + item.newimg.width <= 110) {
      else if (item.position.x <= 10){
        direction = 0;
      }
      console.log(direction);
      console.log(focus);
      console.log(item.position.x);
      console.log(item.velocity.x);
      console.log(item.newimg.width);
      console.log(window.innerWidth);

    if (item.position.y + item.velocity.y + item.newimg.height > window.innerHeight ||
      item.position.y + item.velocity.y < 0)
      {
      item.velocity.y = -item.velocity.y;
      }
      console.log(direction);
      console.log(focus);
   
    }
    // detecting collision with all walls and make pacman bounce
   
  function makeOne() {
    pacMen.push(makePac()); // adding a new PacMan into array pacMen[]
  }
   
if (typeof module !== 'undefined') {
    module.exports = { checkCollisions, update, pacMen };
  }