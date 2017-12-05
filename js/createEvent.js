$(document).ready(() => {

    SDK.User.loadNav();

    $("#create-button").click(() => {
        const owner_id= SDK.Storage.load("userId");
        const title = $("#inputTitle").val();
        const startDate = $("#inputStartDate").val();
        const endDate = $("#inputEndDate").val();
        const description = $("#inputDescription").val();

        SDK.Event.createEvent(owner_id, title, startDate, endDate, description, (err, data)=> {
            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");
            } else {
                window.location.href = "events.html";
            }
        });

    });
    $("#goback-button").click(() => {
        window.location.href = "events.html";

    });

});