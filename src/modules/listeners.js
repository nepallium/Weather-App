import { getTodayWeather } from "./api";
import uiStuff from "./ui";
import weatherState from "./weatherState";

const form = document.querySelector("form.search");
const inputField = form.querySelector("input#search");
const loader = form.querySelector("div.loader");
const searchBtn = form.querySelector("span.search");

async function querySearch(event) {
    event.preventDefault();

    displayLoader();

    const query = form.querySelector("#search").value;
    const data = await getTodayWeather(query);
    weatherState.data = data;
    console.log(data);
    uiStuff.displayInfo();

    hideLoader();
    
    form.reset();
}

function displayLoader() {
    searchBtn.style.display = "none";
    loader.style.display = "block";
}
function hideLoader() {
    loader.style.display = "none";
    searchBtn.style.display = "block";
}

export function listenForSearch() {
    form.addEventListener("submit", querySearch);

    const searchBtn = form.querySelector("span.search");
    searchBtn.addEventListener("click", (e) => {
        querySearch(e);
    });
}

export function listenForInputClear() {
    form.querySelector("span.clear").addEventListener("click", () => {
        form.reset();
        setTimeout(() => inputField.focus(), 0);
    });
}
