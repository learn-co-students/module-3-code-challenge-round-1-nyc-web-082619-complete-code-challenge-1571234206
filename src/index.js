let rowDiv = document.querySelector('.row')
let colList = document.querySelector('col-md-4')
let listGroup = document.querySelector('.list-group')
let listGroupId = document.querySelector('#list-group')
let detailDiv = document.querySelector('.col-md-8')
let beerDetailDiv = document.querySelector('#beer-detail')
let beerLi = document.querySelector('.list-group-item')


function getBeers(){
    fetch("http://localhost:3000/beers").then(function(response){
    return response.json()
    }).then(function(beers){
    beers.forEach(function(beer){
        let li = document.createElement('li');
        li.setAttribute('class', 'list-group-item');
        li.innerText = beer.name;
        listGroup.appendChild(li); //fetching all beers and creating for each one his own node and content.
        })
    })
}

getBeers()

fetch("http://localhost:3000/beers").then(function(response){
    return response.json()
    }).then(function(beers){
        beers.forEach(function(beer){ //getting all the beers
            listGroup.addEventListener('click', function(event){ // adding an eventlistener on the whole list group
                // debugger
                if(event.target.innerText === beer.name){ // checking if the innertext of clicked target is eqaul to the beers name
                    createBeerDetailes(beer)
        }
    })
})
})
//all elements are being created (as debbuger showes but it does not catches the correct element it should check for)
//on the button should be anothe event listener wuth the following fetch PATCH
//from the button is a fetch Patch

// fetch('http://localhost:3000/beers/' + `${beer.id}`, {
//     method: "PATCH",
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//     },
//     body: JSON.stringfy()
// })
function createBeerDetailes(beer){ //was last minute change
    let h1 = document.createElement('h1'); 
    h1.innerText = `${beer.name}`;
    beerDetailDiv.appendChild(h1)

    let img = document.createElement('img')
    img.innerText = `${beer.image_url}`;
    beerDetailDiv.appendChild(img);

    let h3 = document.createElement('h3');
    h3.innerText = `${beer.tagline}`;
    beerDetailDiv.appendChild(h3)

    let textarea = document.createElement('textarea');
    textarea.innerText = `${beer.description}`;
    beerDetailDiv.appendChild(textarea);

    let button = document.createElement('button');
    button.setAttribute('id', 'edit-beer')
    button.setAttribute('class', 'btn btn-info')
    button.innerText = "Save";
    beerDetailDiv.appendChild(button);
}