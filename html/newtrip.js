
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
    
    let valid = true;

    //Validera användarnamn och lösenord!
    if ( !validateLogin() ) valid = false;

    //Validera TripData
    if ( !validateTrips() ) valid = false;

    if (!valid) return null;

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
    if (userJson.jwt) return userJson.jwt;

    else {
        //Inloggningen har misslyckats. Skriv ut errormeddelande från Strapi.js
        let errMessage = userJson.error.message;

        document.getElementById("userError").innerText = "Unfortunately it did not work";

        return null;
    }
    }
    
    async function postTrip() {

    //Anropa GetToken() för att få en inloggnings-nyckel.
    //Om detta misslyckas, avbryt funktionen.
    let token = await getToken();
    if (!token) return;

        //URL till Strapi trips collection.
        const urlTrips = "http://localhost:1337/api/trips/";
        
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
    
       
    //Funktioner för validering
//Validering av User Input
function userValidate(comp) {
    // 1. Fältet måste vara ifyllt

    let valid = true;

    if (comp.value.length == 0) {
        //Misslyckad validering
        valid = false;
    }

    //Check on lyckad validering
    if (!valid) {
        document.getElementById("userError").innerText = "Please write your username";
        return false;
    } else {
        document.getElementById("userError").innerText = "";
        return true;
    }
}

//Validering av Password input
function passwordValidate(comp) {
    // 1. Fältet måste vara minst 5 tecken eller längre

    let valid = true;

    if (comp.value.length <= 4) {
        //Misslyckad validering
        valid = false;
    }

    //Check on lyckad validering
    if (!valid) {
        document.getElementById("passwordError").innerText = "Please write a password of minimum 5 characters";
        return false;
    } else {
        document.getElementById("passwordError").innerText = "";
        return true;
    }
}

//funktion för validering av inloggninfsförsök
function validateLogin() {
    //Variabel
    let valid = true;

    //Validate Användarnamn
    if (!userValidate(document.getElementById("user"))) {
        valid = false;
    }

    //Validate Password
    if (!passwordValidate(document.getElementById("password"))) {
        valid = false;
    }

    return valid;
}

//Funktion för validering av Trip Name
function tripNameValidate(comp) {
    // 1. Fältet måste innehålla ett värde
    // 2. Fältet får inte vara ett nummer

    let valid = true;

    //CHeck om value är större än 0
    if (comp.value.length == 0) {
        //Felaktig validering
        valid = false;
        document.getElementById("tripNameError").innerText = "Please give a name to your trip";
    }

    //CHeck att värdet inte är ett nummer
    if ( !isNaN( comp.value ) && comp.value.length != 0) {
        //Felaktig validering
        valid = false;
        document.getElementById("tripNameError").innerText = "The name cannot contain numbers";
    }

    if (valid) {
        document.getElementById("tripNameError").innerText = "";
    }

    return valid;
}

//FUnktion för validering av Trip Name
function validateTrips() {
    let valid = true;

    //Validate TripName
    if ( !tripNameValidate(document.getElementById("name")) ) {
        valid = false;
    }

    //TODO - Skapa validering för Type och Level

    return valid;
}

   