export default () => {
  const content = document.querySelector(".content");
  const apiUrl = "http://localhost:8080"
  
  return fetch("./pages/candidate/addcandidate.html")
    .then((response) => response.text())
    .then((candidatesHtml) => {
      content.innerHTML = candidatesHtml;

      const form = document.querySelector("form");
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const party = document.querySelector("#candidate-party").value
        const candidateName = document.querySelector("#candidate-first-name").value
        
        const candidateUrl = `${apiUrl}/api/parties/${party}/candidates`
        fetch(candidateUrl, {
          method: "POST",
          body: JSON.stringify({
            firstName: candidateName,
            lastName: document.querySelector("#candidate-last-name").value,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
            alert(`${candidateName} has been added`);
            window.router.navigate("/candidates");
      });
    });
};
