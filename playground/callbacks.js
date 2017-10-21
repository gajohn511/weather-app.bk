// @ts-check


var getUser = (id, callback) => {
    var user = {
        id,
        name: 'Fransisco'
    };
    callback(user);
};

getUser(31, (userObject) => {
    console.log(userObject);
});
