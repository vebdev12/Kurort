const login_input = document.querySelector("#login");
const password_input = document.querySelector("#password");
const login_btn = document.querySelector("#login_btn");

let login = "";
let password = "";

login_input.addEventListener("change", (e) => {
  login = e.target.value;
});

password_input.addEventListener("change", (e) => {
  password = e.target.value;
});

const login_user = async ({ login, password }) => {
  return await request(`/users/login`, "POST", {
    login,
    password,
  });
};

login_btn.addEventListener("click", (e) => {
  e.preventDefault();

  login_user({ login, password })
    .then((res) => {
      localStorage.setItem("token", res.token);
      window.location.href = "/admin";
    })
    .catch((e) => {
      console.log(e);
    });
});
