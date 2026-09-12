const loginPage =
document.getElementById("loginPage");

const app =
document.getElementById("app");

const uploadInput =
document.getElementById("uploadInput");

const fileGallery =
document.getElementById("fileGallery");

const hiddenGallery =
document.getElementById("hiddenGallery");

const recycleGallery =
document.getElementById("recycleGallery");

const folderGallery =
document.getElementById("folderGallery");


let files = [];

let hiddenFiles = [];

let recycleFiles = [];

let folders = [];

let currentFile = null;


/* =========================
   LOGIN
========================= */

function login() {

    const username =
    document
    .getElementById("username")
    .value;


    if(username === "") {

        alert(
            "Masukkan username terlebih dahulu!"
        );

        return;

    }


    loginPage.classList.add(
        "hidden"
    );


    app.classList.remove(
        "hidden"
    );


    document
    .getElementById("userDisplay")
    .innerText = username;

}


/* =========================
   LOGOUT
========================= */

function logout() {

    app.classList.add(
        "hidden"
    );


    loginPage.classList.remove(
        "hidden"
    );

}


/* =========================
   PINDAH HALAMAN
========================= */

function showPage(pageId) {

    const pages =
    document.querySelectorAll(".page");


    pages.forEach(page => {

        page.classList.remove(
            "active-page"
        );

    });


    document
    .getElementById(pageId)
    .classList.add(
        "active-page"
    );


    const title =
    document.getElementById(
        "pageTitle"
    );


    const titles = {

        home: "Beranda",

        files: "File Saya",

        folders: "Folder",

        hidden: "Hidden Folder",

        recycle: "Recycle Bin",

        storage: "Penyimpanan"

    };


    title.innerText =
    titles[pageId];


    updateMenu();

}


/* =========================
   MENU ACTIVE
========================= */

function updateMenu() {

    document
    .querySelectorAll(".menu")
    .forEach(menu => {

        menu.classList.remove(
            "active"
        );

    });

}


/* =========================
   UPLOAD
========================= */

function openUpload() {

    uploadInput.click();

}


uploadInput.addEventListener(
"change",

function() {

    const selectedFiles =
    this.files;


    for(
        let i = 0;
        i < selectedFiles.length;
        i++
    ) {

        const reader =
        new FileReader();


        reader.onload =
        function(event) {

            const file = {

                src:
                event.target.result,

                name:
                selectedFiles[i].name,

                size:
                selectedFiles[i].size

            };


            files.push(file);


            renderFiles();

            updateStorage();

        };


        reader.readAsDataURL(
            selectedFiles[i]
        );

    }

}
);


/* =========================
   RENDER FILE
========================= */

function renderFiles() {

    fileGallery.innerHTML = "";


    if(files.length === 0) {

        fileGallery.innerHTML = `

        <div class="empty">

            ❄️

            <p>
                Belum ada file
            </p>

        </div>

        `;

        return;

    }


    files.forEach(
    function(file,index) {

        const div =
        document.createElement("div");


        div.className =
        "photo";


        div.innerHTML = `

            <img src="${file.src}">

            <div class="photo-name">

                ${file.name}

            </div>

        `;


        div.onclick =
        function() {

            openModal(index);

        };


        fileGallery.appendChild(div);

    });

}


/* =========================
   MODAL
========================= */

function openModal(index) {

    currentFile = index;


    document
    .getElementById("photoModal")
    .style.display =
    "flex";


    document
    .getElementById("modalImage")
    .src =
    files[index].src;

}


function closeModal() {

    document
    .getElementById("photoModal")
    .style.display =
    "none";

}


/* =========================
   HIDE FILE
========================= */

function moveToHidden() {

    if(currentFile === null) return;


    hiddenFiles.push(
        files[currentFile]
    );


    files.splice(
        currentFile,
        1
    );


    closeModal();


    renderFiles();

    renderHiddenFiles();

    updateStorage();

}


/* =========================
   HIDDEN PIN
========================= */

function openHidden() {

    document
    .getElementById("pinModal")
    .style.display =
    "flex";

}


function closePin() {

    document
    .getElementById("pinModal")
    .style.display =
    "none";

}


function checkPin() {

    const pin =
    document
    .getElementById("pinInput")
    .value;


    // PIN DEMO

    if(pin === "1234") {

        closePin();

        showPage("hidden");

        renderHiddenFiles();

    }

    else {

        alert(
            "PIN salah!"
        );

    }

}


/* =========================
   RENDER HIDDEN
========================= */

