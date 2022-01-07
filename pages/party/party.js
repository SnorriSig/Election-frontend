export default async (partyId) => {
  console.log("this is party loaded");
  const content = document.querySelector(".content");
  const apiUrl = "http://localhost:8080";

  (async function fetchHtml() {
    const response = await fetch("./pages/party/party.html");
    const html = await response.text();
    return (content.innerHTML = html);
  })();

  // Fetch API JSON
  async function fetchCandidates() {
    const response = await fetch(`${apiUrl}/api/parties/${partyId}`);
    // waits until the HTTP request completes...
    const candidates = await response.json();
    return candidates;
  }

  // Create candidate list
  const candidateContainer = document.querySelector(".candidate-container");

  fetchCandidates().then((candidates) => {
    candidates;

    // Get html page title
    const pageTitle = document.querySelector(".page-title");
    pageTitle.textContent = candidates.name;

    // Navigating
    console.log(candidates);
    console.log(candidates.candidates[0].firstName);
    console.log(candidates.candidates[0].lastName);

    // Button to add candidate
    const addCandidateContainer = document.querySelector(".add-candidate");
    const addButton = document.createElement("button");
    addButton.textContent = "Candidate";
    addCandidateContainer.appendChild(addButton);
    addButton.addEventListener("click", function () {
      window.router.navigate("/addCandidate");
    });

    // List candidates
    candidates.candidates.forEach((candidate) => {
      const candidateTable = document.querySelector(".table");
      const candidateRow = document.createElement("tr");
      candidateTable.appendChild(candidateRow);
      const candidateCol = document.createElement("td");
      candidateRow.appendChild(candidateCol);
      candidateRow.textContent = `${candidate.firstName} ${candidate.lastName}`; //party.name;
      console.log(candidate);

      // Edit button
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      const editCol = document.createElement("td");
      editCol.appendChild(editButton);
      candidateRow.appendChild(editCol);

      editButton.addEventListener("click", function () {
        window.router.navigate(
          `party/${partyId}/editCandidate/${candidate.id}`
        );
      });

      // Delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      const deleteCol = document.createElement("td");
      deleteCol.appendChild(deleteButton);
      candidateRow.appendChild(deleteCol);

      deleteButton.addEventListener("click", async function () {
        const deleteResponse = await fetch(
          // http://localhost:8080/api/parties/3/candidates/8
          `${apiUrl}/api/candidates/${candidate.id}`,
          {
            method: "delete",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        const message = await deleteResponse.text();
        console.log(message[0]);
        alert(message);
        window.router.navigate(`/party/${partyId}`);
        location.reload();
      });
    });
  });
};
