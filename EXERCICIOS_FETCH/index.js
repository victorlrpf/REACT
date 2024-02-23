// const data = require('./houses.json')

// console.log((data[1])); 

const url_base = "https://www.anapioficeandfire.com/api/houses"


fetch(`${url_base}`) 
    .then((response) => response.json())
    .then((data) => {
        const filtroRegion = prompt('Insira a região desejada')
        const filter = data.filter(item => item.region === filtroRegion);
        console.log(filter);
    })
    // .then((data) => console.log(data))
    .catch((error) => console.log(error))