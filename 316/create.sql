CREATE TABLE Users (
    uid varchar(256) NOT NULL PRIMARY KEY,
    name varchar(256) NOT NULL
);

CREATE TABLE Skills (
    uid varchar(256) NOT NULL REFERENCES Users(uid),
    skill_name varchar(256),
    PRIMARY KEY(uid, skill_name)
);

CREATE TABLE Timeslots (
    start_time time(0) NOT NULL,
    end_time time(0) NOT NULL CHECK (end_time > start_time),
    PRIMARY KEY(start_time, end_time)
);

CREATE TABLE Meetingspots (
    place varchar(256),
    location_name varchar(256),
    PRIMARY KEY(place, location_name)
);

CREATE TABLE Availabilities (
    uid varchar(256) NOT NULL REFERENCES Users(uid),
    start_time time(0) NOT NULL,
    end_time time(0) NOT NULL CHECK (end_time > start_time),
    PRIMARY KEY(uid, start_time, end_time)
);

CREATE TABLE Reservations (
    student_uid varchar(256) NOT NULL REFERENCES Users(uid),
    teacher_uid varchar(256) NOT NULL REFERENcES USERS(uid),
    start_time time(0) NOT NULL,
    end_time time(0) NOT NULL CHECK (end_time > start_time),
    place varchar(256) NOT NULL,
    location_name varchar(256) NOT NULL,
    PRIMARY KEY(student_uid, teacher_uid, start_time, end_time)
);