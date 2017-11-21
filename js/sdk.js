const SDK = {
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
Book: {
    addToBasket: (book) => {
        let basket = SDK.Storage.load("basket");

        //Has anything been added to the basket before?
        if (!basket) {
            return SDK.Storage.persist("basket", [{
                count: 1,
                book: book
            }]);
        }

        //Does the book already exist?
        let foundBook = basket.find(b => b.book.id === book.id);
        if (foundBook) {
            let i = basket.indexOf(foundBook);
            basket[i].count++;
        } else {
            basket.push({
                count: 1,
                book: book
            });
        }

        SDK.Storage.persist("basket", basket);
    },

    findAllUsers: (cb) => {
        SDK.request({
            method: "GET",
            url: "/users",
        }, cb);
    },

    findAllEvents: (cb) => {
        SDK.request({
            method: "GET",
            url: "/events",
        }, cb);
    },

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

    createEvent: (owner_id, title, created, startDate, endDate, description, cb) => {
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
    }
},

Author: {
    findAll: (cb) => {
        SDK.request({method: "GET", url: "/authors"}, cb);
    }
},
Order: {
    create: (data, cb) => {
        SDK.request({
            method: "POST",
            url: "/orders",
            data: data,
            headers: {authorization: SDK.Storage.load("tokenId")}
        }, cb);
    },
    findMine: (cb) => {
        SDK.request({
            method: "GET",
            url: "/orders/" + SDK.User.current().id + "/allorders",
            headers: {
                authorization: SDK.Storage.load("tokenId")
            }
        }, cb);
    }
},
User: {
    findAllUsers: (firstName, lastName, email, description, gender, major, semester, cb) => {
        SDK.request({method: "GET", url: "/users"}, cb);
    },
    current: () => {
        return SDK.Storage.load("user");
    },

    findAllEvents: (id,title,created, startDate, endDate,description, cb) => {
        SDK.request({method: "GET", url: "/events"}, cb);
    },
    current: () => {
        return SDK.Storage.load("event");
    },


    logOut: () => {
        SDK.Storage.remove("tokenId");
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

            //On login-error
            if (err) return cb(err);

        SDK.Storage.persist("token", data);

        cb(null, data);

    });
    },
    loadNav: (cb) => {
        $("#nav-container").load("nav.html", () => {
            const currentUser = SDK.User.current();
        if (currentUser) {
            $(".navbar-right").html(`
            <li><a href="my-page.html">Your orders</a></li>
            <li><a href="#" id="logout-link">Logout</a></li>
          `);
        } else {
            $(".navbar-right").html(`
            <li><a href="login.html">Log-in <span class="sr-only">(current)</span></a></li>
          `);
        }
        $("#logout-link").click(() => SDK.User.logOut());
        cb && cb();
    });
    }
},
Storage: {
    prefix: "BookStoreSDK",
        persist: (key, value) => {
        window.localStorage.setItem(SDK.Storage.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
    },
    load: (key) => {
        const val = window.localStorage.getItem(SDK.Storage.prefix + key);
        try {
            return JSON.parse(val);
        }
        catch (e) {
            return val;
        }
    },
    remove: (key) => {
        window.localStorage.removeItem(SDK.Storage.prefix + key);
    }
}
};