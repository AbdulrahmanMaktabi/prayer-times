// change image function
function randImage(){
    let covers = document.getElementsByClassName("card-img-top");
    for(let cover of covers){
        cover.setAttribute("src" , `icons/${Math.floor(Math.random() * 9) + 1}.png`)
    }
}
randImage()

// select filling
function selectFilling(){
    let s = document.getElementById("select");
    // GET request 
    axios({
    method: 'get',
    url: './sehir.json',
    responseType: 'json'
  })
    .then(function (response) {
      let sehirler = response.data.data;
      s.innerHTML = "";
      for(let sehir of sehirler){
        // console.log(sehir.il_adi)
        if(sehir.il_adi == "İstanbul"){
            s.innerHTML += 
        `
            <option value="${sehir.il_adi}" selected>${sehir.il_adi}</option>
        `;
        }
        s.innerHTML += 
        `
            <option value="${sehir.il_adi}">${sehir.il_adi}</option>
        `;
        // console.log(sehir.il_adi);
      }
    });
    
}
selectFilling();

// city chosing
function cityChosing(){
    let s = document.getElementById("select");
    s.addEventListener("change" , ()=> {
        // return s.value;
        getTimes(s.value);
        console.log(s.value);
    })
}
// getting prayars times
function getTimes(city="Istanbul"){
    axios({
        method: 'get',
        url: `http://api.aladhan.com/v1/calendarByCity/2017/4?city=${city}&country=Turkye`,
        responseType: 'json'
      })
        .then(function (response) {
            let times = document.getElementsByClassName("prayTime");
            
            times[0].innerHTML = String(response.data.data[0].timings.Sunrise).slice(0,6);
            times[1].innerHTML = String(response.data.data[0].timings.Fajr).slice(0,6);
            times[2].innerHTML = String(response.data.data[0].timings.Dhuhr).slice(0,6);
            times[3].innerHTML = String(response.data.data[0].timings.Asr).slice(0,6);
            times[4].innerHTML = String(response.data.data[0].timings.Maghrib).slice(0,6);
            times[5].innerHTML = String(response.data.data[0].timings.Isha).slice(0,6);
            
        });
}
// getTimes();
cityChosing();
getTimes();