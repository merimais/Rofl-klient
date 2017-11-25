$(document).ready(() => {

    SDK.User.loadNav();

    const $listAllPosts = $("#listAllPosts");

    SDK.User.findEvent((err, event) => {

        const eventPosts = event.posts;

        eventPosts.forEach((eventPosts) => {

            const postHtml = `
            <div class="col-lg-4 book-container">
            <div class="panel panel-default">
             <div class="panel-heading">
            <h3 class="panel-title">User:</h3>
            <h3 class="panel-title">${eventPosts.owner.id}</h3>
        </div>
        <div class="panel-body">
            <div class="col-lg-8">
                <dl>
                    <dt>Created</dt>
                    <dd>${eventPosts.created}</dd>
                    <dt>Content</dt>
                    <dd>${eventPosts.content}</dd>
                </dl>
            </div>
        </div>
        <div class="panel-footer">
            <div class="row">
                <div class="col-lg-8 text-right">
                    <button class="btn btn-default create-button">Create comment</button>
                </div>
            </div>
        </div>
    </div>
</div>`;
            $listAllPosts.append(postHtml);

        });

        $("#create-button").click(() => {
            window.location.href = "createPost.html";

        });
    });

});