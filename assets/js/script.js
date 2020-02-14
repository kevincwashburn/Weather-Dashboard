var cityArray = [];


function displayCityInfo() {

    var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; 
            var yyyy = today.getFullYear();
                if(dd<10) {
                dd='0'+dd;
                }
                if(mm<10) {
                 mm='0'+mm;
                } 
        today = mm+'/'+dd+'/'+yyyy ;

    var userCity = $("#user-city").val();

   
    var apikey ="0e17682b5b0bcff3ec1f5be71cc69cfa";
    var queryUrl = ("https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&appid=" + apikey);

    $.ajax({
        url: queryUrl,
        method: "GET"
      }).then(function(response) {

        cityArray.push(userCity);   // may not need the array, depending on the natural organization of the cards.
        
        var cardDiv = $("<div class='card'>");
        $("#city-display").append(cardDiv);

        var cardBody = $("<div class='card-body'>");
        $(cardDiv).append(cardBody);
            var weatherIcon = response.weather[0].icon;
            var iconUrl = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
            var imgTag = $("<img>");
            imgTag.attr("src", iconUrl);
        
        var newH4 = $("<h4>");
            $(newH4).html(response.name + " " + today + " ");
            $(newH4).append(imgTag);
            $(cardBody).append(newH4);

        var pOne = $("<p>");
            var tempFar = ((response.main.temp - 273.15) * 1.80 +32).toFixed(0);
            $(pOne).text("Temperature: " + tempFar + " ºF");
            $(cardBody).append(pOne);

        var pTwo = $("<p>");
            $(pTwo).text("Humidity: " + response.main.humidity + "%");
            $(cardBody).append(pTwo);

        var pThree = $("<p>");
            $(pThree).text("Wind Speed: " + response.wind.speed + " mph");
            $(cardBody).append(pThree);

        }); 
};

$("#city-button").on("click", function(event){
    event.preventDefault();
    displayCityInfo();
});

