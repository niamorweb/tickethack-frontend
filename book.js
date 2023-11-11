let bookContainer = document.querySelector("#container_trip_book");
let boxNoTrip = document.querySelector("#box_no_trip_booked");
let boxTrip = document.querySelector("#box_trip_booked");

fetch(`https://tickethack-backend-rmxpiwzq8-niamordev.vercel.app/orders/booked`)
  .then((response) => response.json())
  .then((data) => {
    // console.log(data.allTrips);
    if (data.allTrips.length > 0) {
      data.allTrips.map((data) => {
        bookContainer.innerHTML += `
        <div class="flex w-4/5 font-medium px-5 py-3 justify-between items-center bg-red-50">
  <span class="text-sm">${data.trip.departure} > ${data.trip.arrival}</span>
  <span class="text-sm">${data.trip.date.slice(11, 16)}</span>
  <span class="text-sm">${data.trip.price}€</span>
  <span class="text-sm">departure in 5 hours</span>
</div>
        `;
        console.log(data);
      });
      boxTrip.style.display = "flex";
      boxNoTrip.style.display = "none";
    } else {
      boxTrip.style.display = "none";
      boxNoTrip.style.display = "flex";
    }
  });

{
}
