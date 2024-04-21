// index.js

// Base URL

const ramenURL = `http://localhost:3000/ramens`


// Callbacks
const handleClick = (ramen) => {
  // Add code
  console.table(ramen)// ukienda kwa browser you click the ramens tuona data


  // display the details

  const ramenImgDetailComponent = document.getElementById('rimg')
  //console.log(ramenImgDetailComponent)
  ramenImgDetailComponent.src =ramen.image;

  const ramenNameDetailComponent = document.querySelector("h2")
  //console.log(ramenNameDetailComponent);
  ramenNameDetailComponent.textContent = ramen.name;//to see the name hapo kwa div

  const ramenDetailComponent = document.querySelectorAll("h3")[1]
  //console.log(ramenDetailComponent)
  ramenDetailComponent.textContent = ramen.restaurant;

  const ramenRatingComponent = document.getElementById("rating-display")
  //console.log(ramenRatingComponent)
  ramenRatingComponent.textContent = ramen.rating;

  const ramenCommentComponent = document.getElementById("comment-display")
  //console.log(ramenCommentComponent)
  ramenCommentComponent.textContent = ramen.comment;

};

const addSubmitListener = () => {
  // Add code
  const newRamenForm = document.getElementById('new-ramen');


  newRamenForm.addEventListener('submit', (event) => {// attaches s submit eventlistener to the newramenform 
    event.preventDefault(); // Prevent default form submission behavior, which can cause the page to refresh

    // Extract form data(values of the form inputs) each inpu value is store in a separate variable
    const nameInput = document.getElementById("new-name").value;
    const restaurantInput = document.getElementById("new-restaurant").value;
    const imageInput = document.getElementById("new-image").value;
    const ratingInput = document.getElementById("new-rating").value;
    const commentInput = document.getElementById("new-comment").value;

    console.log(nameInput);
    console.log(restaurantInput);
    console.log(imageInput);
    console.log(ratingInput);
    console.log(commentInput);

    // create a new Object which has properties for each form field with their values
    const newRamens = {
      name: nameInput,
      restaurant: restaurantInput,
      image: imageInput,
      rating: ratingInput,
      comment: commentInput,
    }
    console.log(newRamens);

    const ramenObj = {// the object ramenObj is constructed to define the parameters of the fetch request.
      method : 'POST',
      Headers : {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify(newRamens),
    };
    fetch(ramenURL, ramenObj)
    .then((function (response){
      return response.json();
    }))
    .then(function (ramenObj){
      console.log(ramenObj);
    })

    // clear form inputs after submition
    characterForm.reset();

   });
};

const displayRamens = () => {
  // Add code
  // Handle fetch
  fetch(ramenURL)
  .then(res => res.json())// get a response then convert to json
  .then(data => {
    console.log("Here is the server data:,", data) // we rae getting the data
    displayRamenOnViewPage(data)
  })
};


function displayRamenOnViewPage(ramensArray)  {
  console.table(ramensArray);

  // get the component to display ramens
  const ramenSpanBar = document.getElementById("ramen-menu")
  console.log(ramenSpanBar);//kuona div kwa page

  // loop through each array object and  create an img and name
  ramensArray.forEach(element => {
    const imgTag = document.createElement("img")
    imgTag.src = element.image//tumeenda kwa db.josn kuona ulr zikon element ya image
    imgTag.alt = element.name// kwa db.josn kuona the name element

    // add eventlistener to each created img tag
    imgTag.addEventListener("click", () => handleClick(element))

    // Append the imgTag kwa component

    ramenSpanBar.appendChild(imgTag);

    
  });
}

const main = () => {
  // Invoke displayRamens here
  // Invoke addSubmitListener here
  displayRamens();
  addSubmitListener();
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
