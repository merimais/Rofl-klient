$(document).ready(() => {

//Adding click function to create button while validating different input values from user.
$("#create-button").click(() => {
    const email = $("#inputEmail").val();
const firstName = $("#inputFirstname").val();
const lastName = $("#inputLastname").val();
const description = $("#inputDescription").val();
const gender = $("#inputGender").val();
const major = $("#inputMajor").val();
const semester = $("#inputSemester").val();
const password = $("#inputPassword").val();

//Getting method for creating user in Café Nexus from SDK. createUser method contains different values.
SDK.User.createUser(password, firstName, lastName, email, description, gender, major, semester, (err, data)=> {
    if (err && err.xhr.status === 401) {
    $(".form-group").addClass("has-error"); //If status code 401 occur, the system will show an error.
} else {
    window.location.href = "homepage.html";
}
});

});

//Adding click function to Go back button. Button refers to an html page.
    $("#goback-button").click(() => {
        window.location.href = "homepage.html";

    });

});