let me add few more point

1: with mongo db the main problem was ==> 2 APIS mixed in 1. The admin and the students and the teachers (editing the lessons) were all using complex ROLES ... it was not the mongodb which was complex it was the millions of UI wires that keept on short circuiting

solution ===> 2 clear seperate APIs for public and admin
--- both use same server and connect to same db BUT are not same has seperate login 

2: The problem of managing complex data structures

solution ====> Workshop  -- use db just for public use not as storage

===> Also due to admin API we can regularly download the dynamic content (messages etc) 
