const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#location');
const messageTwo = document.querySelector('#forecast');

// messageOne.textContent = 'From Javascript';

weatherForm.addEventListener('submit', (e) => {
    // console.log('testing');
    e.preventDefault();
    
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    const location = searchElement.value;
    
    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
        // if(!response.ok) {
        //     return console.log(error);
        // }
        response.json().then((data) => {
            if(data.error) {
                return messageOne.textContent = data.error;  
            }
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast.description + '. Wind speed is ' 
            + data.forecast.windSpeed + '. Temperature is ' + data.forecast.temperature + 
            '. Feels like ' + data.forecast.feelslike;
        });
    });

});