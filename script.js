let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

function printTime() {
  const display = document.querySelector('.display');
  const minutes = Math.floor(elapsedTime / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);

  display.textContent = 
    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
}

function start() {
  isRunning = true;
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function printElapsedTime() {
    elapsedTime = Date.now() - startTime;
    printTime();
  }, 10);
}

function pause() {
  isRunning = false;
  clearInterval(timerInterval);
}

function reset() {
  isRunning = false;
  clearInterval(timerInterval);
  elapsedTime = 0;
  printTime();
  document.getElementById('lap-times').innerHTML = '';
}

function lap() {
  const lapTimes = document.getElementById('lap-times');
  const lapTime = document.createElement('li');
  const minutes = Math.floor(elapsedTime / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);

  lapTime.textContent = 
    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
  lapTimes.appendChild(lapTime);
}

document.getElementById('start').addEventListener('click', function() {
  if (!isRunning) {
    start();
    document.getElementById('start').textContent = 'Running';
    document.getElementById('start').classList.add('active');
    document.getElementById('pause').textContent = 'Pause';
    document.getElementById('pause').classList.remove('active');
  }
});

document.getElementById('pause').addEventListener('click', function() {
  if (isRunning) {
    pause();
    document.getElementById('start').textContent = 'Start';
    document.getElementById('start').classList.remove('active');
    document.getElementById('pause').textContent = 'Paused';
    document.getElementById('pause').classList.add('active');
  }
});

document.getElementById('reset').addEventListener('click', function() {
  reset();
  document.getElementById('start').textContent = 'Start';
  document.getElementById('start').classList.remove('active');
  document.getElementById('pause').textContent = 'Pause';
  document.getElementById('pause').classList.remove('active');
});

document.getElementById('lap').addEventListener('click', lap);
