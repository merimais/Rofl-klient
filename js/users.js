$(document).ready(() => {

    SDK.User.loadNav();

const $listAllUsers = $("#listAllUsers");

SDK.Book.findAllUsers((err, users) => {
    users.forEach((user) => {

    $listAllUsers.append(`  
            <div class="row">
            <div class="col-lg-6">
            <div class="page-header">
                <table>
                    <tr>
                        <td>${user.email}</td>
                        <td>${user.firstName}</td>
                        <td>${user.lastName}</td>
                        <td>${user.gender}</td>
                        <td>${user.major}</td>
                        <td>${user.semester}</td>
                        <td>${user.description}</td>
                    </tr>
                </table>
            </div>
            `
);
});

});
});