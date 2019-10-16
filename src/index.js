const beerList = document.querySelector(".list-group#list-group")
const beerDetailDiv = document.querySelector("#beer-detail")

//begin sidebar 
function sidebar(){
fetch("http://localhost:3000/beers")
.then(resp => resp.json())
.then(json => json.forEach(renderBeerToList));

function renderBeerToList(beer){
    beerList.insertAdjacentHTML("beforeend", `<li id="${beer.id}" class="list-group-item">${beer.name}</li>`)
};
}
sidebar()
//end sidebar

//begin details

function details (){

    beerList.addEventListener("click", event => {
        fetch(`http://localhost:3000/beers/${event.target.id}`)
        .then(resp => resp.json())
        .then(json => renderBeerDetails(json))
    })

    
    
function renderBeerDetails(beerObj){
    beerDetailDiv.innerHTML = `<h1>${beerObj.name}</h1>
    <img src="${beerObj.image_url}">
    <h3>${beerObj.tagline}</h3>
    <textarea>${beerObj.description}</textarea>
    <button id="edit-beer" class="btn btn-info">
      Save
    </button>`
}
}
details()
//end details


//begin edit
function edit(){
    const editButton = document.querySelector("button#edit-beer")
    editButton.addEventListener("click", event => 
    updateDescription()
    patchBeer(event.target)
    )
function updateDescription{

}

function patchBeer(id, description){
            fetch(`http://localhost:3000/beers/${id}`, {
                method: "PATCH", headers: {
                    "Content-Type": "application/json",
                    "Accepts": "application/json"},
                body: JSON.stringify({"description": description}) 
            })
        }
}