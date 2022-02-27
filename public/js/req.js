// import { data } from "./ip.js";
const IP = "http://localhost:3000";

//Variables
const menuBtn = document.querySelector(".menu-btn");
const menuTabs = document.querySelector(".menu-tabs");
const profPic = document.querySelector(".prof-pic");
const profPicMenu = document.querySelector(".pic-menu");
const navLogo = document.querySelector("#logo");
const profMenuPic = document.querySelector("#menu-prof");
const employeePic = document.querySelector("#employee-box");
const profPicture = document.querySelector("#prof-pic");
const customerDate = document.querySelector("#date");
const customerName = document.querySelector("#customer-name");
const customerStatus = document.querySelector("#customer-status");
const requestTitle = document.querySelector("#request-title");
const requestsBox = document.querySelector(".requests");
const searchField = document.querySelector(".search-field");
const profPictureMenu = document.querySelector("#prof-pic-menu");
const ticketBox = document.querySelector(".main-box");

//Picture menu variables
const backBtn = document.querySelector("#prev");

//bool
let menuOpen = false;
let picOpen = false;

if (window.innerWidth >= 1024) {
  let pcNavbar = document.querySelector(".navbar");
  window.addEventListener("load", () => {
    pcNavbar.style.transform = "translateX(0px)";
  });

  let logoutPc = document.querySelector(".logout");
  let logoutPcId = document.querySelector("#logout-title");
  let logoutBtn = document.querySelector(".logout-btn");
  let logoutA = document.querySelector("#logout-pc");
  let moneyBtnOne = document.querySelector("#money-btn-1");
  let moneyBtnTwo = document.querySelector("#money-btn-2");
  let monetBtnUil = document.querySelector("#ik");
  let moneyBtnUil = document.querySelector("#ikk");
  let dataBoxOne = document.querySelector("#first");
  let dataBoxSeccond = document.querySelector("#seccond");

  logoutPc.addEventListener("mouseover", () => {
    logoutPcId.style.opacity = "100%";
    logoutBtn.style.opacity = "100%";
    logoutPc.style.left = "0px";
    logoutBtn.style.transform = "rotate(-180deg)";
    logoutPc.style.backgroundColor = "#219ad6";
    logoutA.style.color = "#fff";
  });
  logoutPc.addEventListener("mouseout", () => {
    logoutPcId.style.opacity = "0";
    logoutBtn.style.opacity = "40%";
    logoutPc.style.left = "20px";
    logoutBtn.style.transform = "rotate(0deg)";
    logoutPc.style.backgroundColor = "";
    logoutA.style.color = "#000";
  });
}

//EventListeners
menuBtn.addEventListener("click", () => {
  if (!menuOpen) {
    menuBtn.classList.add("open");
    menuOpen = true;
    menuTabs.classList.add("open");
  } else {
    menuBtn.classList.remove("open");
    menuOpen = false;
    menuTabs.classList.remove("open");
    menuTabs.classList.add("close");
  }
});

const nameMenu = document.querySelector("#name");
const stateMenu = document.querySelector("#state");
const emailMenu = document.querySelector("#email");

//Profile picture click eventslistener
profPic.addEventListener("click", () => {
  if (!picOpen) {
    profPicMenu.style.display = "flex";
    setTimeout(() => {
      profPicMenu.classList.add("open");
      picOpen = true;
    }, 200);
    profPic.classList.add("hidden");
    setTimeout(() => {
      profMenuPic.classList.add("move-1");
    }, 300);
    navLogo.classList.add("move");
    profMenuPic.style.visibility = "visible";
  }
});

//Picture menu
backBtn.addEventListener("click", () => {
  profPicMenu.classList.remove("open");
  profPicMenu.classList.add("close");
  setTimeout(() => {
    profPicMenu.style.display = "none";
    profMenuPic.style.visibility = "hidden";
    profMenuPic.classList.remove("move-1");
  }, 800);
  picOpen = false;
  navLogo.classList.add("rev-move");
  navLogo.classList.remove("move");
  profPic.classList.remove("hidden");
});

//personalData (eventListener, class, functions)
let dataMenu = new Promise((resolve, reject) => {
  resolve(
    fetch("../dataBase/data.json")
      .then((element) => element.json())
      .then((user) => (dataMenu = user))
  );
  reject("get some error");
});

dataMenu.then((resualt) => {
  new Employee(
    `${resualt.royaee.img}`,
    `${resualt.royaee.name}`,
    `${resualt.royaee.state}`,
    `${resualt.royaee.email}`
  );
  let personalName = document.querySelector("#name-pc");
  personalName.textContent = resualt.royaee.name;
});

