const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  
  const [delayEL, delayStepEL, amountEl] = e.srcElement;
  console.log(delayEL.value, delayStepEL.value, amountEl.value);
  let delay = parseInt(delayEL.value);
  let delayStep = parseInt(delayStepEL.value);
  let amount = parseInt(amountEl.value);

  for (let i = 0; i < amount; i += 1) {
    console.log(createPromise(i + 1, delay));
    delay += delayStep;
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve('Success');
      }
      reject('Error');
    }, delay);
  });
 promise.then(onFulfilled({position, delay})).catch(onRejected({position, delay}));
}



function onFulfilled({ position, delay }) {
  console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onRejected({ position, delay }) {
  console.log(`❌ Rejected promise ${position} in ${delay}ms`);
}
