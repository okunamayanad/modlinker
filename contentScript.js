let style = document.createElement("style");
style.innerHTML = `
.loading-anim-modrinth{
    transform: translateY(64px) !important;
}

.button-modrinth{
    transition: all 0.5s cubic-bezier(0.460, 0.010, 0.000, 1.000) !important;
}
.button-modrinth:hover{
    transform: translateY(-70px) !important;
}
.button-modrinth:active{
    transform: translateY(-66px) !important;
}

.button-modrinth-valid{
    box-shadow: inset 0px 0px 0px 1px #1db96a;
}
.button-modrinth-valid:hover{
    box-shadow: inset 0px 0px 0px 2px #1db96a;
}

.button-modrinth-warning{
    box-shadow: inset 0px 0px 0px 1px #ffa347;
}
.button-modrinth-warning:hover{
    box-shadow: inset 0px 0px 0px 2px #ffa347;
}

.button-modrinth-error{
    box-shadow: inset 0px 0px 0px 1px #ff496e;
}
.button-modrinth-error{
    box-shadow: inset 0px 0px 0px 1px #ff496e;
}`;
document.head.appendChild(style);

let whiteTheme = window.getComputedStyle(document.body).getPropertyValue('background').includes("rgb(255, 255, 255)")
console.log("whiteTheme: " + whiteTheme);
console.log(window.getComputedStyle(document.body).getPropertyValue('background'))

