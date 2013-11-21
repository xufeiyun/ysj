
/*-------

--------*/

var MenuItemSelected = "CurrentMenuItem";

$(document).ready(function () {
    setTimeout(loadFunction, 1);

    $(window).scroll(function (e) {
    });
});

var loadFunction = function () {
    var banner = $('#__divTopBannerContainer');
    var navbar = $('#__divTopNavBarContainer');
    var leftMenu = $('#__divLeftNavigateMenu');
    //navbar.css("margin-bottom", (banner.height() + 5) + "px");
    //parent.css("padding-left", "0px");
    //parent.css("margin-bottom", (banner.height() + 5) + "px");

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


var getPageName = function ()
{
    var index = window.location.href.lastIndexOf('/') + 1;
    var page = window.location.href.substr(index);
    return page;
};
