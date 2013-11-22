
/*-------

--------*/

var getPageName = function ()
{
    var index = window.location.href.lastIndexOf('/') + 1;
    var page = window.location.href.substr(index);
    return page;
};
