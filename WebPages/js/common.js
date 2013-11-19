
/*-------

--------*/

var MenuItemSelected = "CurrentMenuItem";

$(document).ready(function () {
	setTimeout(loadFunction, 1);
});

var loadFunction = function ()
{
    // disable click event for [+]
    $("button[class='row_expand']").click(function (e)
    {
        return false;
    });

    // one item to show/hide details
    $("#ReturnItem").click(function (e)
    {
        $("#ReturnItemDetails").toggle();
        var btn = $("#btnDisplayDetail")[0];
        var css = btn.getAttribute("class");
        if (css.split("expand").length > 1)
        {
            btn.removeAttribute("class");
            btn.setAttribute("class", "row_collapse");
        }
        else
        {
            btn.removeAttribute("class");
            btn.setAttribute("class", "row_expand");
        }
    });

    // menu item events
    $("#btnFirmManagement").click(function ()
    {
        OpenFirmManagementPage();
    });
    $("#btnUserManagement").click(function ()
    {
        OpenUserManagementPage();
    });
    $("#btnViewUserGroup").click(function ()
    {
        OpenViewUserGroupPage();
    });
    $("#btnUpdateUserProfile").click(function ()
    {
        OpenUpdateUserProfilePage();
    });
    $("#btnChangePassword").click(function ()
    {
        OpenChangeUserPasswordPage();
    });
    $("#btnUploadReports").click(function ()
    {
        OpenUploadReportsPage();
    });
    $("#btnUploadHistory").click(function ()
    {
        OpenUploadHistoryPage();
    });

    $('#btnSubmitSecurity').click(function (e)
    {
        OpenFirmManagementPage();
    });
    
    // set title
    $("#titleCreateAccount").click(function (e)
    {
        $("#containerCreateAccount").toggle();
    });
    var title = $("#titleCreateAccount");
    title.attr("title", title.html());

    $("#frmCreateUserGroup").click(function ()
    {
        ShowCreateUserGroup();
    });

    // set right link of banner
    setRightLinkOfBanner();

    displayCurrentMenu();
};


/* ---
buttons
-----*/

function ShowCreateUserGroup()
{
	$("#divCreateUserGroup").show();
}


/* ---
links
-----*/

var setRightLinkOfBanner = function () {
    var page = getPageName();
    var text = "";

    if (page == "login.html") {
        text = "Welcome to Google";
        $("#__buttonRegisterFirmAccount").removeClass("hide");
    }
    else if (page == "register.html")
        text = "Creating an Account from Google...";
    else if (page == "security.html")
        text = "Wellcome to Google: Eric Xu";

    if (text != "") $('#__labelBannerRightLink')[0].innerHTML = text;

    // register a firm account    
    $('#__buttonRegisterFirmAccount').click(function (e) {
        OpenRegisterPage();
    });
};

var displayCurrentMenu = function ()
{
    var id = "";
    var page = getPageName();

    if (page == "firm_management.html")
        id = "btnFirmManagement";
    else if (page == "user_management.html")
        id = "btnUserManagement";
    else if (page == "view_user_group.html")
        id = "btnViewUserGroup";
    else if (page == "update_user_profile.html")
        id = "btnUpdateUserProfile";
    else if (page == "change_user_password.html")
        id = "btnChangePassword";
    else if (page == "upload_reports.html")
        id = "btnUploadReports";
    else if (page == "upload_history.html")
        id = "btnUploadHistory";

    if (id != "") setTimeoutMenuId(id);
};

var getPageName = function ()
{
    var index = window.location.href.lastIndexOf('/') + 1;
    var page = window.location.href.substr(index);
    return page;
};

var ActiviateSpecificMenu = function (id)
{
    $("#" + id).addClass("active");
};
var setTimeoutMenuId = function (id)
{
    setTimeout("ActiviateSpecificMenu('" + id + "');", 1);
};

function OpenRegisterPage()
{
	window.location.href = "register.html";
}

function OpenFirmManagementPage()
{
	window.location.href = "firm_management.html";
}
function OpenUserManagementPage()
{
	window.location.href = "user_management.html";
}
function OpenViewUserGroupPage()
{
	window.location.href = "view_user_group.html";
}
function OpenUpdateUserProfilePage()
{
	window.location.href = "update_user_profile.html";
}
function OpenChangeUserPasswordPage()
{
	window.location.href = "change_user_password.html";
}
function OpenUploadReportsPage()
{
	window.location.href = "upload_reports.html";
}
function OpenUploadHistoryPage()
{
	window.location.href = "upload_history.html";
}


/* ---
get files' contents
-----*/
var ReadFileAPI =
{
    isDefined: function (variable)
    {
        return (typeof (variable) != "undefined");
    },

    isValidText: function (text)
    {
        return ReadFileAPI.isDefined(text) && !(text == null || $.trim(text) == "");
    },

    getBaseUrl: function (win)
    {
        var index = win.location.href.lastIndexOf('/');
        var baseUrl = win.location.substr(0, index + 1);
        return baseUrl;
    },

    getFileContentsSync: function (url, type)
    {
        if (!ReadFileAPI.isValidText(type)) { type = 'text'; }
        if (!ReadFileAPI.isValidText(url)) { return ""; }

        return $.ajax({
            url: url,
            dataType: type,
            type: "get",
            async: false
        }).responseText;

        var log = "Retrieved content, URL is: " + url;
        if (console.log) console.log(log);
    },

    getFileContents: function (url, fnSuccess, type, fnFailure)
    {
        if (!ReadFileAPI.isValidText(type)) { type = 'text'; }
        if (!ReadFileAPI.isValidText(url)) { return false; }

        $.ajax({
            url: url,
            dataType: type,
            type: "get",
            async: true,
            success: function (result)
            {
                if (ReadFileAPI.isDefined(fnSuccess)) { fnSuccess(result); }
            },
            error: function (e)
            {
                if (ReadFileAPI.isDefined(fnFailure)) { fnFailure(e); }
            }
        });

        return true;
    }
};
