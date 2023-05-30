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

// Define as funções de manipulação de eventos

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

progressBar.addEventListener('click', function(e) {
  var progressBarRect = progressBar.getBoundingClientRect();
  var clickX = e.clientX - progressBarRect.left;
  var progress = (clickX / progressBarRect.width) * video.duration;
  video.currentTime = progress;
});

video.addEventListener('timeupdate', function() {
  var progress = (video.currentTime / video.duration) * 100;
  progressBarFill.style.width = progress + '%';
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

// Resto do seu código...
