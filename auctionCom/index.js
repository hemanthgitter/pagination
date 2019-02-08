var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'chad'
});

connection.connect((err) => {
    if(err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

// connection.query('SELECT * FROM ilance_users', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0]['password']);
// });

connection.query('select ilance_projects.project_title, ilance_users.username from ilance_projects inner join ilance_users on ilance_projects.user_id = ilance_users.user_id and ilance_projects.project_title<>\'\'', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
});
