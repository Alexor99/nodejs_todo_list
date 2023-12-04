        //db select
        // const max_id = connection.query(
        //     'SELECT max(id) as max FROM users',
        //     function (err, rows) {
        //         if (err) {
        //             console.log('Error occurred', err);
        //         } else {
        //             console.log(rows[0].max);
        //         }
        //     }
        // );

        // const max_id = connection.query(
        //     'SELECT count(email) as count_email FROM users WHERE email =' + form_data.email,
        //     function (err, rows) {
        //         if (err) {
        //             console.log('Error occurred', err);
        //         } else {
        //             console.log(rows);
        //         }
        //     }
        // );

        // console.log(now.format('%Y-%m-%d %H:%M:%S'));

        // const create_date_db = connection.query(
        //     'SELECT DATE_FORMAT(create_date,' +
        //         '"%m/%d/%Y %T"' +
        //         ') as date FROM users',
        //     function (err, rows) {
        //         if (err) {
        //             console.log('Error occurred', err);
        //         } else {
        //             console.log(rows);
        //             // console.log(rows[0].date);
        //         }
        //     }
        // );