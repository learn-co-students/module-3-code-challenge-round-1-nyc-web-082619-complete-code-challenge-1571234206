const BASE_URL = "http://localhost:3000"
const BEER_URL = `${BASE_URL}/beers`

document.addEventListener('DOMContentLoaded',()=>{

    const leftListContainer = document.querySelector('.list-group');
    const beerDetailsContainer = document.querySelector('#beer-detail')

//------------------- START BEER DETAILS DISPLAY ON CLICK--------------------------------

    addBeerDetails = (beer) => { // display the beer in beer-detail container 
        beerDetailsContainer.innerHTML = ""
        beerDetailsContainer.insertAdjacentHTML('beforeend', `
        <h1>${beer.name}</h1>
        <img src="${beer.image_url}">
        <h3>${beer.tagline}</h3>
        <textarea>${beer.description}</textarea>
        <button id="${beer.id}" class="btn btn-info">
        Save
        </button>
        `)
    }
    
    fetchBeerDetails = (beerId) => { // fatch a specific beers details using show route
        fetch(`${BEER_URL}/${beerId}`)
            .then(resp=>resp.json())
            .then(data=>{ 
                    addBeerDetails(data) // pass single beer to addBeerDetails for display
            })
    }

    leftListContainer.addEventListener('click',()=>{ // event Listener for whole List container
        fetchBeerDetails(event.target.dataset.id)  // each li tag include ID of the beer
    })
//------------------- END OF EER DETAILS DISPLAY ON CLICK--------------------------------


//------------------- SAVING DESCRIPTION TO DATABASE ------------------------------------

    editBeerDetails = (beerId,desc) => {  //save to DB using ID and Description
        fetch(`${BEER_URL}/${beerId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Accepts": "application/json"
            },
            body: JSON.stringify({description: desc})
          })
    } //end of editBeerDetails


    beerDetailsContainer.addEventListener('click',()=>{ // eventListener for the Save button works too
        if(event.target.className === "btn btn-info"){
            const description = event.target.closest('#beer-detail').querySelector('textarea').value
            editBeerDetails(event.target.id, description) //pass beer ID and descript to process 
        }
    })// end of EventListener
//-------------------- END OF SAVING DESCRIPTION TO DATABASE --------------------------------

//-------------------- START LEFT SIDE LIST CONTAINER ----------------------------------------

    beerDatahandler = (beers) => { // display each beer name in list
        beers.forEach(beer => {
            leftListContainer.insertAdjacentHTML('beforeend',`
            <li class=list-group-item data-id=${beer.id}>${beer.name}</li>
            `)
        });
    }

    fetchBeers = () => { // sent get request to beers index route
        fetch(BEER_URL)
            .then(resp=>resp.json())
            .then(data=>{ 
                    beerDatahandler(data); // pass all the beer to beerDatahandler function to display
            })
    }

    fetchBeers(); //Fetch all the beers from DB
//------------- END LEFT SIDE LIST CONTAINER ----------------------------------------------------------

}) // End of DOMContainLoad