$(document).ready(() => {

    SDK.User.loadNav();

    $("#create-button").click(() => {

        const content = $("#inputContent").val();
        const owner_id = SDK.Storage.load("userId");;
        const event_id = SDK.Storage.load("event-id");

        SDK.Post.createPost(owner_id, content, event_id, (err, data)=> {
            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");
            } else {
                window.location.href = "showEvent.html";
            }
        });

    });
    $("#goback-button").click(() => {
        window.location.href = "showEvent.html";

    });

});