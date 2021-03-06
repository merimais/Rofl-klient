const SDK = {

    //Reference: Code line 4 to 29 is taken from DISBookStore which has been given from lectures in Distribuerede Systemer
        serverURL: "http://localhost:8080/api",
        request: (options, cb) => {

            let headers = {};
            if (options.headers) {
                Object.keys(options.headers).forEach((h) => {
                    headers[h] = (typeof options.headers[h] === 'object') ? JSON.stringify(options.headers[h]) : options.headers[h];
                });
            }

            $.ajax({
                url: SDK.serverURL + options.url,
                method: options.method,
                headers: headers,
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(options.data),
                success: (data, status, xhr) => {
                    cb(null, data, status, xhr);
                },
                error: (xhr, status, errorThrown) => {
                    cb({xhr: xhr, status: status, error: errorThrown});
                }
            });

        },

    //Creating SDK Event containing different methods.
        Event: {

            findAllEvents: (cb) => {
                SDK.request({
                    method: "GET",
                    url: "/events",
                    headers: {authorization: "Bearer" + SDK.Storage.load("token")} //Loading tokens in headers
                }, cb);
            },


            findEvent: (cb) => {
                SDK.request({method: "GET", url: "/events/" + SDK.Storage.load("event-id"),
                    headers: {authorization: "Bearer" + SDK.Storage.load("token")} //Loading tokens in header
                    }, cb)
            },


            createEvent: (owner_id, title, startDate, endDate, description, cb) => {
                SDK.request({
                    data: {
                        owner_id: owner_id,
                        title: title,
                        startDate: startDate,
                        endDate: endDate,
                        description: description
                    },
                    method: "POST",
                    url: "/events",
                }, cb);
            },

        },

        //Creating SDK Post containing different methods.
         Post: {

        findAllPosts: (cb) => {
            SDK.request({
                method: "GET",
                url: "/posts",
                headers: {authorization: "Bearer" + SDK.Storage.load("token")} //Loading tokens in headers
            }, cb);
        },

        createPost: (owner_id, content, event_id, cb) => {
            SDK.request({
                data: {
                    owner: owner_id,
                    content: content,
                    event: event_id
                },
                method: "POST",
                url: "/posts",
                headers: {authorization: "Bearer" + SDK.Storage.load("token")}
            }, cb);
        },

    },

        //Creating SDK User containing different methods.
         User: {

        createUser: (password, firstName, lastName, email, description, gender, major, semester, cb) => {
            SDK.request({
                data: {
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    description: description,
                    gender: gender,
                    major: major,
                    semester: semester
                },
                method: "POST",
                url: "/users",
            }, cb);
        },

        //Getting specific user
        current: () => {
            return SDK.Storage.load("user");
        },

        findAllUsers: (cb) => {
            SDK.request({
                method: "GET",
                url: "/users",
                headers: { authorization: "Bearer " + SDK.Storage.load("token")}
            }, cb);
        },


        logOut: () => {
            SDK.Storage.remove("token");
            SDK.Storage.remove("userId");
            SDK.Storage.remove("user");
            window.location.href = "../homepage.html";
        },

        login: (email, password, cb) => {
            SDK.request({
                data: {
                    email: email,
                    password: password
                },
                url: "/auth",
                method: "POST"
            }, (err, data) => {

                //Reference: Code line 144-161 is taken from DISBookStore which has been given from lectures in Distribuerede Systemer
                //On login-error
                if (err) return cb(err);

                //https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript
                let token = data;

                var base64Url = token.split('.')[0];
                var base64 = base64Url.replace('-', '+').replace('_', '/');
                console.log(JSON.parse(window.atob(base64)));

                SDK.Storage.persist("userId", JSON.parse(window.atob(base64)).kid);

                SDK.Storage.persist("token", data);

                cb(null, data);

            });
        },
             //Reference: Code line 163-174 is taken from DISBookStore which has been given from lectures in Distribuerede Systemer
             loadNav: (cb) => {
                $("#nav-container").load("nav.html", () => {
                    $(".navbar-right").html(`
                <li><a href="homepage.html" id="logout-link">Logout</a></li>
                `);
                $("#logout-link").click(() => SDK.User.logOut());
                cb && cb();
            });

        },

    },

        //Creating SDK Comment containing different methods.
        Comment: {

        createComment: (owner_id, content, parent_id, cb) => {
            SDK.request({
                data: {
                    owner: owner_id,
                    content: content,
                    parent: parent_id,
                },
                method: "POST",
                url: "/posts",
                headers: {authorization: "Bearer" + SDK.Storage.load("token")} //Loading tokens in headers
            }, cb);
        },

        findAllComments: (cb) => {
            SDK.request({
                method: "GET",
                url: "/posts/" + SDK.Storage.load("commentPostId"),
                headers: {authorization: "Bearer" + SDK.Storage.load("token")} //Loading tokens in headers
            }, cb);
        },


        findComment: (cb) => {
            SDK.request({method: "GET", url: "/posts/" + SDK.Storage.load("comment-id"),
                headers: {authorization: "Bearer" + SDK.Storage.load("token")} //Loading tokens in headers
                }, cb)
        },
    },

    //Reference: Code line 163-174 is taken from DISBookStore which has been given from lectures in Distribuerede Systemer
    Storage: {
    prefix: "NexusSDK",
        persist
    :
    (key, value) => {
        window.localStorage.setItem(SDK.Storage.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
    },
        load
    :
    (key) => {
        const val = window.localStorage.getItem(SDK.Storage.prefix + key);
        try {
            return JSON.parse(val);
        }
        catch (e) {
            return val;
        }
    },
        remove
    :
    (key) => {
        window.localStorage.removeItem(SDK.Storage.prefix + key);
    }
    }
    }
    ;