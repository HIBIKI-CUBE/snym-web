const scroll_duration = 400; //ms

document.addEventListener("DOMContentLoaded", () => {
  {
    const buttons = document.getElementsByClassName('js_jump_button');
    const header = document.getElementById('header');
    let is_scrolling = false;
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', () => {
        let target = document.getElementById(buttons[i].dataset.target);
        requestAnimationFrame(time => smooth_scroll(time, time, window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0, target.getBoundingClientRect().top - parseFloat(getComputedStyle(target).marginTop) - header.clientHeight));
      }, {passive: true});
    }
  }

  function easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }

  function smooth_scroll(time, start_time, origin, destination) {
    if (time == start_time) {
      document.getElementById('header_button').checked = false;
      requestAnimationFrame(time => smooth_scroll(time, start_time, origin, destination));
      return;
    }
    scrollTo({
      top: origin + destination * easeInOutCubic((time - start_time) / scroll_duration),
      behavior: 'smooth'
    });
    if ((time - start_time) > scroll_duration) return;
    requestAnimationFrame(time => smooth_scroll(time, start_time, origin, destination));
  }

  setTimeout(() => {
    document.getElementById('header_button').checked = false;
  }, 2000);
}, {once: true, passive: true});