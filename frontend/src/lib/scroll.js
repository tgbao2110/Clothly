export default function scrollTo({
  top = 0,
  left = 0,
  behavior = "smooth",
  target = window,
} = {}) {
  const isWindow = target === window;

  const scrollOptions = { top, left, behavior };

  if (isWindow) {
    window.scrollTo(scrollOptions);
  } else if (target?.scrollTo) {
    target.scrollTo(scrollOptions);
  } else {
    console.warn("Invalid scroll target provided:", target);
  }
}
