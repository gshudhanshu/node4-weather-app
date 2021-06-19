console.log('Javascript connected!')


const searchFrom = document.querySelector('form')
const searchInput = document.querySelector('input')
const msgOne = document.querySelector('.msgOne')
const msgTwo = document.querySelector('.msgTwo')
const msgThree = document.querySelector('.msgThree')

searchFrom.addEventListener('submit', (event)=>{
    event.preventDefault()

    msgOne.textContent = 'Loading...'
    msgTwo.textContent = 'Loading...'
    msgThree.textContent = 'Loading...'

    fetch('/weather?address='+searchInput.value)
    .then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            msgTwo.textContent = ''
            msgThree.textContent = ''
            msgOne.textContent = 'address error'

        } else {
            msgOne.textContent = data.forecast
            msgTwo.textContent = data.location
            msgThree.textContent = data.address
        
        }
    })
})
})
