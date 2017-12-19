$(document).ready(() => {

    SDK.User.loadNav();

    //Creating constant of listing all posts
    const $listAllPosts = $("#listAllPosts");

    //Getting findEvent method from Event SDK.
    SDK.Event.findEvent((err, event) => {

        //Creating constant of an eventPost
        const eventPosts = event.posts;

        //Creating constant of eventPost and implementing forEach method and gets eventPosts from the database
        eventPosts.forEach((eventPost) => {


            const postHtml = `

            <div class="col-lg-4 book-container">
            <div class="panel panel-default">
             <div class="panel-heading">
            <h3 class="panel-title">User:</h3>
            <h3 class="panel-title">${eventPost.owner.id}</h3> <!-- Adding specific owner id to an specific eventPost to the title in html -->
        </div>
        
        <div class="panel-body">
            <div class="col-lg-8">
                <dl>
                    <dt>Created</dt>
                    <dd>${eventPost.created}</dd> <!-- Adding created date for the eventPost into html -->
                    <dt>Content</dt>
                    <dd>${eventPost.content}</dd> <!-- Adding content from post into html -->
                </dl>
            </div>
        </div>
        
        <div class="panel-footer">
            <div class="row">
                <div class="col-lg-8 text-right">
                    <button class="btn btn-default thisPost-button" id="thisPost-button" data-comment-postid = "${eventPost.id}">Comments</button>
                    <!-- Getting all comments belonging to a specific post and subsequently inserting the comments into html -->
                </div>
            </div>
        </div>
        
    </div>
</div>`;
            $listAllPosts.append(postHtml); //Listing all posts into html

            //Adding click function to thisPost button.
            $(".thisPost-button").unbind().click(function () {

                //Creating constant of post Id
                const postId = $(this).data("comment-postid");

                SDK.Storage.persist("commentPostId", postId); //Storaging post Id into storage in SDK

                $("#comments-modal").modal("toggle"); //If the modal is hidden, the modal will be shown by implementing a toggle - and the other way around.

                console.log(eventPost.id); //Showing eventPost Id in console

            });

        });

    });

    //Adding click function to create-button. Button refers to a html page
    $("#create-button").click(function () {

        window.location.href = "createPost.html";

    });

    $("#comments-modal").on("shown.bs.modal", () => {

        SDK.Comment.findAllComments((err, comments) => {
            console.log(comments);
            comments.comments.forEach((comment) => {


                const $modalTbody = $("#modal-tbody");
                $modalTbody.append(`

        <dl>
            <dt>Owner: ${comment.owner.id} </dt> <!--Getting owner Id for a specific comment and showing the Id in the html page -->
            <td>${comment.content}</td> <!-- Getting content of the comment and showing the content in html -->
            <dd>Created: ${comment.created}</dd> <!--Getting the created date of the comment and showing creation date in html -->
        </dl>
      `);

            });
        });
    });

    //Adding click function to addCommentButton
    $("#addCommentButton").click(() => {

        //Creating constants
        const owner_id = SDK.Storage.load("userId"); //Loading user Id from SDK storage.
        const content = $("#inputComment").val();
        const parent_id = SDK.Storage.load("commentPostId"); //Loading commentPost Id from SDK storage.

        //Getting createComment method from SDK Comment.
        SDK.Comment.createComment(owner_id, content, parent_id, (err, data) => {
            $("#comments-modal").modal("toggle");
            window.alert("Comment has been created")
        });

    });

    $("#comments-modal").on("hidden.bs.modal", () => {

        $("#modal-tbody").html("");

    });

});