$(document).ready(() => {

    SDK.User.loadNav();

    $("#create-button").click(() => {
        const owner_id= 1;
        const id = $("#inputId").val();
        const startDate = $("#inputStartDate").val();
        const endDate = $("#inputEndDate").val();
        const description = $("#inputDescription").val();

        SDK.Book.createPost(id, content, event, (err, data)=> {
            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");
            } else {
                window.location.href = "showEvent.html";
            }
        });

    });

});