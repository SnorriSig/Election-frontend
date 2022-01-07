export default () => {
  const content = document.querySelector(".content");
  const apiUrl = "http://localhost:8080";
  
  return fetch("./pages/candidates/candidates.html")
    .then((response) => response.text())
    .then((candidatesHtml) => {
      content.innerHTML = candidatesHtml;

      // Button to add candidate
      const addCandidateContainer = document.querySelector(".add-candidate");
      const addButton = document.createElement("button");
      addButton.textContent = "Candidate";
      addCandidateContainer.appendChild(addButton);
      addButton.addEventListener("click", function () {
        window.router.navigate("/addCandidate");
      });

      // Create candidate list
      fetch(`${apiUrl}/api/parties/`)
        .then((response) => response.json())
        .then((candidates) => {
          console.log(candidates);
          const candidateContainer = document.querySelector(
            ".candidate-container"
          );

          // Candidate title in table
          const parties = candidates.content;
          console.log(parties[0].name);
          console.log(parties[0].candidates[0].firstName);

          parties.forEach((party) => {
            let partyId = party.id;
            candidates.content
              .map((c) => c.candidates)
              .flat()
              .forEach((candidate) => {
                const candidateTable = document.querySelector(".table");
                const candidateRow = document.createElement("tr");
                candidateTable.appendChild(candidateRow);
                const candidateCol = document.createElement("td");
                candidateRow.appendChild(candidateCol);
                candidateRow.textContent = candidate.firstName; //party.name;

                // Edit button
                const editButton = document.createElement("button");
                editButton.textContent = "Edit";
                const editCol = document.createElement("td");
                editCol.appendChild(editButton);
                candidateRow.appendChild(editCol);

                editButton.addEventListener("click", function () {
                  window.router.navigate(
                    `candidate/${candidate.id}/editCandidate`
                  );
                });

                // Delete button
                console.log(parties[1].id);
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                const deleteCol = document.createElement("td");
                deleteCol.appendChild(deleteButton);
                candidateRow.appendChild(deleteCol);

                deleteButton.addEventListener("click", async function () {
                  const deleteResponse = await fetch(
                    // http://localhost:8080/api/parties/3/candidates/8
                    `${apiUrl}/api/parties/${partyId}/candidates/${candidate.id}`,
                    { method: "delete" }
                  );
                  const { message } = await deleteResponse.json();
                  alert(message);
                  window.router.navigate("/candidates");
                  location.reload();
                });
              });
          });
        });
    });
};
