var myAudio = document.getElementById('myAudio');
var buttons = document.getElementsByTagName('button');
var volume = document.getElementById('musicVolume');
var stopTime = 0;

myAudio.volume = 0.2;
myAudio.loop = true;

const changeVolume = () => {
  myAudio.volume = volume.value
}

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function() {
    myAudio.currentTime = this.getAttribute("data-start");
    stopTime = this.getAttribute("data-stop");
    myAudio.play();
  }, false);
}

myAudio.addEventListener('timeupdate', function() {
  if (this.currentTime > stopTime) {
    this.pause();
  }
}, false);