fetch("../assets/svg/star.svg")
  .then((response) => response.text())
  .then((svgText) =>
    document
      .querySelectorAll(".star-svg")
      .forEach((wrapper) => (wrapper.innerHTML = svgText))
  );
