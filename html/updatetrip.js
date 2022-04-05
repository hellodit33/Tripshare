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

    document.getElementById("tripsFetched").addEventListener('click', (e) => {
        e.preventDefault();
        let delButtonIsPressed = e.target.id == 'delete';
        let editButtonIsPressed = e.target.id == 'edit';
    
        let id = e.target.parentElement.dataset.id;
        //Delete - remove the existing post
        /*method: DELETE
        if(delButtonIsPressed) {
            fetch(`${tripsUrl}/${id}`, {
                method:'DELETE',
            })
            .then(res => res.json())
            .then(() => location.reload())
    } */
    if(editButtonIsPressed) {
        const parent = e.target.parentElement;
        parent.innerHTML +=`<div>
        <label for="user">Username</label>
        <input type="text" name="user" id="user">
        <label for="email">Email</label>
        <input type="email" name="email" id="email">
        
        <label for="password">Password</label>
        <input type="password" name="password" id="password">
        </div>
        <div id="userError" class="errorInfo"></div>
        
        <div>
        <label for="name">Give a name to your trip</label>
        <input type="text" name="name" id="name">
        </div>
        <div>
        <label for="description">Description</label>
        <input type="text" name="description" id="description">
        </div>
        <div>
        <label for="seats">Seats</label>
        <input type="number" name="seats" id="seats">
        </div>
        <div>
        <label for="tripDates-leaving">Leaving on:</label>
        <input type="date" name="tripDates-leaving" id="tripDates-leaving" placeholder="Departure date">
        </div>
        <div>
        <label for="tripDates-arriving">Arriving on</label>
        <input type="date" name="tripDates-arriving" id="tripDates-arriving" placeholder="Arriving date">
        </div>
        
        <div>
        <label for="leavingDestination">Leaving from:</label>
        <input type="text" name="leavingDestination" id="leavingDestination" placeholder="the place you're leaving from">
        </div>
        <div>
        <label for="betweenDestination">First stop:</label>
        <input type="text" name="betweenDestination" id="betweenDestination">
        </div>
        <div>
        <label for="betweenDestination2">Second stop:</label>
        <input type="text" name="betweenDestination2" id="betweenDestination2">
        </div>
        <div>
        <label for="betweenDestination3">Third stop:</label>
        <input type="text" name="betweenDestination3" id="betweenDestination3">
        </div>
        <div>
        <label for="arrivingDestination">Coming back to:</label>
        <input type="text" name="arrivingDestination" id="arrivingDestination" placeholder="the place you're finishing your trip at">
        </div>
        <div>
        <label for="tripMap2">Upload map</label>
        <input type="file" name="tripMap2" id="tripMap2">
        </div>
        <button onclick="updateTrip()" id="button">Update a trip</button>
        <button id="delete" onclick="deleteTrip();">Delete</button>
        </div>
        `
        let nameValue = document.getElementById('name');
        let descriptionValue = document.getElementById('description');
        let tripDatesLeavingValue = document.getElementById('tripDates-leaving');
        let tripDatesArrivingValue = document.getElementById('tripDates-arriving');
        let leavingDestinationValue = document.getElementById('leavingDestination');
        let betweenDestinationValue = document.getElementById('betweenDestination');
        let betweenDestinationValue2 = document.getElementById('betweenDestination2');
        let betweenDestinationValue3 = document.getElementById('betweenDestination3');
        let arrivingDestinationValue = document.getElementById('arrivingDestination');
        let seatsValue = document.getElementById('seats');
        
        
        let tripName = parent.querySelector('.trip-name').textContent;
        let tripDescription = parent.querySelector('.trip-description').textContent;
        let tripLeavingDate = parent.querySelector('.trip-leavingdate').dateContent;
        let tripArrivingDate = parent.querySelector('.trip-arrivingdate').dateContent;
        let tripLeavingDestination = parent.querySelector('.trip-leavingdestination').textContent;
        let tripBetweenDestination = parent.querySelector('.trip-betweendestination').textContent;
        let tripBetweenDestination2 = parent.querySelector('.trip-betweendestination2').textContent;
        let tripBetweenDestination3 = parent.querySelector('.trip-betweendestination3').textContent;
        let tripArrivingDestination = parent.querySelector('.trip-arrivingdestination').textContent;
        let tripSeats = parent.querySelector('.trip-seats').textContent;
        
        nameValue.value = tripName;
        descriptionValue.value = tripDescription;
        tripDatesLeavingValue.value = tripLeavingDate;
        tripDatesArrivingValue.value = tripArrivingDate;
        leavingDestinationValue.value = tripLeavingDestination;
        betweenDestinationValue.value = tripBetweenDestination;
        betweenDestinationValue2.value = tripBetweenDestination2;
        betweenDestinationValue3.value = tripBetweenDestination3;
        arrivingDestinationValue.value = tripArrivingDestination;
        seatsValue.value = tripSeats;
    }

}


)
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
//Kontrollerar om objektet har Token.
    //Token ligger under attribut jwt
    //Om så; inloggning är korrekt. Fortsätt till funktion postData med token som parameter.
    if (userJson.jwt) return userJson.jwt;
    else {
        //Inloggningen har misslyckats. Skriv ut errormeddelande från Strapi.js
        let errMessage = userJson.error.message;

        document.getElementById("userError").innerText = errMessage;

        return null;
    }
};

