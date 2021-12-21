import renderMain from "./pages/main/main.js";
import renderAbout from "./pages/about/about.js";
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
      candidates: () => {
        renderCandidates().then(router.updatePageLinks);
      },
      addCandidate: () => {
        renderAddCandidate();
      },
      "candidate/:id/editCandidate": ({ data }) => {
        renderEditCandidate(data.id);
      },
    })
    .resolve();
};
