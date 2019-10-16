const selectBeerList = document.querySelector('.list-group')
const selectBeerDetail = document.querySelector('#beer-detail')
let beerList

function getAllBeers(){
    fetch('http://localhost:3000/beers')
    .then(response => response.json())
    .then(function(data){ 
        beerList = data
        listBeers()
    })
}

function listBeers(){
    beerList.forEach((beer) => {
        selectBeerList.insertAdjacentHTML('beforeend',`
            <li class="list-group-item" data-id=${beer.id}>${beer.name}</li>
        `)
    })
}

getAllBeers()

document.addEventListener('click',(e) => {
    if (e.target.dataset.id) {
        const beerId = e.target.dataset.id
        let beerDetail
        fetch(`http://localhost:3000/beers/${beerId}`)
        .then(response => response.json())
        .then(function(data) {
            beerDetail = data
            renderBeerDetail(beerDetail)
        })
        
    }
})

function renderBeerDetail(beer) {
    while (selectBeerDetail.firstElementChild) {
        selectBeerDetail.firstElementChild.remove()
    }
    selectBeerDetail.insertAdjacentHTML('beforeend',`
    <div>
    <h1>${beer.name}</h1>
    <img src="${beer.image_url}">
    <h3>${beer.tagline}</h3>
    <textarea id="beer-text" >${beer.description}</textarea>
    <button id="edit-beer" class="btn btn-info" data-id=${beer.id}>
    Save
    </button>
    </div>
    `)
    const btn = selectBeerDetail.querySelector('#edit-beer')
    btn.addEventListener('click', (e) => {
        editDescription(e)
    })
    
}


function editDescription(node){
    const descBox = document.querySelector('#beer-text')
    const desc = document.querySelector('#beer-text').innerText
    
    descBox.innerText = desc
    const beerId = node.target.dataset.id
    fetch(`http://localhost:3000/beers/${beerId}`,{
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            "description": desc
        })
    })
    .then(response => response.json())
    .then((data) => {
        descBox.innerText = data.description
    })
}