function addModrinthButton(doesModrinthExist, projectName, result, doesModrinthThrowError, isCurseforge) {
    let modrinthLink;
    let validColor = "#1bd96a",
        warningColor = "#ffa347",
        errorColor = "#ff496e";
    if (doesModrinthExist) {
        modrinthLink = "https://modrinth.com/mod/" + projectName;
    } else {
        modrinthLink = "https://modrinth.com/mods?q=" + projectName;
    }
    console.log("modrinthLink", modrinthLink);

    // add the button to the result
    let parent = result.querySelector("a")
    // <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" clip-rule="evenodd" viewBox="0 0 3307 593" class="text-logo" aria-hidden="true" data-v-4efc4064=""><path fill-rule="nonzero" d="M1053.02 205.51c35.59 0 64.27 10.1 84.98 30.81 20.72 21.25 31.34 52.05 31.34 93.48v162.53h-66.4V338.3c0-24.96-5.3-43.55-16.46-56.3-11.15-12.22-26.55-18.6-47.27-18.6-22.3 0-40.37 7.45-53.65 21.79-13.27 14.87-20.18 36.11-20.18 63.2v143.94h-66.4V338.3c0-24.96-5.3-43.55-16.46-56.3-11.15-12.22-26.56-18.6-47.27-18.6-22.84 0-40.37 7.45-53.65 21.79-13.27 14.34-20.18 35.58-20.18 63.2v143.94h-66.4V208.7h63.21v36.12c10.63-12.75 23.9-22.3 39.84-29.21 15.93-6.9 33.46-10.1 53.11-10.1 21.25 0 40.37 3.72 56.84 11.69 16.46 8.5 29.21 20.18 38.77 35.59 11.69-14.88 26.56-26.56 45.15-35.06 18.59-7.97 38.77-12.22 61.08-12.22Zm329.84 290.54c-28.68 0-54.7-6.37-77.54-18.59a133.19 133.19 0 0 1-53.65-52.05c-13.28-21.78-19.65-46.74-19.65-74.9 0-28.14 6.37-53.1 19.65-74.88a135.4 135.4 0 0 1 53.65-51.53c22.84-12.21 48.86-18.59 77.54-18.59 29.22 0 55.24 6.38 78.08 18.6 22.84 12.21 40.9 29.74 54.18 51.52 12.75 21.77 19.12 46.74 19.12 74.89s-6.37 53.11-19.12 74.89c-13.28 22.3-31.34 39.83-54.18 52.05-22.84 12.22-48.86 18.6-78.08 18.6Zm0-56.83c24.44 0 44.62-7.97 60.55-24.43 15.94-16.47 23.9-37.72 23.9-64.27 0-26.56-7.96-47.8-23.9-64.27-15.93-16.47-36.11-24.43-60.55-24.43-24.43 0-44.61 7.96-60.02 24.43-15.93 16.46-23.9 37.71-23.9 64.27 0 26.55 7.97 47.8 23.9 64.27 15.4 16.46 35.6 24.43 60.02 24.43Zm491.32-341v394.11h-63.74v-36.65a108.02 108.02 0 0 1-40.37 30.28c-16.46 6.9-34 10.1-53.65 10.1-27.08 0-51.52-5.85-73.3-18.07-21.77-12.21-39.3-29.21-51.52-51.52-12.21-21.78-18.59-47.27-18.59-75.95s6.38-54.18 18.6-75.96c12.21-21.77 29.74-38.77 51.52-50.99 21.77-12.21 46.2-18.06 73.3-18.06 18.59 0 36.11 3.2 51.52 9.56a106.35 106.35 0 0 1 39.83 28.69V98.22h66.4Zm-149.79 341c15.94 0 30.28-3.72 43.03-11.16 12.74-6.9 22.83-17.52 30.27-30.8 7.44-13.28 11.15-29.21 11.15-46.74s-3.71-33.46-11.15-46.74c-7.44-13.28-17.53-23.9-30.27-31.34-12.75-6.9-27.1-10.62-43.03-10.62s-30.27 3.71-43.02 10.62c-12.75 7.43-22.84 18.06-30.28 31.34-7.43 13.28-11.15 29.2-11.15 46.74 0 17.53 3.72 33.46 11.15 46.74 7.44 13.28 17.53 23.9 30.28 30.8 12.75 7.44 27.09 11.16 43.02 11.16Zm298.51-189.09c19.12-29.74 52.58-44.62 100.92-44.62v63.21a84.29 84.29 0 0 0-15.4-1.6c-26.03 0-46.22 7.44-60.56 22.32-14.34 15.4-21.78 37.18-21.78 65.33v137.56h-66.39V208.7h63.2v41.43Zm155.63-41.43h66.39v283.63h-66.4V208.7Zm33.46-46.74c-12.22 0-22.31-3.72-30.28-11.68a37.36 37.36 0 0 1-12.21-28.16c0-11.15 4.25-20.71 12.21-28.68 7.97-7.43 18.06-11.15 30.28-11.15 12.21 0 22.3 3.72 30.27 10.62 7.97 7.44 12.22 16.47 12.22 27.62 0 11.69-3.72 21.25-11.69 29.21-7.96 7.97-18.59 12.22-30.8 12.22Zm279.38 43.55c35.59 0 64.27 10.63 86.05 31.34 21.78 20.72 32.4 52.05 32.4 92.95v162.53h-66.4V338.3c0-24.96-5.84-43.55-17.52-56.3-11.69-12.22-28.15-18.6-49.93-18.6-24.43 0-43.55 7.45-57.9 21.79-14.34 14.87-21.24 36.11-21.24 63.73v143.41h-66.4V208.7h63.21v36.65c11.16-13.28 24.97-22.84 41.43-29.74 16.47-6.9 35.59-10.1 56.3-10.1Zm371.81 271.42a78.34 78.34 0 0 1-28.15 14.34 130.83 130.83 0 0 1-35.6 4.78c-31.33 0-55.23-7.97-72.23-24.43-17-16.47-25.5-39.84-25.5-71.17V263.94h-46.73v-53.11h46.74v-64.8h66.4v64.8h75.95v53.11h-75.96v134.91c0 13.81 3.19 24.43 10.1 31.34 6.9 7.44 16.46 11.15 29.2 11.15 14.88 0 27.1-3.71 37.19-11.68l18.59 47.27Zm214.05-271.42c35.59 0 64.27 10.63 86.05 31.34 21.77 20.72 32.4 52.05 32.4 92.95v162.53h-66.4V338.3c0-24.96-5.84-43.55-17.53-56.3-11.68-12.22-28.15-18.6-49.92-18.6-24.44 0-43.56 7.45-57.9 21.79-14.34 14.87-21.24 36.11-21.24 63.73v143.41h-66.4V98.23h66.4v143.4c11.15-11.68 24.43-20.71 40.9-27.09 15.93-5.84 33.99-9.03 53.64-9.03Z" fill="currentColor" data-v-4efc4064=""></path><g fill="var(--color-brand)" data-v-4efc4064=""><path d="m29 424.4 188.2-112.95-17.15-45.48 53.75-55.21 67.93-14.64 19.67 24.21-31.32 31.72-27.3 8.6-19.52 20.05 9.56 26.6 19.4 20.6 27.36-7.28 19.47-21.38 42.51-13.47 12.67 28.5-43.87 53.78-73.5 23.27-32.97-36.7L55.06 467.94C46.1 456.41 35.67 440.08 29 424.4Zm543.03-230.25-149.5 40.32c8.24 21.92 10.95 34.8 13.23 49l149.23-40.26c-2.38-15.94-6.65-32.17-12.96-49.06Z" data-v-4efc4064=""></path><path d="M51.28 316.13c10.59 125 115.54 223.3 243.27 223.3 96.51 0 180.02-56.12 219.63-137.46l48.61 16.83c-46.78 101.34-149.35 171.75-268.24 171.75C138.6 590.55 10.71 469.38 0 316.13h51.28ZM.78 265.24C15.86 116.36 141.73 0 294.56 0c162.97 0 295.28 132.31 295.28 295.28 0 26.14-3.4 51.49-9.8 75.63l-48.48-16.78a244.28 244.28 0 0 0 7.15-58.85c0-134.75-109.4-244.15-244.15-244.15-124.58 0-227.49 93.5-242.32 214.11H.8Z" class="ring ring--large" data-v-4efc4064=""></path><path d="M293.77 153.17c-78.49.07-142.2 63.83-142.2 142.34 0 78.56 63.79 142.34 142.35 142.34 3.98 0 7.93-.16 11.83-.49l14.22 49.76a194.65 194.65 0 0 1-26.05 1.74c-106.72 0-193.36-86.64-193.36-193.35 0-106.72 86.64-193.35 193.36-193.35 2.64 0 5.28.05 7.9.16l-8.05 50.85Zm58.2-42.13c78.39 24.67 135.3 97.98 135.3 184.47 0 80.07-48.77 148.83-118.2 178.18l-14.17-49.55c48.08-22.85 81.36-71.89 81.36-128.63 0-60.99-38.44-113.07-92.39-133.32l8.1-51.15Z" class="ring ring--small" data-v-4efc4064=""></path></g></svg>

    let aContainer = document.createElement("div");
    aContainer.setAttribute("style", "transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); !important; display: flex;vertical-align: middle; height:0; justify-content: flex-end; transform: translateY(0px); opacity: 1; gap: 10px;");
    aContainer.classList.add("loading-anim-modrinth");

    var modrinthButton = document.createElement("a");
    modrinthButton.setAttribute("href", modrinthLink)
    modrinthButton.classList.add("button-modrinth");
    modrinthButton.setAttribute("style", "max-width: 120px; padding: 5px; border-radius: 5px; width: auto;height: 20px;display: block; transform: translateY(-64px);");

    let modrinthSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    modrinthSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    modrinthSvg.setAttribute("xml:space", "preserve");
    modrinthSvg.setAttribute("fill-rule", "evenodd");
    modrinthSvg.setAttribute("stroke-linejoin", "round");
    modrinthSvg.setAttribute("stroke-miterlimit", "2");
    modrinthSvg.setAttribute("clip-rule", "evenodd");
    modrinthSvg.setAttribute("viewBox", "0 0 3307 593");
    modrinthSvg.setAttribute("aria-hidden", "true");
    modrinthSvg.setAttribute("data-v-4efc4064", "");
    modrinthSvg.setAttribute("class", "text-logo");
    modrinthSvg.setAttribute("style", "width: auto;height: 20px;");

    let modrinthPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    modrinthPath.setAttribute("fill-rule", "nonzero");
    modrinthPath.setAttribute("d", "M1053.02 205.51c35.59 0 64.27 10.1 84.98 30.81 20.72 21.25 31.34 52.05 31.34 93.48v162.53h-66.4V338.3c0-24.96-5.3-43.55-16.46-56.3-11.15-12.22-26.55-18.6-47.27-18.6-22.3 0-40.37 7.45-53.65 21.79-13.27 14.87-20.18 36.11-20.18 63.2v143.94h-66.4V338.3c0-24.96-5.3-43.55-16.46-56.3-11.15-12.22-26.56-18.6-47.27-18.6-22.84 0-40.37 7.45-53.65 21.79-13.27 14.34-20.18 35.58-20.18 63.2v143.94h-66.4V208.7h63.21v36.12c10.63-12.75 23.9-22.3 39.84-29.21 15.93-6.9 33.46-10.1 53.11-10.1 21.25 0 40.37 3.72 56.84 11.69 16.46 8.5 29.21 20.18 38.77 35.59 11.69-14.88 26.56-26.56 45.15-35.06 18.59-7.97 38.77-12.22 61.08-12.22Zm329.84 290.54c-28.68 0-54.7-6.37-77.54-18.59a133.19 133.19 0 0 1-53.65-52.05c-13.28-21.78-19.65-46.74-19.65-74.9 0-28.14 6.37-53.1 19.65-74.88a135.4 135.4 0 0 1 53.65-51.53c22.84-12.21 48.86-18.59 77.54-18.59 29.22 0 55.24 6.38 78.08 18.6 22.84 12.21 40.9 29.74 54.18 51.52 12.75 21.77 19.12 46.74 19.12 74.89s-6.37 53.11-19.12 74.89c-13.28 22.3-31.34 39.83-54.18 52.05-22.84 12.22-48.86 18.6-78.08 18.6Zm0-56.83c24.44 0 44.62-7.97 60.55-24.43 15.94-16.47 23.9-37.72 23.9-64.27 0-26.56-7.96-47.8-23.9-64.27-15.93-16.47-36.11-24.43-60.55-24.43-24.43 0-44.61 7.96-60.02 24.43-15.93 16.46-23.9 37.71-23.9 64.27 0 26.55 7.97 47.8 23.9 64.27 15.4 16.46 35.6 24.43 60.02 24.43Zm491.32-341v394.11h-63.74v-36.65a108.02 108.02 0 0 1-40.37 30.28c-16.46 6.9-34 10.1-53.65 10.1-27.08 0-51.52-5.85-73.3-18.07-21.77-12.21-39.3-29.21-51.52-51.52-12.21-21.78-18.59-47.27-18.59-75.95s6.38-54.18 18.6-75.96c12.21-21.77 29.74-38.77 51.52-50.99 21.77-12.21 46.2-18.06 73.3-18.06 18.59 0 36.11 3.2 51.52 9.56a106.35 106.35 0 0 1 39.83 28.69V98.22h66.4Zm-149.79 341c15.94 0 30.28-3.72 43.03-11.16 12.74-6.9 22.83-17.52 30.27-30.8 7.44-13.28 11.15-29.21 11.15-46.74s-3.71-33.46-11.15-46.74c-7.44-13.28-17.53-23.9-30.27-31.34-12.75-6.9-27.1-10.62-43.03-10.62s-30.27 3.71-43.02 10.62c-12.75 7.43-22.84 18.06-30.28 31.34-7.43 13.28-11.15 29.2-11.15 46.74 0 17.53 3.72 33.46 11.15 46.74 7.44 13.28 17.53 23.9 30.28 30.8 12.75 7.44 27.09 11.16 43.02 11.16Zm298.51-189.09c19.12-29.74 52.58-44.62 100.92-44.62v63.21a84.29 84.29 0 0 0-15.4-1.6c-26.03 0-46.22 7.44-60.56 22.32-14.34 15.4-21.78 37.18-21.78 65.33v137.56h-66.39V208.7h63.2v41.43Zm155.63-41.43h66.39v283.63h-66.4V208.7Zm33.46-46.74c-12.22 0-22.31-3.72-30.28-11.68a37.36 37.36 0 0 1-12.21-28.16c0-11.15 4.25-20.71 12.21-28.68 7.97-7.43 18.06-11.15 30.28-11.15 12.21 0 22.3 3.72 30.27 10.62 7.97 7.44 12.22 16.47 12.22 27.62 0 11.69-3.72 21.25-11.69 29.21-7.96 7.97-18.59 12.22-30.8 12.22Zm279.38 43.55c35.59 0 64.27 10.63 86.05 31.34 21.78 20.72 32.4 52.05 32.4 92.95v162.53h-66.4V338.3c0-24.96-5.84-43.55-17.52-56.3-11.69-12.22-28.15-18.6-49.93-18.6-24.43 0-43.55 7.45-57.9 21.79-14.34 14.87-21.24 36.11-21.24 63.73v143.41h-66.4V208.7h63.21v36.65c11.16-13.28 24.97-22.84 41.43-29.74 16.47-6.9 35.59-10.1 56.3-10.1Zm371.81 271.42a78.34 78.34 0 0 1-28.15 14.34 130.83 130.83 0 0 1-35.6 4.78c-31.33 0-55.23-7.97-72.23-24.43-17-16.47-25.5-39.84-25.5-71.17V263.94h-46.73v-53.11h46.74v-64.8h66.4v64.8h75.95v53.11h-75.96v134.91c0 13.81 3.19 24.43 10.1 31.34 6.9 7.44 16.46 11.15 29.2 11.15 14.88 0 27.1-3.71 37.19-11.68l18.59 47.27Zm214.05-271.42c35.59 0 64.27 10.63 86.05 31.34 21.77 20.72 32.4 52.05 32.4 92.95v162.53h-66.4V338.3c0-24.96-5.84-43.55-17.53-56.3-11.68-12.22-28.15-18.6-49.92-18.6-24.44 0-43.56 7.45-57.9 21.79-14.34 14.87-21.24 36.11-21.24 63.73v143.41h-66.4V98.23h66.4v143.4c11.15-11.68 24.43-20.71 40.9-27.09 15.93-5.84 33.99-9.03 53.64-9.03Z");
    modrinthPath.setAttribute("fill", whiteTheme ? "black": "white"); 

    let modrinthG = document.createElementNS("http://www.w3.org/2000/svg", "g");
    modrinthG.setAttribute("fill", "#26292f");

    if (doesModrinthExist) {
        modrinthG.setAttribute("fill", validColor);
        modrinthButton.classList.add("button-modrinth-valid");
    } else if (doesModrinthThrowError) {
        modrinthG.setAttribute("fill", errorColor);
        modrinthButton.classList.add("button-modrinth-error");
    } else {
        console.log("got a warning here");
        modrinthG.setAttribute("fill", warningColor);
        modrinthButton.classList.add("button-modrinth-warning");
    }
    modrinthG.setAttribute("data-v-4efc4064", "");

    let modrinthPath2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    modrinthPath2.setAttribute("d", "m29 424.4 188.2-112.95-17.15-45.48 53.75-55.21 67.93-14.64 19.67 24.21-31.32 31.72-27.3 8.6-19.52 20.05 9.56 26.6 19.4 20.6 27.36-7.28 19.47-21.38 42.51-13.47 12.67 28.5-43.87 53.78-73.5 23.27-32.97-36.7L55.06 467.94C46.1 456.41 35.67 440.08 29 424.4Zm543.03-230.25-149.5 40.32c8.24 21.92 10.95 34.8 13.23 49l149.23-40.26c-2.38-15.94-6.65-32.17-12.96-49.06Z");
    modrinthPath2.setAttribute("data-v-4efc4064", "");

    let modrinthPath3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    modrinthPath3.setAttribute("d", "M51.28 316.13c10.59 125 115.54 223.3 243.27 223.3 96.51 0 180.02-56.12 219.63-137.46l48.61 16.83c-46.78 101.34-149.35 171.75-268.24 171.75C138.6 590.55 10.71 469.38 0 316.13h51.28ZM.78 265.24C15.86 116.36 141.73 0 294.56 0c162.97 0 295.28 132.31 295.28 295.28 0 26.14-3.4 51.49-9.8 75.63l-48.48-16.78a244.28 244.28 0 0 0 7.15-58.85c0-134.75-109.4-244.15-244.15-244.15-124.58 0-227.49 93.5-242.32 214.11H.8Z");
    modrinthPath3.setAttribute("data-v-4efc4064", "");

    let modrinthPath4 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    modrinthPath4.setAttribute("d", "M293.77 153.17c-78.49.07-142.2 63.83-142.2 142.34 0 78.56 63.79 142.34 142.35 142.34 3.98 0 7.93-.16 11.83-.49l14.22 49.76a194.65 194.65 0 0 1-26.05 1.74c-106.72 0-193.36-86.64-193.36-193.35 0-106.72 86.64-193.35 193.36-193.35 2.64 0 5.28.05 7.9.16l-8.05 50.85Zm58.2-42.13c78.39 24.67 135.3 97.98 135.3 184.47 0 80.07-48.77 148.83-118.2 178.18l-14.17-49.55c48.08-22.85 81.36-71.89 81.36-128.63 0-60.99-38.44-113.07-92.39-133.32l8.1-51.15Z");
    modrinthPath4.setAttribute("data-v-4efc4064", "");

    parent.appendChild(aContainer);

    aContainer.appendChild(modrinthButton);

    modrinthButton.appendChild(modrinthSvg);

    modrinthSvg.appendChild(modrinthPath);
    modrinthSvg.appendChild(modrinthG);

    modrinthG.appendChild(modrinthPath2);
    modrinthG.appendChild(modrinthPath3);
    modrinthG.appendChild(modrinthPath4);

    console.log("parent", parent);
    console.log("button", modrinthButton);
    // wait 10ms for the button to be added to the DOM
    return (aContainer);

}

