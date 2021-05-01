const refs = {
  dateInput: document.querySelectorAll('[data-value]'),
};

console.log(refs.dateInput)

class CountdownTimer{
  constructor() {
    this.intervalId = null,
      this.isActive = false
  }
  
  start() {
    if (this.isActive) {
      return;
    }
    const startTime = Date.now();
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;
      const time = getTimeComponents(deltaTime);
      updateClockface(time)
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
  }
}

const newDayBack = new CountdownTimer({
  update: updateClockface(),
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2019'),
});

// newDayBack.start()

function getTimeComponents(time) {
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));
  return { days, hours, mins, secs };
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateClockface({ days, hours, mins, secs }) {
  refs.dateInput.forEach((data, { days, hours, mins, secs }) => {
    const updateSpan = data.dataset.value;
    switch (updateSpan) {
      case days:
        data.textContent = days;
        break;
      case hours:
        data.textContent = hours;
        break;
      case mins:
        data.textContent = mins;
        break;
      case secs:
        data.textContent = days;
        break;
    }
  })
// console.log(refs.dateInput)
}

updateClockface(getTimeComponents())