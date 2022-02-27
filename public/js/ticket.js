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
    ticketBox.setAttribute("data-aos-delay", 500);
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
    btn.id = "file";
    btn.classList.add("btn");
    btn.textContent = "دانلود";
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

    let firsttime = true;
    let counter = 1;
    let factorChecking;

    if (ticket.signedByClient) {
      factorChecking = true;
    } else {
      factorChecking = false;
    }

    async function factorCheck() {
      const workerInfo = await getAPI(`${IP}/api/v1/users?role=worker`);
      if (factorChecking) {
        let accptFactor = document.createElement("div");
        accptFactor.classList.add("factor-accepted");
        let resualt = document.createElement("div");
        resualt.classList.add("resualt");
        let resualtHeader = document.createElement("h5");
        resualtHeader.textContent = "فاکتور توسط مشتری تایید شده است.";
        resualt.appendChild(resualtHeader);
        let employeChosse = document.createElement("div");
        employeChosse.classList.add("employe-chosse");
        let employeLi = document.createElement("li");
        let employeTitle = document.createElement("h5");
        employeTitle.textContent = "انتخاب کارشناس مربوطه:";
        employeLi.appendChild(employeTitle);
        let employeSelect = document.createElement("select");
        employeSelect.id = "employe";
        employeSelect.name = "employe";
        workerInfo.data.users.forEach((employe) => {
          let employeOption = document.createElement("option");
          employeOption.value = `${employe.id}`;
          employeOption.textContent = `${employe.firstName} ${employe.lastName}`;
          employeSelect.appendChild(employeOption);
        });
        employeLi.appendChild(employeSelect);
        let textLi = document.createElement("li");
        let textLiTitle = document.createElement("h5");
        textLiTitle.textContent = "متن: ";
        textLi.appendChild(textLiTitle);
        let textArea = document.createElement("textarea");
        textArea.name = "text";
        textArea.id = "employe-text";
        textArea.setAttribute("cols", "25");
        textArea.setAttribute("rows", "4");
        textArea.setAttribute("placeholder", "متن مورد نظر...");
        textLi.appendChild(textArea);
        employeChosse.appendChild(employeLi);
        employeChosse.appendChild(textLi);
        let submitBtn = document.createElement("button");
        submitBtn.classList.add("btn");
        submitBtn.textContent = "ثبت";
        submitBtn.id = "send";

        accptFactor.appendChild(resualt);
        accptFactor.appendChild(employeChosse);
        accptFactor.appendChild(submitBtn);
        ticketBox.appendChild(accptFactor);
        submitBtn.addEventListener("click", () => {
          postData(`${IP}/api/v1/tickets/update/${ticket.id}`, {
            workerId: `${employeSelect.value}`,
            acceptedByWorker: null,
          }).then((res) => {
            if (textArea.valu != "") {
              postData(`${IP}/api/v1/workerMessages/create`, {
                ticketId: ticket.id,
                text: textArea.value,
              }).then(() => {
                location.reload();
              });
            }
          });
        });
      } else {
        let rejectFactor = document.createElement("div");
        rejectFactor.classList.add("factor-reject");
        let resualt = document.createElement("div");
        resualt.classList.add("resualt");
        let resualtHeader = document.createElement("h5");
        resualtHeader.textContent = "فاکتور توسط مشتری تایید نشده است.";
        resualt.appendChild(resualtHeader);
        let bossAnswer = document.createElement("div");
        bossAnswer.classList.add("boss-answer");
        let bossLi = document.createElement("li");
        let bossTitle = document.createElement("h5");
        bossTitle.textContent = "پاسخ مدیر: ";
        bossLi.appendChild(bossTitle);
        let bossTextArea = document.createElement("textarea");
        bossTextArea.name = "boss-answer";
        bossTextArea.id = "answer-boss";
        bossTextArea.setAttribute("cols", "39");
        bossTextArea.setAttribute("rows", "4");
        bossTextArea.setAttribute("placeholder", "متن مورد نظر...");
        bossLi.appendChild(bossTextArea);
        bossAnswer.appendChild(bossLi);
        let buttons = document.createElement("div");
        buttons.classList.add("buttons");
        let submitBtn = document.createElement("button");
        submitBtn.classList.add("btn");
        submitBtn.id = "submit";
        submitBtn.textContent = "ارسال";
        buttons.appendChild(submitBtn);
        let addFactor = document.createElement("button");
        addFactor.classList.add("btn");
        addFactor.id = "add-factor";
        addFactor.textContent = "افزودن فاکتور";
        buttons.appendChild(addFactor);

        rejectFactor.appendChild(resualt);
        rejectFactor.appendChild(bossAnswer);
        rejectFactor.appendChild(buttons);

        ticketBox.appendChild(rejectFactor);
      }
    }

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
          let price = document.createElement("h5");
          price.textContent = "قیمت واحد";
          heeader.appendChild(price);
          let totalPrice = document.createElement("h5");
          totalPrice.textContent = "مبلغ کل";
          heeader.appendChild(totalPrice);
          let tax = document.createElement("h5");
          tax.textContent = "مالیات";
          let taxSpan = document.createElement("span");
          taxSpan.textContent = "(9% مبلغ کل)";
          tax.appendChild(taxSpan);
          heeader.appendChild(tax);
          let totalTaxPrice = document.createElement("h5");
          totalTaxPrice.textContent = "جمع کل";
          heeader.appendChild(totalTaxPrice);
          factore.appendChild(heeader);
          let fileds = document.createElement("div");
          fileds.classList.add("fileds");
          let cntr = document.createElement("h5");
          cntr.textContent = `${counter}-`;
          fileds.appendChild(cntr);
          let objj = document.createElement("input");
          objj.type = "text";
          objj.id = `obj`;
          objj.value = `${factor.name}`;
          fileds.appendChild(objj);
          let val = document.createElement("input");
          val.type = "number";
          val.value = `${factor.tedad}`;
          val.id = `val`;
          val.style.width = "10%";
          fileds.appendChild(val);
          let selct = document.createElement("select");
          selct.id = "unit-selector";
          let optF = document.createElement("option");
          optF.value = "عدد";
          optF.textContent = "عدد";
          selct.appendChild(optF);
          let optS = document.createElement("option");
          optS.value = "متر";
          optS.textContent = "متر";
          selct.appendChild(optS);
          fileds.appendChild(selct);
          let pricee = document.createElement("input");
          pricee.id = "factor-info";
          pricee.textContent = `${factor.tozihat}`;
          let remBtn = document.createElement("button");
          remBtn.classList.add("btn-rem");
          remBtn.textContent = "X";
          remBtn.addEventListener("click", () => {
            remBtn.parentElement.remove();
            counter--;
          });
          fileds.appendChild(pricee);
          fileds.appendChild(remBtn);
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
          obj.value = `${factor.name}`;
          fileds.appendChild(obj);
          let val = document.createElement("input");
          val.type = "number";
          val.value = `${factor.tedad}`;
          val.id = `val`;
          val.style.width = "10%";
          fileds.appendChild(val);
          let selct = document.createElement("select");
          selct.id = "unit-selector";
          let optF = document.createElement("option");
          optF.value = "عدد";
          optF.textContent = "عدد";
          selct.appendChild(optF);
          let optS = document.createElement("option");
          optS.value = "متر";
          optS.textContent = "متر";
          selct.appendChild(optS);
          fileds.appendChild(selct);
          let text = document.createElement("input");
          text.id = "factor-info";
          text.textContent = `${factor.tozihat}`;
          let remBtn = document.createElement("button");
          remBtn.classList.add("btn-rem");
          remBtn.textContent = "X";
          remBtn.addEventListener("click", () => {
            remBtn.parentElement.remove();
            counter--;
          });
          fileds.appendChild(text);
          fileds.appendChild(remBtn);
          let factore = document.querySelector(".factore");
          factore.appendChild(fileds);

          counter = counter + 1;
        }
      });
    }

    if (ticket.status === "pending") {
      if (ticket.faultWorkerId == null) {
        if (ticket.faultAcceptedByWorker) {
          showWorkerMessage();
        }
        let ticketAnswer = document.createElement("div");
        ticketAnswer.classList.add("ticket-answer-boss");
        let answer = document.createElement("div");
        answer.classList.add("answer-boss");
        let tytle = document.createElement("h5");
        tytle.textContent = `پاسخ درخواست: `;
        answer.appendChild(tytle);
        let txtBx = document.createElement("textarea");
        txtBx.id = "boss-answer";
        txtBx.setAttribute("cols", 25);
        txtBx.setAttribute("rows", 3);
        txtBx.setAttribute("placeholder", "پاسخ...");
        answer.appendChild(txtBx);
        ticketAnswer.appendChild(answer);

        let factor = document.createElement("div");
        factor.classList.add("factor");
        let addFactor = document.createElement("button");
        addFactor.classList.add("btn");
        addFactor.id = "add-factor";
        addFactor.textContent = "افزودن فاکتور";
        factor.appendChild(addFactor);
        let submitEmploye = document.createElement("button");
        submitEmploye.classList.add("btn");
        submitEmploye.id = "submitEmploye";
        submitEmploye.textContent = "ارجا به کارشناس";
        factor.appendChild(submitEmploye);
        ticketAnswer.appendChild(factor);
        ticketBox.appendChild(ticketAnswer);
        let submitCus = document.createElement("button");
        submitCus.classList.add("btn");
        submitCus.id = "submit";
        submitCus.textContent = "ارسال به مشتری";
        factor.appendChild(submitCus);

        var Factor = [];

        setTimeout(() => {
          document.querySelector("#file").addEventListener("click", () => {
            location.href = `${IP}/api/v1/files/${ticket.file.id}`;
          });

          let addFactor = document.querySelector("#add-factor");
          let submmit = document.querySelector("#submit");
          let submitEmploye = document.querySelector("#submitEmploye");

          addFactor.addEventListener("click", () => {
            adFactor();
          });

          let cntr = 1;
          let firstTime = false;

          submitEmploye.addEventListener("click", getInfo);
          async function getInfo() {
            firstTime = !firstTime;
            if (firstTime) {
              document.querySelector("#submitEmploye").textContent =
                "انصراف از ارجا";
              const workerInfo = await getAPI(`${IP}/api/v1/users?role=worker`);
              let accptFactor = document.createElement("div");
              accptFactor.classList.add("factor-accepted");
              let resualt = document.createElement("div");
              resualt.classList.add("resualt");
              let resualtHeader = document.createElement("h5");
              resualtHeader.textContent = "فاکتور توسط مشتری تایید شده است.";
              resualt.appendChild(resualtHeader);
              let employeChosse = document.createElement("div");
              employeChosse.classList.add("employe-chosse");
              let employeLi = document.createElement("li");
              let employeTitle = document.createElement("h5");
              employeTitle.textContent = "انتخاب کارشناس مربوطه:";
              employeLi.appendChild(employeTitle);
              let employeSelect = document.createElement("select");
              employeSelect.id = "employe";
              employeSelect.name = "employe";
              workerInfo.data.users.forEach((employe) => {
                let employeOption = document.createElement("option");
                employeOption.value = `${employe.id}`;
                employeOption.textContent = `${employe.firstName} ${employe.lastName}`;
                employeSelect.appendChild(employeOption);
              });
              employeLi.appendChild(employeSelect);
              let textLi = document.createElement("li");
              let textLiTitle = document.createElement("h5");
              textLiTitle.textContent = "متن: ";
              textLi.appendChild(textLiTitle);
              let textArea = document.createElement("textarea");
              textArea.name = "text";
              textArea.id = "employe-text";
              textArea.setAttribute("cols", "25");
              textArea.setAttribute("rows", "4");
              textArea.setAttribute("placeholder", "متن مورد نظر...");
              textLi.appendChild(textArea);
              employeChosse.appendChild(employeLi);
              employeChosse.appendChild(textLi);
              let submitBtn = document.createElement("button");
              submitBtn.classList.add("btn");
              submitBtn.textContent = "ثبت";
              submitBtn.id = "send";

              accptFactor.appendChild(employeChosse);
              accptFactor.appendChild(submitBtn);
              ticketBox.appendChild(accptFactor);

              submitBtn.addEventListener("click", () => {
                let bossAnswer = document.querySelector("#boss-answer").value;
                if (bossAnswer != "") {
                  let bosAnswer = {
                    ticketId: `${ticket.id}`,
                    text: `${bossAnswer}`,
                  };

                  if (bossAnswer != "") {
                    postData(`${IP}/api/v1/messages/create`, bosAnswer).then(
                      (res) => {}
                    );
                  }
                }
                postData(`${IP}/api/v1/tickets/update/${ticket.id}`, {
                  faultWorkerId: `${employeSelect.value}`,
                  faultAcceptedByWorker: null,
                }).then((res) => {
                  if (textArea.value != "") {
                    postData(`${IP}/api/v1/workerMessages/create`, {
                      ticketId: ticket.id,
                      text: textArea.value,
                    }).then(() => {
                      location.reload();
                    });
                  }
                });
              });
            } else {
              document.querySelector(".factor-accepted").remove();
              document.querySelector("#submitEmploye").textContent =
                "ارجا به کارشناس";
            }
          }
          submmit.addEventListener("click", () => {
            let bossAnswer = document.querySelector("#boss-answer").value;
            console.log(bossAnswer);
            let fieldsObj = document.querySelectorAll(".fileds");
            fieldsObj.forEach((element) => {
              let objct = element.querySelectorAll("#obj");
              objct.forEach((elmnt) => {
                let val = element.querySelectorAll("#val");
                val.forEach((varElmnt) => {
                  let unit = element.querySelectorAll("#unit-selector");
                  unit.forEach((unitElmnt) => {
                    let factorText = element.querySelectorAll("#factor-info");
                    factorText.forEach((textElmnt) => {
                      let factorRes = {
                        ticketId: `${ticket.id}`,
                        name: `${elmnt.value}`,
                        tedad: `${varElmnt.value}`,
                        vahed: `${unitElmnt.value}`,
                        tozihat: `${textElmnt.value}`,
                      };
                      cntr = cntr + 1;
                      Factor.push(factorRes);
                    });
                  });
                });
              });
            });
            let bosAnswer = {
              ticketId: `${ticket.id}`,
              text: `${bossAnswer}`,
            };
            console.log(bosAnswer);
            if (bossAnswer != "") {
              postData(`${IP}/api/v1/messages/create`, bosAnswer).then(
                (res) => {
                  console.log(res);
                }
              );
            }
            postData(`${IP}/api/v1/factor/create`, Factor).then((res) => {
              console.log(res);
            });
            postData(`${IP}/api/v1/tickets/update/${ticket.id}`, {
              status: "proccessing",
            }).then((res) => {
              location.assign("/panel");
            });
            console.log(Factor);
          });
        }, 1000);
      } else {
        if (ticket.faultWorkerFileId === null) {
          showMessage();
          showWorkerMessage();
        } else {
          showMessage();
          showWorkerMessage();
          acceptByBoss();
        }
      }
    } else if (ticket.status === "proccessing") {
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

      if (ticket.signedByClient == null) {
        setTimeout(() => {
          showMessage();
          showFactor();
          document.querySelector("#file").addEventListener("click", () => {
            location.href = `${IP}/api/v1/files/${ticket.file.id}`;
          });
        }, 500);
      } else if (!ticket.signedByClient) {
        setTimeout(() => {
          showMessage();
          showFactor();
          factorCheck();
        }, 500);

        var Factor = [];

        setTimeout(() => {
          document.querySelector("#file").addEventListener("click", () => {
            location.href = `${IP}/api/v1/files/${ticket.file.id}`;
          });

          let addFactor = document.querySelector("#add-factor");
          let submmit = document.querySelector("#submit");

          addFactor.addEventListener("click", () => {
            adFactor();
          });

          let cntr = 1;
          submmit.addEventListener("click", () => {
            let bossAnswer = document.querySelector("#answer-boss").value;
            console.log(bossAnswer);
            let fieldsObj = document.querySelectorAll(".fileds");
            fieldsObj.forEach((element) => {
              let objct = element.querySelectorAll("#obj");
              objct.forEach((elmnt) => {
                let val = element.querySelectorAll("#val");
                val.forEach((varElmnt) => {
                  let unit = element.querySelectorAll("#unit-selector");
                  unit.forEach((unitElmnt) => {
                    let factorText = element.querySelectorAll("#factor-info");
                    factorText.forEach((textElmnt) => {
                      let factorRes = {
                        ticketId: `${ticket.id}`,
                        name: `${elmnt.value}`,
                        tedad: `${varElmnt.value}`,
                        vahed: `${unitElmnt.value}`,
                        tozihat: `${textElmnt.value}`,
                      };
                      cntr = cntr + 1;
                      Factor.push(factorRes);
                    });
                  });
                });
              });
            });
            let bosAnswer = {
              ticketId: `${ticket.id}`,
              text: `${bossAnswer}`,
            };
            postData(`${IP}/api/v1/tickets/update/${ticket.id}`, {
              signedByClient: null,
            }).then((res) => {
              console.log(res);
            });
            if (bossAnswer != "") {
              postData(`${IP}/api/v1/messages/create`, bosAnswer).then(
                (res) => {}
              );
            }
            postData(`${IP}/api/v1/factor/create`, Factor).then((res) => {
              location.assign("/");
            });
          });
        }, 1000);
      } else {
        if (ticket.workerId == null) {
          setTimeout(() => {
            showMessage();
            showFactor();
            factorCheck();
            document.querySelector("#file").addEventListener("click", () => {
              location.href = `${IP}/api/v1/files/${ticket.file.id}`;
            });
          }, 500);
        } else {
          if (ticket.ticketSigning == "workerFinished") {
            setTimeout(() => {
              showMessage();
              showFactor();
              showWorkerMessage();
              acceptByBoss();

              document.querySelector("#file").addEventListener("click", () => {
                location.href = `${IP}/api/v1/files/${ticket.file.id}`;
              });
            }, 500);
          } else if (ticket.ticketSigning == "notFinished") {
            setTimeout(() => {
              showMessage();
              showFactor();
              showWorkerMessage();

              document.querySelector("#file").addEventListener("click", () => {
                location.href = `${IP}/api/v1/files/${ticket.file.id}`;
              });
            }, 500);
          }
        }
      }
    } else {
      setTimeout(() => {
        showMessage();
        showFactor();
        showWorkerMessage();
        finalResualt();

        document.querySelector("#file").addEventListener("click", () => {
          location.href = `${IP}/api/v1/files/${ticket.file.id}`;
        });
      }, 500);
    }

    function finalResualt() {
      let finalRes = document.createElement("div");
      finalRes.classList.add("final-res");
      let finalTitle = document.createElement("h4");
      finalTitle.textContent = "نتیجه نهایی:";
      finalRes.appendChild(finalTitle);
      let file = document.createElement("h5");
      file.textContent = `فایل نهایی: `;
      let btn = document.createElement("button");
      btn.id = "file-worker";
      btn.classList.add("btn");
      btn.textContent = "دانلود";
      file.appendChild(btn);
      finalRes.appendChild(file);

      ticketBox.appendChild(finalRes);

      setTimeout(() => {
        if (ticket.faultWorkerFileId === null) {
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

    function acceptByBoss() {
      let accptOrNot = document.createElement("div");
      accptOrNot.classList.add("accpt-fild");
      let slct = document.createElement("div");
      let file = document.createElement("h5");
      slct.classList.add("select");
      file.textContent = `فایل ضمیمه: `;
      let btn = document.createElement("button");
      btn.id = "file-worker";
      btn.classList.add("btn");
      btn.textContent = "دانلود";
      file.appendChild(btn);
      slct.appendChild(file);
      let accptCheck = document.createElement("div");
      let accInput = document.createElement("input");
      accInput.setAttribute("type", "checkbox");
      accInput.id = "accpt";
      accInput.value = "accpt";
      let accLable = document.createElement("label");
      accLable.setAttribute("for", "accpt");
      accLable.textContent = "فایل را تایید می کنم.";
      let br = document.createElement("br");
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
      let textSend = document.createElement("textarea");
      textSend.setAttribute("id", "notaccpt");
      textSend.setAttribute("cols", "25");
      textSend.setAttribute("rows", "3");
      textSend.setAttribute("placeholder", "علت تایید نکرد...");
      send.appendChild(textSend);
      accptOrNot.appendChild(slct);
      accptOrNot.appendChild(send);
      setTimeout(() => {
        ticketBox.appendChild(accptOrNot);
      }, 1000);

      let activeInputCheck = false;

      accInput.addEventListener("click", () => {
        if (!activeInputCheck) {
          accInput.classList.add("active-input");
          file.style.display = "none";
          activeInputCheck = true;
          textSend.style.display = "none";
          sendBtn.classList.add("move-btn");
          sendBtn.style.marginTop = "0";
        } else {
          file.style.display = "block";
          accInput.classList.remove("active-input");
          activeInputCheck = false;
          textSend.style.display = "block";
          sendBtn.classList.remove("move-btn");
          sendBtn.style.marginTop = "10px";
        }
      });

      sendBtn.addEventListener("click", () => {
        if (ticket.faultWorkerFileId === null) {
          if (activeInputCheck) {
            postData(`${IP}/api/v1/tickets/update/${ticket.id}`, {
              status: "done",
              ticketSigning: "bossFinished",
            }).then((data) => {
              location.assign("/");
            });
          } else {
            postData(`${IP}/api/v1/tickets/update/${ticket.id}`, {
              ticketSigning: "notFinished",
            }).then((data) => {
              if (textSend.value != "") {
                postData(`${IP}/api/v1/workerMessages/create`, {
                  ticketId: ticket.id,
                  text: textSend.value,
                }).then(() => {
                  fetch(
                    `${IP}/api/v1/faultWorkerFiles/${ticket.workerFileId}`,
                    {
                      method: "DELETE",
                    }
                  ).then((response) => {
                    console.log(response);

                    location.reload();
                  });
                });
              }
            });
          }
        } else {
          if (activeInputCheck) {
            postData(`${IP}/api/v1/tickets/update/${ticket.id}`, {
              status: "done",
              ticketSigning: "bossFinished",
            }).then((data) => {
              location.assign("/");
            });
          } else {
            postData(`${IP}/api/v1/tickets/update/${ticket.id}`, {
              faultWorkerFileId: null,
            }).then((data) => {
              if (textSend.value != "") {
                postData(`${IP}/api/v1/workerMessages/create`, {
                  ticketId: ticket.id,
                  text: textSend.value,
                }).then(() => {
                  fetch(
                    `${IP}/api/v1/faultWorkerFiles/${ticket.faultWorkerFileId}`,
                    {
                      method: "DELETE",
                    }
                  ).then((response) => {
                    console.log(response);

                    location.reload();
                  });
                });
              }
            });
          }
        }
      });

      setTimeout(() => {
        if (ticket.faultWorkerFileId === null) {
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

      ticketBox.appendChild(accptOrNot);
    }

    function showMessage() {
      if (ticket.message != null) {
        let ticketAnswer = document.createElement("div");
        ticketAnswer.classList.add("ticket-answer");
        let answer = document.createElement("div");
        answer.classList.add("answer");
        let tytle = document.createElement("h5");
        tytle.textContent = `گفتگو: (مشتری)`;
        answer.appendChild(tytle);
        ticket.message.forEach((answr) => {
          if (answr.text != "") {
            let txtBx = document.createElement("div");
            let time = document.createElement("div");
            if (answr.from == "client") {
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
          }
        });
        ticketBox.appendChild(ticketAnswer);
      }
    }

    function showWorkerMessage() {
      if (ticket.workerMessage != null) {
        let ticketAnswer = document.createElement("div");
        ticketAnswer.classList.add("ticket-answer");
        let answer = document.createElement("div");
        answer.classList.add("answer");
        let tytle = document.createElement("h5");
        tytle.textContent = `گفتگو: (کارشناس)`;
        answer.appendChild(tytle);
        ticket.workerMessage.forEach((answr) => {
          if (answr.text != "") {
            let txtBx = document.createElement("div");
            let time = document.createElement("div");
            if (answr.from == "worker") {
              txtBx.classList.add("worker");
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
          }
        });
        ticketBox.appendChild(ticketAnswer);
      }
    }

    function adFactor() {
      if (firsttime) {
        console.log(counter);
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
        let price = document.createElement("h5");
        price.textContent = "قیمت واحد";
        heeader.appendChild(price);
        let totalPrice = document.createElement("h5");
        totalPrice.textContent = "مبلغ کل";
        heeader.appendChild(totalPrice);
        let tax = document.createElement("h5");
        tax.textContent = "مالیات";
        let taxSpan = document.createElement("span");
        taxSpan.textContent = "(9% مبلغ کل)";
        tax.appendChild(taxSpan);
        heeader.appendChild(tax);
        let totalTaxPrice = document.createElement("h5");
        totalTaxPrice.textContent = "جمع کل";
        heeader.appendChild(totalTaxPrice);
        factore.appendChild(heeader);
        let fileds = document.createElement("div");
        fileds.classList.add("fileds");
        let cntr = document.createElement("h5");
        cntr.textContent = `${counter}-`;
        fileds.appendChild(cntr);
        let objj = document.createElement("input");
        objj.type = "text";
        objj.id = `obj`;
        fileds.appendChild(objj);
        let val = document.createElement("input");
        val.type = "number";
        val.value = 1;
        val.id = `i${counter + 1}`;
        val.style.width = "10%";
        fileds.appendChild(val);
        let selct = document.createElement("select");
        selct.id = "unit-selector";
        let optF = document.createElement("option");
        optF.value = "عدد";
        optF.textContent = "عدد";
        selct.appendChild(optF);
        let optS = document.createElement("option");
        optS.value = "متر";
        optS.textContent = "متر";
        selct.appendChild(optS);
        fileds.appendChild(selct);
        let pricee = document.createElement("input");
        pricee.id = `i${counter}`;

        setTimeout(() => {
          let priceInput = document.querySelector(`#i${counter - 1}`);
          let amountt = document.querySelector(`#i${counter}`);

          priceInput.addEventListener("keyup", () => {
            let amount = document.querySelector(`#i${counter}`).value;
            let price = document.querySelector(`#i${counter - 1}`).value;
            let totalprice = document.querySelector(`#i${counter + 1}`).value;
            let totaltax = document.querySelector(`#i${counter + 2}`).value;
            let tax = document.querySelector(`#i${counter + 3}`).value;

            document.querySelector(`#i${counter + 1}`).value = amount * price;
            totalprice = amount * price;
            document.querySelector(`#i${counter + 3}`).value =
              totalprice * 0.09;
            tax = totalprice * 0.09;
            document.querySelector(`#i${counter + 2}`).value =
              parseInt(tax) + parseInt(totalprice);
          });
          amountt.addEventListener("keyup", () => {
            let amount = document.querySelector(`#i${counter}`).value;
            let price = document.querySelector(`#i${counter - 1}`).value;
            let totalprice = document.querySelector(`#i${counter + 1}`).value;
            let totaltax = document.querySelector(`#i${counter + 2}`).value;
            let tax = document.querySelector(`#i${counter + 3}`).value;

            document.querySelector(`#i${counter + 1}`).value = amount * price;
            totalprice = amount * price;
            document.querySelector(`#i${counter + 3}`).value =
              totalprice * 0.09;
            tax = totalprice * 0.09;
            document.querySelector(`#i${counter + 2}`).value =
              parseInt(tax) + parseInt(totalprice);
          });
        }, 1000);
        let tottalPrice = document.createElement("input");
        tottalPrice.id = `i${counter + 2}`;
        let taxx = document.createElement("input");
        taxx.id = `i${counter + 4}`;
        taxx.value = 0;
        let totalTax = document.createElement("input");
        totalTax.id = `i${counter + 3}`;
        totalTax.value = 0;
        let remBtn = document.createElement("button");
        remBtn.classList.add("btn-rem");
        remBtn.textContent = "X";
        remBtn.addEventListener("click", () => {
          remBtn.parentElement.remove();
          counter--;
          if (counter == 1) {
            document.querySelector(".factore").remove();
            firsttime = true;
          }
        });
        fileds.appendChild(pricee);
        fileds.appendChild(tottalPrice);
        fileds.appendChild(taxx);
        fileds.appendChild(totalTax);
        fileds.appendChild(remBtn);
        factore.appendChild(fileds);
        ticketBox.appendChild(factore);
        counter = counter + 1;
        document.querySelector("#add-factor").textContent = "افزودن کالا";
        firsttime = false;
      } else {
        console.log(counter);
        let fileds = document.createElement("div");
        fileds.classList.add("fileds");
        let cntr = document.createElement("h5");
        cntr.textContent = `${counter}-`;
        fileds.appendChild(cntr);
        let obj = document.createElement("input");
        obj.type = "text";
        obj.id = `obj`;
        fileds.appendChild(obj);
        let val = document.createElement("input");
        val.type = "number";
        val.value = 1;
        val.id = `i${counter + 1}`;
        val.style.width = "10%";
        fileds.appendChild(val);
        let selct = document.createElement("select");
        selct.id = "unit-selector";
        let optF = document.createElement("option");
        optF.value = "عدد";
        optF.textContent = "عدد";
        selct.appendChild(optF);
        let optS = document.createElement("option");
        optS.value = "متر";
        optS.textContent = "متر";
        selct.appendChild(optS);
        fileds.appendChild(selct);
        let pricee = document.createElement("input");
        pricee.id = `i${counter}`;

        setTimeout(() => {
          let priceInput = document.querySelector(`#i${counter - 1}`);
          let amountt = document.querySelector(`#i${counter}`);

          priceInput.addEventListener("keyup", () => {
            let amount = document.querySelector(`#i${counter}`).value;
            let price = document.querySelector(`#i${counter - 1}`).value;
            let totalprice = document.querySelector(`#i${counter + 1}`).value;
            let totaltax = document.querySelector(`#i${counter + 2}`).value;
            let tax = document.querySelector(`#i${counter + 3}`).value;

            document.querySelector(`#i${counter + 1}`).value = amount * price;
            totalprice = amount * price;
            document.querySelector(`#i${counter + 3}`).value =
              totalprice * 0.09;
            tax = totalprice * 0.09;
            document.querySelector(`#i${counter + 2}`).value =
              parseInt(tax) + parseInt(totalprice);
          });
          amountt.addEventListener("keyup", () => {
            let amount = document.querySelector(`#i${counter}`).value;
            let price = document.querySelector(`#i${counter - 1}`).value;
            let totalprice = document.querySelector(`#i${counter + 1}`).value;
            let totaltax = document.querySelector(`#i${counter + 2}`).value;
            let tax = document.querySelector(`#i${counter + 3}`).value;

            document.querySelector(`#i${counter + 1}`).value = amount * price;
            totalprice = amount * price;
            document.querySelector(`#i${counter + 3}`).value =
              totalprice * 0.09;
            tax = totalprice * 0.09;
            document.querySelector(`#i${counter + 2}`).value =
              parseInt(tax) + parseInt(totalprice);
          });
        }, 1000);
        let tottalPrice = document.createElement("input");
        tottalPrice.id = `i${counter + 2}`;
        let taxx = document.createElement("input");
        taxx.id = `i${counter + 4}`;
        taxx.value = 0;
        let totalTax = document.createElement("input");
        totalTax.id = `i${counter + 3}`;
        totalTax.value = 0;
        let remBtn = document.createElement("button");
        remBtn.classList.add("btn-rem");
        remBtn.textContent = "X";
        remBtn.addEventListener("click", () => {
          remBtn.parentElement.remove();
          counter--;
          if (counter == 1) {
            document.querySelector(".factore").remove();
            firsttime = true;
          }
        });
        let factore = document.querySelector(".factore");

        fileds.appendChild(pricee);
        fileds.appendChild(tottalPrice);
        fileds.appendChild(taxx);
        fileds.appendChild(totalTax);
        fileds.appendChild(remBtn);
        factore.appendChild(fileds);
        factore.appendChild(fileds);

        counter = counter + 1;
      }

      function ToRial(str) {
        str = String(str);
        str = str.replace(/\,/g, "");
        var objRegex = new RegExp("(-?[0-9]+)([0-9]{3})");

        while (objRegex.test(str)) {
          str = str.replace(objRegex, "$1,$2");
        }

        return str;
      }
    }

    container.appendChild(ticketBox);
    //function that check the status and change the color of them
    function statusCheck() {
      if (ticket.status == "done") {
        stat.classList.add("done-status");
        return "انجام شده";
      } else if (ticket.status == "pending") {
        if (ticket.faultWorkerId == null) {
          if (ticket.faultAcceptedByWorker == false) {
            stat.classList.add("pending-status");
            return "تایید نشده توسط کارشناس";
          } else {
            stat.classList.add("pending-status");
            return "جدید";
          }
        } else {
          if (ticket.faultAcceptedByWorker) {
            if (ticket.faultWorkerFileId === null) {
              stat.classList.add("proccessing-status");
              return "در حال برسی توسط کارشناس";
            } else {
              stat.classList.add("done-status");
              return "تکمیل شده توسط کارشناس";
            }
          } else if (ticket.faultAcceptedByWorker == false) {
            stat.classList.add("pending-status");
            return "تایید نشده توسط کارشناس";
          } else {
            stat.classList.add("proccessing-status");
            return "در انظار تایید کارشناس";
          }
        }
      } else {
        if (ticket.signedByClient == null) {
          stat.classList.add("proccessing-status");
          stat.style.color = "orange";
          return "در انتظار تایید مشتری";
        } else if (ticket.signedByClient) {
          if (ticket.workerId == null) {
            stat.classList.add("proccessing-status");
            stat.style.color = "green";
            return "تایید شده توسط مشتری";
          } else {
            if (ticket.acceptedByWorker) {
              if (ticket.ticketSigning == "workerFinished") {
                stat.classList.add("proccessing-status");
                stat.style.color = "green";
                return "انجام شده توسط کارشناس";
              } else {
                stat.classList.add("proccessing-status");
                stat.style.color = "orange";
                return "در حال انجام توسط کارشناس";
              }
            } else {
              stat.classList.add("proccessing-status");
              stat.style.color = "orange";
              return "در انتظار تایید کارشناس";
            }
          }
        } else {
          stat.classList.add("proccessing-status");
          stat.style.color = "red";
          return "تایید نشده توسط مشتری";
        }
      }
    }
  }
}

let pathname = location.pathname.slice(5) * 1;

async function tikcetSetup(id) {
  let url = `${IP}/api/v1/tickets/${id}`;
  let data = await getAPI(url);
  data = data.data.ticket;
  //send to the class
  new Ticket(data);
}

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
async function logout() {
  document.querySelector("#logout").classList.add("logout-active");
  await getAPI(`${IP}/api/v1/users/logout`).then((response) => {
    location.assign("/");
  });
}
