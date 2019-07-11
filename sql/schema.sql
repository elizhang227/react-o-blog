drop table posts;
drop table authors;

create table authors (
    id serial primary key,
    name varchar(100),
    email varchar(200)
);

create table posts (
    id serial primary key,
    title varchar(200),
    content text,
    author_id integer references authors(id)
);