const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let changeBodyColorIntervalId = null;
startBtn.disabled = false;
stopBtn.disabled = true;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  toggleBtns();

  changeBodyColorIntervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopBtnClick() {
  toggleBtns();

  clearInterval(changeBodyColorIntervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function toggleBtns() {
  startBtn.disabled === false
    ? (startBtn.disabled = true)
    : (startBtn.disabled = false);
  stopBtn.disabled === true
    ? (stopBtn.disabled = false)
    : (stopBtn.disabled = true);
}

