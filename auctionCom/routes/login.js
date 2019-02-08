module.exports = {
    postLogin: (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        let query =
            `select *
            from ilance_users
            where username='${username}'`;
        console.log(query);
        db.query(query, (err, result) => {
            if (err) {
                return res.json({ 'error': true, 'message': 'Error occured ' + err });
            }
            if(result && result[0] && result[0].username === username)return res.json({status: "200", message: 'User found'});
            return res.json({status: "404", message: 'User not found'});
        });
    }
}