export default async (candidateId, partyId) => {
  const content = document.querySelector(".content");
  const apiUrl = "http://localhost:8080";

  const response = await fetch("./pages/candidate/editCandidate.html");
  const innerCandidatesHtml = await response.text();
  content.innerHTML = innerCandidatesHtml;

  const getCandidateResponse = await fetch(
    `${apiUrl}/api/parties/${partyId}/candidates/${candidateId}`
  );
  const getCandidateData = await getCandidateResponse.json();
  console.log(getCandidateData);

  document.querySelector("#candidate-first-name").value =
    getCandidateData.firstName;
  document.querySelector("#candidate-last-name").value =
    getCandidateData.lastName;

  const button = document.querySelector("button");
  button.addEventListener("click", async () => {
    const candidateUrl = `${apiUrl}/api/parties/${partyId}/candidates/${candidateId}`;
    const candidateResponse = await fetch(candidateUrl, {
      method: "PUT",
      body: JSON.stringify({
        firstName: document.querySelector("#candidate-first-name").value,
        lastName: document.querySelector("#candidate-last-name").value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    alert("Candidate has been updated");
    window.router.navigate("/candidates");
  });
};
