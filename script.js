let search = document.querySelector('#search');
const img = document.querySelector('img');
const cast = document.querySelector('.cast');
const temper = document.querySelector('.temper');
const locationVar = document.querySelector('.location');
let globalTemp = null;

let searchFunc = async (value) => {
  try {
    const response = await fetch (`http://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=a7115fb821706d37a2d57cbfe768d617`, { mode: 'cors' });
    const weatherResult = await response.json();
    cast.textContent="Cast: " + weatherResult.weather[0].main;
    console.log(weatherResult)
    let kelvConversion = weatherResult.main.temp - 273.15;
    let roundedCel = kelvConversion.toFixed(2)
    temper.textContent ="Temperature: " + roundedCel + " C";
    locationVar.textContent="Location: " + weatherResult.name;
    const response2 = await fetch (`https://api.giphy.com/v1/gifs/translate?api_key=hsn97uzXL4NiAuepQ8PUULdE4lMxod8o&s=${weatherResult.weather[0].main}`, { mode: 'cors' });
    const gifs = await response2.json();
    img.src = gifs.data.images.original.url;
    roundedCel =  kelvConversion;
    globalTemp = roundedCel;
  }
  catch (error) {
    console.log("ERROR IN SEARCH")
  }
}
let toggleTemp = () => {
  let oldTemp = globalTemp;
  if (temper.textContent.endsWith("C")){
    let newTemp = (globalTemp * 9/5) + 32 ;
    temper.textContent =`Temperature: ${newTemp} F`;
  } else if (temper.textContent.endsWith("F")){
    let newNewTemp = (oldTemp - 32) * 5/9;
    newNewNewTemp = newNewTemp.toFixed(2)
    temper.textContent =`Temperature: ${newNewNewTemp} C`;
  }
}