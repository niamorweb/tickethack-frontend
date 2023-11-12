let containerTripCart = document.querySelector("#container_trip_cart");
let priceText = document.querySelector("#price");
let purchaseBtn = document.querySelector("#purchase_btn");
let boxNoTrip = document.querySelector("#box_no_trip");
let boxTrip = document.querySelector("#box_trip");

console.log(boxNoTrip);
console.log(boxTrip.classList);
function handleFetchData() {
  fetch(`https://tickethack-backend-2j1xnghbb-niamordev.vercel.app/orders`)
    .then((response) => response.json())
    .then((data) => {
      let price = 0;
      let item = data.allTrips.filter(
        (element) => element.isValidate === false
      );
      console.log(item.length);
      if (item.length > 0) {
        document.querySelectorAll(".element-cart").forEach(function (div) {
          div.remove();
        });
        console.log("test");
        for (let i = 0; i < item.length; i++) {
          boxNoTrip.style.display = "none";
          boxTrip.style.display = "flex";
          price += Number(item[i].trip.price);

          let newResultat = document.createElement("div");
          newResultat.classList.add(
            "element-cart",
            "flex",
            "w-4/5",
            "font-medium",
            "px-5",
            "py-3",
            "justify-between",
            "items-center",
            "bg-red-50"
          );
          newResultat.innerHTML = `
               <span class="text-sm">${item[i].trip.departure} > ${
            item[i].trip.arrival
          }
        }</span>
                <span class="text-sm">${item[i].trip.date.slice(0, 6)}</span>
                <span class="text-sm">${item[i].trip.price}€</span>
                <button id="btn_delete_${i}"
                  class=" bg-green-600 text-sm cursor-pointer font-medium text-white px-3 py-1 rounded-md hover:bg-white hover:text-green-600 hover:outline hover:outline-green-600 duration-150"
                >
                  X
                </button>
    `;

          containerTripCart.appendChild(newResultat);

          let btn_book_elem = newResultat.querySelector(`#btn_delete_${i}`);
          btn_book_elem.addEventListener("click", () => {
            handleDeleteBtn(item[i]);
          });
        }
        priceText.textContent = price;
      } else {
        boxNoTrip.style.diplay = "flex";
        boxTrip.style.diplay = "none";
      }
    });
}

function handleDeleteBtn(data) {
  let idToSend = data._id;

  fetch(
    `https://tickethack-backend-2j1xnghbb-niamordev.vercel.app/${idToSend}`,
    {
      method: "DELETE",

      headers: { "Content-Type": "application/json" },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      handleFetchData();
    })
    .catch((err) => {
      console.log("erreur : ", err);
    });
}

purchaseBtn.addEventListener("click", () => {
  fetch(
    "https://tickethack-backend-2j1xnghbb-niamordev.vercel.app/orders/validate",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      handleFetchData();
    });
});

handleFetchData();
