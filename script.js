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

const skillCards = document.querySelectorAll(".skill-card[data-topic]");
const currentTopic = document.body.dataset.topic || new URL(document.referrer || window.location.href).pathname.match(/(code|creative-coding|design|engineering)/)?.[1];

skillCards.forEach((card) => {
  card.classList.toggle("featured", card.dataset.topic === currentTopic);
});

const topicSidebar = document.querySelector(".topic-sidebar");
const topicToggle = document.querySelector(".topic-toggle");

if (topicSidebar && topicToggle) {
  topicToggle.addEventListener("click", () => {
    const isOpen = topicSidebar.classList.toggle("is-open");
    topicToggle.setAttribute("aria-expanded", String(isOpen));
    topicToggle.setAttribute("aria-label", isOpen ? "Close topic navigation" : "Open topic navigation");
  });

  topicSidebar.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      topicSidebar.classList.remove("is-open");
      topicToggle.setAttribute("aria-expanded", "false");
      topicToggle.setAttribute("aria-label", "Open topic navigation");
    });
  });
}

const personalityPrompt = document.querySelector("#personality-prompt");
const personalityAnswer = document.querySelector("#personality-answer");

document.querySelectorAll("[data-answer]").forEach((question) => {
  question.addEventListener("click", () => {
    personalityPrompt.textContent = question.textContent;
    personalityAnswer.innerHTML = `${question.dataset.answer} <span>↗</span>`;
  });
});
