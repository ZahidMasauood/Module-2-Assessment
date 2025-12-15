document.addEventListener("DOMContentLoaded", async function(){
    const movies = await loadData();
    console.log(movies);
    renderMovies(movies);


    document.querySelector("#addBtn").addEventListener("click", async function(){
        let title = document.querySelector("#title").value;
        let director = document.querySelector("#director").value;
        let minutes = parseInt(document.querySelector("#minutes").value);
        addMovies(movies, title, director, minutes);
        renderMovies(movies);
    })

})

function renderMovies(movies) {
    const contentTableBody = document.querySelector("#content");
    contentTableBody.innerHTML = ""; // clear all the children
    for (let m of movies) {
        let trElement = document.createElement('tr');
        trElement.innerHTML =`
        <td>${m.id}</td>
        <td>${m.title}</td>
        <td>${m.director}</td>
        <td>${m.minutes}</td>
<td> 
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            </td>

        `;

        let editBtn = trElement.querySelector(".edit-button");
        editBtn.addEventListener("click", function() {
            let newTitle = prompt("Update Title: ", m.title);
            let newDirector = prompt("Update Director: ", m.director);
            let newDuration = prompt("Update Duration: ", m.duration);
            modifyMovies(movies,m.id,newTitle,newDirector,newDuration);
            renderMovies(movies);
        });

        let deleteBtn = trElement.querySelector(".delete-button");
        deleteBtn.addEventListener("click", function() {
            deleteMovies(movies,m.id);
            renderMovies(movies);
        });
        contentTableBody.appendChild(trElement)
    }
}