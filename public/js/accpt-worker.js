// import { data } from "./ip";
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
const container = document.querySelector(".container");
const ticketBox = document.querySelector(".main-box");
const profPictureMenu = document.querySelector("#prof-pic-menu");

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
    `${resualt.asadi.img}`,
    `${resualt.asadi.name}`,
    `${resualt.asadi.state}`,
    `${resualt.asadi.email}`
  );
  let personalName = document.querySelector("#name-pc");
  personalName.textContent = resualt.asadi.name;
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

class Ticket {
  constructor(ticket) {
    let data = document.createElement("div");
    data.classList.add("header");
    let title = document.createElement("h2");
    title.textContent = "درخواست شماره: ";
    data.appendChild(title);
    let reqNum = document.createElement("h3");
    reqNum.textContent = ticket.id * 234 + 23321;
    data.appendChild(reqNum);
    container.appendChild(data);
    let ticketBox = document.createElement("div");
    ticketBox.setAttribute("data-aos", "fade-up");
    ticketBox.setAttribute("data-aos-anchor-placement", "top-bottom");
    ticketBox.setAttribute("data-aos-duration", 1000);
    ticketBox.setAttribute("data-aos-delay", 1000);
    ticketBox.classList.add("ticket-box");
    let ticketHeader = document.createElement("div");
    ticketHeader.classList.add("ticket-header");
    ticketBox.appendChild(ticketHeader);
    let customerName = document.createElement("div");
    let name = document.createElement("h5");
    name.textContent = `${ticket.senderName} / شماره: ${
      ticket.id * 234 + 23321
    }`;
    let timeCounter = document.createElement("h5");
    timeCounter.id = "counter";
    customerName.appendChild(name);
    customerName.classList.add("customer-name");
    ticketHeader.appendChild(customerName);
    if (ticket.acceptedByWorker) {
      customerName.appendChild(timeCounter);
    }
    let status = document.createElement("div");
    status.classList.add("status");
    let stat = document.createElement("h5");
    stat.textContent = `وضعیت: ${statusCheck()}`;
    status.appendChild(stat);
    let date = document.createElement("h5");
    date.textContent = `تاریخ: ${ticket.createdAt}`;
    status.appendChild(date);
    ticketHeader.appendChild(status);

    let ticketProb = document.createElement("div");
    ticketProb.classList.add("ticket-problem");
    let probInfo = document.createElement("div");
    probInfo.classList.add("prob-info");
    let city = document.createElement("h5");
    city.textContent = `شهر: ${ticket.city}`;
    probInfo.appendChild(city);
    let center = document.createElement("h5");
    center.textContent = `مرکز: ${ticket.center}`;
    probInfo.appendChild(center);
    let file = document.createElement("h5");
    file.textContent = `فایل ضمیمه: `;
    let btn = document.createElement("button");
    btn.classList.add("btn");
    btn.textContent = "دانلود";
    btn.id = "download-file";
    file.appendChild(btn);
    probInfo.appendChild(file);
    ticketProb.appendChild(probInfo);
    let probTitle = document.createElement("div");
    probTitle.classList.add("prob-title");
    let titleli = document.createElement("li");
    let titleTxt = document.createElement("h5");
    titleTxt.textContent = `عنوان درخواست: ${ticket.title}`;
    titleli.appendChild(titleTxt);
    probTitle.appendChild(titleli);
    ticketProb.appendChild(probTitle);
    let probText = document.createElement("div");
    probText.classList.add("prob-text");
    let probli = document.createElement("li");
    let probtitle = document.createElement("h5");
    probtitle.textContent = `شرح درخواست: ${ticket.text}`;
    let statusBar = document.createElement("div");
    statusBar.classList.add("status-bar");
    let states = document.createElement("div");
    states.classList.add("states");
    let pendBos = document.createElement("div");
    let pendBosI = document.createElement("i");
    pendBosI.classList.add("uil");
    pendBosI.classList.add("uil-ticket");
    let pendBosT = document.createElement("h4");
    pendBosT.textContent = "درخواست ثبت شده";
    pendBos.appendChild(pendBosI);
    pendBos.appendChild(pendBosT);

    let inWork = document.createElement("div");
    let inWorkI = document.createElement("i");
    inWorkI.classList.add("uil");
    inWorkI.classList.add("uil-user-check");
    let inWorkT = document.createElement("h4");
    inWorkT.textContent = "تایید شده توسط مدیر";
    inWork.appendChild(inWorkI);
    inWork.appendChild(inWorkT);

    let inCustomer = document.createElement("div");
    let inCustomerI = document.createElement("i");
    inCustomerI.classList.add("uil");
    inCustomerI.classList.add("uil-user-check");
    let inCustomerT = document.createElement("h4");
    inCustomerT.textContent = "تایید شده توسط مشتری";
    inCustomer.appendChild(inCustomerI);
    inCustomer.appendChild(inCustomerT);

    let inTransfer = document.createElement("div");
    let inTransferI = document.createElement("i");
    inTransferI.classList.add("uil");
    inTransferI.classList.add("uil-constructor");
    let inTransferT = document.createElement("h4");
    inTransferT.textContent = "ارجا به کارشناس";
    inTransfer.appendChild(inTransferI);
    inTransfer.appendChild(inTransferT);

    let inDone = document.createElement("div");
    let inDoneI = document.createElement("i");
    inDoneI.classList.add("uil");
    inDoneI.classList.add("uil-check");
    let inDoneT = document.createElement("h4");
    inDoneT.textContent = "اتمام کار";
    inDone.appendChild(inDoneI);
    inDone.appendChild(inDoneT);

    let pendBoss = document.createElement("div");
    let pendBossI = document.createElement("i");
    pendBossI.classList.add("uil");
    pendBossI.classList.add("uil-ticket");
    let pendBossT = document.createElement("h4");
    pendBossT.textContent = "درخواست ثبت شده";
    pendBoss.appendChild(pendBossI);
    pendBoss.appendChild(pendBossT);

    let inWorkk = document.createElement("div");
    let inWorkkI = document.createElement("i");
    inWorkkI.classList.add("uil");
    inWorkkI.classList.add("uil-user-check");
    let inWorkkT = document.createElement("h4");
    inWorkkT.textContent = "تایید شده توسط مدیر";
    inWorkk.appendChild(inWorkkI);
    inWorkk.appendChild(inWorkkT);

    let inTransferr = document.createElement("div");
    let inTransferrI = document.createElement("i");
    inTransferrI.classList.add("uil");
    inTransferrI.classList.add("uil-constructor");
    let inTransferrT = document.createElement("h4");
    inTransferrT.textContent = "ارسال کارشناس جهت بررسی";
    inTransferr.appendChild(inTransferrI);
    inTransferr.appendChild(inTransferrT);

    let inDonee = document.createElement("div");
    let inDoneeI = document.createElement("i");
    inDoneeI.classList.add("uil");
    inDoneeI.classList.add("uil-check");
    let inDoneeT = document.createElement("h4");
    inDoneeT.textContent = "اتمام کار";
    inDonee.appendChild(inDoneeI);
    inDonee.appendChild(inDoneeT);

    if (ticket.faultWorkerId == null) {
      states.appendChild(pendBos);
      states.appendChild(inWork);
      states.appendChild(inCustomer);
      states.appendChild(inTransfer);
      states.appendChild(inDone);
    } else {
      states.appendChild(pendBoss);
      states.appendChild(inWorkk);
      states.appendChild(inTransferr);
      states.appendChild(inDonee);
    }

    let loadBar = document.createElement("div");
    loadBar.classList.add("load-bar");
    let insideBar = document.createElement("div");
    insideBar.classList.add("inside-bar");
    loadBar.appendChild(insideBar);

    statusBar.appendChild(states);
    statusBar.appendChild(loadBar);
    probli.appendChild(probtitle);
    probText.appendChild(probli);
    ticketProb.appendChild(probText);
    ticketBox.appendChild(ticketProb);
    ticketBox.appendChild(statusBar);

    if (ticket.status === "pending") {
      if (ticket.faultWorkerId == null) {
        pendBosI.style.color = "#4e50d4";
        pendBosT.style.backgroundColor = "#5759eb";
        pendBosT.style.boxShadow = "1px -3px #6467ff";
        insideBar.style.width = "16%";
      } else {
        pendBossI.style.color = "#4e50d4";
        pendBossT.style.backgroundColor = "#5759eb";
        pendBossT.style.boxShadow = "1px -3px #6467ff";
        inWorkkI.style.color = "#4e50d4";
        inWorkkT.style.backgroundColor = "#5759eb";
        inWorkkT.style.boxShadow = "1px -3px #6467ff";
        insideBar.style.width = "53%";
        if (ticket.faultAcceptedByWorker) {
          inTransferrI.style.color = "#4e50d4";
          inTransferrT.style.backgroundColor = "#5759eb";
          inTransferrT.style.boxShadow = "1px -3px #6467ff";
          insideBar.style.width = "86%";
        }
      }
    } else if (ticket.status === "proccessing") {
      if (ticket.signedByClient == null) {
        pendBosI.style.color = "#4e50d4";
        pendBosT.style.backgroundColor = "#5759eb";
        pendBosT.style.boxShadow = "1px -3px #6467ff";
        inWorkI.style.color = "#4e50d4";
        inWorkT.style.backgroundColor = "#5759eb";
        inWorkT.style.boxShadow = "1px -3px #6467ff";
        insideBar.style.width = "42%";
      } else if (ticket.signedByClient) {
        pendBosI.style.color = "#4e50d4";
        pendBosT.style.backgroundColor = "#5759eb";
        pendBosT.style.boxShadow = "1px -3px #6467ff";
        inWorkI.style.color = "#4e50d4";
        inWorkT.style.backgroundColor = "#5759eb";
        inWorkT.style.boxShadow = "1px -3px #6467ff";
        inCustomerI.style.color = "#4e50d4";
        inCustomerT.style.backgroundColor = "#5759eb";
        inCustomerT.style.boxShadow = "1px -3px #6467ff";
        insideBar.style.width = "68%";
      } else {
        inCustomerI.classList.remove("uil-user-check");
        inCustomerI.classList.add("uil-user-times");
        pendBosI.style.color = "#4e50d4";
        pendBosT.style.backgroundColor = "#5759eb";
        pendBosT.style.boxShadow = "1px -3px #6467ff";
        inWorkI.style.color = "#4e50d4";
        inWorkT.style.backgroundColor = "#5759eb";
        inWorkT.style.boxShadow = "1px -3px #6467ff";
        inCustomerI.style.color = "red";
        inCustomerT.style.backgroundColor = "red";
        inCustomerT.textContent = "تایید نشده توسط مشتری";
        inCustomerT.style.boxShadow = "1px -3px #ff5757";
        insideBar.style.width = "50%";
      }
      if (ticket.workerId != null) {
        pendBosI.style.color = "#4e50d4";
        pendBosT.style.backgroundColor = "#5759eb";
        pendBosT.style.boxShadow = "1px -3px #6467ff";
        inWorkI.style.color = "#4e50d4";
        inWorkT.style.backgroundColor = "#5759eb";
        inWorkT.style.boxShadow = "1px -3px #6467ff";
        inCustomerI.style.color = "#4e50d4";
        inCustomerT.style.backgroundColor = "#5759eb";
        inCustomerT.style.boxShadow = "1px -3px #6467ff";
        inTransferI.style.color = "#4e50d4";
        inTransferT.style.backgroundColor = "#5759eb";
        inTransferT.style.boxShadow = "1px -3px #6467ff";
        insideBar.style.width = "91%";
      }
    } else {
      pendBosI.style.color = "#4e50d4";
      pendBosT.style.backgroundColor = "#5759eb";
      pendBosT.style.boxShadow = "1px -3px #6467ff";
      inWorkI.style.color = "#4e50d4";
      inWorkT.style.backgroundColor = "#5759eb";
      inWorkT.style.boxShadow = "1px -3px #6467ff";
      inCustomerI.style.color = "#4e50d4";
      inCustomerT.style.backgroundColor = "#5759eb";
      inCustomerT.style.boxShadow = "1px -3px #6467ff";
      inTransferI.style.color = "#4e50d4";
      inTransferT.style.backgroundColor = "#5759eb";
      inTransferT.style.boxShadow = "1px -3px #6467ff";
      inDoneI.style.color = "#4e50d4";
      inDoneT.style.backgroundColor = "#5759eb";
      inDoneT.style.boxShadow = "1px -3px #6467ff";
      pendBossI.style.color = "#4e50d4";
      pendBossT.style.backgroundColor = "#5759eb";
      pendBossT.style.boxShadow = "1px -3px #6467ff";
      inWorkkI.style.color = "#4e50d4";
      inWorkkT.style.backgroundColor = "#5759eb";
      inWorkkT.style.boxShadow = "1px -3px #6467ff";
      inTransferrI.style.color = "#4e50d4";
      inTransferrT.style.backgroundColor = "#5759eb";
      inTransferrT.style.boxShadow = "1px -3px #6467ff";
      inDoneeI.style.color = "#4e50d4";
      inDoneeT.style.backgroundColor = "#5759eb";
      inDoneeT.style.boxShadow = "1px -3px #6467ff";
      insideBar.style.animation = "unset";
      insideBar.style.width = "100%";
    }

    if (ticket.status == "done") {
      let finalRes = document.createElement("div");
      finalRes.classList.add("final-res");
      let finalTitle = document.createElement("h4");
      finalTitle.textContent = "نتیجه نهایی:";
      finalRes.appendChild(finalTitle);
      let filed = document.createElement("h5");
      filed.textContent = `فایل نهایی: `;
      let btnx = document.createElement("button");
      btnx.id = "file-worker";
      btnx.classList.add("btn");
      btnx.textContent = "دانلود";
      filed.appendChild(btnx);
      finalRes.appendChild(filed);
      ticketBox.appendChild(finalRes);

      setTimeout(() => {
        if (ticket.faultWorkerFileId == null) {
          document
            .querySelector("#file-worker")
            .addEventListener("click", () => {
              console.log(ticket);
              location.href = `${IP}/api/v1/workerFiles/${ticket.workerFileId}`;
            });
        } else {
          document
            .querySelector("#file-worker")
            .addEventListener("click", () => {
              console.log(ticket);
              location.href = `${IP}/api/v1/faultWorkerFiles/${ticket.faultWorkerFileId}`;
            });
        }
      }, 500);
    }

    if (ticket.status === "pending") {
      let ticketAnswer = document.createElement("div");
      ticketAnswer.classList.add("ticket-answer");
      let answer = document.createElement("div");
      answer.classList.add("answer");
      let tytle = document.createElement("h5");
      tytle.textContent = `پرسش و پاسخ: `;
      answer.appendChild(tytle);
      ticket.workerMessage.forEach((answr) => {
        let txtBx = document.createElement("div");
        let time = document.createElement("div");
        if (answr.from == "worker") {
          txtBx.classList.add("client");
          txtBx.id = `${answr.id}`;
          time.classList.add("time-client");
        } else if (answr.from == "boss") {
          txtBx.classList.add("boss");
          time.classList.add("time-boss");
          txtBx.id = `${answr.id}`;
        }
        time.textContent = `${answr.createdAt}`;
        txtBx.textContent = `${answr.text}`;
        txtBx.appendChild(time);
        answer.appendChild(txtBx);
        ticketAnswer.appendChild(answer);

        ticketBox.appendChild(ticketAnswer);
      });

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
              window.alert("زمان  انجام کار شما به  اتمام رسیده.");
            }
          }
        }
      }, 1000);

      if (ticket.faultAcceptedByWorker == null) {
        let accptOrNot = document.createElement("div");
        accptOrNot.classList.add("accpt-fild");
        let slct = document.createElement("div");
        slct.classList.add("select");
        let accptCheck = document.createElement("div");
        let getTime = document.createElement("div");
        getTime.classList.add("timeInput");
        let date = document.createElement("input");
        let br = document.createElement("br");
        date.setAttribute("type", "date");
        date.id = "get-date";
        let time = document.createElement("input");
        time.setAttribute("type", "time");
        time.id = "get-time";
        let timeLabel = document.createElement("label");
        timeLabel.id = "time-label";
        timeLabel.setAttribute("for", "get-time");
        timeLabel.textContent = "تاریخ پایان کار:";
        getTime.style.display = "none";
        getTime.appendChild(timeLabel);
        getTime.appendChild(date);
        getTime.appendChild(time);
        let accInput = document.createElement("input");
        accInput.setAttribute("type", "checkbox");
        accInput.id = "accpt";
        accInput.value = "accpt";
        let accLable = document.createElement("label");
        accLable.setAttribute("for", "accpt");
        accLable.textContent = "کار را می پذیرم.";
        accLable.appendChild(br);
        accInput.appendChild(accLable);
        accptCheck.appendChild(accInput);
        accptCheck.appendChild(accLable);
        slct.appendChild(accptCheck);

        let send = document.createElement("div");
        send.classList.add("send");
        let sendBtn = document.createElement("button");
        sendBtn.classList.add("btn");
        sendBtn.textContent = "ارسال";
        send.appendChild(sendBtn);
        // send.appendChild(getTime);
        let textSend = document.createElement("textarea");
        textSend.setAttribute("id", "notaccpt");
        textSend.setAttribute("cols", "25");
        textSend.setAttribute("rows", "3");
        textSend.setAttribute("placeholder", "علت قبول نکردن کار...");
        send.appendChild(textSend);
        accptOrNot.appendChild(slct);
        accptOrNot.appendChild(send);
        setTimeout(() => {
          ticketBox.appendChild(accptOrNot);
        }, 1000);

        ticketBox.appendChild(ticketAnswer);

        let activeInputCheck = false;

        accInput.addEventListener("click", () => {
          if (!activeInputCheck) {
            accInput.classList.add("active-input");
            activeInputCheck = true;
            textSend.style.display = "none";
            getTime.style.display = "flex";
            sendBtn.classList.add("move-btn");
          } else {
            accInput.classList.remove("active-input");
            getTime.style.display = "none";
            activeInputCheck = false;
            textSend.style.display = "block";
            sendBtn.classList.remove("move-btn");
          }
        });

        sendBtn.addEventListener("click", () => {
          // let getTime = document.querySelector("#get-time").value;
          if (activeInputCheck) {
            postData(`${IP}/api/v1/tickets/update/${ticket.id}`, {
              faultAcceptedByWorker: true,
            }).then((data) => {
              location.reload();
            });
          } else {
            postData(`${IP}/api/v1/workerMessages/create`, {
              ticketId: `${ticket.id}`,
              text: textSend.value,
            }).then((res) => {
              postData(`${IP}/api/v1/tickets/update/${ticket.id}`, {
                faultAcceptedByWorker: false,
              }).then((res) => {
                location.assign("/panel");
              });
            });
          }
        });
      } else {
        if (ticket.faultWorkerFileId === null) {
          let accptOrNot = document.createElement("div");
          accptOrNot.classList.add("accpt-fild");
          let slct = document.createElement("div");
          slct.classList.add("select");
          let workerFile = document.createElement("div");
          workerFile.classList.add("prob-file");
          let workerLi = document.createElement("li");
          let workerTitle = document.createElement("h5");
          workerTitle.textContent = "فایل ضمیمه:";
          let workerSecondTitle = document.createElement("h6");
          workerSecondTitle.textContent = "(pdf با سایز کمتر از 1MB)";
          workerLi.appendChild(workerTitle);
          workerLi.appendChild(workerSecondTitle);
          workerFile.appendChild(workerLi);
          let workerInput = document.createElement("input");
          workerInput.setAttribute("type", "file");
          workerInput.setAttribute("name", "pdf");
          workerInput.id = "file";
          workerInput.style.display = "none";
          let fileCheck = false;

          let fileId;
          workerInput.addEventListener("change", (target) => {
            console.log(target);
            if (
              target.target.files[0].type == "application/pdf" &&
              target.target.files[0].size <= 1000000
            ) {
              document.getElementById("fileError").style.display = "none";
              document.getElementById("uploadLogo").style.display = "none";
              document.getElementById("uploadDone").style.display = "block";
              fileCheck = true;
            } else {
              document.getElementById("uploadDone").style.display = "none";
              document.getElementById("uploadLogo").style.display = "none";
              document.getElementById("fileError").style.display = "block";
              fileCheck = false;
            }
          });
          workerFile.appendChild(workerInput);
          let workerLabel = document.createElement("label");
          workerLabel.id = "file-input";
          workerLabel.setAttribute("for", "file");
          let firstI = document.createElement("i");
          firstI.id = "uploadLogo";
          firstI.classList.add("uil");
          firstI.classList.add("uil-file-upload");
          let secondI = document.createElement("i");
          secondI.id = "uploadDone";
          secondI.classList.add("uil");
          secondI.classList.add("uil-file-check");
          let thirdI = document.createElement("i");
          thirdI.id = "fileError";
          thirdI.classList.add("uil");
          thirdI.classList.add("uil-file-exclamation");
          workerLabel.appendChild(firstI);
          workerLabel.appendChild(secondI);
          workerLabel.appendChild(thirdI);
          workerFile.appendChild(workerLabel);

          let accptCheck = document.createElement("div");
          let br = document.createElement("br");
          let accInput = document.createElement("input");
          accInput.setAttribute("type", "checkbox");
          accInput.id = "accpt";
          accInput.value = "accpt";
          let accLable = document.createElement("label");
          accLable.setAttribute("for", "accpt");
          accLable.textContent = "کار را به پایان رسانده ام.";
          accLable.appendChild(br);
          accInput.appendChild(accLable);
          accptCheck.appendChild(accInput);
          accptCheck.appendChild(accLable);
          slct.appendChild(accptCheck);
          slct.appendChild(workerFile);

          let send = document.createElement("div");
          send.classList.add("send");
          let sendBtn = document.createElement("button");
          sendBtn.classList.add("btn");
          sendBtn.textContent = "ارسال";
          send.appendChild(sendBtn);
          let textSend = document.createElement("textarea");
          textSend.setAttribute("id", "notaccpt");
          textSend.setAttribute("cols", "25");
          textSend.setAttribute("rows", "3");
          textSend.setAttribute("placeholder", "پیغام برای مدیر ...");
          textSend.style.display = "none";
          send.appendChild(textSend);
          accptOrNot.appendChild(slct);
          accptOrNot.appendChild(send);
          setTimeout(() => {
            ticketBox.appendChild(accptOrNot);
          }, 1000);

          ticketBox.appendChild(ticketAnswer);

          let activeInputCheck = false;

          accInput.addEventListener("click", () => {
            if (!activeInputCheck) {
              accInput.classList.add("active-input");
              activeInputCheck = true;
              textSend.style.display = "block";
              workerFile.style.display = "flex";
              sendBtn.classList.add("move-btn");
            } else {
              accInput.classList.remove("active-input");
              workerFile.style.display = "none";
              activeInputCheck = false;
              textSend.style.display = "none";
              sendBtn.classList.remove("move-btn");
            }
          });

          sendBtn.addEventListener("click", () => {
            if (!activeInputCheck) {
              window.alert("ابتدا کار را به پایان برسانید.");
            } else {
              postData(`${IP}/api/v1/workerMessages/create`, {
                ticketId: `${ticket.id}`,
                text: textSend.value,
              }).then((res) => {
                let fileL = document.querySelector("#file").files[0];
                console.log(fileL);
                if (fileL != undefined) {
                  let formData = new FormData();
                  formData.append("pdf", fileL);
                  fetch(`${IP}/api/v1/faultWorkerFiles/upload`, {
                    method: "POST",
                    body: formData,
                  }).then((response) => {
                    response.json().then((data) => {
                      fileId = data.data.id;
                      let newTicket = {
                        faultWorkerFileId: `${fileId}`,
                      };

                      postData(
                        `${IP}/api/v1/tickets/update/${ticket.id}`,
                        newTicket
                      ).then((data) => {
                        if (data.status === "success") {
                          location.assign("/panel");
                        }
                      });
                    });
                  });
                } else {
                  postData(`${IP}/api/v1/tickets/update/${ticket.id}`, {
                    faultWorkerId: null,
                  }).then((data) => {
                    if (data.status === "success") {
                      location.assign("/panel");
                    }
                  });
                }
              });
            }
          });
        } else {
        }
      }

      let firsttime = true;
      let counter = 1;

      function showFactor() {
        const loadFactor = ticket.factors;

        loadFactor.forEach((factor) => {
          if (firsttime) {
            let factore = document.createElement("div");
            factore.classList.add("factore");
            let heeader = document.createElement("div");
            heeader.classList.add("heeader");
            let obj = document.createElement("h5");
            obj.textContent = "شرح کالا";
            heeader.appendChild(obj);
            let num = document.createElement("h5");
            num.textContent = "تعداد";
            heeader.appendChild(num);
            let unit = document.createElement("h5");
            unit.textContent = "واحد";
            heeader.appendChild(unit);
            let tex = document.createElement("h5");
            tex.textContent = "توضیحات";
            heeader.appendChild(tex);
            factore.appendChild(heeader);
            let fileds = document.createElement("div");
            fileds.classList.add("fileds");
            let cntr = document.createElement("h5");
            cntr.textContent = `${counter}-`;
            fileds.appendChild(cntr);
            let objj = document.createElement("input");
            objj.setAttribute("readOnly", true);
            objj.type = "text";
            objj.id = `obj`;
            objj.value = `${factor.name}`;
            fileds.appendChild(objj);
            let val = document.createElement("input");
            val.setAttribute("readOnly", true);
            val.type = "number";
            val.value = `${factor.tedad}`;
            val.id = `val`;
            val.style.width = "10%";
            fileds.appendChild(val);
            let selct = document.createElement("select");
            selct.id = "unit-selector";
            let optF = document.createElement("option");
            optF.textContent = `${factor.vahed}`;
            selct.appendChild(optF);
            fileds.appendChild(selct);
            let text = document.createElement("textarea");
            text.setAttribute("readOnly", true);
            text.id = "factor-info";
            text.setAttribute("cols", 10);
            text.setAttribute("rows", 1);
            text.textContent = `${factor.tozihat}`;
            fileds.appendChild(text);
            factore.appendChild(fileds);
            ticketBox.appendChild(factore);
            counter = counter + 1;
            firsttime = false;
          } else {
            let fileds = document.createElement("div");
            fileds.classList.add("fileds");
            let cntr = document.createElement("h5");
            cntr.textContent = `${counter}-`;
            fileds.appendChild(cntr);
            let obj = document.createElement("input");
            obj.type = "text";
            obj.id = `obj`;
            obj.setAttribute("readOnly", true);
            obj.value = `${factor.name}`;
            fileds.appendChild(obj);
            let val = document.createElement("input");
            val.type = "number";
            val.setAttribute("readOnly", true);
            val.value = `${factor.tedad}`;
            val.id = `val`;
            val.style.width = "10%";
            fileds.appendChild(val);
            let selct = document.createElement("select");
            selct.id = "unit-selector";
            let optF = document.createElement("option");
            optF.textContent = `${factor.vahed}`;
            selct.appendChild(optF);
            fileds.appendChild(selct);
            let text = document.createElement("textarea");
            text.setAttribute("readOnly", true);
            text.id = "factor-info";
            text.setAttribute("cols", 10);
            text.setAttribute("rows", 1);
            text.textContent = `${factor.tozihat}`;
            fileds.appendChild(text);
            let factore = document.querySelector(".factore");
            factore.appendChild(fileds);

            counter = counter + 1;
          }
        });
      }
      setTimeout(() => {
        showFactor();
      }, 500);
    } else if (ticket.status === "proccessing") {
      let ticketAnswer = document.createElement("div");
      ticketAnswer.classList.add("ticket-answer");
      let answer = document.createElement("div");
      answer.classList.add("answer");
      let tytle = document.createElement("h5");
      tytle.textContent = `پرسش و پاسخ: `;
      answer.appendChild(tytle);
      ticket.workerMessage.forEach((answr) => {
        let txtBx = document.createElement("div");
        let time = document.createElement("div");
        if (answr.from == "worker") {
          txtBx.classList.add("client");
          txtBx.id = `${answr.id}`;
          time.classList.add("time-client");
        } else if (answr.from == "boss") {
          txtBx.classList.add("boss");
          time.classList.add("time-boss");
          txtBx.id = `${answr.id}`;
        }
        time.textContent = `${answr.createdAt}`;
        txtBx.textContent = `${answr.text}`;
        txtBx.appendChild(time);
        answer.appendChild(txtBx);
        ticketAnswer.appendChild(answer);

        ticketBox.appendChild(ticketAnswer);
      });

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
              window.alert("زمان  انجام کار شما به  اتمام رسیده.");
            }
          }
        }
      }, 1000);

      if (ticket.acceptedByWorker == null) {
        let accptOrNot = document.createElement("div");
        accptOrNot.classList.add("accpt-fild");
        let slct = document.createElement("div");
        slct.classList.add("select");
        let accptCheck = document.createElement("div");
        let getTime = document.createElement("div");
        let time = document.createElement("input");
        let br = document.createElement("br");
        time.setAttribute("type", "datetime-local");
        time.id = "get-time";
        getTime.style.display = "none";
        let timeLabel = document.createElement("label");
        timeLabel.id = "time-label";
        timeLabel.setAttribute("for", "get-time");
        timeLabel.textContent = "تاریخ پایان کار:";
        getTime.appendChild(timeLabel);
        getTime.appendChild(time);
        let accInput = document.createElement("input");
        accInput.setAttribute("type", "checkbox");
        accInput.id = "accpt";
        accInput.value = "accpt";
        let accLable = document.createElement("label");
        accLable.setAttribute("for", "accpt");
        accLable.textContent = "کار را می پذیرم.";
        accLable.appendChild(br);
        accInput.appendChild(accLable);
        accptCheck.appendChild(accInput);
        accptCheck.appendChild(accLable);
        slct.appendChild(accptCheck);

        let send = document.createElement("div");
        send.classList.add("send");
        let sendBtn = document.createElement("button");
        sendBtn.classList.add("btn");
        sendBtn.textContent = "ارسال";
        send.appendChild(sendBtn);
        send.appendChild(getTime);
        let textSend = document.createElement("textarea");
        textSend.setAttribute("id", "notaccpt");
        textSend.setAttribute("cols", "25");
        textSend.setAttribute("rows", "3");
        textSend.setAttribute("placeholder", "علت قبول نکردن کار...");
        send.appendChild(textSend);
        accptOrNot.appendChild(slct);
        accptOrNot.appendChild(send);
        setTimeout(() => {
          ticketBox.appendChild(accptOrNot);
        }, 1000);

        ticketBox.appendChild(ticketAnswer);

        let activeInputCheck = false;

        accInput.addEventListener("click", () => {
          if (!activeInputCheck) {
            accInput.classList.add("active-input");
            activeInputCheck = true;
            textSend.style.display = "none";
            getTime.style.display = "block";
            sendBtn.classList.add("move-btn");
          } else {
            accInput.classList.remove("active-input");
            getTime.style.display = "none";
            activeInputCheck = false;
            textSend.style.display = "block";
            sendBtn.classList.remove("move-btn");
          }
        });

        sendBtn.addEventListener("click", () => {
          let getTime = document.querySelector("#get-time").value;
          if (activeInputCheck) {
            postData(`${IP}/api/v1/tickets/update/${ticket.id}`, {
              acceptedByWorker: true,
              timer: getTime,
            }).then((data) => {
              location.reload();
            });
          } else {
            if (textSend.value != "") {
              postData(`${IP}/api/v1/workerMessages/create`, {
                ticketId: `${ticket.id}`,
                text: textSend.value,
              }).then((res) => {
                postData(`${IP}/api/v1/tickets/update/${ticket.id}`, {
                  acceptedByWorker: false,
                }).then((res) => {
                  location.assign("/panel");
                });
              });
            }
          }
        });
      } else {
        if (ticket.ticketSigning == "workerFinished") {
        } else {
          let accptOrNot = document.createElement("div");
          accptOrNot.classList.add("accpt-fild");
          let slct = document.createElement("div");
          slct.classList.add("select");
          let workerFile = document.createElement("div");
          workerFile.classList.add("prob-file");
          let workerLi = document.createElement("li");
          let workerTitle = document.createElement("h5");
          workerTitle.textContent = "فایل ضمیمه:";
          let workerSecondTitle = document.createElement("h6");
          workerSecondTitle.textContent = "(pdf با سایز کمتر از 1MB)";
          workerLi.appendChild(workerTitle);
          workerLi.appendChild(workerSecondTitle);
          workerFile.appendChild(workerLi);
          let workerInput = document.createElement("input");
          workerInput.setAttribute("type", "file");
          workerInput.setAttribute("name", "pdf");
          workerInput.id = "file";
          workerInput.style.display = "none";
          let fileCheck = false;

          let fileId;
          workerInput.addEventListener("change", (target) => {
            console.log(target);
            if (
              target.target.files[0].type == "application/pdf" &&
              target.target.files[0].size <= 1000000
            ) {
              document.getElementById("fileError").style.display = "none";
              document.getElementById("uploadLogo").style.display = "none";
              document.getElementById("uploadDone").style.display = "block";
              fileCheck = true;
            } else {
              document.getElementById("uploadDone").style.display = "none";
              document.getElementById("uploadLogo").style.display = "none";
              document.getElementById("fileError").style.display = "block";
              fileCheck = false;
            }
          });
          workerFile.appendChild(workerInput);
          let workerLabel = document.createElement("label");
          workerLabel.id = "file-input";
          workerLabel.setAttribute("for", "file");
          let firstI = document.createElement("i");
          firstI.id = "uploadLogo";
          firstI.classList.add("uil");
          firstI.classList.add("uil-file-upload");
          let secondI = document.createElement("i");
          secondI.id = "uploadDone";
          secondI.classList.add("uil");
          secondI.classList.add("uil-file-check");
          let thirdI = document.createElement("i");
          thirdI.id = "fileError";
          thirdI.classList.add("uil");
          thirdI.classList.add("uil-file-exclamation");
          workerLabel.appendChild(firstI);
          workerLabel.appendChild(secondI);
          workerLabel.appendChild(thirdI);
          workerFile.appendChild(workerLabel);

          let accptCheck = document.createElement("div");
          let br = document.createElement("br");
          let accInput = document.createElement("input");
          accInput.setAttribute("type", "checkbox");
          accInput.id = "accpt";
          accInput.value = "accpt";
          let accLable = document.createElement("label");
          accLable.setAttribute("for", "accpt");
          accLable.textContent = "کار را به پایان رسانده ام.";
          accLable.appendChild(br);
          accInput.appendChild(accLable);
          accptCheck.appendChild(accInput);
          accptCheck.appendChild(accLable);
          slct.appendChild(accptCheck);
          slct.appendChild(workerFile);

          let send = document.createElement("div");
          send.classList.add("send");
          let sendBtn = document.createElement("button");
          sendBtn.classList.add("btn");
          sendBtn.textContent = "ارسال";
          send.appendChild(sendBtn);
          let textSend = document.createElement("textarea");
          textSend.setAttribute("id", "notaccpt");
          textSend.setAttribute("cols", "25");
          textSend.setAttribute("rows", "3");
          textSend.setAttribute("placeholder", "پیغام برای مدیر ...");
          textSend.style.display = "none";
          send.appendChild(textSend);
          accptOrNot.appendChild(slct);
          accptOrNot.appendChild(send);
          setTimeout(() => {
            ticketBox.appendChild(accptOrNot);
          }, 1000);

          ticketBox.appendChild(ticketAnswer);

          let activeInputCheck = false;

          accInput.addEventListener("click", () => {
            if (!activeInputCheck) {
              accInput.classList.add("active-input");
              activeInputCheck = true;
              textSend.style.display = "block";
              workerFile.style.display = "flex";
              sendBtn.classList.add("move-btn");
            } else {
              accInput.classList.remove("active-input");
              workerFile.style.display = "none";
              activeInputCheck = false;
              textSend.style.display = "none";
              sendBtn.classList.remove("move-btn");
            }
          });

          sendBtn.addEventListener("click", () => {
            if (!activeInputCheck) {
              window.alert("ابتدا کار را به پایان برسانید.");
            } else {
              if (textSend.value != "") {
                postData(`${IP}/api/v1/workerMessages/create`, {
                  ticketId: `${ticket.id}`,
                  text: textSend.value,
                }).then((res) => {
                  let fileL = document.querySelector("#file").files[0];
                  let formData = new FormData();
                  formData.append("pdf", fileL);
                  fetch(`${IP}/api/v1/workerFiles/upload`, {
                    method: "POST",
                    body: formData,
                  }).then((response) => {
                    response.json().then((data) => {
                      fileId = data.data.id;
                      let newTicket = {
                        workerFileId: `${fileId}`,
                        ticketSigning: "workerFinished",
                      };

                      postData(
                        `${IP}/api/v1/tickets/update/${ticket.id}`,
                        newTicket
                      ).then((data) => {
                        if (data.status === "success") {
                          location.assign("/panel");
                        }
                      });
                    });
                  });
                });
              }
            }
          });
        }
      }

      let firsttime = true;
      let counter = 1;

      function showFactor() {
        const loadFactor = ticket.factors;

        loadFactor.forEach((factor) => {
          if (firsttime) {
            let factore = document.createElement("div");
            factore.classList.add("factore");
            let heeader = document.createElement("div");
            heeader.classList.add("heeader");
            let obj = document.createElement("h5");
            obj.textContent = "شرح کالا";
            heeader.appendChild(obj);
            let num = document.createElement("h5");
            num.textContent = "تعداد";
            heeader.appendChild(num);
            let unit = document.createElement("h5");
            unit.textContent = "واحد";
            heeader.appendChild(unit);
            let tex = document.createElement("h5");
            tex.textContent = "توضیحات";
            heeader.appendChild(tex);
            factore.appendChild(heeader);
            let fileds = document.createElement("div");
            fileds.classList.add("fileds");
            let cntr = document.createElement("h5");
            cntr.textContent = `${counter}-`;
            fileds.appendChild(cntr);
            let objj = document.createElement("input");
            objj.setAttribute("readOnly", true);
            objj.type = "text";
            objj.id = `obj`;
            objj.value = `${factor.name}`;
            fileds.appendChild(objj);
            let val = document.createElement("input");
            val.setAttribute("readOnly", true);
            val.type = "number";
            val.value = `${factor.tedad}`;
            val.id = `val`;
            val.style.width = "10%";
            fileds.appendChild(val);
            let selct = document.createElement("select");
            selct.id = "unit-selector";
            let optF = document.createElement("option");
            optF.textContent = `${factor.vahed}`;
            selct.appendChild(optF);
            fileds.appendChild(selct);
            let text = document.createElement("textarea");
            text.setAttribute("readOnly", true);
            text.id = "factor-info";
            text.setAttribute("cols", 10);
            text.setAttribute("rows", 1);
            text.textContent = `${factor.tozihat}`;
            fileds.appendChild(text);
            factore.appendChild(fileds);
            ticketBox.appendChild(factore);
            counter = counter + 1;
            firsttime = false;
          } else {
            let fileds = document.createElement("div");
            fileds.classList.add("fileds");
            let cntr = document.createElement("h5");
            cntr.textContent = `${counter}-`;
            fileds.appendChild(cntr);
            let obj = document.createElement("input");
            obj.type = "text";
            obj.id = `obj`;
            obj.setAttribute("readOnly", true);
            obj.value = `${factor.name}`;
            fileds.appendChild(obj);
            let val = document.createElement("input");
            val.type = "number";
            val.setAttribute("readOnly", true);
            val.value = `${factor.tedad}`;
            val.id = `val`;
            val.style.width = "10%";
            fileds.appendChild(val);
            let selct = document.createElement("select");
            selct.id = "unit-selector";
            let optF = document.createElement("option");
            optF.textContent = `${factor.vahed}`;
            selct.appendChild(optF);
            fileds.appendChild(selct);
            let text = document.createElement("textarea");
            text.setAttribute("readOnly", true);
            text.id = "factor-info";
            text.setAttribute("cols", 10);
            text.setAttribute("rows", 1);
            text.textContent = `${factor.tozihat}`;
            fileds.appendChild(text);
            let factore = document.querySelector(".factore");
            factore.appendChild(fileds);

            counter = counter + 1;
          }
        });
      }
      setTimeout(() => {
        showFactor();
      }, 500);
    }

    container.appendChild(ticketBox);
    //function that check the status and change the color of them
    function statusCheck() {
      if (ticket.status == "done") {
        stat.classList.add("done-status");
        return "انجام شده";
      } else if (ticket.status == "proccessing") {
        if (ticket.signedByClient == null) {
          stat.classList.add("done-status");
          return "تایید شده توسط مدیر";
        } else {
          if (ticket.signedByClient == 1) {
            if (ticket.workerId == null) {
              stat.classList.add("done-status");
              return "تایید شده توسط مشتری";
            } else {
              stat.classList.add("proccessing-status");
              return "ارجا به کارشناس";
            }
          } else if (ticket.signedByClient == 0) {
            stat.classList.add("pending-status");
            return "تایید نشده توسط مشتری";
          }
        }
      } else {
        if (ticket.faultWorkerId == null) {
          stat.classList.add("proccessing-status");
          return "درخواست ثبت شده";
        } else {
          if (ticket.faultAcceptedByWorker) {
            if (ticket.faultWorkerFileId === null) {
              stat.classList.add("proccessing-status");
              return "در حال انجام";
            } else {
              stat.classList.add("proccessing-status");
              return "در انتظار تایید مدیر";
            }
          } else {
            stat.classList.add("pending-status");
            return "جدید";
          }
        }
      }
    }

    document.querySelector("#download-file").addEventListener("click", () => {
      window.location.assign(`${IP}/api/v1/files/${ticket.file.id}`);
    });
  }
}

let pathname = location.pathname.slice(11) * 1;

async function tikcetSetup(id) {
  let url = `${IP}/api/v1/tickets/${id}`;
  let data = await getAPI(url);
  data = data.data.ticket;
  //send to the class
  new Ticket(data);
}
//* 234 + 23321
tikcetSetup((pathname - 23321) / 234);

//get data from api function
async function getAPI(data) {
  let apiData = await fetch(data)
    .then((value) => value.json())
    .then((valu) => {
      return valu;
    });
  return apiData;
}

//eventListeners with timeout
async function logout() {
  document.querySelector("#logout").classList.add("logout-active");
  await getAPI(`${IP}/api/v1/users/logout`).then((response) => {
    location.assign("/");
  });
}

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  return response.json(); // parses JSON response into native JavaScript objects
}
