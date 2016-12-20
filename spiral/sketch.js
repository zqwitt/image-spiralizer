
var img;
var rune;
function preload() {

  img = loadImage("assets/hepburn.jpg"); //<--------PUT YOUR IMAGE HERE
}

function setup() {
  // Get that canvas made yo!;
  createCanvas(windowWidth, windowHeight);

  // We need them images to be centered and don't forget to load dem pixels
  imageMode(CENTER);
  img.loadPixels();
  
  //Portrait or Landscape
  var radius;
  if(img.width >= img.height){
    radius = img.height/2;  
  }else{
    radius = img.width/2;  
  }
  
  // SVG
  rune = new Rune({
    container: "#container",
    width: radius*2+50,
    height: radius*2+50
  });

  //Get container for svg and set size 
  document.getElementById('container').style.width = radius*2+50 + 'px';
  document.getElementById('container').style.height = radius*2+50 + 'px';
  
  // How many times 'round
  var coils = 50; //<----YOU MAY NEED TO ADJUST THIS NUMBER
  var thetaMax = coils * TWO_PI;
  
  // 
  var awayStep = radius / thetaMax;
  var chord = 2;
  var rotation = 360;
  var theta = chord;
  
  // how bumpy you want it
  var amp = 0;
  // Move stuff to the middle of the screen
  translate(width/2-img.width/2,height/2-img.height/2);

  // Time to draw that spiral
  beginShape();
  var runePath = rune.path(0,0);
  runePath.moveTo(img.width / 2 + cos(theta+rotation) * (awayStep*theta + amp),img.height / 2 + sin(theta+rotation) * (awayStep*theta + amp));
  runePath.fill(false);
  runePath.stroke('#291B2C');
  runePath.strokeWidth(0.5)
  while (theta <= thetaMax) {
    
    amp = -amp;
    var away = (awayStep * theta);
    var around = theta + rotation;
    
    // Polar to Cartesian
    var x = img.width / 2 + cos(around) * (away + amp);
    var y = img.height / 2 + sin(around) * (away + amp);

    //Get the brightness of the image 
    var bri = 100 - brightness(color(img.get(x, y)));
    var r = bri / 25;
    
    // Draw the spiral
    vertex(x,y);
    // runePath.lineTo(x,y);
    var runeCircle = rune.circle(x,y,r/2);

    fill('#291B2C');
    stroke('#291B2C')
    runeCircle.fill('#291B2C');
    runeCircle.stroke('#291B2C');
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
  // Draw the svg 
  rune.draw();

}
