$(document).ready(() => {

    SDK.User.loadNav();
const $listAllEvents = $("#listAllEvents");

SDK.Book.findAllEvents((err, events) => {
    events.forEach((event) => {

    $listAllEvents.append(`  
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
                        <td> <button style= "margin-bottom: 30px" class="btn btn-default" id="showEvent-button">Show event</button></td>
                    </tr>
                </table>
            </div>
            `
);
        $("#showEvent-button").click(() => {
            window.location.href = "showEvent.html";

        });
});

});
    $("#create-button").click(() => {
                window.location.href = "createEvent.html";

    });

});
