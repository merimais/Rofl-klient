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
                    <dt>Comments</dt>
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

                console.log(eventPost.id);

            });

        });

    });

    $("#create-button").click(function () {

        window.location.href = "createPost.html";

    });


});