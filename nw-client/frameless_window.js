var gui = require("nw.gui");

// Extend application menu for Mac OS
if (process.platform == "darwin") {
    var menu = new gui.Menu({type: "menubar"});
    menu.createMacBuiltin && menu.createMacBuiltin(window.document.title);
    gui.Window.get().menu = menu;
}

function initCheckbox(checkboxId, titlebar_name, titlebar_icon_url, titlebar_text) {
    addTitlebar(titlebar_name, titlebar_icon_url, titlebar_text);
    focusTitlebars(true);

    updateContentStyle();
}

window.onfocus = function () {
    console.log("focus");
    focusTitlebars(true);
};

window.onblur = function () {
    console.log("blur");
    focusTitlebars(false);
};

window.onresize = function () {
    updateContentStyle();
};

window.onload = function () {

    initCheckbox("top-box", "top-titlebar", "top-titlebar.png", "Top Titlebar");

    document.getElementById("close-window-button").onclick = function () {
        window.close();
    };

    document.querySelector('#minimize-window-button').onclick = function () {
        gui.Window.get().minimize();
    };

    document.querySelector('#maximize-window-button').onclick = function () {
        gui.Window.get().maximize();
    };

    updateContentStyle();
    gui.Window.get().show();
};
