$(document).ready(() => {

    SDK.User.loadNav();
const $listAllUsers = $("#listAllUsers");

SDK.Book.findAllEvents((err, events) => {
    events.forEach((event) => {

    $listAllUsers.append(`  
            <div class="row">
            <div class="col-lg-6">
            <div class="page-header">
                <table>
                    <tr>
                        <td>${event.email}</td>
                        <td>${event.firstName}</td>
                        <td>${event.lastName}</td>
                        <td>${event.gender}</td>
                        <td>${event.major}</td>
                        <td>${event.semester}</td>
                        <td>${event.description}</td>
                    </tr>
                </table>
            </div>
            `
);
});

});
});