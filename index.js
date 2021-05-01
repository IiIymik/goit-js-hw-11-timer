class CountdownTimer{
  constructor({ selector, targetDate }) {
    this.intervalId = null;
    this.targetDate = targetDate;
    this.selector = selector;
  }
  
  start() {
    const countDownDate = this.targetDate.getTime();
    
    this.intervalId = setInterval(() => {
      const currentTime = new Date().getTime();

      const time = countDownDate - currentTime;
      
      const timer = this.getTimeComponents(time);

      this.updateClockface(timer);
      
      if (time < 0) {
      clearInterval(this.intervalId);
        console.log("Время истекло");
      
  }
    }, 1000)
  }

  getTimeComponents(time) {
  const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
  return { days, hours, mins, secs };
}

  pad(value) {
  return String(value).padStart(2, "0");
  }
  
  updateClockface(time) {
    const { days, hours, mins, secs } = time
  
    const divEl = document.querySelector(this.selector).querySelectorAll('.value');
  
    divEl.forEach((data) => {
      const updateSpan = data.dataset.value;
      
      switch (updateSpan) {
      case "days":
        data.textContent = days;
        break;
      case "hours":
        data.textContent = hours;
        break;
      case "mins":
        data.textContent = mins;
        break;
      case "secs":
        data.textContent = secs;
        break;
    } 
  })
  }
}

const newDayBack = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('May 05, 2021'),
});

newDayBack.start();  