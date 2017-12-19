$(document).ready(() => {

    SDK.User.loadNav();

    //Adding click function for create button while validating different values from user.
    $("#create-button").click(() => {
        const owner_id= SDK.Storage.load("userId"); //Storaging userId
        const title = $("#inputTitle").val();
        const startDate = $("#inputStartDate").val();
        const endDate = $("#inputEndDate").val();
        const description = $("#inputDescription").val();

        //Getting method for creating event with if-else statement from SDK.
        SDK.Event.createEvent(owner_id, title, startDate, endDate, description, (err, data)=> {
            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");
            } else {
                window.location.href = "events.html";
            }
        });

    });

    //Adding click function for Go back button with reference to other html page.
    $("#goback-button").click(() => {
        window.location.href = "events.html";

    });

});