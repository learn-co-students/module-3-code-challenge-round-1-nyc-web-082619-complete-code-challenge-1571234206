const beerList = document.querySelector('#list-group')
const beerDetail = document.querySelector('#beer-detail')

let beerArray; 

function getBeerList(){
    return fetch('http://localhost:3000/beers')
    .then(response => response.json())
    .then(data => {
        return beerArray = [...data]
    })
}

function renderBeerList(){
    getBeerList()
    .then((beerArray) => {
        beerArray.forEach((beer) =>{
            beerList.insertAdjacentHTML('beforeend',
            `<li class="list-group-item">${beer.name}</li>`
            )
        })
    })
}

function findBeerIdByName(beerName){
    getBeerList()
    let beer = beerArray.filter((beer)=> beerName === beer.name)[0]
    let beerId = beer.id
    return beerId 
}

function getBeerDetail(beerName){
    let beerId = findBeerIdByName(beerName)
    beerDetail.innerText = ""
    return fetch(`http://localhost:3000/beers/${beerId}`)
    .then(response => response.json())
    .then(beer => {
        beerDetail.insertAdjacentHTML('beforeend',
        `<h1>${beer.name}</h1>
        <img src="${beer.image_url}">
        <h3>${beer.tagline}</h3>
        <textarea id="description">${beer.description}</textarea>
        <button id="edit-beer" data-beer-id=${beer.id} class="btn btn-info">
          Save
        </button>`
        )
    })
}

document.addEventListener("DOMContentLoaded", (event) => {
    getBeerList()
    renderBeerList()
})

beerList.addEventListener('click', (event) => {
    if (event.target.className === "list-group-item"){
        let beerName = event.target.innerText
        getBeerDetail(beerName)
    }
})

beerDetail.addEventListener('click', (event) => {
    if (event.target.id === "edit-beer"){
        let beerId = event.target.dataset.beerId
        let descriptionArea = beerDetail.querySelector('#description')

        let newBeerDescription = event.target.previousSibling.textContent

        // Okay I know this is not the correct newBeerDescription to update.
        // But I ran out of time. (SAD!) I found the area where the new description is written
        // My last step is to find a way to get the new description text and set it = to the newBeerDescription
        // POOP :(
        debugger
        return fetch(`http://localhost:3000/beers/${beerId}`, {
            method: "PATCH",
            headers:  {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
            body: JSON.stringify({
                description: `${newBeerDescription}`
            })
        })
    }
    
})