const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  slidesPerView: 3,
  spaceBetween: 30,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },

    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },

    900: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

const modalTrigger = document.querySelectorAll(".modal-trigger");
const modal = document.querySelector(".modal");
const close = document.querySelector(".modal__close");

modalTrigger.forEach((el) => {
  console.log(el);

  el.addEventListener("click", () => {
    modal.classList.add("modal--active");
  });
});

close.addEventListener("click", () => {
  modal.classList.remove("modal--active");
});

function countdown(targetDate, elementId) {
  const targetTime = new Date(targetDate).getTime();

  const intervalId = setInterval(updateCountdown, 1000);

  function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetTime - now;

    if (difference <= 0) {
      document.getElementById(elementId).innerHTML = "Countdown is over!";
      clearInterval(intervalId);
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById(elementId).innerHTML =
      days + "д " + hours + "ч " + minutes + "м ";
  }

  updateCountdown();
}

const targetDate = "2025-07-31T23:59:59";
const countdownElementId = "countdown";

countdown(targetDate, countdownElementId);

const burger = document.querySelector(".burger");
const menu = document.querySelector(".header__bottom");
const menuClose = document.querySelector(".header__close");

burger.addEventListener("click", () => {
  console.log(123);

  menu.classList.add("header__bottom--active");
});

menuClose.addEventListener("click", () => {
  menu.classList.remove("header__bottom--active");
});

// зявка

const name_input = document.querySelector("#user_name");
const phone_input = document.querySelector("#user_phone");
const text_input = document.querySelector("#user_text");
const send_btn = document.querySelector("#send_modal");
const modal_form = document.querySelector(".modal__form");

const fields = {
  name: "",
  phone: "",
  text: "",
};

modal_form.addEventListener("change", (e) => {
  fields[e.target.name] = e.target.value;
});

const sendRequest = async ({ name, phone, text }) => {
  return await request("/requests", "POST", { name, phone, text });
};

send_btn.addEventListener("click", (e) => {
  e.preventDefault();

  sendRequest(fields)
    .then((res) => {
      alert("Спасибо! Заявка успешно отправлена");
      modal.classList.remove("modal--active");
    })
    .catch((e) => {
      alert("Произошла ошибка");
    });
});
