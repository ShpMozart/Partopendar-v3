// import { data } from "./ip";
const IP = "http://localhost:3000";

//Variables
const menuBtn = document.querySelector(".menu-btn");
const menuTabs = document.querySelector(".menu-tabs");
const profPic = document.querySelector(".prof-pic");
const profPictureMenu = document.querySelector("#prof-pic-menu");
const profPicWindow = document.querySelector("#prof-pic");
const profPicMenu = document.querySelector(".pic-menu");
const navLogo = document.querySelector("#logo");
const profMenuPic = document.querySelector("#menu-prof");
const employeePic = document.querySelector("#employee-box");
const profPicture = document.querySelector("#prof-pic");

//dataBox data-1
const moneyValue = document.querySelector("#money");
const moneyPercent = document.querySelector("#percent");

//dataBox data-2
const requestNew = document.querySelector(".resualt-new");
const requestwaitSigendByClient = document.querySelector(
  ".resualt-waitSignedByClient"
);
const requestSigendByClient = document.querySelector(".reusalt-sigendByclient");
const requestnotSigendByClient = document.querySelector(
  ".resualt-notSigendByClient"
);
const requestInWork = document.querySelector(".resualt-inWork");
const requestFinished = document.querySelector(".resualt-finished");

//Picture menu variables
const backBtn = document.querySelector("#prev");

//bool
let menuOpen = false;
let picOpen = false;

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
  let leftArrow = document.createElement("i");
  leftArrow.classList.add("uil");
  leftArrow.classList.add("uil-angle-left");
  leftArrow.id = "ik";

  let rightArrow = document.createElement("i");
  rightArrow.classList.add("uil");
  rightArrow.classList.add("uil-angle-right");
  rightArrow.id = "ikk";
  moneyBtnTwo.textContent = "???????????? ?????????? ????";
  moneyBtnTwo.appendChild(rightArrow);

  moneyBtnOne.textContent = "???????????? ?????????????? ????";
  moneyBtnOne.appendChild(leftArrow);
  moneyBtnOne.addEventListener("mouseover", () => {
    leftArrow.style.opacity = "100%";
    moneyBtnOne.style.left = "0";
    dataBoxOne.style.transform = "translateY(-5px) translateX(3px)";
    dataBoxOne.style.animation = "boxShadow 5s infinite alternate-reverse";
  });
  moneyBtnOne.addEventListener("mouseout", () => {
    leftArrow.style.opacity = "0";
    moneyBtnOne.style.left = "-40px";
    dataBoxOne.style.transform = "translateY(0px) translateX(0px)";
    dataBoxOne.style.animation = "";
  });
  moneyBtnTwo.addEventListener("mouseover", () => {
    rightArrow.style.opacity = "100%";
    moneyBtnTwo.style.left = "200px";
    dataBoxSeccond.style.transform = "translateY(-5px) translateX(3px)";
    dataBoxSeccond.style.animation = "boxShadow 5s infinite alternate-reverse";
  });
  moneyBtnTwo.addEventListener("mouseout", () => {
    rightArrow.style.opacity = "0";
    moneyBtnTwo.style.left = "245px";
    dataBoxSeccond.style.transform = "translateY(0px) translateX(0px)";
    dataBoxSeccond.style.animation = "";
  });
}

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

//dataBox-1

//dataBox-2

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
    `${resualt.asadi.img}`,
    `${resualt.asadi.name}`,
    `${resualt.asadi.state}`,
    `${resualt.asadi.email}`
  );
  let personalName = document.querySelector("#name-pc");
  personalName.textContent = resualt.asadi.name;
});

//eventListeners
const nameMenu = document.querySelector("#name");
const stateMenu = document.querySelector("#state");
const emailMenu = document.querySelector("#email");

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
let done = 0;
let waitSigendByClient = 0;
let sigendByclient = 0;
let notSigendByClient = 0;
let withWorker = 0;
let newWork = 0;

async function counter() {
  let url = `${IP}/api/v1/tickets/workerTicket`;
  await getAPI(url)
    .then((res) => {
      res.data.ticket.forEach((element) => {
        if (element.status == "done") {
          done = done + 1;
        } else if (element.status == "proccessing") {
          if (element.signedByClient == null) {
            waitSigendByClient = waitSigendByClient + 1;
          } else if (element.signedByClient) {
            if (element.workerId == null) {
              sigendByclient = sigendByclient + 1;
            } else {
              withWorker = withWorker + 1;
            }
          } else {
            notSigendByClient = notSigendByClient + 1;
          }
        } else if (element.status == "pending") {
          if (element.faultWorkerId == null) {
            newWork = newWork + 1;
          } else {
            if (element.faultAcceptedByWorker == null) {
              newWork = newWork + 1;
            } else if (element.faultAcceptedByWorker) {
              if (element.faultWorkerFileId == null) {
                withWorker = withWorker + 1;
              } else {
                waitSigendByClient = waitSigendByClient + 1;
              }
            } else {
              notSigendByClient = notSigendByClient + 1;
            }
          }
        }
      });
    })
    .catch(() => {
      window.alert("Fail to fetch API");
    });
}

async function setCount() {
  await counter().then(() => {
    requestNew.innerHTML = newWork;
    requestwaitSigendByClient.innerHTML = waitSigendByClient;
    requestSigendByClient.innerHTML = sigendByclient;
    requestnotSigendByClient.innerHTML = notSigendByClient;
    requestInWork.innerHTML = withWorker;
    requestFinished.innerHTML = done;
  });
}
setCount();
//get API

async function getAPI(data) {
  let apiData = await fetch(data)
    .then((value) => value.json())
    .then((valu) => {
      return valu;
    })
    .catch((error) => error);

  return apiData;
}
async function logout() {
  document.querySelector("#logout").classList.add("logout-active");
  await getAPI(`${IP}/api/v1/users/logout`).then((response) => {
    location.assign("/");
  });
}
