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
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    const currentDate = Date.now();
    selectedDate.getTime() <= currentDate
      ? window.alert('Please choose a date in the future')
      : (startBtn.disabled = false);
  },
};

startBtn.disabled = true;

flatpickr(dateInput, options);

startBtn.addEventListener('click', onStartBtnClick);

const { dataDays, dataHours, dataMinutes, dataSeconds } = timer;

function onStartBtnClick() {
  const selectedDateInMs = selectedDate.getTime();
  if (selectedDateInMs <= Date.now()) {
    window.alert('Please choose a date in the future');
  } else {
    setInterval(() => {
      const currentTime = Date.now();
      console.log(convertMs(selectedDateInMs - currentTime));
    }, 1000);
    startBtn.disabled = true;
  }
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
