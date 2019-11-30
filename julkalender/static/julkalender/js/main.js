// Main js file

// randomly rotate/flip background image
if (Math.floor(Math.random() * 5) === 0) {
  document.getElementById("calendar").style.transform = "rotate(180deg)";
  document.getElementById("calendar_overlay").style.transform =
    "rotate(180deg)";
}

if (Math.floor(Math.random() * 5) === 0) {
  document.getElementById("calendar").style.transform = "scaleY(-1)";
  document.getElementById("calendar_overlay").style.transform = "scaleY(-1)";
}

// initialize the snowfall
snowfall(document.getElementById("snowfall"), 0.2);

// Does weird shit if doubleclick
$("body").on("dblclick", function() {
  $("body").jGravity({ target: "everything", depth: 5 });
});

function createImg($type) {
  var images;

  if ($type == "t") {
    images = [
      "tomte01.gif",
      "tomte02.gif",
      "tomte03.gif",
      "tomte04.gif",
      "tomte05.gif"
    ];
  }
  if ($type == "g") {
    images = [
      "gran01.gif",
      "gran02.gif",
      "gran03.gif",
      "gran04.gif",
      "gran05.gif",
      "gran06.gif",
      "gran07.gif"
    ];
  }

  var randImg = Math.floor(Math.random() * images.length);
  var randX = Math.floor(Math.random() * (window.innerWidth - 100));
  var randY = Math.floor(Math.random() * (window.innerHeight - 100));

  const im = document.createElement("div");
  im.className = "image2";
  im.style.top = randY + "px";
  im.style.left = randX + "px";
  im.style.backgroundImage =
    "url('/static/julkalender/img/rolling/" + images[randImg] + "')";
  document.body.appendChild(im);
}
