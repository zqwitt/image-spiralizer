var img;
var s = 2;
function preload() {

  img = loadImage("assets/hepburn.jpg"); //<--------PUT YOUR IMAGE HERE
}

function setup() {
  // Get that canvas made yo!;

  var c = createCanvas(windowWidth*s, windowHeight*s);
  drawEverything();
  //saveCanvas('image', 'png');
}

function drawEverything(){
  // We need them images to be centered and don't forget to load dem pixels
  var total = 0;
  imageMode(CENTER);
  img.loadPixels();

  //Portrait or Landscape
  var radius;
  if(img.width >= img.height){
    radius = img.height/2;
  }else{
    radius = img.width/2;
  }

  // How many times 'round
  var coils = 70; //<----YOU MAY NEED TO ADJUST THIS NUMBER
  var thetaMax = coils * TWO_PI;

  //
  var awayStep = radius / thetaMax;
  var chord = 1;
  var rotation = 360;
  var theta = chord;

  // how bumpy you want it
  var amp = 0;
  // Move stuff to the middle of the screen
  if(s>1){
    translate(width/2-img.width*(s/2),height/2-img.height*(s/2));
    scale(s);
  }else{
    translate(width/2-img.width/2,height/2-img.height/2);
  }

  // Time to draw that spiral
  fill('#291B2C');
  stroke('#291B2C');
  strokeWeight(1);

  beginShape();
  var temp = 0;
  while (theta <= thetaMax) {
    amp = -amp;
    var away = (awayStep * theta);
    var around = theta + rotation;

    // Polar to Cartesian
    var x = img.width / 2 + cos(around) * (away + amp);
    var y = img.height / 2 + sin(around) * (away + amp);

    //Get the brightness of the image
    var bri = 100 - brightness(color(img.get(x, y)));
    var r = (bri / 25);

    // Draw the spiral
    vertex(x,y);
    // SHHH it's totally drawn with one line (had to hack the look because P5 strokeWeight does not affect PShapes)
    fill(color(img.get(x, y)));
    ellipse(x, y, r);

    // KEEP GOING
    theta += chord / away
    total++;
  }
  // Don't fill the spiral
  noFill();
  // Ooh look we have a pretty spiral!
  endShape();
}
