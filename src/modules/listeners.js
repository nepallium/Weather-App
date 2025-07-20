import { getTodayWeather } from "./api";
import uiStuff from "./ui";
import weatherState from "./weatherState";

const form = document.querySelector("form.search");
const inputField = form.querySelector("input#search");
const loader = form.querySelector("div.loader");
const searchBtn = form.querySelector("span.search");

async function querySearch(event) {
    event.preventDefault();

    hideErrorMsg();
    displayLoader();

    const query = form.querySelector("#search").value;

    let data;
    try {
        data = await getTodayWeather(query);
        weatherState.data = data;
        console.log(data);
        uiStuff.displayInfo();
    } catch (e) {
        return;
    } finally {
        hideLoader();
        form.reset();
    }
}

function displayLoader() {
    searchBtn.style.display = "none";
    loader.style.display = "block";
}
function hideLoader() {
    loader.style.display = "none";
    searchBtn.style.display = "block";
}
function hideErrorMsg() {
    const element = document.querySelector("form .error-msg");
    element.style.display = "none";
}

export function listenForSearch() {
    form.addEventListener("submit", querySearch);

    const searchBtn = form.querySelector("span.search");
    searchBtn.addEventListener("click", querySearch);
}

export function listenForInputClear() {
    form.querySelector("span.clear").addEventListener("click", () => {
        form.reset();
        setTimeout(() => inputField.focus(), 0);
    });
}
