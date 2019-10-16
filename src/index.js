const BEERS_URL = "http://localhost:3000/beers"
const BEER_URL = id => BEERS_URL + "/" + id

const beerList = document.querySelector("ul.list-group")
const beerDetail = document.querySelector("div#beer-detail")


///////BUILDERS///////

//Beer <li> HTML builder//
function beerLiHTMLBuilder(beer){
    return `<li class="list-group-item" href="${beer.name}" data-beer-id="${beer.id}">${beer.name}</li>`
}

//Beer Detail HTML Builder//
function beerDetailHTMLBuilder(beer){
    return `
    <h1>${beer.name}</h1>
    <img src="${beer.image_url}">
    <h3>${beer.tagline}</h3>
    <form class="desc-form" data-beer-id="${beer.id}">
        <input type="text" size="90" id="text-box" name="description" value="${beer.description}">
        <br><br>
        <input type="submit" value="Save" id="edit-beer" class="btn btn-info">
    </form>
    `
}

//Beer Patch Obj Builder//
function descriptionPatchObjBuilder(newDescription){
    return {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            description: newDescription
        })
    }
}

//////FETCHERS///////

//Fetch All Beers//
function fetchBeers(){
    return fetch(BEERS_URL)
    .then(resp => resp.json())
}

//Fetch One Beer//
function fetchBeer(beerId){
    return fetch(BEER_URL(beerId))
    .then(beer => beer.json())
    .then(beer => beer)
}

//Patch Beer Description//

function patchBeer(form){
    const newDescription = form.description.value
    return fetch(BEER_URL(form.dataset.beerId), descriptionPatchObjBuilder(newDescription))
    .then(resp => resp.json())
    .then(beer => beer)
}


/////Add Event Listeners/////
function addFormListener(node){
    node.addEventListener("submit", event => {
        if(event.target.className = "desc-form"){
            event.preventDefault()
            patchBeer(event.target)
            .then(beer => renderFullBeer(beer.id))
        }
    })
}

//////Rendering///////


//Render Li Element for One Beer//
function renderBeerOnList(beer){
    beerList.insertAdjacentHTML("beforeend", beerLiHTMLBuilder(beer))
}

//Render detail for One Beer//
function renderFullBeer(beerId){
    fetchBeer(beerId)
    .then(beer => {
        if(beerDetail.querySelector("div")){
            beerDetail.querySelector("div").remove()
        }
        const node = document.createElement("div")
        node.id = "beer-detail"
        node.innerHTML = beerDetailHTMLBuilder(beer)
        beerDetail.append(node)
        addFormListener(node)
        })
}

//Render all Beer Li Elements on List//
function renderBeerList(beers){
    beers.forEach(renderBeerOnList)
    beerList.addEventListener("click", event => {
        if(event.target.className === "list-group-item"){
            renderFullBeer(event.target.dataset.beerId)
        }
    })
}

////INITIALIZE PAGE////
fetchBeers()
.then(renderBeerList)