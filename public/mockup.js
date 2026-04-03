document.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  const follower = document.getElementById("follower");
  follower.style.left = x + "px";
  follower.style.top = y + "px";
});
