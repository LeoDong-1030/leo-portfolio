const canvas = document.querySelector("#creative-canvas");
const cursorBubble = document.querySelector(".cursor-bubble");
const shapes = document.querySelectorAll(".shape");

if (canvas && cursorBubble) {
  canvas.addEventListener("pointermove", (event) => {
    const bounds = canvas.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    cursorBubble.style.left = `${x}px`;
    cursorBubble.style.top = `${y}px`;

    shapes.forEach((shape, index) => {
      const strength = (index + 1) * 2.5;
      const offsetX = ((x / bounds.width) - 0.5) * strength;
      const offsetY = ((y / bounds.height) - 0.5) * strength;
      shape.style.translate = `${offsetX}px ${offsetY}px`;
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
document.querySelector("#year").textContent = new Date().getFullYear();
