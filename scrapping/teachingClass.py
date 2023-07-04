import json


class Teaching:
    def __init__(self):
        self.id = ''
        self.name = ''
        self.teacher = ''
        self.startTime = ''
        self.endTime = ''
        self.day = ''
        self.classroom = ''
        self.place = ''
        self.teamsLink = ''

    # Getters and Setters

    def __str__(self):
        return "Name: " + self.name + "(" + self.id + ")\nTeacher: " + self.teacher + "\nClassroom: " + self.classroom + "\nPlace: " + str(self.place) + "\n"

    def toJSON(self):
        return {
            'name': self.name,
            'teacher': self.teacher,
            'time': self.time,
            'classroom': self.classroom,
            'place': self.place
        }

    def get_name(self):
        return self.name

    def set_name(self, name):
        self.name = name

    def get_teacher(self):
        return self.teacher

    def set_teacher(self, teacher):
        self.teacher = teacher

    def get_startTime(self):
        return self.startTime

    def set_startTime(self, startTime):
        self.startTime = startTime

    def get_endTime(self):
        return self.endTime

    def set_endTime(self, endTime):
        self.endTime = endTime

    def get_day(self):
        return self.day

    def set_day(self, day):
        self.day = day

    def get_classroom(self):
        return self.classroom

    def set_classroom(self, classroom):
        self.classroom = classroom

    def get_place(self):
        return self.place

    def set_place(self, place):
        self.place = place

    def get_teamsLink(self):
        return self.teamsLink

    def set_teamsLink(self, teamsLink):
        self.teamsLink = teamsLink

    def get_id(self):
        return self.id

    def set_id(self, id):
        self.id = id
