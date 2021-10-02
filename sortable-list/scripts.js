// import DOM elements
const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richList = [
    'Hilary, Alannah and Galen Jr Weston and family',
    'Patrick and John Collison',
    'John Dorrance',
    'Larry, Kitty, Laurence and Mark Goodman',
    'Dermot Desmond',
    'Denis O’Brien',
    'Lady Ballyedmond and family',
    'The Dunne and Heffernan families',
    'John Magnier and family',
    'Deirdre and Mark Lyons'
];


//  Store list items
const listItem = [];

let dragStartIndex;

crateList();

//Insert list items into the DOM
function crateList() {
    [...richestPeople]
    .forEach((person, index) => {
        const listItem = document.createElement('li');

        // data index matches the index from the array
        listItem.setAttribute('data-index', index);

        listItem.innerHTML = `
        <span class"number">${index + 1}</span>
        <div class="draggable" draggable="true">
            <p class="person-name">${person}</p>
            <i class="fa fa-grip-lines"></i>
        </div>
        `
        
    })
}
