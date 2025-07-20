export default function handleError(e, errCode, query) {
    if (errCode === 400) {
        displaySearchError(query)
    }

    throw e;
}

export function displaySearchError(query) {
    const element = document.querySelector("form .error-msg");
    element.style.display = "inline";

    element.textContent = `"${query}" was not found.`
}
