module.exports = {
    getHomePage: (req, res) => {
        let page = req.query.page;
        let limit = req.query.limit;
        let orderBy = req.query.orderBy;
        if (!page && !limit) {
            page = 1;
            limit = 2;
            orderBy = "recent";
        }
        let offset = (page-1)*limit;

        orders = {
            "recent": 'ilance_projects.date_added',
            "category": 'categories.name',
            "username": 'ilance_users.username',
            "project": 'ilance_projects.project_title'
        }

        orderByClause = orders[orderBy];
        let query =
            `select ilance_projects.project_title as ProjectTitle, ilance_users.username as Username, categories.name as CategoryName
            from ilance_projects
            inner join ilance_users on ilance_projects.user_id = ilance_users.user_id
            left join categories on ilance_projects.cid = categories.cid
            order by ${orderByClause}
            limit ${limit} offset ${offset}`;

        db.query(query, (err, result) => {
            if (err) {
                return res.json({ 'error': true, 'message': 'Error occured ' + err });
            }
            res.json(result);
        })
    },

    getTotalCount: (req, res) => {
        let query =
            `select count(*) as totalCount
            from ilance_projects
            inner join ilance_users on ilance_projects.user_id = ilance_users.user_id
            left join categories on ilance_projects.cid = categories.cid`;

        db.query(query, (err, result) => {
            if (err) {
                return res.json({ 'error': true, 'message': 'Error occured ' + err });
            }
            res.json(result);
        })
    }
}