async function deleteTrip() {
    let deleteUrl="http://localhost:1337/api/trips";

    //Hämta Token från GetToken()
    //Om ingen Token returneras, avbryt funktionen
    let token = await getToken();
    if (!token) return;

    let id = document.getElementById("delete").parentElement.dataset.id;

    //Anropar API med inloggningsdata.
    //Inkluderar Method och Headers
    await fetch(`${deleteUrl}/${id}`,
        {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : "Bearer " + token //Inkluderar Token från inloggning tidigare.
            }
        })

    //Anropa "GetDataFromStrapi" för att skriva ut ny tabell
    .then(res => res.json())
            .then(() => location.reload())

}

async function updateTrip() {
    let updateUrl="http://localhost:1337/api/trips";

    //Hämta Token från GetToken()
    //Om ingen Token returneras, avbryt funktionen
    let token = await getToken();
    if (!token) return;

    let id = document.getElementById("button").parentElement.dataset.id;
   

    //Hämtar data från fält
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

    //Skapa ett objekt med data inkluderat.
    let TripsObject = {
       
        data : {
           
            TripDates: {
                
            
        },
        TripDestinations: {
        
          
        },
        
    }}

    //Fyller upp Data med parameter-värden
  
    if (name) TripsObject.data["tripName"] = name;
   if (description) TripsObject.data["tripDescription"] = description;
   if (seats) TripsObject.data["Seats"] = seats;
   if (tripDatesLeaving) TripsObject.data.TripDates["LeavingDate"] = tripDatesLeaving;
   if (tripDatesArriving) TripsObject.data.TripDates["ArrivingDate"] = tripDatesArriving;
   if (leavingDestination) TripsObject.data.TripDestinations["LeavingDestination"] = leavingDestination;
   if (betweenDestination) TripsObject.data.TripDestinations["BetweenDestination"] = betweenDestination;
   if (betweenDestination2) TripsObject.data.TripDestinations["BetweenDestination2"] = betweenDestination2;
   if (betweenDestination3) TripsObject.data.TripDestinations["BetweenDestination3"] = betweenDestination3;
   if (arrivingDestination) TripsObject.data.TripDestinations["ArrivingDestination"] = arrivingDestination;
   
   
    //Anropar API med pokemonObjekt
    await fetch(`${updateUrl}/${id}`,
    {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer " + token //Inkluderar Token från inloggning tidigare.
        },
        body: JSON.stringify(TripsObject)
    })

    .then(res => res.json())
            .then(() => location.reload())
    
}






