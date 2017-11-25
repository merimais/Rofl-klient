$(document).ready(() => {

    SDK.User.loadNav();

    const $listAllPosts = $("#listAllPosts");

    SDK.Book.findAllPosts((err, posts) => {
        posts.forEach((post) => {

            const postHtml = `
            <div class="col-lg-4 book-container">
            <div class="panel panel-default">
             <div class="panel-heading">
            <h3 class="panel-title">${post.owner_id}</h3>
        </div>
        <div class="panel-body">
            <div class="col-lg-8">
                <dl>
                    <dt>Created</dt>
                    <dd>${post.created}</dd>
                    <dt>Content</dt>
                    <dd>${post.content}</dd>
                </dl>
            </div>
        </div>
        <div class="panel-footer">
            <div class="row">
                <div class="col-lg-8 text-right">
                    <button class="btn btn-success purchase-button">Create comment</button>
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