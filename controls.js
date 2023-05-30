// Cria os elementos de controle
var playPauseButton = document.createElement('button');
playPauseButton.id = 'play-pause-button';

var rewindButton = document.createElement('button');
rewindButton.id = 'rewind-button';

var fastForwardButton = document.createElement('button');
fastForwardButton.id = 'fast-forward-button';

var downloadLink = document.createElement('a');
downloadLink.id = 'download-link';

var settingsButton = document.createElement('button');
settingsButton.id = 'settings-button';

var cinemaButton = document.createElement('button');
cinemaButton.id = 'cinema-button';

// Adiciona os elementos de controle ao DOM
var customControls = document.getElementById('custom-controls');
customControls.appendChild(playPauseButton);
customControls.appendChild(rewindButton);
customControls.appendChild(fastForwardButton);
customControls.appendChild(downloadLink);
customControls.appendChild(settingsButton);
customControls.appendChild(cinemaButton);

// Obtém a referência ao elemento de vídeo
var video = document.getElementById('custom-video');

// Obtém a referência à barra de progresso
var progressBar = document.querySelector('.progress-bar');
var progressBarFill = document.querySelector('.progress-bar-fill');

// Cria os elementos de link e script para as bibliotecas externas
var playerFullCSS = document.createElement('link');
playerFullCSS.rel = 'stylesheet';
playerFullCSS.href = 'https://raw.githubusercontent.com/moviemil/PlayerFull/main/playerfull.css';

var fontAwesomeCSS = document.createElement('link');
fontAwesomeCSS.rel = 'stylesheet';
fontAwesomeCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css';

var popperCSS = document.createElement('link');
popperCSS.rel = 'stylesheet';
popperCSS.href = 'https://unpkg.com/@popperjs/core@2.11.2/dist/esm/popper.css';

var tippyCSS = document.createElement('link');
tippyCSS.rel = 'stylesheet';
tippyCSS.href = 'https://unpkg.com/tippy.js@6.3.3/dist/tippy.css';

var fontAwesomeKitScript = document.createElement('script');
fontAwesomeKitScript.src = 'https://kit.fontawesome.com/a076d05399.js';

var popperScript = document.createElement('script');
popperScript.src = 'https://unpkg.com/@popperjs/core@2.11.2/dist/umd/popper.min.js';

var tippyScript = document.createElement('script');
tippyScript.src = 'https://unpkg.com/tippy.js@6.3.3/dist/tippy.umd.min.js';

// Adiciona os elementos ao head do documento
document.head.appendChild(playerFullCSS);
document.head.appendChild(fontAwesomeCSS);
document.head.appendChild(popperCSS);
document.head.appendChild(tippyCSS);
document.head.appendChild(fontAwesomeKitScript);
document.head.appendChild(popperScript);
document.head.appendChild(tippyScript);

// Define as ações dos botões

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
  // Implemente a lógica para abrir as configurações
});

// Resto do seu código...

// Funções auxiliares

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
      video.currentTime -= 10;
    } else {
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
