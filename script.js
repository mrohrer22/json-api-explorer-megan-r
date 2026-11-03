const fetchButton = document.getElementById("fetchButton");
const postList = document.getElementById("postList");
const errorMessage = document.getElementById("error");

const postForm = document.getElementById("postForm");
const titleInput = document.getElementById("titleInput");
const bodyInput = document.getElementById("bodyInput");
const formError = document.getElementById("formError");
const formSuccess = document.getElementById("formSuccess");

// Fetch posts from the API
function getPost() {
    postList.innerHTML = "<p>Loading...</p>";
    errorMessage.textContent = "";

    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(function (response){
            if (!response.ok) {
                throw new Error("Failed to fetch posts.");
            }
            console.log(response);
            return response.json();
        })
        .then(function (json){
            console.log(json)
            const postList = document.getElementById("postList");
            
            json.forEach(function (post) {
                let postDiv = document.createElement("div");
                postDiv.innerHTML = `
                    <h3>${post.title}</h3>
                    <p> ${post.body}</p>
                    `;
                postList.appendChild(postDiv);
            })
        })
        .catch(function(error) {
            errorMessage.textContent = error.message;
        });
}

// Submit a new post
function createPost(event) {
    event.preventDefault();

    const newPost = {
        title: titleInput.value,
        body: bodyInput.value
    };

    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPost)
    })
        .then(function(response) {
            if (!response.ok) {
                throw new Error("Failed to create post.");
            }
            return response.json();
        })
        .then(function(post) {
            formSuccess.textContent =
                "Post created successfully! ID: " + post.id;

            postForm.reset();
        })
        .catch(function(error) {
            formError.textContent = error.message;
        });
}

// Event listeners
fetchButton.addEventListener("click", getPost);
postForm.addEventListener("submit", createPost);