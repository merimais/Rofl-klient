$(document).ready(() => {

    SDK.User.loadNav();

    const $listAllPosts = $("#listAllPosts");

    SDK.Book.findAllPosts((err, posts) => {
        posts.forEach((post) => {

            $listAllPosts.append(`
            <div class="modal fade" id="purchase-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog " role="document">
            <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">Your basket</h4>
            </div>
            <div class="modal-body">
                <table class="table">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div> `

            );

            $("#create-button").click(() => {
                window.location.href = "createPost.html";

            });

    });

});

});