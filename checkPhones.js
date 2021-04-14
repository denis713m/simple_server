var CryptoJS = require("crypto-js");

module.exports.checkPhones = async (req, res, next) => {
    try {
        console.log(req.params)
        const body = JSON.stringify({
            timeout: 30,
            ops: [{
                conv_id: "913406",
                type: 'create',
                obj: 'task',
                data: {
                    phone: req.params.phone
                }
            }]
        });
        var time = Math.floor(Date.now() / 1000);

        var secret = "ca2yc1POxDWG1JsbVS8fIYhFYRJGOhiGbIFpYl5iaYkIelVH65";

        var signature = CryptoJS.enc.Hex.stringify(
            CryptoJS.SHA1(time + secret + body + secret)
        );
        const request1 = require('request')
        const result = request1({
            uri: `https://sync-api.corezoid.com/api/1/json/117044/${time}/${signature}`,
            method: 'post',
            headers: {
                "Content-Type": "application/json",
            },
            body: body,
            gzip: true
        }, function (error, response, body) {
            // body is the decompressed response body   
            console.log(response)         
            if (error) throw new Error(error)            
            res.send(JSON.parse(body).ops[0].data.resultes)
        }
        )
        // const fetch = require('node-fetch');
        // const result = await fetch(`https://sync-api.corezoid.com/api/1/json/117044/${time}/${signature}`, {
        //     method: 'post',
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: body,
        // })
        // console.log(result)

    }
    catch (err) {
        console.error(err)
        next(err);
    }
};