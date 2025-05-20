const token = localStorage.getItem("token");

if (!token) {
  window.location.pathname = "Kurort/admin/login";
}

const requests_inner = document.querySelector(".admin__inner");
const noContent = document.querySelector(".admin__nocontent");

const foramteDate = (date) => {
  if (!date) return;

  const newDate = date.split("T").shift().split("-");

  const Y = newDate[0];
  const M = newDate[1];
  const D = newDate[2];

  return `${D}.${M}.${Y}`;
};

const getRequests = async () => {
  request("/requests")
    .then((res) => {
      for (item of res) {
        requests_inner.innerHTML += `
         <div class="admin__item" id="${item.id}">
            <span class="admin__item-name">${item.name}</span>
            <span class="admin__item-text">${item.text}</span>
            <span class="admin__item-phone">${item.phone}</span>
            <span class="admin__item-date">${foramteDate(item.date)}</span>

            <button class="admin__delete" onclick="removeRequest(item.id)">
              <img
                src="https://img.icons8.com/?size=100&id=UXGrKssCNlJd&format=png&color=CD1010"
                alt=""
              />
            </button>
          </div>

        `;
      }

      console.log(res.length);

      if (res.length === 0) {
        noContent.style.display = "flex";
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

const removeRequest = async (id) => {
  request(`/requests/${id}`, "DELETE")
    .then((res) => {
      window.location.reload();
    })
    .catch((e) => {
      alert("Произошла ошибка");
    });
};

window.addEventListener("DOMContentLoaded", () => {
  getRequests();
});
