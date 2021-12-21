export default () => {
  const content = document.querySelector(".content");

  fetch("./pages/about/about.html")
    .then((response) => response.text())
    .then((aboutHtml) => {
      content.innerHTML = aboutHtml;
    });
};
