/*
animates snowfall on a canvas (element param)
snowfactor decides how many snowflakes to spawn
*/
function snowfall(element, snowfactor = 1) {
  const canvas = element;
  const ctx = canvas.getContext("2d");

  // a single snowflake
  class Snowflake {
    constructor(x, size, y = -1) {
      this.x = x;
      this.size = size;
      this.y = y == -1 ? -size : y;
      this.color = "#fff";
    }

    update() {
      this.y += Math.sqrt(this.size);
    }

    offsetX() {
      return this.x - this.size * Math.sin(this.y / (3 * this.size));
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.offsetX(), this.y, this.size, this.size);
    }
  }

  // all snowflakes
  let snowflakes = [];

  // spawn random snowflakes based on snowfactor
  // if initial is specified it will spawn at a random y coord instead of on top.
  const spawnSnowflakes = (initial = false) => {
    // wider screen should have more snowfall.
    const targetCount = (canvas.width / 10) * snowfactor;

    // random (ish) value to determine whether or not to spawn flakes.
    let val =
      ((2 * targetCount) / (snowflakes.length + targetCount / 4)) *
      Math.random();

    if (val > 1) {
      const size = 7 + Math.random() * 5;
      const x = Math.random() * (canvas.width - size);

      // initial snowflakes get a custom y value
      const sf = initial
        ? new Snowflake(x, size, canvas.height * Math.random())
        : new Snowflake(x, size);
      snowflakes.push(sf);
    }
  };

  // Updates and draws the snowflakes
  const draw = () => {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // spawn new snowflakes
    spawnSnowflakes();

    // redraw and update position
    snowflakes.forEach(function(sf) {
      sf.draw();
      sf.update();
    });

    // Remove snowflakes who leave the screen on the y axis
    snowflakes = snowflakes.filter(function(sf) {
      return sf.y < canvas.height;
    });

    // queue next frame
    window.requestAnimationFrame(draw);
  };

  // resize canvas according to window
  const resizeCanvas = () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // spawn initial snowflakes
  for (let i = 0; i < 60; i++) spawnSnowflakes(true);

  // trigger initial render
  window.requestAnimationFrame(draw);
}
