window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed')


    const listGroup = document.querySelector('#list-group')
    const beerDetail = document.querySelector('#beer-detail')
    console.log(beerDetail)

    fetch('http://localhost:3000/beers')
    .then(function(response) {
    return response.json()
    })
    .then(function(data){
        data.forEach(function(beer){
            listGroup.insertAdjacentHTML('beforeend',`
            <button type"=button "<li class="list-group-item">${beer.name}</li></button>
            `)
        })       
    }) //end of name fetch

    listGroup.addEventListener('click', function(event){
        beerDetail.innerText = ""
        // debugger
        fetch('http://localhost:3000/beers')
        .then(function(response) {
        return response.json()
        })
        .then(function(data){
            data.forEach(function(beer){
                if (event.target.innerText === beer.name){
                    beerDetail.insertAdjacentHTML('beforeend',`
                    <h1>${beer.name}</h1>
                    <img src=${beer.image_url}>
                    <h3>${beer.tagline}</h3>
                    <textarea>${beer.description}</textarea>
                    <button id="edit-beer" class="btn btn-info" data-id=${beer.id}>Save</button>
                    `)
                } //end of if
            })//end of forEach
        })//end of second then
    }) //end of listGroup event listener

    beerDetail.addEventListener('click', function(event){
        if (event.target.innerText === "Save"){
            let newDescription = event.target.closest('#beer-detail').querySelector('textarea').value
            fetch(`http://localhost:3000/beers/${event.target.dataset.id}`,
                {
                    method: 'PATCH',
                    headers:   {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({"description": newDescription})
                }
            ) //end of fetch-patch
            // event.target.closest('#beer-detail').querySelector('textarea').value = newDescription
        } //end of if
    })////end of beerDetail event listener







}) //end of DOM content loaded