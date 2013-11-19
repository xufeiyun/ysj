
/*-------

--------*/

$(document).ready(function () {
    $("#btnRegister").click(function () {
        register();
    });
	
    $("#btnLogin").click(function () {
        login();
    });	
	
});


function register()
{
	window.location.href = "register.html";
}

function login()
{
	window.location.href = "security.html";
}
