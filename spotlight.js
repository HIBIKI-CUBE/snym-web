document.addEventListener("DOMContentLoaded", () => {
  let width = document.documentElement.clientWidth;
  let height = document.documentElement.clientHeight;
  let x, y = 0;
  let isHidden = false;

  function easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }

  addEventListener("mousemove", (e) => {
    if (!isHidden) {
      x = e.pageX;
      y = e.pageY;
      requestAnimationFrame(spotlight);
    }
  });

  addEventListener("resize", (e) => {
    if (!isHidden) {
      width = document.documentElement.clientWidth;
      height = document.documentElement.clientHeight;
      requestAnimationFrame(spotlight);
    }
  });

  addEventListener("scroll", (e) => {
    document.getElementById("dark-over").classList.add('hide_dark-over');
    setTimeout(() => isHidden = true, 1000);
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