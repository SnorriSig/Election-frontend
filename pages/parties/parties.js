export default () => {
    console.log("parties loaded");
    const content = document.querySelector(".content");
    const apiUrl = "http://localhost:8080";

    (async function fetchHtml() {
      const response = await fetch("./pages/parties/parties.html");
      const html = await response.text();
      return (content.innerHTML = html);
    })();
  
    // Fetch API JSON
    async function fetchParties() {
      const response = await fetch(`${apiUrl}/api/parties/`);
      const candidates = await response.json();
      return candidates;
    }

    const partyContainer = document.querySelector(".party-container");
    return fetchParties().then(parties => {
        parties;
        console.log(parties);
        console.log(parties.content[0].name); 
        
        const partyList = document.querySelector(".party-list");
        parties.content.forEach(partyName => {
            
            let partyLi = document.createElement("li");
            partyList.appendChild(partyLi);
            let politicalParty = partyName.name;
            let partyLetter = politicalParty.toLowerCase().charAt(0)
            console.log(partyName);
            partyLi.innerHTML = `<a class="home-links" href="/party/${partyName.id}" data-navigo>${politicalParty}</a>`;
            // <li><a class="home-links" href="/about" data-navigo>About</a></li>
          console.log(partyName);
            
        });

    });
}