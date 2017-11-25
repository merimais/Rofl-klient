$(document).ready(() => {

    SDK.User.loadNav();
const $listAllEvents = $("#listAllEvents");

SDK.Book.findAllEvents((err, events) => {
    events.forEach((event) => {

        const eventsHtml =`
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
                        <td> <button class="btn btn-default this-button" data-event-id="${event.id}" >Show event</button></td>
                    </tr>
                </table>
            </div>
            


`;
       $listAllEvents.append(eventsHtml);

});

        $(".this-button").click(function() {
            const eventId = $(this).data("event-id");
            const event = events.find((event)=> event.id === eventId);

            SDK.Storage.persist("event-id", eventId);

            window.location.href = "showEvent.html";

        });
});

    $("#create-button").click(() => {
                window.location.href = "createEvent.html";

    });


});