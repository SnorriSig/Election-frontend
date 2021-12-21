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
        let party = document.querySelector("#candidateParty").value
        let candidateUrl = `${apiUrl}/api/parties/${party}/candidates`
        let candidateName = document.querySelector("#candidateFirstName").value

        fetch(candidateUrl, {
          method: "POST",
          body: JSON.stringify({
            firstName: candidateName,
            lastName: document.querySelector("#candidateLastName").value,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
            alert(`${candidateName} has been added`);
            window.router.navigate("/candidates");
            location.reload();
      });
    });
};
