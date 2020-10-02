let videoProgress = document.querySelector(".mp4");
let start = 0;
let duration = 0;

// Set video element to variable
// var video = document.getElementById('player1'
// var videoStartTime = 0;
// var durationTime = 
// video.addEventListener('loadedmetadata', function() {
//   videoStartTime = 2;
//   durationTime = 4;
//   this.currentTime = videoStartTime;
// }, false);
function handleVideo (event){
    videoDuration = event.target.duration;
    console.log(videoDuration);
    pertaskDuration = videoDuration / userInfo.length;
    event.target.duration = pertaskDuration;
    console.log(userInfo.length);
    console.log(pertaskDuration);
    console.log(event);
    videoProgress.timeStamp = 10;
}
videoProgress.addEventListener('loadedmetadata', handleVideo);