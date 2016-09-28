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
//completeIngredient Array: [Amount[i], Measurment[i], ingredient[i]]
//Amount Array: []
//Measurment Array: [];
//Ingredient Array: [];
//ingredientImage: Will include a file upload;




//form input string for recipe header title
//input string for recipe description
//input for author or original location for recipe

//input integers for recipe servings
//input intgers for calories per serving

//declare array for holding amounts
//declare array for holding labels (tsp, cups, lemons...etc)

//allow for a add ingredient push to the array
//allow for a deleting of array capture current ID of the array to remove

//allow for editing of a current existing array of ingredients and saving new element within the array

//declare array for instructions

//allow for a add instruction push to the array
//allow for a deleting of an instruction array capture current ID of the array to remove

//allow for editing of a current existing array of instructions and saving new element within the array

//allow for addition of image and caption to each instruction include alt text string input for image

//create button to submit data to a database and save it
//allow for a publish boolean to allow for inclusion in a template to be published.