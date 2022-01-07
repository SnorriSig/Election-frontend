import renderMain from "./pages/main/main.js";
import renderAbout from "./pages/about/about.js";
import renderParties from "./pages/parties/parties.js"
import renderParty from "./pages/party/party.js"
import renderCandidates from "./pages/candidates/candidates.js"
import renderAddCandidate from "./pages/candidate/addCandidate.js"
import renderEditCandidate from "./pages/candidate/editCandidate.js";

export default () => {
  //const router = new Navigo("/", { hash: true });
  window.router = new Navigo("/", { hash: true });

  router
    .on({
      "/": () => {
        // call updatePageLinks to let navigo handle the links
        // when new links have been inserted into the dom
        renderMain().then(router.updatePageLinks);
      },
      about: () => {
        renderAbout();
      },
      parties: () => {
        renderParties().then(router.updatePageLinks);
      },
      "party/:partyId": ({data}) => {
        renderParty(data.partyId);
      },
      candidates: () => {
        renderCandidates();
      },
      addCandidate: () => {
        renderAddCandidate();
      },
      "party/:partyId/editCandidate/:id": ({ data, params }) => {
        renderEditCandidate(data.id, data.partyId);
      },
    })
    .resolve();
};