function renderHiddenFiles() {

    hiddenGallery.innerHTML = "";


    if(hiddenFiles.length === 0) {

        hiddenGallery.innerHTML = `

        <div class="empty">

            🔒

            <p>
                Hidden Folder kosong
            </p>

        </div>

        `;

        return;

    }


    hiddenFiles.forEach(
    function(file) {

        const div =
        document.createElement("div");


        div.className =
        "photo";


        div.innerHTML = `

            <img src="${file.src}">

            <div class="photo-name">

                🔒 ${file.name}

            </div>

        `;


        hiddenGallery.appendChild(div);

    });

}


/* =========================
   HAPUS FILE
========================= */

function moveToRecycle() {

    if(currentFile === null) return;


    recycleFiles.push(
        files[currentFile]
    );


    files.splice(
        currentFile,
        1
    );


    closeModal();


    renderFiles();

    renderRecycle();

    updateStorage();

}


/* =========================
   RECYCLE BIN
========================= */

function renderRecycle() {

    recycleGallery.innerHTML = "";


    if(recycleFiles.length === 0) {

        recycleGallery.innerHTML = `

        <div class="empty">

            🗑️

            <p>
                Recycle Bin kosong
            </p>

        </div>

        `;

        return;

    }


    recycleFiles.forEach(
    function(file) {

        const div =
        document.createElement("div");


        div.className =
        "photo";


        div.innerHTML = `

            <img src="${file.src}">

            <div class="photo-name">

                🗑️ ${file.name}

            </div>

        `;


        recycleGallery.appendChild(div);

    });

}


function emptyRecycle() {

    if(recycleFiles.length === 0) {

        return;

    }


    const confirmDelete =
    confirm(
        "Hapus semua file permanen?"
    );


    if(confirmDelete) {

        recycleFiles = [];

        renderRecycle();

        updateStorage();

    }

}


/* =========================
   FOLDER
========================= */

function createFolder() {

    const name =
    prompt(
        "Masukkan nama folder:"
    );


    if(
        name === null ||
        name.trim() === ""
    ) {

        return;

    }


    folders.push(name);


    renderFolders();

    updateStorage();

}


function renderFolders() {

    folderGallery.innerHTML = "";


    if(folders.length === 0) {

        folderGallery.innerHTML = `

        <div class="empty">

            📁

            <p>
                Belum ada folder
            </p>

        </div>

        `;

        return;

    }


    folders.forEach(
    function(folder) {

        const div =
        document.createElement("div");


        div.className =
        "folder";


        div.innerHTML = `

            <div class="folder-icon">

                📁

            </div>

            ${folder}

        `;


        folderGallery.appendChild(div);

    });

}


/* =========================
   STORAGE
========================= */

function updateStorage() {

    let totalSize = 0;

    let normalSize = 0;

    let hiddenSizeTotal = 0;

    let recycleSizeTotal = 0;


    files.forEach(file => {

        normalSize += file.size;

    });


    hiddenFiles.forEach(file => {

        hiddenSizeTotal += file.size;

    });


    recycleFiles.forEach(file => {

        recycleSizeTotal += file.size;

    });


    totalSize =
        normalSize +
        hiddenSizeTotal +
        recycleSizeTotal;


    const totalCapacity =
    10 * 1024 * 1024 * 1024;


    let percent =
    (
        totalSize /
        totalCapacity
    ) * 100;


    if(percent > 100) {

        percent = 100;

    }


    const totalMB =
    bytesToMB(totalSize);


    document
    .getElementById("sideProgress")
    .style.width =
    percent + "%";


    document
    .getElementById("bigProgress")
    .style.width =
    percent + "%";


    document
    .getElementById("sideStorage")
    .innerText =
    totalMB + " / 10 GB";


    document
    .getElementById("usedStorage")
    .innerText =
    totalMB;


    document
    .getElementById("storageText")
    .innerText =
    totalMB + " dari 10 GB";


    document
    .getElementById("fileSize")
    .innerText =
    bytesToMB(normalSize);


    document
    .getElementById("hiddenSize")
    .innerText =
    bytesToMB(hiddenSizeTotal);


    document
    .getElementById("recycleSize")
    .innerText =
    bytesToMB(recycleSizeTotal);


    document
    .getElementById("fileCount")
    .innerText =
    files.length;


    document
    .getElementById("hiddenCount")
    .innerText =
    hiddenFiles.length;


    document
    .getElementById("folderCount")
    .innerText =
    folders.length;

}


/* =========================
   FORMAT SIZE
========================= */

function bytesToMB(bytes) {

    if(bytes === 0) {

        return "0 MB";

    }


    return (
        bytes /
        1024 /
        1024
    ).toFixed(2) + " MB";

}


/* =========================
   STORAGE PAGE
========================= */

document.addEventListener(
"keydown",

function(event) {

    if(event.key === "Escape") {

        closeModal();

        closePin();

    }

}
);
