$(document).ready(() => {

    SDK.User.loadNav();

    //Adding click function to login-button.
    $("#login-button").click(() => {

    //Creating constants and validating values
    const email = $("#inputEmail").val();
    const password = $("#inputPassword").val();

    //Getting login method from User SDK.
    SDK.User.login(email, password, (err, data) => {
    if (err && err.xhr.status === 401) {
    $(".form-group").addClass("has-error");
        }
    else if (err){
    console.log("Bad stuff happened") //If error occurs, the error will be shown in the console.

    } else {

        window.location.href = "users.html";
}
});

});
    //Adding click function to Go back button. Button refers to html page.
    $("#goback-button").click(() => {
        window.location.href = "homepage.html";

    });

});