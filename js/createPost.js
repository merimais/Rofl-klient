$(document).ready(() => {

    SDK.User.loadNav();

    //Adding click function to create button while validating different input values from user.
    $("#create-button").click(() => {

        const content = $("#inputContent").val();
        const owner_id = SDK.Storage.load("userId");; //Storaging user ID
        const event_id = SDK.Storage.load("event-id"); //Storaging event ID

        //Getting method for creating post to an event with if-else statement from SDK. createPost method contains different values.
        SDK.Post.createPost(owner_id, content, event_id, (err, data)=> {
            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");
            } else {
                window.location.href = "showEvent.html";
            }
        });

    });

    //Adding click function to Go back button. The button refers to different html page.
    $("#goback-button").click(() => {
        window.location.href = "showEvent.html";

    });

});