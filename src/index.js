const beersList = document.querySelector(".beersList")
const body = document.querySelector(".body")
const listGroup = document.querySelector(".list-group")
const details = document.querySelector("#beer-detail")



// display beers----------------------------------------------------

fetch("http://localhost:3000/beers")
    .then(res => res.json())
    .then(beers=> getBeers(beers))
   


 function div(){        
    
    beersList.insertAdjacentHTML('beforeend', 
    `
    <ul class="list-group">
    </ul>
    `
    )
}
div()

    
function getBeers(beers){
    
    beers.forEach(beer=> {
        
        
        listGroup.insertAdjacentHTML('beforeend', 
        `
        <li class="list-group-item" data-beer-id="${beer.id}" >${beer.name}</li>
        `
        )
    })
}

// display beers----------------------------------------------------

//  beer details ----------------------------------------------------

body.addEventListener("click", function(event) {
    let thisBeer = event.target.dataset.beerId
    thisBeer = parseInt(thisBeer)
    
    if (event.target.className === "list-group-item"){
        console.log(thisBeer)
        
        fetch(`http://localhost:3000/beers/${thisBeer}`)
            .then(res => res.json())
            .then(beer => beerDetails(beer))

    } else if (event.target.className === "btn btn-info"){
        console.log(thisBeer)
        let ham = document.querySelector("#description")
        ham = ham.innerHTML
        console.log(ham)
        

        fetch(`http://localhost:3000/beers/${thisBeer}`, {
             method: "PATCH",
             headers:
             {
                   'Content-Type': 'application/json',
                   'Accept': 'application/json'
             },
             body: JSON.stringify(

               {
            description: ham
               }
             )
            })
    } 
}
)

function beerDetails(beer){

        details.insertAdjacentHTML('beforeend', 
        `
            <h1>${beer.name}</h1>
            <img src="${beer.image_url}">
            <h3>${beer.tagline}</h3>
            <textarea id="description">${beer.description}</textarea>
            <button data-beer-id="${beer.id}" class="btn btn-info">
              Save
            </button>
        `
    )
}

//  beer details ----------------------------------------------------
//  beer details ----------------------------------------------------

