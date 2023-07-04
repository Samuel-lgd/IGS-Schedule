import requests
import datetime
from bs4 import BeautifulSoup
from scrapping import teachingClass


def scrap(user, date):

    # the monday of the provided date (str)
    weekDate = date - \
        datetime.timedelta(days=date.weekday())

    # datetime to str for url
    date = date.strftime("%m/%d/%Y")

    url = f"https://edtmobiliteng.wigorservices.net//WebPsDyn.aspx?action=posEDTBEECOME&serverid=G&Tel={user}&date={date} \
        &hashURL=fb3f5bb164f7e41fe0a81800b7ed9372b75557798d900b65e0b94664e7e97fd35bbcc1ffa6e474a778b617ae6d4fbf176075a451d0b912422d8c75a08de6128d"
    response = requests.get(url)

    if response.status_code != 200:
        return {"error": "Error while fetching data. Code " + response.status_code}

    html_content = response.text
    soup = BeautifulSoup(html_content, 'html.parser')
    weekTeachings = []
    day = {weekDate.strftime("%d/%m/%Y"): []}

    for htmlTeaching in soup.find_all('div', class_="Case"):
        teaching = teachingClass.Teaching()

        # Getting the id and pass if there's none
        id = htmlTeaching.find('td', class_="TCase")
        if id is None:
            continue

        teaching.set_id(id.get_text())

        # Getting the link to teams
        teamsLink = htmlTeaching.find('div', class_="Teams")
        if teamsLink is not None:
            teamsLink = teamsLink.find('a')
            if teamsLink is not None:
                teaching.set_teamsLink(teamsLink['href'])

        # Getting the classroom and place
        classRoom = htmlTeaching.find('td', class_="TCSalle")
        if classRoom is not None:

            classRoom = classRoom.get_text().split(':', 1)[1].split('(')
            teaching.set_classroom(classRoom[0])

            if len(classRoom) > 1:
                teaching.set_place(classRoom[1][:-1].replace(')', ''))

        # Getting the name and teacher
        teacherAndName = htmlTeaching.find('td', class_="TCProf")
        if teacherAndName is not None:
            values = teacherAndName.get_text(separator="\n").splitlines()

            teaching.set_teacher(values[0])
            if len(values) > 1:
                teaching.set_name(values[1])

        # Getting the time
        time = htmlTeaching.find('td', class_="TChdeb")
        if time is not None:
            # expected for time format: 08:00 - 12:00
            # take weekday + 08:00 for start time and weekday + 12:00 for end time

            time = time.get_text().split(' - ')
            teaching.set_startTime(time[0])
            teaching.set_endTime(time[1])

            teaching.set_day(weekDate.strftime("%d/%m/%Y"))

            # Getting the hour of the end time
            hour = int(time[1].split(':')[0])

        # Putting this in a day
        day[weekDate.strftime("%d/%m/%Y")].append(teaching)

        if hour > 14:
            weekDate = weekDate + datetime.timedelta(days=1)
            weekTeachings.append(day)
            day = {weekDate.strftime("%d/%m/%Y"): []}

    return weekTeachings
