// DOM elements
const recipeList = document.querySelector('.recipes');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

const setupUI = (user) => {
  if (user) {
    // account info
    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `
      <div>Logged in as ${doc.data().name}</div>
      <div>Email: ${user.email}</div>
      <div>Bio: ${doc.data().bio}</div>
    `;
    accountDetails.innerHTML = html;     
    })
    
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    // clear account info
    accountDetails.innerHTML = '';
    // toggle user elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};

// setup guides
const setupRecipes = (data) => {

  if(data.length){
    let html = '';
    data.forEach(doc => {
      const recipe = doc.data();
      const li = `
        <li>
          <div class="collapsible-header grey lighten-4"> ${recipe.title} </div>
          <div class="collapsible-body white"> Ingredients: ${recipe.ingredients} </div>
          <div class="collapsible-body white"> Preparation: ${recipe.preparation} </div>
          <div class="collapsible-body white"> Time: ${recipe.time} minutes </div>
        </li>
      `; 
      html += li;
    });
    recipeList.innerHTML = html
  }else{
    recipeList.innerHTML = '<h5 class="center-align">Login to view recipes</h5>'
  }
};

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});
