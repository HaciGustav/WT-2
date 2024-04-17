const createMovieCard = (movie, bodyElement) => {
  const article = document.createElement("article");
  article.id = movie.imdbID;

  const img = document.createElement("img");
  img.src = movie.Poster;
  article.appendChild(img);

  const h1 = document.createElement("h1");
  h1.textContent = movie.Title;
  article.appendChild(h1);

  const btnWrapper = document.createElement("p");

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.type = "button";

  editBtn.onclick = (e) => (location.href = "edit.html?imdbID=" + movie.imdbID);
  btnWrapper.appendChild(editBtn);

  article.appendChild(btnWrapper);

  const p = document.createElement("p");
  const runtimeHours = Math.trunc(movie.Runtime / 60);
  const runtimeMinutes = movie.Runtime % 60;
  p.innerHTML = `<span>Runtime ${runtimeHours}h ${runtimeMinutes}m</span><span>•</span><span>Released on ${new Date(
    movie.Released
  ).toLocaleDateString()}</span>`;
  article.appendChild(p);

  const genresP = document.createElement("p");
  movie.Genres.forEach((genre) => {
    const span = document.createElement("span");
    span.textContent = genre;
    span.classList.add("genre");
    genresP.appendChild(span);
  });
  article.appendChild(genresP);

  const plotP = document.createElement("p");
  plotP.textContent = movie.Plot;
  article.appendChild(plotP);

  const directorsH2 = document.createElement("h2");
  directorsH2.textContent = "Directors";
  article.appendChild(directorsH2);

  const directorsUl = document.createElement("ul");
  movie.Directors.forEach((director) => {
    const li = document.createElement("li");
    li.textContent = director;
    directorsUl.appendChild(li);
  });
  article.appendChild(directorsUl);

  const writersH2 = document.createElement("h2");
  writersH2.textContent = "Writers";
  article.appendChild(writersH2);

  const writersUl = document.createElement("ul");
  movie.Writers.forEach((writer) => {
    const li = document.createElement("li");
    li.textContent = writer;
    writersUl.appendChild(li);
  });
  article.appendChild(writersUl);

  const actorsH2 = document.createElement("h2");
  actorsH2.textContent = "Actors";
  article.appendChild(actorsH2);

  const actorsUl = document.createElement("ul");
  movie.Actors.forEach((actor) => {
    const li = document.createElement("li");
    li.textContent = actor;
    actorsUl.appendChild(li);
  });
  article.appendChild(actorsUl);

  bodyElement.appendChild(article);
};

window.onload = function () {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const bodyElement = document.querySelector("body");
    if (xhr.status == 200) {
      const moviesData = JSON.parse(xhr.responseText);
      moviesData.forEach((movie) => createMovieCard(movie, bodyElement));
    }
  };
  xhr.open("GET", "/movies");
  xhr.send();
};
