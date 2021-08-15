document.addEventListener("DOMContentLoaded", () => {
  let goodDogFilter = false; //default good dog = fault//off
  const dogBar = document.querySelector("div#dog-bar");
  const dogInfo = document.querySelector("div#dog-info");
  const filter = document.getElementById("good-dog-filter");
  const baseURL = "http://localhost:3000/pups";
  const clearTags = () => {
    while (dogInfo.firstChild) {
      dogInfo.removeChild(dogInfo.firstChild);
    }
  };

  const clearBar = () => {
    while (dogBar.firstChild) {
        dogBar.removeChild(dogBar.firstChild);
      }
  };
  const setAttributes = (el, attrs) => {
    for (let key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  };
  const goodOrbad = (isGoodDog) => {
    if (isGoodDog) {
      return "Good Dog!";
    } else {
      return "Bad Dog!";
    }
  };

  const dogFilterText = (goodDogFilter) => {
    if (goodDogFilter) {
      return "Filter good dogs: ON";
    } else {
      return "Filter good dogs: Off";
    }
  };

  const createDogBar = (data, goodDogFilter = false) => {
    // console.log("data passed to createdDogBar: ", data);
    for (const item of data) {
      const spanB = document.createElement("span");
      const img = document.createElement("img");
      const h2 = document.createElement("h2");

      const button = document.createElement("button");
      spanB.innerText = item.name;

      spanB.addEventListener("click", () => {
        //put and display doog content here
        clearTags();
        console.log("fire span event");
        setAttributes(img, {
          src: `${item.image}`,
          width: "300",
          height: "300",
        });
        h2.innerText = item.name;
        button.innerText = goodOrbad(item.isGoodDog);
        dogInfo.append(img, h2, button);
      });

      if (!goodDogFilter || item.isGoodDog) {
        dogBar.appendChild(spanB);
      }

      button.addEventListener("click", () => {
        item.isGoodDog = !item.isGoodDog;
        const confObj = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            isGoodDog: item.isGoodDog
          })
        };
        console.log("conf_obj: ",confObj);
        fetch(baseURL + "/" + item.id, confObj)
          .then((resp) => resp.json())
          .then((data) => {
            button.innerText = goodOrbad(item.isGoodDog);
            console.log(data);
            //clearTags();
            //fetchList(goodDogFilter);
          })
          .catch((e) => console.log(e));
      });
    }
  };

  const fetchList = (goodDogFilter) => {
    fetch(baseURL)
      .then((resp) => resp.json())
      .then((data) => {
        createDogBar(data, goodDogFilter);
      })
      .catch((e) => {
        console.log("error: ", e);
      });
  };

  fetchList(goodDogFilter);
  filter.addEventListener("click", () => {
    goodDogFilter = !goodDogFilter;
    filter.innerText = dogFilterText(goodDogFilter);
    clearBar();
    fetchList(goodDogFilter);
  });
});
