const filter = document.getElementById('good-dog-filter')
window.addEventListener('DOMContentLoaded', () => {
    checkFilter()
    getDogs()
})

function checkFilter() {
    fetch('http://localhost:3000/filter')
    .then(res => res.json())
    .then(data => {
        data[0].isOn === false ? filter.textContent = 'Filter good dogs: OFF' : filter.textContent = 'Filter good dogs: ON'
        filter.addEventListener('click', () => updateInfo.call(data[0], 'isOn', 'filter', updateFilter))
    })
}

function updateFilter(data) {
    data['isOn'] === false ? filter.textContent = 'Filter good dogs: OFF' : filter.textContent = 'Filter good dogs: ON'
    Array.from(document.querySelectorAll('span')).map(dog => dog.remove())
    getDogs()
}

function updateInfo(key, resource, fnc) {
    this[key] === true ? this[key] = false : this[key] = true
    const configObj = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(this)
    }
    fetch(`http://localhost:3000/${resource}/${this.id}`, configObj)
    .then(res => res.json())
    .then(res => fnc(res))

}

function getDogs() {
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(data => {
        data.map(dog => {
            if (filter.textContent === 'Filter good dogs: OFF' || dog.isGoodDog === true) {
                addDogToSpan(dog)
            }
        })
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
    document.querySelector('#status-button').addEventListener('click', () => updateInfo.call(dog, 'isGoodDog', 'pups', showDogInfo))
}