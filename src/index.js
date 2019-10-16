const BASE_URL = "http://localhost:3000";
const BEERS_PATH = `${BASE_URL}/beers`;
const BEER_PATH = id => `${BEERS_PATH}/${id}`;

const list = document.querySelector("#list-group");
const detail = document.querySelector("#beer-detail");

fetch(BEERS_PATH)
  .then(e => e.json())
  .then(e => e.forEach(renderBeerItem));

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

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(content)
    };

    fetch(BEER_PATH(id), options).catch(alert);
  }
});

function renderBeerItem(beer) {
  list.insertAdjacentHTML(
    "beforeend",
    `<li data-id="${beer.id}" class="list-group-item">${beer.name}</li>`
  );
}

function renderBeerDetail(beer) {
  if (detail.innerHTML) {
    updateBeerDetail(beer);
  } else {
    detail.innerHTML = `
    <h1>${beer.name}</h1>
    <img src="${beer.image_url}"/>
    <h3>${beer.tagline}</h3>
    <textarea rows=8 id='beer-description'>${beer.description}</textarea>
    <button data-id="${beer.id}" class="btn btn-info">Save</button>
`;
  }
}

//updateBeerDetail removes the graphical bug caused by re-rendering the div.
function updateBeerDetail(beer) {
  const h1 = document.querySelector("#beer-detail > h1");
  h1.innerText = beer.name;

  const img = document.querySelector("#beer-detail > img");
  img.src = beer.image_url;

  const h3 = document.querySelector("#beer-detail > h3");
  h3.innerText = beer.tagline;

  const textarea = document.querySelector("#beer-detail > textarea");
  textarea.value = beer.description;

  const button = document.querySelector("#beer-detail > button");
  button.dataset.id = beer.id;
}
