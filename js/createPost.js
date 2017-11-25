$(document).ready(() => {

    SDK.User.loadNav();

    $("#create-button").click(() => {

        const content = $("#inputContent").val();

        SDK.Book.createPost(owner_id, content, event, (err, data)=> {
            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");
            } else {
                window.location.href = "showEvent.html";
            }
        });

    });

});