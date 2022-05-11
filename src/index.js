window.addEventListener('DOMContentLoaded', getDogs)

function getDogs() {
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(data => {
        data.map(dog => addDogToSpan(dog))
    })
}

function addDogToSpan(dog) {
    const span = document.createElement('span')
    span.textContent = dog.name
    document.getElementById('dog-bar').appendChild(span)
    span.addEventListener('click', () => showDogInfo(dog))
}
function showDogInfo(dog) {
    let dogStatus
    dog.isGoodDog === true ? dogStatus = 'Good Dog!' : dogStatus = 'Bad Dog!'
    document.getElementById('dog-info').innerHTML = `
    <img src="${dog.image}" >
    <h2>${dog.name}</h2>
    <button id="status-button">${dogStatus}</button>
    `
    document.querySelector('#status-button').addEventListener('click', () => updateGoodness(dog))
}

function updateGoodness(dog) {
    dog.isGoodDog === true ? dog.isGoodDog = false : dog.isGoodDog = true
    const configObj = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(dog)
    }
    fetch(`http://localhost:3000/pups/${dog.id}`, configObj)
    .then(res => res.json())
    .then(dog => showDogInfo(dog))
}

document.getElementById('good-dog-filter').addEventListener('click', (e) => {
    e.target.textContent === 'Filter good dogs: OFF' ? e.target.textContent = 'Filter good dogs: ON' : e.target.textContent = 'Filter good dogs: OFF'
})