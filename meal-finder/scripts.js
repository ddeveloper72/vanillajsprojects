// Import DOM elements
const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    mealsEl = document.getElementById('meals'),
    resultsHeading = document.getElementById('results-heading'),
    single_mealEl = document.getElementById('single-meal')


// Search meal and fetch data from API
function searchMeal(e) {
    // this is a submit, so prevent default method of submitting data to a file
    e.preventDefault();

    // Clear single meal if it's already shown
    single_mealEl.innerHTML = '';

    // Get the search term
    const term = search.value;
    
    
    // Check if a term was submitted
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(response => response.json()) // fetch returns promise, then caught & format to json
            .then(data => {  // this returns another promise with the data.
            console.log(data);
            resultsHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;
        }); 
    } else {
        alert('Please enter a search term')
    }


}

// Event listeners
submit.addEventListener('submit', searchMeal);