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
            
            <h1 class="trip-name">${obj.tripName}</h2>
            
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