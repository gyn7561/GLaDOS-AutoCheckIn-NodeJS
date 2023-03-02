let axios = require("axios");

async function sign(cookie) {
    let signUrl = `https://glados.rocks/api/user/checkin`;
    let res = await axios.default.post(signUrl, JSON.stringify({ "token": "glados.network" }), {
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "cookie": cookie
        }
    });
    let data = res.data;
    let message = data["message"];
    console.log(data);
    return message;
}


async function status(cookie) {
    let statusUrl = "https://glados.rocks/api/user/status";
    let res = await axios.default.get(statusUrl, {
        headers: {
            "cookie": cookie
        }
    });
    let data = res.data;
    console.log("code: " + data.code);
    if (data.code == 0) {
        let email = data.data["email"];
        let leftDays = parseInt(data.data["leftDays"]);
        console.log("leftDays: " + leftDays, "email: " + email);
        return {
            "leftDays": leftDays,
            "email": email
        }
    } else {
        console.error(data);
    }
}


async function main(cookie) {
    let info = await status(cookie);
    let message = await sign(cookie);
    console.log(message, info);
}

async function all() {
    if (process.env.COOKIES) {
        let cookies = process.env.COOKIES.split("&");
        for (let i = 0; i < cookies.length; i++) {
            await main(cookies[i]);
        }
    }else{
        console.log("请设置环境变量COOKIES");
    }
}

all();