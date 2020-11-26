
var mysql = require('mysql');


var db1 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'smsportal',
    debug: false,
});

var db2 = mysql.createConnection({
    host: 'localhost',
    user: 'smsdba_smsdba2',
    password: 'nnv9I^b7KantGk',
    database: 'smsdba_ntsmsdb',
    debug: false,
  
  });


module.exports.getOrderConfirm = async function (req, res) {
    const { agent_id, order_id } = req.query;
    const smsportal_authkey = req.headers['authorization'];
    if (!agent_id || !order_id) {
        res.status(400).send({
            message: "please make sure fields are mandatory",
            status: "error"
        })
    } else if (!smsportal_authkey) {
        res.status(400).send({
            message: "please make sure smsportal_authkey is mandatory",
            status: "error"
        })

    } else {

        const query1 = "SELECT `smsportal_authkey` FROM `app_clients_master` WHERE `agent_id`='10831aa4'"
        await db2.query(query1, function (err, response, fields) {
            if (!response.length) {
                res.status(400).send({
                    status: "error",
                    message: 'authentication failed'
                });
            } else {
                const authkey = response[0].smsportal_authkey;
                if (authkey === smsportal_authkey) {
                    res.send({
                        status: "success",
                        paygateway_url:'http://payment.nutanapp.in'

                    });
                }
                else {
                    res.status(400).send({
                        status: "error",
                        message: 'authentication failed'
                    });
                }
            }
        });
    }

}
