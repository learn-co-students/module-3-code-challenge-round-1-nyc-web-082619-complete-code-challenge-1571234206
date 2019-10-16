const list = document.querySelector("#list-group")
let allBeer
const main = document.querySelector("#beer-detail")
let textArea
let result
let id 

let fetchBeer = () => {

    return fetch("http://localhost:3000/beers")
        .then(function (response) {
            return response.json();
        })
        .then(function (object) {
            allBeer = object
        })

}

fetchBeer().then(() => {
    allBeer.forEach((element) => {
        list.insertAdjacentHTML("beforeend", `<li class="list-group-item">${element.name}</li>`)
    })
})


document.addEventListener("click", (event) => {
    if (event.target.className === 'list-group-item') {
        result = allBeer.filter(obj => obj.name === event.target.innerHTML);
        id = result[0].id
        main.innerHTML = `<h1>${event.target.innerHTML}</h1>
        <img src=${result[0].image_url}>
        <h3>${result[0].tagline}</h3>
        <textarea>${result[0].description} </textarea>
        <p>Brewers Tips: ${result[0].brewers_tips}</p>
        <p>Food pairing: ${result[0].food_pairing}</p>
        <p>First Brewed: ${result[0].first_brewed}</p>
        <button id="edit-beer" class="btn btn-info">
          Save
        </button>
        `
    }
    if (event.target.className === "btn btn-info") {
        textArea = document.querySelector("textarea")
        let userInput = textArea.value
        fetch(`http://localhost:3000/beers/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
            body: JSON.stringify({
                description: `${userInput}`
            })
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            fetchBeer()
        });
    }
})