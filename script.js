document.addEventListener("DOMContentLoaded", start);

let menuData = [];
let endpoint = "https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json";
let filter = "alle";

function start() {
    console.log("start");
    hentData();

}

async function hentData() {
    console.log("data");
    const response = await fetch(endpoint);
    console.log("response", response);
    menuData = await response.json();
    console.log("menuData", menuData);
    visRetter();
    addEventlistenersToButtons();
}

function addEventlistenersToButtons() {
    console.log("addEventlistenersToButtons");
    document.querySelectorAll(".filter").forEach(elm => {
        elm.addEventListener("click", filtrering);
    })
}

function filtrering() {
    console.log("filtrering");
    filter = this.dataset.kategori;
    document.querySelector("h1").textContent = this.textContent;
    document.querySelectorAll(".filter").forEach(elm => {
        elm.classList.remove("valgt");
    })
    this.classList.add("valgt");
    visRetter();

}


function visRetter() {
    console.log("visRetter");
    const destination = document.querySelector("article");
    const container = document.querySelector("#data-container");
    const retterTemplate = document.querySelector("template");
    container.innerHTML = "";

    menuData.feed.entry.forEach(ret => {
        if (filter == "alle" || filter == ret.gsx$kategori.$t) {
            let klon = retterTemplate.cloneNode(true).content;
            klon.querySelector("h3").textContent = `${ret.gsx$navn.$t}`;
            klon.querySelector("img").src = `imgs/small/${ret.gsx$billede.$t}-sm.jpg`;
            klon.querySelector("p:nth-child(3)").textContent += `${ret.gsx$kort.$t}`;
            klon.querySelector("p:nth-child(4)").textContent += `Pris: ${ret.gsx$pris.$t},-`;

            klon.querySelector("article").addEventListener("click", () => showDetail(ret));

            container.appendChild(klon);


        }


    })

}


function showDetail(ret) {
    const detailContainer = document.querySelector("#detail");

    detail.querySelector("p:nth-child(3)").textContent = "";


    console.log(ret);
    detail.classList.remove("hide");
    detail.querySelector("button").addEventListener("click", () => detail.classList.add("hide"));
    console.log(ret.gsx$navn.$t);
    detail.querySelector("h1").textContent = ret.gsx$navn.$t;
    detail.querySelector("img").src = `imgs/large/${ret.gsx$billede.$t}.jpg`;
    detail.querySelector("img").alt = `imgs/large/${ret.gsx$billede.$t}.jpg`;
    detail.querySelector("p:nth-child(3)").textContent += `Om denne ret: ${ret.gsx$lang.$t}`;



}



// SCRIPT til SEPARAT VISNING AF SINGLE VIEW

//const detailSeparate = document.querySelector("#detail_separate");
//
//const urlParams = new URLSearchParams(window.location.search);
//const id = urlParams.get("id");
//
//function visPersonerSeparate() {
//    console.log("visPersonerSeparate");
//    detailSeparate.querySelector("button").addEventListener("click", () => {
//        history.back;
//    });
//
//
//    menuData.feed.entry.forEach(ret => {
//        if (ret.gsx$id.$t == id) {
//            console.log(ret);
//            console.log(ret.gsx$navn.$t);
//            detailSeparate.querySelector("h1").textContent = ret.gsx$navn.$t;
//
//
//
//
//        }
//
//
//    })
//
//}
