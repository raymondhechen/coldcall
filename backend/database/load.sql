\copy Users(uid, name) FROM '/Users/jeffreyluo/Desktop/School/CS316/coldcall/backend/data/Users.csv' DELIMITER ',' CSV HEADER;

\copy Skills(uid, skill_name) FROM '/Users/jeffreyluo/Desktop/School/CS316/coldcall/backend/data/skills.csv' DELIMITER ',' CSV HEADER;

\copy Timeslots(start_time, end_time) FROM '/Users/jeffreyluo/Desktop/School/CS316/coldcall/backend/data/timeslots.csv' DELIMITER ',' CSV HEADER;

\copy Meetingspots(place, location_name) FROM '/Users/jeffreyluo/Desktop/School/CS316/coldcall/backend/data/meetingspots.csv' DELIMITER ',' CSV HEADER;

\copy Availabilities(uid, start_time, end_time) FROM '/Users/jeffreyluo/Desktop/School/CS316/coldcall/backend/data/availabilities.csv' DELIMITER ',' CSV HEADER;

\copy Reservations(student_uid, teacher_uid, start_time, end_time, place, location_name) FROM '/Users/jeffreyluo/Desktop/School/CS316/coldcall/backend/data/reservations.csv' DELIMITER ',' CSV HEADER;
