window.addEventListener("load",()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector(
       ".temperature-description"
    );
    let temperatureDegree = document.querySelector(
       ".temperature-degree"
    );
    let locationTimezone = document.querySelector(
       ".location-timezone"
    );
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition
        (position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/54ae8a83bdc9ee1ce87f33f33fb3bbe9/${lat},${long}`;

        fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
                const{ temperature, summary, icon} = data.currently;
                //Set DOM elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                //Formula for Celsius
                let celsius = (temperature - 32) * (5 / 9);
                //Change color
                changeColor(temperature);
                //Change image
                changeImg(temperature);
                //Set Icon
                setIcons(icon, document.querySelector(".icon"));
                //Change temperature to Celsius/Furenheit
                temperatureSection.addEventListener('click', ()=>{
                   if(temperatureSpan.textContent === "F") {
                       temperatureSpan.textContent = "C";
                       temperatureDegree.textContent = Math.floor(celsius);
                   }else{
                       temperatureSpan.textContent = "F";
                       temperatureDegree.textContent = temperature;
                   }
                });
            });
        });
   }
    
    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

    function changeColor(temp){
        document.getElementsByTagName('body')[0].style.background = temp > 0 ? "linear-gradient(rgb(255,153,0), rgb(255,72,0))" : "linear-gradient(rgb(47,150,163), rgb(48,62,143))";
    }

    function changeImg(temp) {
        document.getElementsByClassName('img')[0].style.background = temp > 0 ? "url(summer.png)" : "url(snow.png)";
    }
});