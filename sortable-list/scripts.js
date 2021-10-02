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
const listItems = [];

let dragStartIndex;

crateList();

//Insert list items into the DOM
function crateList() {
    [...richestPeople]
    .forEach((person, index) => {
        const listItems = document.createElement('li');

        // data index matches the index from the array
        listItems.setAttribute('data-index', index);
    })
}
