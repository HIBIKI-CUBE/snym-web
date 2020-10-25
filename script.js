const scroll_duration = 400; //ms

const command = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
const command_touch = [{ x: [0, 1], y: [0, 1 / 3] }, { x: [0, 1], y: [0, 1 / 3] }, { x: [0, 1], y: [2 / 3, 1] }, { x: [0, 1], y: [2 / 3, 1] }, { x: [0, 1 / 3], y: [0, 1] }, { x: [2 / 3, 1], y: [0, 1] }, { x: [0, 1 / 3], y: [0, 1] }, { x: [2 / 3, 1], y: [0, 1] }, { x: [1 / 3, 2 / 3], y: [1 / 3, 2 / 3] }, { x: [1 / 3, 2 / 3], y: [1 / 3, 2 / 3] }];
let commandsCount = 0;

let abort_scroll = false;

document.addEventListener("DOMContentLoaded", () => {
  {
    const buttons = document.querySelectorAll('[data-target]');
    const header = document.getElementById('header');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', () => {
        let target = document.getElementById(buttons[i].dataset.target);
        requestAnimationFrame(time => smooth_scroll(time, time, window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0, buttons[i].dataset.target == "top" ? 0 : target.getBoundingClientRect().top - parseFloat(getComputedStyle(target).marginTop) - header.clientHeight));
      }, {passive: true});
    }
  }

  function easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }

  function smooth_scroll(time, start_time, origin, destination) {
    if (time == start_time) {
      document.getElementById('header_button_checkbox').checked = false;
      requestAnimationFrame(time => smooth_scroll(time, start_time, origin, destination));
      return;
    }
    if (abort_scroll) {
      abort_scroll = false;
      return;
    }
    scrollTo({
      top: origin + (destination||origin * -1) * easeInOutCubic((time - start_time) / scroll_duration)
    });
    if ((time - start_time) > scroll_duration) return;
    requestAnimationFrame(time => smooth_scroll(time, start_time, origin, destination));
  }

  addEventListener('touchstart', () => abort_scroll=true);
  addEventListener('touchend', () => abort_scroll=false);

  addEventListener('keydown', e => {
    if (e.key == command[commandsCount]) {
      if (++commandsCount == command.length) {
        requestAnimationFrame(gaming);
        document.getElementById('hero').classList.add('gaming');
      }
    } else commandsCount = 0;
  });

  function gaming(time, lastTime, hue = 0, duration = 3000) {
    hue += Math.round((360 / duration) * (time - lastTime||time));
    hue = hue >= 360 ? hue - 360 : hue;
    document.documentElement.style.setProperty('--gaming-bg', `hsl(${hue}, 100%, 50%)`);
    lastTime = time;
    requestAnimationFrame(time => gaming(time, lastTime, hue, duration));
  }

  document.getElementById("hero").addEventListener('touchstart', e => {
    const size = document.getElementById("hero").getBoundingClientRect();
    const x = (e.changedTouches[0].pageX - size.left + pageXOffset) / size.width;
    const y = (e.changedTouches[0].pageY - size.top + pageYOffset) / size.height;
    const rect = command_touch[commandsCount];
    if(rect.x[0]<=x && x<=rect.x[1] && rect.y[0]<=y && y<=rect.y[1]){
      if (++commandsCount == command.length) {
        requestAnimationFrame(gaming);
        document.getElementById('hero').classList.add('gaming');
      }
    } else commandsCount = 0;
  });

  setTimeout(() => document.getElementById('header_button_checkbox').checked = false, 2000);
}, {once: true, passive: true});