const axios = require("axios");

const getUser = async () => {
    const user = await axios({
        method: "get",
        url: "http://localhost:3000/users",
        proxy: false,
    });
    return user.data[0];
};

module.exports = {
    getUser,
};
