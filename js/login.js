$(document).ready(() => {

    SDK.User.loadNav();

$("#login-button").click(() => {
    const email = $("#inputEmail").val();
const password = $("#inputPassword").val();

SDK.User.login(email, password, (err, data) => {
    if (err && err.xhr.status === 401) {
    $(".form-group").addClass("has-error");
}
else if (err){
    console.log("Bad stuff happened")
} else {
    window.location.href = "users.html";
}
});

});
    $("#goback-button").click(() => {
        window.location.href = "homepage.html";

    });

});