 ////////////////////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////////////////////
 //General Assembly - Javascript Online Course
 //Final Project for Tina Phillips
 //Recipe Collector
 ////////////////////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////////////////////
 // Initialize Firebase
 var config = {
     apiKey: "AIzaSyCF4kEUuZue6Uw-uDx_EDjnHnWsjI2nDEg",
     authDomain: "final-project-tina-phillips.firebaseapp.com",
     databaseURL: "https://final-project-tina-phillips.firebaseio.com",
     storageBucket: "final-project-tina-phillips.appspot.com",
     messagingSenderId: "324874523421"
 };
 firebase.initializeApp(config);
 var database = firebase.database();
 var storage = firebase.storage();
 var imageStorage;
 console.log("Here I am");

 // After we have initialized Firebase and created a reference to our database…
 // When the recipe form is submitted (the user hits enter)

 //////////////////////////////////////////////////////////////////////////
 //ADDING INGREDIENTS
 //////////////////////////////////////////////////////////////////////////
 $("#addIngredient").on('click', function(e) {
     // prevent the page from reloading
     e.preventDefault();
     $('#recipeIngredients').append($('#recipeIngredients .ingredient:nth-child(1)').clone().find("input:text").val("").end());
 });

 //////////////////////////////////////////////////////////////////////////
 //ADDING DIRECTIONS
 //////////////////////////////////////////////////////////////////////////
 $("#addDirection").on('click', function(e) {
     // prevent the page from reloading
     e.preventDefault();
     $('#recipeDirections').append($('#recipeDirections .direction:nth-child(1)').clone().find("textarea").val("").end());
 });


 //////////////////////////////////////////////////////////////////////
 //UPLOADING A HEADER FILE
 //////////////////////////////////////////////////////////////////////




 //////////////////////////////////////////////////////////////////////
 //SAVING THE RECIPE
 //////////////////////////////////////////////////////////////////////

 $("#saveRecipe").on('click', function(e) {
     // prevent the page from reloading
     e.preventDefault();
     console.log("Button has been pushed");
     // grab user's comment from input field
     var userInputAuthor = $("#recipeAuth").val();
     var userInputTitle = $("#recipeTitle").val();
     var userInputDescription = $("#recipeDesc").val();
     console.log(userInputAuthor);
     console.log(userInputTitle);
     console.log(userInputDescription);

     var ingredientsArray = [];
     var directionsArray = [];
     console.log($('#recipeIngredients .ingredient'));

     $('#recipeIngredients .ingredient').each(function(index, element) {
         ingredientsArray.push({
             amount: $(element).find(".amt").val(),
             measurement: $(element).find(".measure").val(),
             label: $(element).find(".ingLabel").val()
         });
     });

     $('#recipeDirections .direction').each(function(index, element) {
         directionsArray.push({
             direction: $(element).find(".eachDirection").val()

         });
     });

     var recipeReference = database.ref('recipes');
     var imagesRef = storageRef.child('images');

     function writeUserData() {
         recipeReference.push({
             author: userInputAuthor,
             title: userInputTitle,
             description: userInputDescription,
             ingredients: ingredientsArray,
             directions: directionsArray,
             header: imageStorage
         });
         location.href = "list.html";
     }
     console.log("Can you hear me now?");

     writeUserData();

     $("#recipeAuth").val('');
     $("#recipeTitle").val('');
     $("#recipeDesc").val('');




 });

 /////////////////////////////////////////////////////////////////
 //VIEWING A RECIPE
 /////////////////////////////////////////////////////////////////
 // Step 2: Get the HTML from the template we created in our HTML file
 // And store it in the variable source:

 $(window).on('load', function(e) {
     e.preventDefault();
     if (location.href.indexOf("recipes.html") === -1) {
         return;
     }
     //var recipeID = $.urlParam('dataKey');

     var recipeId = location.href.substring(location.href.indexOf("?recipeId=") + 10);
     console.log(recipeId);

     firebase.database().ref('recipes/' + recipeId).once('value').then(function(data) {
         console.log(data.val());



         var source = $("#recipe-template").html();
         // Step 3: Compile template
         var template = Handlebars.compile(source);
         // Step 4: Get data for template.
         // In this case, we are setting the data for the template to
         // the volume info that we received back in the response, which, as
         // you'll recall, is an object holding the title, description, etc.
         var dataIngredients = data.ingredients;
         console.log(dataIngredients);
         // Step 5: Integrate the volume info data with the template
         var newListItemHTML = template(data.val());
         console.log(newListItemHTML);
         // Step 6: Append the new book to the books list
         $('.recipe').append(newListItemHTML);


         ///////////////////////////////////////////////////////
         ///////////DELETE A RECIPE ON RECIPE PAGE///////////////
         ///////////////////////////////////////////////////////


         console.log("deletethis = ", $('#deleteThisRecipe'));

         $('#deleteThisRecipe').on('click', function(e) {
             e.preventDefault();
             console.log('button is pressed');
             var recipeRef = firebase.database().ref('recipes/' + recipeId);
             recipeRef.remove().then(function() {
                 location.href = "list.html";
             });
             // All data at the database location for user 'fred' has been deleted
             // (including any child data)

             //recipeRef.on('child_removed', function(data) {
             //deleteComment(postElement, data.key);
             //});

         });

     });

 });





 /////////////////////////////////////////////////////////////////
 //VIEWING THE LIST OF RECIPES
 /////////////////////////////////////////////////////////////////


 $(window).on('load', function(e) {
     e.preventDefault();
     if (location.href.indexOf("list.html") === -1) {
         return;
     }
     //var recipeID = $.urlParam('dataKey');
     var recipeId = location.href.substring(location.href.indexOf("?recipeId=") + 10);

     firebase.database().ref('recipes/').once('value').then(function(data) {
         console.log(data.val());



         var source = $("#recipe-template").html();
         // Step 3: Compile template
         var template = Handlebars.compile(source);
         // Step 4: Get data for template.
         // In this case, we are setting the data for the template to
         // the volume info that we received back in the response, which, as
         // you'll recall, is an object holding the title, description, etc.
         var dataIngredients = data.ingredients;

         // Step 5: Integrate the volume info data with the template
         var newListItemHTML = template({
             recipes: data.val()

         });
         console.log(newListItemHTML);
         // Step 6: Append the new book to the books list
         $('.recipe').append(newListItemHTML);



         $('.delete').on('click', function(e) {
             e.preventDefault();

             console.log('delete button is pressed');
             console.log(this.id);
             var deleteListItem = $(this).parent();
             firebase.database().ref('recipes/' + this.id).remove().then(function() {
                 console.log('removed from firebase', this);
                 deleteListItem.remove();
             });




         });


     });





 });

 ///////////////////////////////////////////////////////
 ///////////CREATE A FEW RECIPES////////////////////////
 ///////////////////////////////////////////////////////


 $("#makeRecipes").on('click', function(e)  {
     // prevent the page from reloading
     e.preventDefault();



     var recipeReference = database.ref('recipes');
     

     var writeRecipe = function(author, title, description, ingredients, directions, header) {
         recipeReference.push({
             author: author,
             title: title,
             description: description,
             ingredients: ingredients,
             directions: directions,
             header: header
         });
         location.href = "list.html";
     }


     

     var chocchip = new writeRecipe(
         "Joy the Baker",
         "The Bet Brown Butter Chocolate Chip Cookies",
         "The absolute best chocolate chip cookies ever", [{
                 amount: 1,
                 measurement: "cup",
                 label: "(16 tablespoons) unsalted butter softened to room temperature"
             }, {
                 amount: 1,
                 measurement: "cup",
                 label: "light brown sugar, packed"
             }, {
                 amount: 2,
                 measurement: "teaspoons",
                 label: "vanilla extract"
             }, {
                 amount: 1,
                 measurement: "teaspoon",
                 label: "molasses"
             }, {
                 amount: "1/2",
                 measurement: "cup",
                 label: "granulated sugar"
             }, {
                 amount: 1,
                 measurement: "large",
                 label: "egg"
             },

             {
                 amount: 1,
                 measurement: "large",
                 label: "egg yolk"
             }, {
                 amount: "2-1/4",
                 measurement: "cups",
                 label: "all-purpose flour"
             }, {
                 amount: 1,
                 measurement: "teaspoon",
                 label: "salt"
             }, {
                 amount: 1,
                 measurement: "teaspoon",
                 label: "baking soda"
             }, {
                 amount: 1,
                 measurement: "cup",
                 label: "bittersweet chocolate chips"
             }, {
                 amount: 1,
                 measurement: "cup",
                 label: "chopped pecans"
             },
         ], [{
                 direction: "Line two baking sheets with parchment paper and set aside."
             },

             {
                 direction: "Place half the butter (8 tablespoons) in a medium skillet. Melt the butter over medium heat, swirling it in the pan occasionally. It’ll foam and froth as it cooks, and start to crackle and pop. Once the crackling stops, keep a close eye on the melted butter, continuing to swirl the pan often. The butter will start to smell nutty, and brown bits will form in the bottom. Once the bits are amber brown (about 2 1/2 to 3 minutes or so after the sizzling stops), remove the butter from the burner and immediately pour it into a small bowl, bits and all. This will stop the butter from cooking and burning.  Allow it to cool for 20 minutes."
             },

             {
                 direction: "Beat the remaining 1/2 cup butter with the brown sugar for 3 to 5 minutes, until the mixture is very smooth."
             },

             {
                 direction: "Beat in the vanilla extract and molasses."
             }, {
                 direction: "Pour the cooled brown butter into the bowl, along with the granulated sugar. Beat for 2 minutes, until smooth; the mixture will lighten in color and become fluffy."
             }, {
                 direction: "Add the egg and egg yolk, and beat for one minute more."
             }, {
                 direction: "Add the flour, salt, and baking soda, beating on low speed just until everything is incorporated."
             }, {
                 direction: "Use a spatula to fold in the chocolate chips and pecans and finish incorporating all of the dry flour bits into the dough."
             },

             {
                 direction: "Scoop the dough onto a piece of parchment paper, waxed paper, or plastic wrap. Flatten it slightly into a thick disk, and refrigerate for at least 30 minutes. About 15 minutes before you’re ready to begin baking, place racks in the center and upper third of the oven and preheat your oven to 350°F."
             }, {
                 direction: "Scoop the dough in 2 tablespoon-sized balls onto the prepared baking sheets. Leave about 2″ between the cookies; they’ll spread as they bake."
             }, {
                 direction: "Sprinkle the cookies with sea salt, to taste — as much or as little as you like."
             }, {
                 direction: "Bake the cookies for 12 to 15 minutes, until they’re golden brown. Remove them from the oven, and allow them to rest on the baking sheet for at least 5 minutes before moving them."
             }, {
                 direction: "Serve warm; or cool completely, and store airtight at room temperature for several days. For longer storage, wrap well and freeze."
             }

         ],
         "https://firebasestorage.googleapis.com/v0/b/final-project-tina-phillips.appspot.com/o/images%2Fchoc_chip_cookies.jpg?alt=media&token=31579e08-cf8e-46fa-9847-46682b946648"





     )



 	var spaghetti = new writeRecipe(
 			"Sharlene W.",
         "Jo Mama's World Famous Spaghetti",
         "My kids will give up a steak dinner for this spaghetti. It is a recipe I have been perfecting for years and it is so good (if I may humbly say) that my kids are disappointed when they eat spaghetti anywhere else but home! ", 
         [{
                 amount: 2,
                 measurement: "lbs",
                 label: " Italian sausage, casings removed (mild or hot)"
             }, {
             	 amount: 1,
                 measurement: "small",
                 label: "onion (chopped)"
             }, {
             	amount: "3-4",
                 measurement: "",
                 label: "garlic cloves (minced)"
             }, {
             	amount: "1",
                 measurement: "28 oz",
                 label: "can diced tomoatoes"
             }, {
             	amount: "2",
                 measurement: "6 oz",
                 label: "cans tomato paste"
             }, {
             	amount: "2",
                 measurement: "15 oz",
                 label: "cans tomato sauce"
             }, {
             	amount: "2",
                 measurement: "cups",
                 label: "water - (for long simmering time)"
             }, {
             	amount: "3",
                 measurement: "tsp",
                 label: "basil"
             }, {
             	amount: "2",
                 measurement: "tsp",
                 label: "dried parsley flakes"
             }, {
             	amount: "1-1/2",
                 measurement: "tsp",
                 label: "brown sugar"
             }, {
             	amount: "1",
                 measurement: "tsp",
                 label: "salt"
             }, {
             	amount: "1/2",
                 measurement: "tsp",
                 label: "crushed red pepper flakes"
             }, {
             	amount: "1/4",
                 measurement: "tsp",
                 label: "fresh coarse ground pepper"
             }, {
             	amount: "1/4",
                 measurement: "cup",
                 label: "good cabernet wine"
             }, {
             	amount: "1",
                 measurement: "lb",
                 label: "thin spaghetti"
             }
		],[

			{
                 direction: "In large, heavy stockpot, brown Italian sausage, breaking up as you stir."
             },{
                 direction: "Add onions and continue to cook, stirring occasionally until onions are softened."
             },{
             	direction: "Add garlic, tomatoes, tomato paste, tomato sauce and water."
             },{
             	direction: "Add basil, parsley, brown sugar, salt, crushed red pepper, and black pepper."
             },{
             	direction: "Stir well and barely bring to a boil."
             },{
             	direction: "Stir in red wine."
             },{
             	direction: "Simmer on low, stirring frequently for at least an hour. A longer simmer makes for a better sauce, just be careful not to let it burn!"
             },{
             	direction: "Cook spaghetti according to package directions."
             }
 			],
 			"https://firebasestorage.googleapis.com/v0/b/final-project-tina-phillips.appspot.com/o/images%2Fspaghetti.jpg?alt=media&token=d9763bfc-17b8-42e6-a142-7cd26bf50e39"
 	)

 		writeRecipeData(chocchip);
 		writeRecipeData(spaghetti);
 		

 });