(async () => {
    function forwardRequest(message) {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage(["checkIfExists", message, new XMLHttpRequest()], (response) => {
                return resolve(response)
            })
        })
    }
    // find all children of #rso
    var results = document.getElementById("rso").children;
    console.log("results", results);

    for (var i = 0; i < results.length; i++) {
        var result = results[i];
        if (result.tagName !== "DIV") continue;
        console.log(result);
        var link = await waitForElm(result, "a");
        // get the href
        var href = link.getAttribute("href");

        if (href?.includes("curseforge") && href?.includes("mc-mods")) {
            console.log("found curseforge link", href);
            // get the project name
            let linkArgs = href.split("/");
            // remove first 2 args
            linkArgs = linkArgs.slice(2);
            console.log("args", linkArgs); // 
            // ["www.curseforge.com",
            //     "minecraft",
            //     "search?asjdkfhasdkljh" or "mc-mods", "project-name"]
            var projectName;
            if (linkArgs[2].includes("search")) {
                // search?class=mc-mods&page=1&pageSize=20&search=project-name&sortType=1
                projectName = linkArgs[2]
                    .split("&")[3]
                    .split("=")[1];
            } else {
                projectName = linkArgs[3];
            }
            console.log("projectName: ", projectName);
            // Modrinth: https://modrinth.com/mod/<project-name>
            // check if modrinth link exists
            let doesModrinthThrowError;
            var doesModrinthExist = await forwardRequest("https://api.modrinth.com/v2/project/" + projectName).catch(err => {
                console.log("error", err);
                if (err.statusCode !== 404) { doesModrinthThrowError = True }
                return false;
            });
            let aContainer = addModrinthButton(doesModrinthExist, projectName, result, doesModrinthThrowError, true);
            await new Promise(resolve => setTimeout(resolve, 10));
            aContainer.classList.remove("loading-anim-modrinth");
        } else if (href?.includes("9minecraft") && !href?.includes("shader") && (href?.includes("-mod/") || href?.includes("-api/"))) {
            console.log("found 9minecraft link", href);
            let linkArgs = href.split("/");
            linkArgs = linkArgs.slice(3);
            var projectName = linkArgs[0].slice(0, -4);
            console.log("projectName ", projectName)
            var doesModrinthExist = await forwardRequest("https://api.modrinth.com/v2/project/" + projectName).catch(err => {
                console.log("error", err);
                if (err.statusCode !== 404) { doesModrinthThrowError = True }
                return false;
            });
            let aContainer = addModrinthButton(doesModrinthExist, projectName, result, false);
            await new Promise(resolve => setTimeout(resolve, 10));
            aContainer.classList.remove("loading-anim-modrinth");
        } else if (href?.includes("planetminecraft") && (href?.includes("/mod/") || href?.includes("/data-pack/"))) {
            console.log("found pmc link", href);
            let linkArgs = href.split("/");
            linkArgs = linkArgs.slice(4);
            var projectName = linkArgs[0]
            console.log("projectName ", projectName)
            var doesModrinthExist = await forwardRequest("https://api.modrinth.com/v2/project/" + projectName).catch(err => {
                console.log("error", err);
                if (err.statusCode !== 404) { doesModrinthThrowError = True }
                return false;
            });
            let aContainer = addModrinthButton(doesModrinthExist, projectName, result, false);
            await new Promise(resolve => setTimeout(resolve, 10));
            aContainer.classList.remove("loading-anim-modrinth");
        } else if (href?.includes("mc-mod.net") && (href?.includes("-mod/") || href?.includes("-api/"))) {
            console.log("found mcmod link", href);
            let linkArgs = href.split("/");
            linkArgs = linkArgs.slice(3);
            var projectName = linkArgs[0].slice(0, -4);
            console.log("projectName ", projectName)
            var doesModrinthExist = await forwardRequest("https://api.modrinth.com/v2/project/" + projectName).catch(err => {
                console.log("error", err);
                if (err.statusCode !== 404) { doesModrinthThrowError = True }
                return false;
            });
            let aContainer = addModrinthButton(doesModrinthExist, projectName, result, false);
            await new Promise(resolve => setTimeout(resolve, 10));
            aContainer.classList.remove("loading-anim-modrinth");
        } else {
            console.log("not found link", href);
        }
    }

    async function waitForElm(parent, selector) {
        console.log("result:", parent.querySelector(selector));
        console.log("waiting for element", selector, "in", parent);
        return new Promise(resolve => {
            const element = parent.querySelector(selector);
            if (element) {
                return resolve(element);
            }

            var waitingElmInterval = setInterval(() => {
                const element = parent.querySelector(selector);
                console.log("element", element);
                if (element) {
                    resolve(element);
                    clearInterval(waitingElmInterval);
                }
                if (document.readyState === "complete") {
                    const pageLoadedElm = parent.querySelector(selector);
                    if (pageLoadedElm) return resolve(pageLoadedElm);
                    return resolve(1);
                }
            }, 10);
        });
    }
})()
// .catch(err => {
//     console.log("error", err);
// })
