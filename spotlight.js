document.addEventListener("DOMContentLoaded", () => {
  let width = document.documentElement.clientWidth;
  let height = document.documentElement.clientHeight;
  let x, y = 0;
  let isFirstTime = true;
  let isHidden = false;
  let isEnabled = false;

  function easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }

  function cancelAnimation() {
    if (isFirstTime) {
      document.getElementById("spotlight").classList.remove('isAnimating');
      isFirstTime = false;
      requestAnimationFrame(spotlight);
    }
  }

  addEventListener("click", (e) => cancelAnimation());

  addEventListener("mousemove", (e) => {
    cancelAnimation();
    if (!isHidden || isEnabled) {
      x = e.pageX;
      y = e.pageY;
      requestAnimationFrame(spotlight);
    }
  });

  addEventListener("resize", (e) => {
    if (!isHidden || isEnabled) {
      width = document.documentElement.clientWidth;
      height = document.documentElement.clientHeight;
      requestAnimationFrame(spotlight);
    }
  });

  addEventListener("scroll", (e) => {
    if (!isHidden) {
      document.getElementById("dark-over").classList.add('hide_dark-over');
      setTimeout(() => isHidden = true, 1000);
    }
  });

  document.getElementById('hero').addEventListener('click', (e) => {
    if (isEnabled) {
      document.getElementById("dark-over").classList.add('hide_dark-over');
      setTimeout(() => isEnabled = false, 1000);
    } else {
      isEnabled = true;
      document.getElementById("dark-over").classList.remove('hide_dark-over');
    }
    x = e.pageX;
    y = e.pageY;
    requestAnimationFrame(spotlight);
  });

  function spotlight(time) {
    const pos = { x: x - width/2, y: y - height/2 - pageYOffset};
    document.getElementById("spotlight").style.transform =
      `perspective(800px)
      rotate(${(pos.x < 0 ? 180 : 0) + Math.atan(pos.y / pos.x) * 180 / Math.PI}deg)
      scaleY(${1 - 0.1 * Math.sqrt(Math.pow(pos.x / (width / 2), 2) + Math.pow(pos.y / (height / 2), 2))})
      translateX(${Math.sqrt(Math.pow(pos.x, 2) + Math.pow(pos.y, 2))}px)
      rotateY(${ -10 * Math.sqrt(Math.pow(pos.x / (width / 2), 2) + Math.pow(pos.y / (height / 2), 2))}deg)`;
  }

}, {once: true, passive: true});