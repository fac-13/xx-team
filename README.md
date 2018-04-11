# xx-team


Here is how you can select all users and their posts from Katia's db.


SELECT users.email, reviews.comment FROM users INNER JOIN reviews ON reviews.user_id=users.id