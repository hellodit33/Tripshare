
 //Funktion för att hämta data från Strapi CMS
 async function getDataFromStrapi() {
    //Url till Strapi.js API för att hämta alla trips
    let url = "http://localhost:1337/api/trips?populate=*";
    let apiUrl ="http://localhost:1337";
    let tripsUrl="http://localhost:1337/api/trips";
    
    
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
        
        
            if (!obj.tripMap2.data) {
            //Skriver Output string
           
            output += `
            <div class="trip" data-id=${element.id}>
            
            <h2 class="trip-name">${obj.tripName}</h2>
            
            <p>Description: </p><p class="trip-description">${obj.tripDescription}</p>

            <p>Leaving Date: </p><p class="trip-leavingdate">${obj.TripDates.LeavingDate} </p>
           
            <p>Arriving Date: </p><p class="trip-arrivingdate">${obj.TripDates.ArrivingDate} </p> 
            
            <p>Leaving From: </p> <p class="trip-leavingdestination">${obj.TripDestinations.LeavingDestination}</p> 
    
            <p>First Destination: </p> <p class="trip-betweendestination">${obj.TripDestinations.BetweenDestination}</p> 
            
            <p>Second Destination: </p> <p class="trip-betweendestination2">${obj.TripDestinations.BetweenDestination2}</p> 
    
            <p>Third Destination: </p> <p class="trip-betweendestination3">${obj.TripDestinations.BetweenDestination3}</p> 
    
            <p>Finishing At: </p> <p class="trip-arrivingdestination">${obj.TripDestinations.ArrivingDestination}</p> 
    
            
           <p>Available Seats: </p><p class="trip-seats">${obj.Seats}</p>
            
         <p>The map is missing</p>
            
            <button id="edit">Edit</button>
          
            
       
            </div>
            
            `;
        }
    
    else if (obj.tripMap2.data) {
    //if the user did not add any map
            //Skriver Output string without map
        output += `<div data-id=${element.id}>
         <h2 class="trip-name">${obj.tripName}</h2>
        <p>Description: </p><p class="trip-description">${obj.tripDescription}</p><p>Leaving Date: </p><p class="trip-leavingdate">${obj.TripDates.LeavingDate} </p>
       <p>Arriving Date: </p><p class="trip-arrivingdate">${obj.TripDates.ArrivingDate} </p> 
        
        <p>Leaving From: </p> <p class="trip-leavingdestination">${obj.TripDestinations.LeavingDestination}</p> 

        <p>First Destination: </p> <p class="trip-betweendestination">${obj.TripDestinations.BetweenDestination}</p> 
        
        <p>Second Destination: </p> <p class="trip-betweendestination2">${obj.TripDestinations.BetweenDestination2}</p> 

        <p>Third Destination: </p> <p class="trip-betweendestination3">${obj.TripDestinations.BetweenDestination3}</p> 

        <p>Finishing At: </p> <p class="trip-arrivingdestination">${obj.TripDestinations.ArrivingDestination}</p> 

        
       <p>Available Seats: </p><p class="trip-seats">${obj.Seats}</p> <br>

        <img src=${apiUrl}${obj.tripMap2.data[0].attributes.formats.large.url} class="trip-image"/> 
        <button id="edit">Edit</button>
        
       
        </div>
         
        `;
    }
    
  
     output += "</div> ";


   

}  )}
   
 //Skriver ut Output string till div-element
    //document.write(output);
    document.getElementById("tripsFetched").innerHTML = output;

}
async function getToken() {
    //1. Göra ett inloggningsförsök för att få en Token returnerad
    //2. Sammla data och skapa ett objekt av dessa
    //3. Skicka iväg JSON till API /
    
    //Url till Strapi.js UserList
    const urlUser = "http://localhost:1337/api/auth/local/";
    
    const user = document.getElementById("user").value;
    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;
    
    //Skapar ett objekt av det användarnamn och lösenord som user har skrivit in i fält.
    let userObject = {
        identifier : user,
        email : email,
        password : password
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
    const description = document.getElementById("description").value;
    const seats = document.getElementById("seats").value;
    const tripDatesLeaving = document.getElementById("tripDates-leaving").value;
    const tripDatesArriving = document.getElementById("tripDates-arriving").value;
    const leavingDestination = document.getElementById("leavingDestination").value;
    const betweenDestination = document.getElementById("betweenDestination").value;
    const betweenDestination2 = document.getElementById("betweenDestination2").value;
    const betweenDestination3 = document.getElementById("betweenDestination3").value;
    const arrivingDestination = document.getElementById("arrivingDestination").value;
    const tripMap2 = document.getElementById("tripMap2").value;



    
    //Skapa ett object med data inkluderat.
    let TripsObject = {
        data : {
            tripName : name,
            tripDescription : description,
            Seats : seats,
            TripDates: {
                ArrivingDate: tripDatesArriving,
LeavingDate: tripDatesLeaving
            
        },
        TripDestinations: {
        
            LeavingDestination: leavingDestination,
            BetweenDestination: betweenDestination,
            BetweenDestination2: betweenDestination2,
            BetweenDestination3: betweenDestination3,
            ArrivingDestination: arrivingDestination
        },
        tripMap2: tripMap2,
                  
                    
   
    
  
    }

    }
    
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

    //Anropa "GetDataFromStrapi" för att skriva ut ny tabell
    await getDataFromStrapi();

    }

   