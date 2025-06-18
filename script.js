document.addEventListener("DOMContentLoaded", () => {
  // ランダム位置に配置
  const icons = document.querySelectorAll(".random-icons img");
  icons.forEach(icon => {
    const parent = icon.parentElement;
    const maxX = parent.clientWidth - 100;
    const maxY = parent.clientHeight - 100;
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    icon.style.left = `${x}px`;
    icon.style.top = `${y}px`;
  });

  // ホバーで画像切替
  document.querySelectorAll(".hover-switch").forEach(img => {
    const originalSrc = img.src;
    const hoverSrc = img.dataset.alt;

    img.addEventListener("mouseenter", () => {
      img.src = hoverSrc;
    });
    img.addEventListener("mouseleave", () => {
      img.src = originalSrc;
    });
  });
});