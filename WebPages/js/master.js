

$(document).ready(function () {
    testPage();
});

var loadSpecificPageContent = function (element) {
    var page = QueryString.getQueryStringByName(location, "page");
    if (page != "") return;

    var ele = $(element);

    var title = ele.attr("cbrc-title");
    var page = ele.attr("cbrc-page");

    // set title
    document.title = title;

    // load page content
    showPageContent(page);
};

var showPageContent = function (page) {
    var removeTopNavigator = function () {
        $("#__divTopNavBarContainer").html("");
    };
    var removeLeftMenu = function () {
        $("#__divLeftNavigateMenu").html("");
    };
    var showCreateAccount = function () {
        // show link: create an account
        $("#__buttonRegisterFirmAccount").show();
    };
    var hideCreateAccount = function () {
        // hide link: create an account
        $("#__buttonRegisterFirmAccount").hide();
    };
    var centerPage = function () {
        var main = $("#__divMiddleContentConainer");
        var html = ReadFileAPI.getFileContentsSync(page);
        main.html(html);
        hideCreateAccount();

        removeTopNavigator();
        removeLeftMenu();
    };
    var showMainContentArea = function (page) {
        // load sections firstly
        var main = $("#__divMiddleContentConainer");
        var html = '<div class="span2" id="__divLeftNavigateMenu"></div>' +
			   '<div class="span10" id="__divRightMainContent"></div>';
        main.html(html);

        // load top nav bar
        var topbar = $("#__divTopNavBarContainer");
        html = ReadFileAPI.getFileContentsSync("__topnavbar.html");
        topbar.html(html);

        // load left menu
        var menu = $("#__divLeftNavigateMenu");
        html = ReadFileAPI.getFileContentsSync("__leftnavbar.html");
        menu.html(html);

        // load page content
        var content = $("#__divRightMainContent");
        html = ReadFileAPI.getFileContentsSync(page);
        content.html(html);
    };

    // load page content
    if (page == "__login.html") {
        centerPage();
        showCreateAccount();
    } else if (page == "__register.html" || page == "__security.html") {
        centerPage();
    } else {
        showMainContentArea(page);
    }
};


var testPage = function () {
    // get page name
    var page = QueryString.getQueryStringByName(location, "page");
    if (page == "") return;

    // load page content
    showPageContent(page);
};