const rulesBtn = document.getElementById('rules-btn');
const rules = document.getElementById('rules');
const closeBtn = document.getElementById('close-btn');
const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');

// Rules and close Event listeners
rulesBtn.addEventListener('click', () => 
rules.classList.add('show'));

closeBtn.addEventListener('click', () => 
rules.classList.remove('show'));
