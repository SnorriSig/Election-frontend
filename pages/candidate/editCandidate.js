export default async (candidateId) => {
    const content = document.querySelector(".content");
    const response = await fetch("./pages/candidate/editCandidate.html");
    const apiUrl = "http://localhost:8080"
    const innerCandidatesHtml = await response.text();
    content.innerHTML = innerCandidatesHtml;
  
    let party = document.querySelector("#candidateParty").value
    const getCandidateResponse = await fetch(`${apiUrl}/api/parties/${party.id}/candidates/${candidateId}`);
    const getCandidateData = await getCandidateResponse.json();
  
    document.querySelector("#candidateFirstName").value = getCandidateData.firstName;
    document.querySelector("#candidateLastName").value = getCandidateData.lastName;
    document.querySelector("#candidateParty").value = getCandidateData.party;

  
    const button = document.querySelector("button");
    button.addEventListener("click", async () => {
        let party = document.querySelector("#candidateParty").value
      const candidateUrl = `${apiUrl}/api/parties/${getCandidateData.id}/candidate/${candidateId}`;
      const candidateResponse = await fetch(candidateUrl, {
        method: "PUT",
        body: JSON.stringify({
          firstName: document.querySelector("#candidateTitle").value,
          lastName: document.querySelector("#age").value,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const { message } = await candidateResponse.json();
      alert(message);
      window.router.navigate("/candidates");
    });
  };