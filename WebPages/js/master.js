
var LastActivedItem = null;

$(document).ready(function ()
{
    setTimeout(testPage, 1);
});

var loadFunction = function () {
    // disable click event for [+]
    $("button[class='row_expand']").click(function (e) {
        return false;
    });

    // one item to show/hide details
    $("#ReturnItem").click(function (e) {
        $("#ReturnItemDetails").toggle();
        var btn = $("#btnDisplayDetail")[0];
        var css = btn.getAttribute("class");
        if (css.split("expand").length > 1) {
            btn.removeAttribute("class");
            btn.setAttribute("class", "row_collapse");
        }
        else {
            btn.removeAttribute("class");
            btn.setAttribute("class", "row_expand");
        }
    });

    // set title
    $("#titleCreateAccount").click(function (e) {
        $("#containerCreateAccount").toggle();
    });
    var title = $("#titleCreateAccount");
    title.attr("title", title.html());

    $("#frmCreateUserGroup").click(function () {
        $("#divCreateUserGroup").show();
    });
};

var loadSpecificPageContent = function (element)
{
    var page = QueryString.getQueryStringByName(location, "page");
    if (page != "") return;

    if (LastActivedItem != null)
    {
        $(LastActivedItem).parent().removeClass("active");
    }
    var ele = $(element);
    ele.parent().addClass("active");
    LastActivedItem = element;

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
        var content = $("#__divRightMainContent");
        if (content.length == 0) {
            // load sections firstly
            var main = $("#__divMiddleContentConainer");
            var html = ReadFileAPI.getFileContentsSync("__maincontent.html");
            main.html(html);

            // load top nav bar
            var topbar = $("#__divTopNavBarContainer");
            html = ReadFileAPI.getFileContentsSync("__topnavbar.html");
            topbar.html(html);

            // load left menu
            var menu = $("#__divLeftNavigateMenu");
            html = ReadFileAPI.getFileContentsSync("__leftnavbar.html");
            menu.html(html);
        }
        // load page content
        content = $("#__divRightMainContent");
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

    loadFunction();

    setTitle();
};

var setTitle = function ()
{
    var titles = $("*[cbrc-title]");
    titles.each(function (index)
    {
        var t = $(titles[index]);
        var tag = t[0].tagName;
        var tip = t.attr("cbrc-title");
        var title = t.attr("title");
        if (tag.toLowerCase() != "button" && (title == undefined || title == null || title == ""))
        {
            t.attr("title", tip);
        }
    });
};

var clickLeftMenu = function (id) {
    if (id != undefined && id != "") {
        $("#" + id + ">a").click()
    }
};

var testPage = function () {
    // get page name
    var page = QueryString.getQueryStringByName(location, "page");
    if (page == "") {
        $("#testPageMode")[0].outerHTML = "";
        return;
    }

    $("#testPageMode").removeClass("hide");

    // load left menu
    var menu = $("#__divLeftNavigateMenu");
    if (menu.html() == "") {
        html = ReadFileAPI.getFileContentsSync("__leftnavbar.html");
        menu.html(html);
    }

    // load page content
    showPageContent(page);
};