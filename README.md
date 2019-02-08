# pagination
1. Install node_modules
2. Set up database 'chad'

```
-- to add the categories table use sql code below

create table categories(
	cid int(10),
    name varchar(250),
    primary key(cid)
);

alter table ilance_projects
add foreign key (cid) references categories(cid);

insert into categories (cid, name)
values (1, 'rock');
insert into categories (cid, name)
values (2, 'water');
insert into categories (cid, name)
values (3, 'grass');
insert into categories (cid, name)
values (4, 'electric');
```

3. run "npm start" to start both frontend and backend servers
