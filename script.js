const scroll_duration = 400; //ms

const command = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
let commandsCount = 0;

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
    scrollTo({
      top: origin + (destination == 0 ? origin * -1 : destination) * easeInOutCubic((time - start_time) / scroll_duration),
      behavior: 'smooth'
    });
    if ((time - start_time) > scroll_duration) return;
    requestAnimationFrame(time => smooth_scroll(time, start_time, origin, destination));
  }

  addEventListener('keydown', (e) => {
    if (e.key == command[commandsCount]) {
      if (++commandsCount >= command.length) document.getElementById('hero').classList.add('gaming');
    } else commandsCount = 0;
  });

  setTimeout(() => document.getElementById('header_button_checkbox').checked = false, 2000);
}, {once: true, passive: true});