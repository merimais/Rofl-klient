$(document).ready(() => {

    SDK.User.loadNav();

    const $listAllComments = $("#listAllComments");

    SDK.Comment.findAllComments((err, comments) => {
        comments.forEach((comment) => {

            const commentsHtml =`
            <div class="row">
            <div class="col-lg-6">
            <div class="page-header">
                <table>
                    <tr>
                        <td>${event.title}</td>
                        <td>${event.created}</td>
                        <td>${event.startDate}</td>
                        <td>${event.endDate}</td>
                        <td>${event.description}</td>
                        <td> <button class="btn btn-default this-button" data-comment-id="${comment.id}" >Create Comment</button></td>
                    </tr>
                </table>
            </div>
            

`;
            $listAllComments.append(commentsHtml);

        });

        $(".this-button").click(function() {
            const eventId = $(this).data("event-id");
            const event = events.find((event)=> event.id === eventId);

            SDK.Storage.persist("event-id", eventId);

            window.location.href = "showEvent.html";

        });
    });

});