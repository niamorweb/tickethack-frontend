let departureInput = document.querySelector("#departure");
let arrivalInput = document.querySelector("#arrival");
let dateInput = document.querySelector("#date");
let submitBtn = document.querySelector("#submit");

let boxInitial = document.querySelector("#box_initial");
let boxNoTripFound = document.querySelector("#box_no_trip_found");
let boxTripsFound = document.querySelector("#box_trips_found");
let containerResultsTrips = document.querySelector("#container_results_trips");

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  let displayRightBox = false;

  let departureValue = departureInput.value;
  let arrivalValue = arrivalInput.value;
  let dateValue = dateInput.value;

  fetch(
    `https://tickethack-backend-2j1xnghbb-niamordev.vercel.app/${departureValue}/${arrivalValue}`
  )
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.trip.length; i++) {
        displayRightBox = true;
        if (data.trip[i].date.includes(dateValue)) {
          let newResultat = document.createElement("div");
          newResultat.classList.add(
            "flex",
            "gap-5",
            "items-center",
            "bg-zinc-200",
            "p-2",
            "justify-between"
          );
          newResultat.innerHTML = `
               <span class="text-sm">${data.trip[i].departure} > ${
            data.trip[i].arrival
          }</span>
                <span class="text-sm">${data.trip[i].date.slice(0, 6)}</span>
                <span class="text-sm">${data.trip[i].price}</span>
                <button id="btn_book_${i}"
                  class=" bg-green-600 text-sm cursor-pointer font-medium text-white px-3 py-1 rounded-md  hover:bg-white hover:text-green-600 hover:outline hover:outline-green-600 duration-150"
                >
                  Book
                </button>
    `;

          containerResultsTrips.appendChild(newResultat);

          let btn_book_elem = newResultat.querySelector(`#btn_book_${i}`);
          btn_book_elem.addEventListener("click", () => {
            handleBookBtn(data.trip[i]);
          });
        }
      }

      if (displayRightBox) {
        boxInitial.style.display = "none";
        boxNoTripFound.style.display = "none";
        boxTripsFound.style.display = "flex";
      } else {
        boxInitial.style.display = "none";
        boxNoTripFound.style.display = "flex";
        boxTripsFound.style.display = "none";
      }
    });
});

function handleBookBtn(data) {
  console.log(data._id);

  let dataToSend = {
    trip: data._id,
    isValidate: false,
  };

  fetch("https://tickethack-backend-2j1xnghbb-niamordev.vercel.app/orders", {
    method: "POST",

    headers: { "Content-Type": "application/json" },

    body: JSON.stringify(dataToSend),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}
