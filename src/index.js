document.addEventListener("DOMContentLoaded", () => {
  const dogBar = document.querySelector("div#dog-bar");
  const dogInfo = document.querySelector("div#dog-info");

  const baseURL = "http://localhost:3000/pups";
  const clearTags = () => {
    while (dogInfo.firstChild) {
        dogInfo.removeChild(dogInfo.firstChild);
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

  const createDogBar = (data) => {
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
      //console.log("dogBar: ", dogBar);
      dogBar.appendChild(spanB);
      button.addEventListener("click", () => {
        item.isGoodDog = !item.isGoodDog;
        confObj = {
          method: "PATCH",
          header: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            isGoodDog: item.isGoodDog,
          }),
        };
        fetch(baseURL + "/" + item.id, confObj)
          .then((resp) => resp.json())
          .then((data) => {
            button.innerText = goodOrbad(item.isGoodDog);
            console.log(data);
          })
          .catch((e) => console.log(e));
      });
    }
  };

  const fetchList = () => {
    fetch(baseURL)
      .then((resp) => resp.json())
      .then((data) => {
        createDogBar(data);
      })
      .catch((e) => {
        console.log("error: ", e);
      });
  };

  fetchList();
});
