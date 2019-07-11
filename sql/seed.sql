INSERT INTO authors
    (id, name, email)
VALUES
    (1, 'Sean', 'sean@digitalcrafts.com');

INSERT INTO posts
    (id, title, author_id, content)
VALUES
    (1, 'My first blog post', 1 , 'This is my first blog post'),
    (2, 'My second blog post', 1 , 'This is my second blog post'),
    (3, 'My third blog post', 1 , 'This is my third blog post');