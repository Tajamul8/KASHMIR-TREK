// Navbar Background Change

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

  if(window.scrollY > 50){
    navbar.style.background = "rgba(0,0,0,0.9)";
  }
  else{
    navbar.style.background = "rgba(0,0,0,0.4)";
  }

});


// Trek Card Hover Glow

const cards = document.querySelectorAll(".trek-card");

cards.forEach(card => {

  card.addEventListener("mouseenter", () => {

    card.style.boxShadow =
    "0 10px 30px rgba(201,168,76,0.35)";

  });

  card.addEventListener("mouseleave", () => {

    card.style.boxShadow = "none";

  });

});
