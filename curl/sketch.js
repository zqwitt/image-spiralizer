var img;
function preload() {
  img = loadImage("assets/image.jpg"); //<--------PUT YOUR IMAGE HERE
}

function setup() {
  // Get that canvas made yo!;
  createCanvas(windowWidth, windowHeight, P2D);
  // We need them images to be centered and don't forget to load dem pixels
  imageMode(CENTER);
  img.loadPixels();
  
  //Portrait or Landscape
  if(img.width >= img.height){
  var radius = img.height/2;  
  }else{
  var radius = img.width/2;  
  }
  
  // How many times 'round
  var coils = 50; //<----YOU MAY NEED TO ADJUST THIS NUMBER
  var thetaMax = coils * TWO_PI;
  
  // 
  var awayStep = radius / thetaMax;
  var chord = 2;
  var rotation = 360;
  var theta = chord;
  
  // how bumpy you want it
  var amp = 1;
  // Move stuff to the middle of the screen
  translate(width/2-img.width/2,height/2-img.height/2);
  
  // Time to draw that spiral
  beginShape();
  
  while (theta <= thetaMax) {
    
    amp = -amp;
    var away = awayStep * theta;
    var around = theta + rotation;
    
    // Polar to Cartesian
    var x = img.width / 2 + cos(around) * (away + amp);
    var y = img.height / 2 + sin(around) * (away + amp);

    //Get the brightness of the image 
    var bri = 100 - brightness(color(img.get(x, y)));
    var r = bri / 50;
    
    // Draw the spiral
    vertex(x,y);
    fill(0);
    // SHHH it's totally drawn with one line (had to hack the look because P5 strokeWeight does not affect PShapes)
    ellipse(x, y, r);
    strokeWeight(0.5);
    
    // KEEP GOING
    theta += chord / away
  }
  // Don't fill the spiral
  noFill();
  // Ooh look we have a pretty spiral!
  endShape();
}