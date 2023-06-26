song="";

score_Rightwrist=0;
score_Leftwrist=0;

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function preload()
 
{
    song=loadSound("music.mp3");

}


function setup() 
{
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose' , gotPoses);

}

 function modelLoaded()
 {
    console.log('PoseNet Is Initialised')
 }

 function gotPoses(results)
 {
    if(results.length > 0)
    {
        console.log(results);

        score_Rightwrist=results[0].pose.keypoints[10].score;
        score_Leftwrist=results[0].pose.ketpoints[9].score;
        console.log("Score_left_wrist = " + score_Leftwrist + "score_right_wrist = " + score_Rightwrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);


        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);

    }
 }

 function draw()
{
    image(video,0,0,600,500);
    fill("red");
    stroke("green");

    if(score_Leftwrist>0.2) {
        circle(leftWristX,leftWristY,20);
        in_NumberleftWristY = Number(leftWristY);
        new_leftwrisyY = floor(in_NumberleftWristY*2);
        leftWristY_divide_1000 = new_leftwrisyY/1000;
        document.getElementById("volume").innerHTML="volume = "+leftWristY_divide_1000;
        song.setVolume(leftWristY_divide_1000);
    }
   
}
 function play() 
 {
     song.play();
     song.setVolume(leftWristY_divide_1000);                                     
     song.rate(1);
 
     
 }
  function stop()
  {
    song.stop();
  }