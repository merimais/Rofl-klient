$(document).ready(() => {

    SDK.User.loadNav();

//Creating constant of listing all events.
const $listAllEvents = $("#listAllEvents");

//Getting method from SDK.
SDK.Event.findAllEvents((err, events) => { //Getting method from SDK.
    events.forEach((event) => { //for-each loop for checking and adding values to each event

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
       $listAllEvents.append(eventsHtml); //Loading "list all events" into html page

});
//Adding click function to this-button.
        $(".this-button").click(function() {
            const eventId = $(this).data("event-id"); //Creating constant of eventId
            const event = events.find((event)=> event.id === eventId); //Find event by event Id

            SDK.Storage.persist("event-id", eventId);

            window.location.href = "showEvent.html";

        });
});

//Adding click function to create-button. The button refers to html page.
    $("#create-button").click(() => {
                window.location.href = "createEvent.html";

    });


});