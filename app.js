let mobilenet;
let classifier;
let video;
let label = 'test';
let hButton;
let sButton;
let trainButton;
let gButton;
function modelReady() {
  console.log('Model is ready!!!');
}

function videoReady() {
  console.log('Video is ready!!!');
}

function whileTraining(loss) {
  if (loss == null) {
    console.log('Training Complete');
    text('training Complete');
    classifier.classify(gotResults);
  } else {
    console.log(loss);
  }
}


function gotResults(error, result) {
  if (error) {
    console.error(error);
  } else {
    label = result;
    classifier.classify(gotResults);
  }
}

function setup() {
  createCanvas(320, 270);
  video = createCapture(VIDEO);
  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, videoReady);

  hButton = createButton('T1');
  hButton.mousePressed(function() {
    classifier.addImage('Model 1');
  });

  sButton = createButton('T2');
  sButton.mousePressed(function() {
    classifier.addImage('Model 2');
  });

gButton = createButton('T3');
  gButton.mousePressed(function() {
    classifier.addImage('Model 3');
  });

  trainButton = createButton('train');
  trainButton.mousePressed(function() {
    classifier.train(whileTraining);
  });


}

function draw() {
  background(0);
  image(video, 0, 0, 320, 240);
  fill(255);
  textSize(16);
  text(label, 10, height - 10);
}