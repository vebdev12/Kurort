const accodion_items = document.querySelectorAll(".accordion__item");

accodion_items.forEach((item) => {
  item.addEventListener("click", function (e) {
    if (
      e.target.className === "accordion__item-body" ||
      e.target.className === "accordion__item-head" ||
      e.target.className === "accordion__item-body__text" ||
      e.target.className === "accordion__item-head__title" ||
      e.target.className === "accordion__item-head__img"
    ) {
      item.classList.toggle("active");
    }
  });
});
