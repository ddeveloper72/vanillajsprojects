// DOM ID imports
const filter = document.getElementById('filter');
const postContainer = document.getElementById('post-container');
const loading = document.getElementsByClassName('.loader');


let limit = 3;
let page = 1;

async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_pages=${page}`);

    const data = await res.json();

    return data;
}

// Show posts in DOM
async function showPosts() {
    const posts = await getPosts();

    console.log(posts);
}

showPosts();