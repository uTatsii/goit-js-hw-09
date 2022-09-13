import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const timerData = {
  dataDays: document.querySelector('span[data-days]'),
  dataHours: document.querySelector('span[data-hours]'),
  dataMinutes: document.querySelector('span[data-minutes]'),
  dataSeconds: document.querySelector('span[data-seconds]'),
};
const { dataDays, dataHours, dataMinutes, dataSeconds } = timerData;
const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
let selectedDate = '';
let intervalId = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose,
};

flatpickr(dateInput, options);

startBtn.disabled = true;

startBtn.addEventListener('click', onStartBtnClick);

function timerDataHTML(time) {
  const { days, hours, minutes, seconds } = convertMs(time);
  dataDays.textContent = padStart(days);
  dataHours.textContent = padStart(hours);
  dataMinutes.textContent = padStart(minutes);
  dataSeconds.textContent = padStart(seconds);
}

function setTimer() {
  const deltaTime = selectedDate.getTime() - Date.now();
  const { days, hours, minutes, seconds } = convertMs(deltaTime);
  let sumTime = days + hours + minutes + seconds;
  if (sumTime <= 0) {
    clearInterval(intervalId);
    dateInput.disabled = false;
  }
  timerDataHTML(deltaTime);
}

function onStartBtnClick() {
  if (selectedDate.getTime() <= Date.now()) {
    return Notify.failure('Please choose a date in the future');
  }
  intervalId = setInterval(setTimer, 1000);
  startBtn.disabled = true;
  dateInput.disabled = true;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function onClose(selectedDates) {
  selectedDate = selectedDates[0];
  const currentDate = Date.now();
  selectedDate.getTime() <= currentDate
    ? Notify.failure('Please choose a date in the future')
    : (startBtn.disabled = false);
}

function padStart(n) {
  return String(n).padStart(2, 0);
}