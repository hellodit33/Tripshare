//Funktion för att hämta data från Strapi CMS
async function getDataFromStrapi() {
    //Url till Strapi.js API för att hämta alla trips
    let url = "http://localhost:1337/api/trips?populate=*";
    let apiUrl ="http://localhost:1337";
    //Hämtar JSON från API och konverterar det till JS objekt
    let stringResponse = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }});
    let myObject = await stringResponse.json();
    

    console.log(myObject);
    
    let output = "";
    
    //Checkar om det är ett eller flera objekt som hämtas
    //Kan undvikas genom flera funktioner; en för alla och en för unik
    if (Array.isArray(myObject.data)){
        //Skapar en ForEach loop för varje element i Data-arrayen
        myObject.data.forEach(element => {
    
            //Gör en pekare till attribut object
            let obj = element.attributes;
    
            for (x in obj) {
                console.log( x + ": " + obj[x]);
            }
    
            //Skriver Output string
            //document.write(`Namn: ${attr.name}`);
            output += `<div><h1>${obj.tripName}</h1></div><div> Description: ${obj.tripDescription} Leaving Date: ${obj.TripDates.LeavingDate} Arriving Date: ${obj.TripDates.ArrivingDate} Leaving From: ${obj.TripDestinations.LeavingDestination} First Destination: ${obj.TripDestinations.BetweenDestination} Second Destination: ${obj.TripDestinations.BetweenDestination2}
            Third Destination: ${obj.TripDestinations.BetweenDestination3} Finishing At: ${obj.TripDestinations.ArrivingDestination} Available Seats: ${obj.Seats} <br>
            
            <img src=${apiUrl}${obj.tripMap2.data[0].attributes.formats.large.url} /> </div>`;
        });
    } else {
        //Gör en pekare till attribut objektet
        let obj = myObject.data.attributes;
        for (x in obj) {
            console.log( x + ": " + obj[x]);
        }
    
        //Skriver Output string
        output += `<div>Namn: ${obj.name}</div> Description: ${obj.tripDescription}</div>`;

      
    }
    
    //Skriver ut Output string till div-element
    //document.write(output);
    document.getElementById("tripsFetched").innerHTML = output;
    }
    
    //Funktion för att hämta Token för användare
    //Om en Token hämtas så betyder det att user/password är korrekt skrivet
    async function getToken() {
    //1. Göra ett inloggningsförsök för att få en Token returnerad
    //2. Sammla data och skapa ett objekt av dessa
    //3. Skicka iväg JSON till API /
    
    //Url till Strapi.js UserList
    const urlUser = "http://localhost:1337/api/auth/local/";
    
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;
    
    //Skapar ett objekt av det användarnamn och lösenord som user har skrivit in i fält.
    let userObject = {
        identifier : user,
        password : pass
    }
    
    //Anropar API med inloggningsdata.
    //Inkluderar Method och Headers
    let userResponse = await fetch(urlUser,
    {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userObject)
    });
    
    //Konverterar API response JSON string till ett object
    let userJson = await userResponse.json();
    console.log(userJson);
    
    //Kontrollerar om object har Token.
    //Token ligger under attribut jwt
    //Om så; inloggning är korrekt. Fortsätt till funktion postData med token som parameter.
    if (userJson.jwt) postData(userJson.jwt);
    }
    
    async function postData(token) {
    
    //URL till Strapi trips collection.
    const urlTrips = "http://localhost:1337/api/trips";
    
    // Hämtar data från fält
    const name = document.getElementById("name").value;
    const type = document.getElementById("type").value;
    const level = document.getElementById("level").value;
    
    //Skapa ett object med data inkluderat.
    let TripsObject = {
        data : {
            name : name,
            type : type,
            level : level
        }
    };
    
    //Anropar API med TripsObject
    let TripsResponse = await fetch(urlTrips,
    {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer " + token //Inkluderar Token från inloggning tidigare.
        },
        body: JSON.stringify(TripsObject)
    });
    
    let tripsJson = await TripsResponse.json();
    
    console.log(tripsJson);

    }

      
     