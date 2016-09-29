 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBQV1gkIgYlHXoihkBsc-0WVcgjuZVik4k",
    authDomain: "tinas-app.firebaseapp.com",
    databaseURL: "https://tinas-app.firebaseio.com",
    storageBucket: "tinas-app.appspot.com",
    messagingSenderId: "721146835362"
  };
  firebase.initializeApp(config);


 



///////////////////////////////////////////////////////
///////////RECIPE FORM/////////////////////////////////
///////////////////////////////////////////////////////

//Create Recipe Object array that includes
//Title:
//Description:
//Author:
//Ingredient Object Array:[]
//HeaderImg:
//create an ingredient object using this
//Ingredient Array of Objects: [Amount, Measurment, Label]
//Instruction Object Array: [direction, Image]

///////////////////////////////////////////////////////
////////////////////HTML///////////////////////////////
///////////////////////////////////////////////////////
//Three pages exist one for listing all the recipes and allows for options to edit, delete, create
//Second Page is for editing/creating a recipe
//Third page is for viewing a single recipe

///////////////////////////////////////////////////////
///////////RECIPE SINGLE DISPLAY PAGE//////////////////
///////////////////////////////////////////////////////
//Once linked to the javascript looks for a recipe ID to query Firebase for a recipe to display
//Populates the HTML with the recipe entry info

///////////////////////////////////////////////////////
///////////RECIPE LIST PAGE////////////////////////////
///////////////////////////////////////////////////////
//Query Firebase for existing recipes and display on page
//for each recipe, display title and options for editing/deleting
//EDIT Recipe -  link to other page and pass the ID of the recipe to display the selected recipe
//DELETE Recipe - Listener and then when clicked use Firebase to delete that entry and refresh page with new list
//VIEW a Recipe - links to a page with the ID of the Recipe passed into it for display - THere will be an edit button which can pass into the edit page
//CREATE a new recipe - passes a null id to the edit page which then creates a blank form, once filled and submited will tell firebase to create a new entry


///////////////////////////////////////////////////////
///////////RECIPE EDIT/CREATE PAGE/////////////////////
///////////////////////////////////////////////////////
//Determine if the page is to edit an existing recipe (does it have an ID?)
//If there is no ID (Create button will pass a null ID) create an empty for with a new ID number to push to Firebase once created
//Title, Author, Description and header image will be simple text/upload of a file and required
//ingredients will be added one at a time
//Instructions will be added one at a time
//listener for adding instructions or ingredients
//listener for submitting and uploading to firebase and updating the database


//listener for editing/deleting image
//function for uploading image to firebase and returning a URL
//function for deleting and image
//create function for listing all recipes
//create a function for pulling a recipe and displaying it in a template
//create a function for pulling a recipe and populating the recipe form 

