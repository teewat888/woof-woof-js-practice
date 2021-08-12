document.addEventListener("DOMContentLoaded", () => {
  const dogBar = document.querySelector("div#dog-bar");
  const baseURL = "http://localhost:3000/pups";
  const clearTags = () => {};

  const createDogBar = (data) => {
   // console.log("data passed to createdDogBar: ", data);
    for (const item of data) {
      const spanB = document.createElement("span");
      spanB.innerText = item.name;
      spanB.addEventListenerI('click',() => {
          //put and display doog content here
      })
      //console.log("dogBar: ", dogBar);
      dogBar.appendChild(spanB);
    }
  };

  const fetchList = () => {
    fetch(baseURL)
      .then((resp) => resp.json())
      .then((data) => {
        //console.log("data: ", data);
        createDogBar(data);
      })
      .catch((e) => {
        console.log("error: ", e);
      });
  };

  fetchList();
});
