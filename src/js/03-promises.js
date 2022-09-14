import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  let [delayEL, delayStepEL, amountEl] = e.target;
  let delay = parseInt(delayEL.value);
  let delayStep = parseInt(delayStepEL.value);
  let amount = parseInt(amountEl.value);

  for (let i = 0; i < amount; i += 1) {
    position = i + 1;
    createPromise(position, delay).then(onFulfilled).catch(onRejected);
    delay += delayStep;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }, delay);
  });
}

function onFulfilled(result) {
  Notify.success(result);
}

function onRejected(error) {
  Notify.failure(error);
}