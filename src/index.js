const BASE_URL = "http://localhost:3000";
const BEERS_PATH = `${BASE_URL}/beers`;
const BEER_PATH = id => `${BEERS_PATH}/${id}`;

const list = document.querySelector("#list-group");
const detail = document.querySelector("#beer-detail");

fetch(BEERS_PATH)
  .then(e => e.json())
  .then(e => e.forEach(renderBeer));

function renderBeer(beer) {
  list.insertAdjacentHTML(
    "beforeend",
    `<li data-id="${beer.id}" class="list-group-item">${beer.name}</li>`
  );
}

function renderBeerDetail(beer) {
  detail.innerHTML = `
    <h1>${beer.name}</h1>
    <img src="${beer.image_url}"/>
    <h3>${beer.tagline}</h3>
    <textarea id='beer-description'>${beer.description}</textarea>
    <button data-id="${beer.id}" class="btn btn-info">Save</button>
`;
}

list.addEventListener("click", e => {
  if (e.target.className === "list-group-item") {
    fetch(BEER_PATH(e.target.dataset.id))
      .then(e => e.json())
      .then(renderBeerDetail);
  }
});

detail.addEventListener("click", e => {
  if (e.target.className === "btn btn-info") {
    const id = e.target.dataset.id;
    const msg = document.querySelector("#beer-description").value;

    const content = {
      description: msg
    };

    const meta = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(content)
    };

    fetch(BEER_PATH(id), meta).catch(alert);
  }
});
