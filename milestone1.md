Cold Call is a platform to help connect students who want to learn and students who can teach. Despite the interconnectedness of our academic lives nowadays through social medias like LinkedIn, it's still difficult to find exactly the people you're looking for when learning specific skills or subject areas. We're here to fix that problem, starting at Duke.

We're building Cold Call as a web application where students can sign up for by entering their skillsets, knowledge area, academic interetsts, etc. We then helping to connect those who want to learn certain things to those who can teach them. Hopefully, we'll be able to connect students by getting them to meet at a mutual time and area, or even over a meal or coffee.

As for our current progress in constructing this application, we've outlined our database structure in our ER diagram (/backend/database/ER.pdf) and created our create.sql file too, which contains our database tables, restrictions, and more (/backend/database/create.sql). For example SQL queries and the following output, please refer to the backend database directory (/backend/database/test-sample.sql, /backend/database/test-sample.out).

First, we'll just some example data as a proof of concept. Then, to populate our database initially for further testing, we'll be scraping data off of LinkedIn as it is likely the most fitful place to find students, their academic interests, career focuses, skills, and more. However, in the future, we'll create a sign up option where users can create their profiles and enter in data themselves.

The following schemas describe our database. Please refer to the ER diagram for a more intuitive structure. Please refer to the create.sql file for the exact implementation and primary keys.

- Availabilities(uid,start_time,end_time) 
- Meetingspots(place,location_name) 
- Reservations(student_uid,teacher_uid,start_time,end_time,place,location_name) 
- Skills(uid,skill_name) 
- Wants(uid,skill_name) 
- Timeslots(start_time,end_time) Users(uid,name)

Some assumptions we made about our data is that Users will have a name and will also have skills they can offer. We also assume that there are only specific locations on Duke campus where meetings can occur, which is currently a limitation we hope to expand. We also assume users will either be teacher or learner and will be able to have certain available times. "Learners" can see those available times can make reservations with the "teachers" accordingly. Reservations must contain all of this data to be specific, accurate, and informative to both parties.

Our frontend will be constructed using ReactJS as its own independent framework. The concept is that it will capture data using the REST API we will create from the backend. The frontend and backend will work and deploy independently, where the backend works as an API service for database SQL requests. The frontend will serve as the user interface from which users can make such requests.

The interface will consist of a header where users can click to certain pages, including: sign up/in, look at list of people in their year, look at lists of people in certain academic or industry sectors, and more. After signing up/in, the user can fill out their profile, including a profile image, name, location, year, skills they offer, etc. They can then put availabilities, skills they can teach, skills they want to learn, etc. There will also be dedicated pages to specific reservations between two people where information about location, time, the two parties, and more are offered. These are subject to change based on our database structure and product goals.

The current frontend is a very primitive version of this, and much has yet to be implemented depending on the structure and changes in the backend. It is accessible (/frontend) and can be run locally (npm start).
