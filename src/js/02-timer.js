import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const timer = {
  dataDays: document.querySelector('span[data-days]'),
  dataHours: document.querySelector('span[data-hours]'),
  dataMinutes: document.querySelector('span[data-minutes]'),
  dataSeconds: document.querySelector('span[data-seconds]'),
};
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

startBtn.disabled = true;

flatpickr(dateInput, options);

startBtn.addEventListener('click', onStartBtnClick);

const { dataDays, dataHours, dataMinutes, dataSeconds } = timer;

function onStartBtnClick() {
  const selectedDateInMs = selectedDate.getTime();
  if (selectedDateInMs <= Date.now()) {
    return window.alert('Please choose a date in the future');
  } else {
    intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = selectedDateInMs - currentTime;
      console.log(convertMs(deltaTime));
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      let sumTime = seconds + minutes + hours + days;
      if (sumTime <= 0) {
        clearInterval(intervalId);
      };
      dataDays.textContent = days;
      dataHours.textContent = padStart(hours);
      dataMinutes.textContent = padStart(minutes);
      dataSeconds.textContent = padStart(seconds);
    }, 1000);
    startBtn.disabled = true;
    dateInput.disabled = true;
  }
}

// function 

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
      ? window.alert('Please choose a date in the future')
      : (startBtn.disabled = false);
};

function padStart(n) {
  return String(n).padStart(2, 0);
};