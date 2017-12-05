$(document).ready(() => {


$("#create-button").click(() => {
    const email = $("#inputEmail").val();
const firstName = $("#inputFirstname").val();
const lastName = $("#inputLastname").val();
const description = $("#inputDescription").val();
const gender = $("#inputGender").val();
const major = $("#inputMajor").val();
const semester = $("#inputSemester").val();
const password = $("#inputPassword").val();

SDK.User.createUser(password, firstName, lastName, email, description, gender, major, semester, (err, data)=> {
    if (err && err.xhr.status === 401) {
    $(".form-group").addClass("has-error");
} else {
    window.location.href = "homepage.html";
}
});

});
    $("#goback-button").click(() => {
        window.location.href = "homepage.html";

    });

});