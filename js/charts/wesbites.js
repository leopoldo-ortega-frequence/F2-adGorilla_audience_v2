// imports
import { cog, people } from "./svg.js";

export const drawWebsites = (selector, data) => {
  console.log(data);
  // fetch("./data/websites.json")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     // append a new for each element in the data array
  //     data.forEach((d) => {
  //       appendli(d);
  //     });
  //   })
  //   .catch((error) => console.log(error));
  data.forEach((d) => {
    const li = document.createElement("li");
    li.classList.add("website-item");
    const div = document.createElement("div");
    const imageDiv = document.createElement("div");
    imageDiv.classList.add("list-icons");
    d.categories.forEach((d) => {
      appendImage(imageDiv, d);
    });
    const span = document.createElement("span");
    span.innerText = d.name;
    div.appendChild(span);
    li.appendChild(imageDiv);
    li.appendChild(div);
    selector.appendChild(li);
  });

  function appendImage(parent, img) {
    // console.log(parent);
    // console.log(img);

    const image = document.createElement("img");
    image.src = `./assets/${img}.svg`;
    image.classList.add("icon");
    parent.appendChild(image);
  }
};