//classes
class Employee {
  constructor(prof, name, state, email) {
    //get data from the initialiser
    this.profPic = prof;
    this.name = name;
    this.state = state;
    this.email = email;
    //set data in the html fields
    profPicture.setAttribute("src", this.profPic);
    profMenuPic.setAttribute("src", this.profPic);
    profPictureMenu.setAttribute("src", this.profPic);

    // employeePic.setAttribute('src', this.profPic)
    nameMenu.textContent = this.name;
    stateMenu.textContent = this.state;
    emailMenu.textContent = this.email;
  }
}
let counterx = 0;

class Tickets {
  constructor(ticket) {
    //make html elements for request box and set the elemnts of them from api
    let ticketMainBox = document.createElement("div");
    ticketMainBox.classList.add("main-box");
    ticketMainBox.setAttribute("data-aos", "fade-up");
    ticketMainBox.setAttribute("data-aos-anchor-placement", "top-bottom");
    ticketMainBox.setAttribute("data-aos-delay", counterx * 200);
    ticketMainBox.setAttribute("data-aos-duration", 1000);
    counterx++;
    setTimeout(() => {
      ticketMainBox.removeAttribute("data-aos");
    }, 2000);
    ticketMainBox.id = `${ticket.id}`;
    let ticketChildBox = document.createElement("div");
    ticketChildBox.classList.add("req-box");
    ticketMainBox.appendChild(ticketChildBox);
    let detail = document.createElement("div");
    detail.classList.add("req-detail");
    ticketChildBox.appendChild(detail);
    let status = document.createElement("div");
    status.classList.add("custStatus");
    detail.appendChild(status);
    let title = document.createElement("h2");
    title.textContent = `مشتری: ${ticket.senderName}`;
    status.appendChild(title);
    let statusTitle = document.createElement("h2");
    statusTitle.textContent = `وضعیت: ${statusCheck()}`;
    statusTitle.classList.add("status");
    status.appendChild(statusTitle);
    let detailTitle = document.createElement("h2");
    detailTitle.textContent = `عنوان درخواست: ${ticket.title}`;
    detailTitle.classList.add("title");
    detail.appendChild(detailTitle);
    let date = document.createElement("div");
    date.classList.add("date");
    detail.appendChild(date);
    let dateTitle = document.createElement("h2");
    dateTitle.textContent = `تاریخ: ${ticket.updatedAt}`;
    date.appendChild(dateTitle);
    let timeCounter = document.createElement("h2");
    timeCounter.id = "counter";
    //append the final html elemnt to the body
    if (
      ticket.acceptedByWorker &&
      ticket.ticketSigning != "workerFinished" &&
      ticket.status != "done"
    ) {
      date.appendChild(timeCounter);
    }
    // Set the date we're counting down to
    var countDownDate = new Date(`${ticket.timer}`).getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {
      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      if (ticket.acceptedByWorker) {
        if (ticket.ticketSigning == "workerFinished") {
        } else {
          timeCounter.textContent =
            days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

          // If the count down is finished, write some text
          if (distance < 0) {
            clearInterval(x);
            timeCounter.textContent = "زمان کار به پایان رسیده";
            timeCounter.style.backgroundColor = "red";
          }
        }
      }
    }, 1000);
    requestsBox.appendChild(ticketMainBox);

    //functions

    //function that check the status and change the color of them
    function statusCheck() {
      if (ticket.status == "done") {
        statusTitle.classList.add("done-status");
        return "انجام شده";
      } else if (ticket.status == "pending") {
        if (ticket.faultWorkerId == null) {
          if (ticket.faultAcceptedByWorker == false) {
            statusTitle.classList.add("pending-status");
            return "تایید نشده توسط کارشناس";
          } else {
            statusTitle.classList.add("pending-status");
            return "جدید";
          }
        } else {
          if (ticket.faultAcceptedByWorker) {
            if (ticket.faultWorkerFileId === null) {
              statusTitle.classList.add("proccessing-status");
              return "در حال برسی توسط کارشناس";
            } else {
              statusTitle.classList.add("done-status");
              return "تکمیل شده توسط کارشناس";
            }
          } else if (ticket.faultAcceptedByWorker == false) {
            statusTitle.classList.add("pending-status");
            return "تایید نشده توسط کارشناس";
          } else {
            statusTitle.classList.add("proccessing-status");
            return "در انظار تایید کارشناس";
          }
        }
      } else {
        if (ticket.signedByClient == null) {
          statusTitle.classList.add("proccessing-status");
          statusTitle.style.color = "orange";
          return "در انتظار تایید مشتری";
        } else if (ticket.signedByClient) {
          if (ticket.workerId == null) {
            statusTitle.classList.add("proccessing-status");
            statusTitle.style.color = "green";
            return "تایید شده توسط مشتری";
          } else {
            if (ticket.acceptedByWorker) {
              if (ticket.ticketSigning == "workerFinished") {
                statusTitle.classList.add("proccessing-status");
                statusTitle.style.color = "green";
                return "انجام شده توسط کارشناس";
              } else {
                statusTitle.classList.add("proccessing-status");
                statusTitle.style.color = "orange";
                return "در حال انجام توسط کارشناس";
              }
            } else {
              statusTitle.classList.add("proccessing-status");
              statusTitle.style.color = "orange";
              return "در انتظار تایید کارشناس";
            }
          }
        } else {
          statusTitle.classList.add("proccessing-status");
          statusTitle.style.color = "red";
          return "تایید نشده توسط مشتری";
        }
      }
    }
  }
}

