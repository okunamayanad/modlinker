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
`;
document.head.appendChild(style);

function addModrinthButton(doesModrinthExist, projectName, result, doesModrinthThrowError, isCurseforge) {
    let modrinthLink;
    let curserinthLink = "https://curserinth.kuylar.dev/mod/mod__" + projectName //https://curserinth.kuylar.dev/mod/mod__inmis
    let validColor = "#1bd96a",
        waringColor = "#ffa347",
        errorColor = "#ff496e";
    if (doesModrinthExist) {
        modrinthLink = "https://modrinth.com/mod/" + projectName;
    } else {
        modrinthLink = "https://modrinth.com/mods?q=" + projectName;
    }
    console.log("modrinthLink", modrinthLink);

    // add the button to the result
    let parent = result.querySelector("div > div > div.kb0PBd.cvP2Ce.jGGQ5e > div > div")
    // <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" clip-rule="evenodd" viewBox="0 0 3307 593" class="text-logo" aria-hidden="true" data-v-4efc4064=""><path fill-rule="nonzero" d="M1053.02 205.51c35.59 0 64.27 10.1 84.98 30.81 20.72 21.25 31.34 52.05 31.34 93.48v162.53h-66.4V338.3c0-24.96-5.3-43.55-16.46-56.3-11.15-12.22-26.55-18.6-47.27-18.6-22.3 0-40.37 7.45-53.65 21.79-13.27 14.87-20.18 36.11-20.18 63.2v143.94h-66.4V338.3c0-24.96-5.3-43.55-16.46-56.3-11.15-12.22-26.56-18.6-47.27-18.6-22.84 0-40.37 7.45-53.65 21.79-13.27 14.34-20.18 35.58-20.18 63.2v143.94h-66.4V208.7h63.21v36.12c10.63-12.75 23.9-22.3 39.84-29.21 15.93-6.9 33.46-10.1 53.11-10.1 21.25 0 40.37 3.72 56.84 11.69 16.46 8.5 29.21 20.18 38.77 35.59 11.69-14.88 26.56-26.56 45.15-35.06 18.59-7.97 38.77-12.22 61.08-12.22Zm329.84 290.54c-28.68 0-54.7-6.37-77.54-18.59a133.19 133.19 0 0 1-53.65-52.05c-13.28-21.78-19.65-46.74-19.65-74.9 0-28.14 6.37-53.1 19.65-74.88a135.4 135.4 0 0 1 53.65-51.53c22.84-12.21 48.86-18.59 77.54-18.59 29.22 0 55.24 6.38 78.08 18.6 22.84 12.21 40.9 29.74 54.18 51.52 12.75 21.77 19.12 46.74 19.12 74.89s-6.37 53.11-19.12 74.89c-13.28 22.3-31.34 39.83-54.18 52.05-22.84 12.22-48.86 18.6-78.08 18.6Zm0-56.83c24.44 0 44.62-7.97 60.55-24.43 15.94-16.47 23.9-37.72 23.9-64.27 0-26.56-7.96-47.8-23.9-64.27-15.93-16.47-36.11-24.43-60.55-24.43-24.43 0-44.61 7.96-60.02 24.43-15.93 16.46-23.9 37.71-23.9 64.27 0 26.55 7.97 47.8 23.9 64.27 15.4 16.46 35.6 24.43 60.02 24.43Zm491.32-341v394.11h-63.74v-36.65a108.02 108.02 0 0 1-40.37 30.28c-16.46 6.9-34 10.1-53.65 10.1-27.08 0-51.52-5.85-73.3-18.07-21.77-12.21-39.3-29.21-51.52-51.52-12.21-21.78-18.59-47.27-18.59-75.95s6.38-54.18 18.6-75.96c12.21-21.77 29.74-38.77 51.52-50.99 21.77-12.21 46.2-18.06 73.3-18.06 18.59 0 36.11 3.2 51.52 9.56a106.35 106.35 0 0 1 39.83 28.69V98.22h66.4Zm-149.79 341c15.94 0 30.28-3.72 43.03-11.16 12.74-6.9 22.83-17.52 30.27-30.8 7.44-13.28 11.15-29.21 11.15-46.74s-3.71-33.46-11.15-46.74c-7.44-13.28-17.53-23.9-30.27-31.34-12.75-6.9-27.1-10.62-43.03-10.62s-30.27 3.71-43.02 10.62c-12.75 7.43-22.84 18.06-30.28 31.34-7.43 13.28-11.15 29.2-11.15 46.74 0 17.53 3.72 33.46 11.15 46.74 7.44 13.28 17.53 23.9 30.28 30.8 12.75 7.44 27.09 11.16 43.02 11.16Zm298.51-189.09c19.12-29.74 52.58-44.62 100.92-44.62v63.21a84.29 84.29 0 0 0-15.4-1.6c-26.03 0-46.22 7.44-60.56 22.32-14.34 15.4-21.78 37.18-21.78 65.33v137.56h-66.39V208.7h63.2v41.43Zm155.63-41.43h66.39v283.63h-66.4V208.7Zm33.46-46.74c-12.22 0-22.31-3.72-30.28-11.68a37.36 37.36 0 0 1-12.21-28.16c0-11.15 4.25-20.71 12.21-28.68 7.97-7.43 18.06-11.15 30.28-11.15 12.21 0 22.3 3.72 30.27 10.62 7.97 7.44 12.22 16.47 12.22 27.62 0 11.69-3.72 21.25-11.69 29.21-7.96 7.97-18.59 12.22-30.8 12.22Zm279.38 43.55c35.59 0 64.27 10.63 86.05 31.34 21.78 20.72 32.4 52.05 32.4 92.95v162.53h-66.4V338.3c0-24.96-5.84-43.55-17.52-56.3-11.69-12.22-28.15-18.6-49.93-18.6-24.43 0-43.55 7.45-57.9 21.79-14.34 14.87-21.24 36.11-21.24 63.73v143.41h-66.4V208.7h63.21v36.65c11.16-13.28 24.97-22.84 41.43-29.74 16.47-6.9 35.59-10.1 56.3-10.1Zm371.81 271.42a78.34 78.34 0 0 1-28.15 14.34 130.83 130.83 0 0 1-35.6 4.78c-31.33 0-55.23-7.97-72.23-24.43-17-16.47-25.5-39.84-25.5-71.17V263.94h-46.73v-53.11h46.74v-64.8h66.4v64.8h75.95v53.11h-75.96v134.91c0 13.81 3.19 24.43 10.1 31.34 6.9 7.44 16.46 11.15 29.2 11.15 14.88 0 27.1-3.71 37.19-11.68l18.59 47.27Zm214.05-271.42c35.59 0 64.27 10.63 86.05 31.34 21.77 20.72 32.4 52.05 32.4 92.95v162.53h-66.4V338.3c0-24.96-5.84-43.55-17.53-56.3-11.68-12.22-28.15-18.6-49.92-18.6-24.44 0-43.56 7.45-57.9 21.79-14.34 14.87-21.24 36.11-21.24 63.73v143.41h-66.4V98.23h66.4v143.4c11.15-11.68 24.43-20.71 40.9-27.09 15.93-5.84 33.99-9.03 53.64-9.03Z" fill="currentColor" data-v-4efc4064=""></path><g fill="var(--color-brand)" data-v-4efc4064=""><path d="m29 424.4 188.2-112.95-17.15-45.48 53.75-55.21 67.93-14.64 19.67 24.21-31.32 31.72-27.3 8.6-19.52 20.05 9.56 26.6 19.4 20.6 27.36-7.28 19.47-21.38 42.51-13.47 12.67 28.5-43.87 53.78-73.5 23.27-32.97-36.7L55.06 467.94C46.1 456.41 35.67 440.08 29 424.4Zm543.03-230.25-149.5 40.32c8.24 21.92 10.95 34.8 13.23 49l149.23-40.26c-2.38-15.94-6.65-32.17-12.96-49.06Z" data-v-4efc4064=""></path><path d="M51.28 316.13c10.59 125 115.54 223.3 243.27 223.3 96.51 0 180.02-56.12 219.63-137.46l48.61 16.83c-46.78 101.34-149.35 171.75-268.24 171.75C138.6 590.55 10.71 469.38 0 316.13h51.28ZM.78 265.24C15.86 116.36 141.73 0 294.56 0c162.97 0 295.28 132.31 295.28 295.28 0 26.14-3.4 51.49-9.8 75.63l-48.48-16.78a244.28 244.28 0 0 0 7.15-58.85c0-134.75-109.4-244.15-244.15-244.15-124.58 0-227.49 93.5-242.32 214.11H.8Z" class="ring ring--large" data-v-4efc4064=""></path><path d="M293.77 153.17c-78.49.07-142.2 63.83-142.2 142.34 0 78.56 63.79 142.34 142.35 142.34 3.98 0 7.93-.16 11.83-.49l14.22 49.76a194.65 194.65 0 0 1-26.05 1.74c-106.72 0-193.36-86.64-193.36-193.35 0-106.72 86.64-193.35 193.36-193.35 2.64 0 5.28.05 7.9.16l-8.05 50.85Zm58.2-42.13c78.39 24.67 135.3 97.98 135.3 184.47 0 80.07-48.77 148.83-118.2 178.18l-14.17-49.55c48.08-22.85 81.36-71.89 81.36-128.63 0-60.99-38.44-113.07-92.39-133.32l8.1-51.15Z" class="ring ring--small" data-v-4efc4064=""></path></g></svg>

    let aContainer = document.createElement("div");
    aContainer.setAttribute("style", "transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); !important; display: flex;vertical-align: middle; height:0; justify-content: flex-end; transform: translateY(0px); opacity: 1; gap: 10px;");
    aContainer.classList.add("loading-anim-modrinth");

    var modrinthButton = document.createElement("a");
    modrinthButton.setAttribute("href", modrinthLink)
    modrinthButton.classList.add("button-modrinth");
    modrinthButton.setAttribute("style", "max-width: 120px; padding: 5px; border-radius: 5px; width: auto;height: 20px;display: block; transform: translateY(-64px);");

    var curserinthButton = document.createElement("a");
    curserinthButton.setAttribute("href", curserinthLink)
    curserinthButton.classList.add("button-modrinth");
    curserinthButton.setAttribute("style", "max-width: 120px; padding: 5px; border-radius: 5px; width: auto;height: 20px;display: block; transform: translateY(-64px);");

    let curserinthSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    curserinthSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    curserinthSvg.setAttribute("aria-hidden", "true");
    curserinthSvg.setAttribute("width", "110px");
    curserinthSvg.setAttribute("height", "15px");
    curserinthSvg.setAttribute("viewBox", "0 0 207 31");
    curserinthSvg.setAttribute("style", "padding:2.5px 5px;");

    // stroke-linecap="round" fill-rule="evenodd" font-size="9pt" stroke="#000000" stroke-width="0" fill="#ffffff" style="stroke:#000000;stroke-width:0;fill:#ffffff;"
    let curserinthG = document.createElementNS("http://www.w3.org/2000/svg", "g");
    curserinthG.setAttribute("id", "svgGroup");
    curserinthG.setAttribute("stroke-linecap", "round");
    curserinthG.setAttribute("fill-rule", "evenodd");
    curserinthG.setAttribute("font-size", "9pt");
    curserinthG.setAttribute("stroke", "#000000");
    curserinthG.setAttribute("stroke-width", "0");
    curserinthG.setAttribute("fill", "#ffffff");
    curserinthG.setAttribute("style", "stroke:#000000;stroke-width:0;fill:#ffffff;width:100%;height:auto;");

    let curserinthPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    curserinthPath.setAttribute("d", "M 191.64 0 L 191.64 8.12 A 24.896 24.896 0 0 1 191.565 10.079 A 22.94 22.94 0 0 1 191.56 10.14 Q 191.484 11.071 191.408 11.695 A 20.503 20.503 0 0 1 191.4 11.76 L 191.68 11.76 Q 192.72 10.08 194.46 9.28 Q 196.2 8.48 198.24 8.48 Q 200.946 8.48 202.749 9.433 A 6.091 6.091 0 0 1 204.06 10.36 A 5.692 5.692 0 0 1 205.51 12.613 Q 205.848 13.538 205.986 14.685 A 14.084 14.084 0 0 1 206.08 16.36 L 206.08 30.4 L 201.88 30.4 L 201.88 16.96 Q 201.88 12.625 198.596 12.019 A 6.368 6.368 0 0 0 197.44 11.92 A 8.68 8.68 0 0 0 195.823 12.06 Q 193.791 12.446 192.88 13.9 A 6.986 6.986 0 0 0 192.113 15.665 Q 191.862 16.528 191.744 17.573 A 17.815 17.815 0 0 0 191.64 19.56 L 191.64 30.4 L 187.4 30.4 L 187.4 0 L 191.64 0 Z M 111.16 1.84 L 119.16 1.84 Q 124.64 1.84 127.26 3.88 Q 129.853 5.899 129.88 9.995 A 13.101 13.101 0 0 1 129.88 10.08 Q 129.88 12.022 129.242 13.418 A 5.678 5.678 0 0 1 129.06 13.78 A 7.585 7.585 0 0 1 127.648 15.643 A 6.948 6.948 0 0 1 126.96 16.22 Q 125.68 17.16 124.28 17.72 L 132.28 30.4 L 127.32 30.4 L 120.44 18.84 L 115.48 18.84 L 115.48 30.4 L 111.16 30.4 L 111.16 1.84 Z M 20.56 25.84 L 20.56 29.56 Q 18.88 30.2 17.14 30.5 Q 15.646 30.758 13.694 30.794 A 35.105 35.105 0 0 1 13.04 30.8 A 17.6 17.6 0 0 1 9.954 30.544 Q 7.56 30.118 5.76 28.98 A 11.14 11.14 0 0 1 1.509 24.014 A 13.461 13.461 0 0 1 1.44 23.86 A 16.684 16.684 0 0 1 0.296 19.91 A 23.105 23.105 0 0 1 0 16.12 A 20.085 20.085 0 0 1 0.392 12.065 A 15.654 15.654 0 0 1 1.58 8.48 Q 3.16 5.16 6.2 3.3 A 12.255 12.255 0 0 1 10.17 1.771 Q 11.784 1.44 13.64 1.44 Q 15.8 1.44 17.86 1.9 Q 19.92 2.36 21.64 3.2 L 20.04 6.8 A 24.088 24.088 0 0 0 17.817 5.919 A 27.881 27.881 0 0 0 17.02 5.66 A 11.461 11.461 0 0 0 13.825 5.162 A 12.84 12.84 0 0 0 13.6 5.16 A 9.98 9.98 0 0 0 10.683 5.565 A 7.63 7.63 0 0 0 6.92 8.1 A 9.968 9.968 0 0 0 5.083 11.711 Q 4.665 13.172 4.558 14.915 A 20.178 20.178 0 0 0 4.52 16.16 Q 4.52 19.87 5.715 22.427 A 9.3 9.3 0 0 0 6.76 24.16 A 7.189 7.189 0 0 0 10.997 26.809 A 11.391 11.391 0 0 0 13.56 27.08 A 18.123 18.123 0 0 0 16.861 26.786 A 16.732 16.732 0 0 0 17.1 26.74 Q 18.8 26.4 20.56 25.84 Z M 40.56 8.84 L 44.8 8.84 L 44.8 30.4 L 41.4 30.4 L 40.8 27.56 L 40.6 27.56 Q 39.56 29.24 37.72 30.02 Q 35.88 30.8 33.84 30.8 A 12.333 12.333 0 0 1 31.641 30.616 Q 29.415 30.213 28.04 28.92 A 5.706 5.706 0 0 1 26.605 26.674 Q 26.04 25.128 26.04 22.96 L 26.04 8.84 L 30.32 8.84 L 30.32 22.32 A 8.343 8.343 0 0 0 30.514 24.207 Q 31.114 26.781 33.57 27.227 A 6.22 6.22 0 0 0 34.68 27.32 Q 36.681 27.32 37.941 26.608 A 3.813 3.813 0 0 0 39.28 25.36 A 6.807 6.807 0 0 0 40.085 23.572 Q 40.337 22.725 40.456 21.702 A 16.94 16.94 0 0 0 40.56 19.76 L 40.56 8.84 Z M 165.56 16.36 L 165.56 30.4 L 161.36 30.4 L 161.36 16.96 Q 161.36 12.625 158.076 12.019 A 6.368 6.368 0 0 0 156.92 11.92 Q 154.972 11.92 153.74 12.595 A 3.712 3.712 0 0 0 152.36 13.88 Q 151.126 15.83 151.12 19.484 A 21.741 21.741 0 0 0 151.12 19.52 L 151.12 30.4 L 146.88 30.4 L 146.88 8.84 L 150.24 8.84 L 150.84 11.72 L 151.08 11.72 Q 152.12 10.04 153.94 9.24 Q 155.76 8.44 157.8 8.44 Q 160.482 8.44 162.269 9.396 A 6.032 6.032 0 0 1 163.56 10.32 Q 165.56 12.2 165.56 16.36 Z M 67.12 29.48 L 67.12 25.76 A 16.74 16.74 0 0 0 68.543 26.367 Q 69.302 26.652 70.17 26.908 A 28.124 28.124 0 0 0 70.42 26.98 Q 72.32 27.52 74.12 27.52 Q 76.52 27.52 77.58 26.76 A 2.613 2.613 0 0 0 78.285 26.028 Q 78.624 25.488 78.639 24.789 A 3.041 3.041 0 0 0 78.64 24.72 Q 78.64 24 78.24 23.42 A 2.403 2.403 0 0 0 77.922 23.054 Q 77.497 22.646 76.74 22.22 A 12.942 12.942 0 0 0 75.975 21.825 Q 75.132 21.422 73.925 20.955 A 50.107 50.107 0 0 0 73.52 20.8 Q 71.928 20.157 70.722 19.525 A 19.437 19.437 0 0 1 70.02 19.14 A 7.491 7.491 0 0 1 68.834 18.301 A 5.653 5.653 0 0 1 67.84 17.18 A 4.272 4.272 0 0 1 67.259 15.829 Q 67.08 15.112 67.08 14.24 A 5.504 5.504 0 0 1 67.418 12.269 Q 67.929 10.927 69.211 10.028 A 6.192 6.192 0 0 1 69.34 9.94 A 8.294 8.294 0 0 1 71.78 8.863 Q 73.344 8.44 75.32 8.44 A 17.146 17.146 0 0 1 78.024 8.647 A 14.981 14.981 0 0 1 79.02 8.84 Q 80.76 9.24 82.4 9.96 L 81 13.2 Q 79.6 12.6 78.12 12.18 Q 76.64 11.76 75.12 11.76 A 9.879 9.879 0 0 0 74.061 11.813 Q 72.975 11.93 72.289 12.309 A 2.829 2.829 0 0 0 72.2 12.36 A 2.303 2.303 0 0 0 71.634 12.826 A 1.797 1.797 0 0 0 71.2 14.04 Q 71.2 14.8 71.68 15.36 A 2.899 2.899 0 0 0 72.066 15.728 Q 72.534 16.104 73.3 16.48 A 26.748 26.748 0 0 0 74.097 16.853 Q 74.929 17.229 76.062 17.688 A 90.496 90.496 0 0 0 76.44 17.84 Q 78.159 18.493 79.449 19.176 A 17.698 17.698 0 0 1 79.86 19.4 A 6.935 6.935 0 0 1 81.042 20.229 A 5.308 5.308 0 0 1 82.02 21.36 A 4.458 4.458 0 0 1 82.587 22.726 Q 82.76 23.448 82.76 24.32 A 6.829 6.829 0 0 1 82.461 26.395 A 5.267 5.267 0 0 1 80.44 29.14 Q 78.612 30.448 75.667 30.725 A 17.792 17.792 0 0 1 74 30.8 A 25.885 25.885 0 0 1 72.383 30.752 Q 71.549 30.7 70.827 30.59 A 13.079 13.079 0 0 1 70.1 30.46 A 14.105 14.105 0 0 1 67.996 29.851 A 12.257 12.257 0 0 1 67.12 29.48 Z M 105.4 18.2 L 105.4 20.52 L 90.92 20.52 A 10.948 10.948 0 0 0 91.138 22.509 Q 91.373 23.623 91.855 24.493 A 5.473 5.473 0 0 0 92.66 25.6 Q 94.32 27.36 97.32 27.36 A 19.467 19.467 0 0 0 99.169 27.277 Q 100.16 27.182 101.02 26.98 A 17.933 17.933 0 0 0 103.242 26.298 A 21.604 21.604 0 0 0 104.36 25.84 L 104.36 29.36 Q 102.72 30.08 101.08 30.44 A 14.147 14.147 0 0 1 99.583 30.68 Q 98.478 30.8 97.16 30.8 A 13.621 13.621 0 0 1 94.282 30.509 A 10.548 10.548 0 0 1 91.62 29.56 Q 89.24 28.32 87.9 25.86 Q 86.662 23.586 86.568 20.338 A 18.662 18.662 0 0 1 86.56 19.8 A 18.065 18.065 0 0 1 86.76 17.04 Q 87.054 15.141 87.78 13.64 A 9.668 9.668 0 0 1 89.457 11.178 A 8.497 8.497 0 0 1 91.18 9.78 A 9.023 9.023 0 0 1 94.781 8.535 A 11.562 11.562 0 0 1 96.28 8.44 A 11.085 11.085 0 0 1 99.095 8.778 A 7.901 7.901 0 0 1 102.96 11.06 A 8.747 8.747 0 0 1 105.028 14.959 Q 105.371 16.319 105.398 17.926 A 16.428 16.428 0 0 1 105.4 18.2 Z M 183.08 26.84 L 183.08 30.04 A 6.023 6.023 0 0 1 182.481 30.266 Q 182.173 30.365 181.812 30.452 A 13.157 13.157 0 0 1 181.22 30.58 Q 180.08 30.8 178.92 30.8 A 9.018 9.018 0 0 1 176.756 30.548 A 7.873 7.873 0 0 1 175.68 30.2 A 4.666 4.666 0 0 1 173.457 28.313 A 5.839 5.839 0 0 1 173.34 28.12 Q 172.719 27.05 172.546 25.374 A 13.468 13.468 0 0 1 172.48 24 L 172.48 12.08 L 169.48 12.08 L 169.48 10.16 L 172.64 8.56 L 174.12 4 L 176.72 4 L 176.72 8.84 L 182.88 8.84 L 182.88 12.08 L 176.72 12.08 L 176.72 23.92 A 5.708 5.708 0 0 0 176.796 24.884 Q 176.976 25.929 177.58 26.52 Q 178.44 27.36 179.84 27.36 A 10.878 10.878 0 0 0 181.45 27.237 A 11.957 11.957 0 0 0 181.56 27.22 Q 182.317 27.1 182.896 26.906 A 5.568 5.568 0 0 0 183.08 26.84 Z M 64.44 8.64 L 64 12.6 Q 62.96 12.32 61.84 12.32 Q 60.24 12.32 58.82 13.12 Q 57.4 13.92 56.54 15.42 A 6.313 6.313 0 0 0 55.828 17.391 A 8.783 8.783 0 0 0 55.68 19.04 L 55.68 30.4 L 51.44 30.4 L 51.44 8.84 L 54.8 8.84 L 55.36 12.68 L 55.52 12.68 Q 56.56 10.96 58.2 9.7 A 6.085 6.085 0 0 1 61.648 8.452 A 7.666 7.666 0 0 1 62.08 8.44 A 12.119 12.119 0 0 1 62.742 8.459 A 15.589 15.589 0 0 1 63.3 8.5 A 20.773 20.773 0 0 1 63.77 8.548 Q 64.14 8.59 64.44 8.64 Z M 136 8.84 L 140.24 8.84 L 140.24 30.4 L 136 30.4 L 136 8.84 Z M 118.88 5.52 L 115.48 5.52 L 115.48 15.24 L 119.08 15.24 A 13.864 13.864 0 0 0 120.8 15.141 Q 122.619 14.913 123.687 14.158 A 3.81 3.81 0 0 0 123.92 13.98 A 4.04 4.04 0 0 0 125.269 11.769 Q 125.435 11.095 125.44 10.292 A 8.026 8.026 0 0 0 125.44 10.24 Q 125.44 8.519 124.717 7.467 A 3.28 3.28 0 0 0 123.84 6.6 A 5.135 5.135 0 0 0 122.532 5.985 Q 121.085 5.52 118.88 5.52 Z M 91 17.4 L 101.16 17.4 A 9.016 9.016 0 0 0 100.97 15.642 Q 100.737 14.563 100.222 13.716 A 5.327 5.327 0 0 0 99.94 13.3 A 3.775 3.775 0 0 0 97.736 11.882 Q 97.095 11.725 96.33 11.72 A 7.72 7.72 0 0 0 96.28 11.72 A 5.704 5.704 0 0 0 94.636 11.946 A 4.463 4.463 0 0 0 92.62 13.2 A 5.5 5.5 0 0 0 91.513 15.023 Q 91.118 16.061 91 17.4 Z M 139.238 0.847 A 2.768 2.768 0 0 0 138.16 0.64 A 3.413 3.413 0 0 0 137.632 0.68 A 2.528 2.528 0 0 0 136.42 1.2 A 1.625 1.625 0 0 0 135.978 1.758 Q 135.72 2.279 135.72 3.08 Q 135.72 4.36 136.42 4.94 A 2.43 2.43 0 0 0 137.317 5.409 A 3.076 3.076 0 0 0 138.16 5.52 Q 139.12 5.52 139.84 4.94 Q 140.56 4.36 140.56 3.08 Q 140.56 2.441 140.391 1.98 A 1.702 1.702 0 0 0 139.84 1.2 A 2.629 2.629 0 0 0 139.238 0.847 Z")
    curserinthPath.setAttribute("fill-rule", "nonzero");



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
    modrinthPath.setAttribute("fill", "white");

    let modrinthG = document.createElementNS("http://www.w3.org/2000/svg", "g");
    modrinthG.setAttribute("fill", "#26292f");

    curserinthButton.style.boxShadow = "inset 0px 0px 0px 3px #1bd96a";
    if (doesModrinthExist) {
        modrinthG.setAttribute("fill", validColor);
        modrinthButton.style.boxShadow = "inset 0px 0px 0px 3px #1bd96a";
    } else if (doesModrinthThrowError) {
        modrinthG.setAttribute("fill", errorColor);
        modrinthButton.style.boxShadow = "inset 0px 0px 0px 3px #ff496e";
    } else {
        console.log("got a warning here");
        modrinthG.setAttribute("fill", waringColor);
        modrinthButton.style.boxShadow = "inset 0px 0px 0px 3px #ffa347";
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

    if (isCurseforge) aContainer.appendChild(curserinthButton);
    aContainer.appendChild(modrinthButton);

    modrinthButton.appendChild(modrinthSvg);

    modrinthSvg.appendChild(modrinthPath);
    modrinthSvg.appendChild(modrinthG);

    modrinthG.appendChild(modrinthPath2);
    modrinthG.appendChild(modrinthPath3);
    modrinthG.appendChild(modrinthPath4);

    curserinthButton.appendChild(curserinthSvg);

    curserinthSvg.appendChild(curserinthG);

    curserinthG.appendChild(curserinthPath);

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
        console.log(result);
        // go into this path: result > div > div > div.kb0PBd.cvP2Ce.jGGQ5e > div > div > a
        var link = await waitForElm(result, "div > div > div.kb0PBd.cvP2Ce.jGGQ5e > div > div > a");
        // get the href
        var href = link.getAttribute("href");

        if (href.includes("curseforge") && href.includes("mc-mods")) {
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
        } else if (href.includes("9minecraft") && (href.includes("-mod/") || href.includes("-api/"))) {
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
        } else if (href.includes("planetminecraft") && (href.includes("/mod/") || href.includes("/data-pack/"))) {
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
        } else if (href.includes("mc-mod.net") && (href.includes("-mod/") || href.includes("-api/"))) {
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
        console.log("result:", document.getElementById("rso").children[0].querySelector("div > div > div.kb0PBd.cvP2Ce.jGGQ5e > div > div > a"));
        console.log("waiting for element", selector, "in", parent);
        return new Promise(resolve => {
            const element = parent.querySelector(selector);
            if (element) {
                return resolve(element);
            }

            const observer = new MutationObserver(mutations => {
                console.log("mutation observed", mutations);
                const element = parent.querySelector(selector);
                console.log("element", element);
                if (element) {
                    resolve(element);
                    observer.disconnect();
                }
            });

            observer.observe(parent, {
                childList: true,
                subtree: true
            });
        });
    }
})()
// .catch(err => {
//     console.log("error", err);
// })