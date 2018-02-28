fetch('http://0.0.0.0:8881/stations')
    .then(response => response.json())
    .then(data => {
        // Do what you want with your data
        // inject that data into HTML dropdown
    })
    .catch(err => {
        console.error('An error ocurred', err);
    });