//request box

//fetch tickets api
setInterval(() => {}, 5000);

//get data from api function
async function getAPI(data) {
  let apiData = await fetch(data)
    .then((value) => value.json())
    .then((valu) => {
      return valu;
    });

  return apiData;
}
let apiMainData;
async function setTicket() {
  let ticketURL = `${IP}/api/v1/tickets`;

  //make tickets box for each ticket & get title of them for search
  let resualt = await getAPI(ticketURL);
  resualt.data.ticket.forEach((ticket) => {
    new Tickets(ticket);
  });
  apiMainData = resualt;
}
setTicket();

function filterTitle() {
  let tickets = document.querySelectorAll(".main-box");
  let ticketsTitle = document.querySelectorAll(".title");
  let check = false;

  if (searchField.value == "" || searchField.value == undefined) {
    tickets.forEach((tickbox) => {
      tickbox.style.display = "";
    });
  } else {
    for (let i = 0; i < ticketsTitle.length; i++) {
      for (let k = 0; k < searchField.value.split("").length; k++) {
        if (
          ticketsTitle[i].innerHTML.slice(15).split("")[k] ==
            searchField.value.split("")[k] &&
          check == false
        ) {
          tickets[i].style.display = "";
        } else {
          tickets[i].style.display = "none";
          check = true;
        }
      }
      check = false;
    }
  }
}

let tr3 = false;
function pendingFilter() {
  tr3 = !tr3;
  if (tr3) {
    let ticketsTitle = document.querySelectorAll(".status");
    ticketsTitle.forEach((title) => {
      if (title.classList[0] == "pending-status") {
        title.parentElement.parentElement.parentElement.parentElement.style.display =
          "";
      } else {
        title.parentElement.parentElement.parentElement.parentElement.style.display =
          "none";
      }
    });
  } else {
    filterTitle();
  }
}
let tr2 = false;

function doneFilter() {
  tr2 = !tr2;
  if (tr2) {
    let ticketsTitle = document.querySelectorAll(".status");
    ticketsTitle.forEach((title) => {
      if (title.classList[0] == "done-status") {
        title.parentElement.parentElement.parentElement.parentElement.style.display =
          "";
      } else {
        title.parentElement.parentElement.parentElement.parentElement.style.display =
          "none";
      }
    });
  } else {
    filterTitle();
  }
}

let tr1 = false;
function proccessingFilter() {
  tr1 = !tr1;
  if (tr1) {
    let ticketsTitle = document.querySelectorAll(".status");
    ticketsTitle.forEach((title) => {
      if (title.classList[0] == "proccessing-status") {
        title.parentElement.parentElement.parentElement.parentElement.style.display =
          "";
      } else {
        title.parentElement.parentElement.parentElement.parentElement.style.display =
          "none";
      }
    });
  } else {
    filterTitle();
  }
}

setTimeout(() => {
  document.querySelectorAll(".main-box").forEach((item) => {
    item.addEventListener("click", () => {
      apiMainData.data.ticket.forEach((ticket) => {
        if (item.id == ticket.id) {
          location.assign(`req/${item.id * 234 + 23321}`);
          // if (ticket.status === "pending") {
          //   location.assign(`req/${item.id * 234 + 23321}`);
          // } else if (ticket.status === "proccessing") {
          //   if (ticket.signedByClient != null) {
          //     //boss accepted ticket
          //     location.assign(`sentTicket/${item.id * 234 + 23321}`);
          //   } else if (ticket.signedByClient == null) {
          //     //misaze
          //   }
          // }
        }
      });
    });
  });
}, 500);

//assign location for each ticket
async function logout() {
  document.querySelector("#logout").classList.add("logout-active");
  await getAPI(`${IP}/api/v1/users/logout`).then((response) => {
    location.assign("/");
  });
}
