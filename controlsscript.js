const playPauseButton = document.getElementById("play-pause-button");
const rewindButton = document.getElementById("rewind-button");
const fastForwardButton = document.getElementById("fast-forward-button");
const downloadLink = document.getElementById("download-link");
const settingsButton = document.getElementById("settings-button");
const cinemaButton = document.getElementById("cinema-button");

var video = document.getElementById('custom-video');
var playPauseButton = document.getElementById('play-pause-button');
var downloadLink = document.getElementById('download-link');
var cinemaButton = document.getElementById('cinema-button');
var rewindButton = document.getElementById('rewind-button');
var fastForwardButton = document.getElementById('fast-forward-button');
var settingsButton = document.getElementById('settings-button');
var progressBar = document.querySelector('.progress-bar');
var progressBarFill = document.querySelector('.progress-bar-fill');
var customControls = document.getElementById('custom-controls');
var controlsTimeout;
var lastTapTime = 0;
var tapDelay = 300; // Tempo em milissegundos para considerar um toque duplo

playPauseButton.addEventListener('click', function() {
  if (video.paused || video.ended) {
    video.play();
    playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    showControls();
  } else {
    video.pause();
    playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
    hideControls();
  }
});

cinemaButton.addEventListener('click', function() {
  if (document.fullscreenElement) {
    exitFullscreen();
  } else {
    enterFullscreen();
  }
});

rewindButton.addEventListener('click', function() {
  video.currentTime -= 10;
});

fastForwardButton.addEventListener('click', function() {
  video.currentTime += 10;
});

settingsButton.addEventListener('click', function() {
  // Função a ser implementada para abrir as configurações
});

function enterFullscreen() {
  var player = document.querySelector('.video-player');
  if (player.requestFullscreen) {
    player.requestFullscreen();
  } else if (player.mozRequestFullScreen) {
    player.mozRequestFullScreen();
  } else if (player.webkitRequestFullscreen) {
    player.webkitRequestFullscreen();
  } else if (player.msRequestFullscreen) {
    player.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

video.addEventListener('timeupdate', function() {
  var progress = (video.currentTime / video.duration) * 100;
  progressBarFill.style.width = progress + '%';
});

progressBar.addEventListener('click', function(e) {
  var progressBarRect = progressBar.getBoundingClientRect();
  var clickX = e.clientX - progressBarRect.left;
  var progress = (clickX / progressBarRect.width) * video.duration;
  video.currentTime = progress;
});

video.addEventListener('play', function() {
  playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
  showControls();
});

video.addEventListener('pause', function() {
  playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
  hideControls();
});

video.addEventListener('ended', function() {
  playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
  hideControls();
});

video.addEventListener('touchstart', function() {
  showControls();
});

video.addEventListener('touchend', function() {
  hideControlsAfterTimeout();
});

document.addEventListener('dblclick', function(e) {
  var tapTime = new Date().getTime();
  if (tapTime - lastTapTime < tapDelay) {
    var playerWidth = video.clientWidth;
    var tapX = e.clientX - video.getBoundingClientRect().left;
    if (tapX <= playerWidth / 2) {
      // Toque duplo no lado esquerdo do player
      video.currentTime -= 10;
    } else {
      // Toque duplo no lado direito do player
      video.currentTime += 10;
    }
  }
  lastTapTime = tapTime;
});

document.addEventListener('fullscreenchange', function() {
  if (document.fullscreenElement) {
    customControls.classList.add('fullscreen');
    screen.orientation.lock('landscape').catch(function() {
      console.log('Failed to lock device orientation.');
    });
    rewindButton.classList.remove('hide-by-default');
    fastForwardButton.classList.remove('hide-by-default');
    settingsButton.classList.remove('hide-by-default');
  } else {
    customControls.classList.remove('fullscreen');
    screen.orientation.unlock();
    rewindButton.classList.add('hide-by-default');
    fastForwardButton.classList.add('hide-by-default');
    settingsButton.classList.add('hide-by-default');
  }
});

tippy('#custom-video', {
  content: 'Clique longo para ver informações',
  onShow(instance) {
    instance.popperInstance.update();
  },
  onHidden(instance) {
    instance.popperInstance.update();
  },
  touch: ['hold', 500],
  onTrigger(instance, event) {
    if (event.type === 'mouseenter') {
      instance.show();
    } else if (event.type === 'touchstart') {
      instance.show();
    }
  },
  onHide(instance, event) {
    if (event.type === 'mouseleave') {
      instance.hide();
    }
  }
});

function showControls() {
  clearTimeout(controlsTimeout);
  customControls.classList.remove('hidden');
}

function hideControls() {
  customControls.classList.add('hidden');
}

function hideControlsAfterTimeout() {
  clearTimeout(controlsTimeout);
  controlsTimeout = setTimeout(function() {
    hideControls();
  }, 3000);
}
