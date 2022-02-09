console.log('Client side js file is loaded')



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const message2nd = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent = 'Loading data...'; // bla 
    message2nd.textContent = '';

    const location = search.value

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return messageOne.textContent = data.error;

            }
            messageOne.textContent = data.location;
            message2nd.textContent = data.forecast;

            console.log(data.location);
            console.log(data.forecast);

        })
    })

})
