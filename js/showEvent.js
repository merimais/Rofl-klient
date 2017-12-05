$(document).ready(() => {

    SDK.User.loadNav();

    const $listAllPosts = $("#listAllPosts");

    SDK.Event.findEvent((err, event) => {


        const eventPosts = event.posts;

        eventPosts.forEach((eventPost) => {


            const postHtml = `

            <div class="col-lg-4 book-container">
            <div class="panel panel-default">
             <div class="panel-heading">
            <h3 class="panel-title">User:</h3>
            <h3 class="panel-title">${eventPost.owner.id}</h3>
        </div>
        
        <div class="panel-body">
            <div class="col-lg-8">
                <dl>
                    <dt>Created</dt>
                    <dd>${eventPost.created}</dd>
                    <dt>Content</dt>
                    <dd>${eventPost.content}</dd>
                </dl>
            </div>
        </div>
        
        <div class="panel-footer">
            <div class="row">
                <div class="col-lg-8 text-right">
                    <button class="btn btn-default thisPost-button" id="thisPost-button" data-comment-postid = "${eventPost.id}">Comments</button>
                </div>
            </div>
        </div>
        
    </div>
</div>`;
            $listAllPosts.append(postHtml);

            $(".thisPost-button").unbind().click(function () {

                const postId = $(this).data("comment-postid");

                SDK.Storage.persist("commentPostId", postId);

                $("#comments-modal").modal("toggle");

                console.log(eventPost.id);

            });

        });

    });

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
            <dt>Owner: ${comment.owner.id} </dt>
            <td>${comment.content}</td>
            <dd>Created: ${comment.created}</dd>
        </dl>
      `);

            });
        });
    });

    $("#addCommentButton").click(() => {

        const owner_id = 1;
        const content = $("#inputComment").val();
        const parent_id = SDK.Storage.load("commentPostId");

        SDK.Comment.createComment(owner_id, content, parent_id, (err, data) => {
            $("#comments-modal").modal("toggle");
            window.alert("Comment has been created")
        });

    });

    $("#comments-modal").on("hidden.bs.modal", () => {

        $("#modal-tbody").html("");

    });

});