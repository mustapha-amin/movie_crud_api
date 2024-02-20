function bodyParser(request) {
    return new Promise((res, rej) => {
        try {
            let body = "";
            request.on("data", (chunk) => {
                body += chunk;
            })
            request.on("end", () => {
                res(JSON.parse(body)); 
            })
        } catch (error) {
            rej(error);
        }
    })
}

module.exports = {bodyParser}