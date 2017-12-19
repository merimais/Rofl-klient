$(document).ready(() => {

    SDK.User.loadNav();

    //Creating constant of listing all users
    const $listAllUsers = $("#listAllUsers");

    //Getting method findAllUser from SDK User.
    SDK.User.findAllUsers((err, users) => {
    //Implementing forEach and inserting each user and belonging values from the database in a table

        users.forEach((user) => {

            $listAllUsers.append(`  
            <div class="row">
            <div class="col-lg-6">
            <div class="page-header">
                <table>
                    <tr>
                        <td>${user.id}</td> <!-- Inserting user Id for a specific user in html -->
                        <td>${user.email}</td> <!--Inserting email for a specifics user in html -->
                        <td>${user.firstName}</td> <!-- Inserting firstName for a specific user in html -->
                        <td>${user.lastName}</td> <!-- Inserting lastName for a specific user in html --> 
                        <td>${user.gender}</td> <!-- Inserting gender for a specific user in html -->
                        <td>${user.major}</td> <!-- Insterting major for a specific user in html -->
                        <td>${user.semester}</td> <!-- Inserting semester for a specific user in html -->
                        <td>${user.description}</td> <!-- Inserting description for a specific user in html -->
                    </tr>
                </table>
            </div>
            `
);
});

});
});