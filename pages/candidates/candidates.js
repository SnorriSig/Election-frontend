export default async () => {
  console.log("candidates.js is loaded");
  const content = document.querySelector(".content");
  const apiUrl = "http://localhost:8080";

  (async function fetchHtml() {
    const response = await fetch("./pages/candidates/candidates.html");
    const html = await response.text();
    return (content.innerHTML = html);
  })();

  // Fetch Candidates API JSON
  async function fetchCandidates() {
    const response = await fetch(`${apiUrl}/api/candidates/`);
    const candidates = await response.json();
    return candidates;
  }

  const candidateContainer = document.querySelector(".candidate-container");

  fetchCandidates().then((candidates) => {
    candidates;

    // Button to add candidate
    const addCandidateContainer = document.querySelector(".add-candidate");
    const addButton = document.createElement("button");
    addButton.textContent = "Candidate";
    addCandidateContainer.appendChild(addButton);
    addButton.addEventListener("click", function () {
      window.router.navigate("/addCandidate");
    });

    // List candidates
    candidates.forEach((candidate) => {
      const candidateTable = document.querySelector(".table");
      const candidateRow = document.createElement("tr");
      candidateTable.appendChild(candidateRow);
      const candidateCol = document.createElement("td");
      candidateRow.appendChild(candidateCol);
      candidateRow.textContent = `${candidate.firstName} ${candidate.lastName}`;
      //console.log(candidate);

      // Edit button
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      const editCol = document.createElement("td");
      editCol.appendChild(editButton);
      candidateRow.appendChild(editCol);

      editButton.addEventListener("click", function () {
        window.router.navigate(`/party/${candidate.partyId}/editCandidate/${candidate.id}`);
      });

      // Delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      const deleteCol = document.createElement("td");
      deleteCol.appendChild(deleteButton);
      candidateRow.appendChild(deleteCol);

      deleteButton.addEventListener("click", async function () {
        const deleteResponse = await fetch(
          `${apiUrl}/api/candidates/${candidate.id}`,
          { method: "delete" }
        );
        const message = await deleteResponse.text();
        alert(message);
        window.router.navigate("/candidates");
        location.reload();
      });
    });
  });
};