nose_x=0;
nose_y=0;

function preload()
{
clown_img=loadImage("https://i.postimg.cc/bw1MTXxS/red-nose.png");
//Adding a backup clown nose image incase the circle from js defined in function draw doesn't load//
}

function setup()//all the components you need for the js project//
{
    canvas=createCanvas(500,400);
    //created canvas//
    canvas.center();
    //defined canvas to the center//
    video=createCapture(VIDEO);
    //Creating the webcam view, VIDEO: p5js library command//
    video.size(500,400)
    //Sizing the video webcam view//
    video.hide();
    //hiding the default position of the video- In function draw the video will be aligned according tot he canvas//
    posenet=ml5.poseNet(video,modelLoaded);
    //Loading the posenet model for the webcam//
    posenet.on('pose',getposes);
    //Getting the different poses from the model storing them in the function - getposes, 'pose' is the keyword //
}

function modelLoaded()
{
    console.log("Posenet Model Loaded!");
}

function getposes(results)
{
    if(results.length>0)
    {
        console.log(results);
        nose_x=results[0].pose.nose.x-15; //subtracting 15 px so that the square image is aligned//
        nose_y=results[0].pose.nose.y-15;
        console.log(nose_x,nose_y);
    }
  //when the face is not at the camera, to prevent it from going abruptly and endlessly.// 
  //we give the command only if the result is more than 0, so is it is 0 then it will just stop.//
  //We are also getting the positions of the nose via the x and y positions and writing them in the console.//
}

function draw()//commands that run throughout the program//
{
image(video,0,0,500,400);
//Aligning the video according to the canvas//
/*fill(255,0,0);
stroke(255,0,0);
circle(nose_x,nose_y,25);*/
//defining the circle (nose) with its color, border color, and postion (realtime position, nose x and y and the radius 25)//
image(clown_img,nose_x,nose_y,30,30);
//defining the backup image//
}

function take_snapshot()
{
    save("My_Clown_Img.png");
}