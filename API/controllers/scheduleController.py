from datetime import datetime
import json
from flask import Blueprint, request, jsonify
from scrapping import scrapping

scheduleController = Blueprint('scheduleController', __name__)


@scheduleController.route("/current-week", methods=['GET'])
def get_schedule():
    user = request.args.get('user')

    date = datetime.today()
    print(date)

    # TODO : if sat or sun, get next week

    if user is None:
        return jsonify({'error': 'Missing parameters (user)'}), 400

    return json.dumps(scrapping.scrap(user, date), default=lambda o: o.__dict__)


@scheduleController.route("/current-week/data", methods=['GET'])
def get_schedule_dev():
    return [
        {
            "03/07/2023": [
                {
                    "id": "IAPI021",
                    "name": "Participer à des hackathons et projets tutorés",
                    "teacher": "aranda françois-xavier",
                    "startTime": "08:30",
                    "endTime": "12:00",
                    "day": "03/07/2023",
                    "classroom": "A016-S",
                    "place": "Bâtiment A",
                    "teamsLink": ""
                },
                {
                    "id": "IAPI021",
                    "name": "Participer à des hackathons et projets tutorés",
                    "teacher": "aranda françois-xavier",
                    "startTime": "13:00",
                    "endTime": "16:30",
                    "day": "03/07/2023",
                    "classroom": "A019LABO",
                    "place": "Bâtiment A",
                    "teamsLink": ""
                }
            ]
        },
        {
            "04/07/2023": [
                {
                    "id": "IAPI019",
                    "name": "Atelier pédagogique Individualisé -29J",
                    "teacher": "herve jean-pierre",
                    "startTime": "08:30",
                    "endTime": "12:00",
                    "day": "04/07/2023",
                    "classroom": "B107-S",
                    "place": "Bâtiment B",
                    "teamsLink": "https://edtmobiliteng.wigorservices.net/WebPsDyn.aspx?action=posEDTBEECOME&serverID=G&date=07/03/2023&StartMeetingTeams=1208557&StartMeetingTeamsHash=6BD57C20507CCCF6DED729BA2468A878BB44B3091209A30E4FAA2AA662F5494277C508B7B577FCA8570F07D7577D250B4F09FC13A0A553731F29082FABEDD5D6&Tel=samuel.lagarde"
                },
                {
                    "id": "HESC112",
                    "name": "ESPRIT CRITIQUE (Compétence Humaine)",
                    "teacher": "lacanette veronique",
                    "startTime": "13:00",
                    "endTime": "16:30",
                    "day": "04/07/2023",
                    "classroom": "SALLE_13",
                    "place": "DISTANCIEL",
                    "teamsLink": "https://edtmobiliteng.wigorservices.net/WebPsDyn.aspx?action=posEDTBEECOME&serverID=G&date=07/03/2023&StartMeetingTeams=1209219&StartMeetingTeamsHash=9CED85763C5F4BAA4B661FFD01AF8985A29C087CE729090E0D44E09B990652A7BFFA576D26E274279226EB8B9C0E093BC3D3DB8FBBC9F6D3186EB1DDD1A11A65&Tel=samuel.lagarde"
                }
            ]
        },
        {
            "05/07/2023": [
                {
                    "id": "ILAN080",
                    "name": "Comparer et choisir une solution informatique",
                    "teacher": "villa krista",
                    "startTime": "08:30",
                    "endTime": "12:00",
                    "day": "05/07/2023",
                    "classroom": "A110",
                    "place": "Bâtiment A",
                    "teamsLink": ""
                },
                {
                    "id": "HESC112",
                    "name": "ESPRIT CRITIQUE (Compétence Humaine)",
                    "teacher": "franses raphaël",
                    "startTime": "13:00",
                    "endTime": "16:30",
                    "day": "05/07/2023",
                    "classroom": "SALLE_13",
                    "place": "DISTANCIEL",
                    "teamsLink": ""
                }
            ]
        },
        {
            "06/07/2023": [
                {
                    "id": "IAPI014",
                    "name": "Accompagnement au mémoire",
                    "teacher": "lacanette veronique",
                    "startTime": "08:30",
                    "endTime": "12:00",
                    "day": "06/07/2023",
                    "classroom": "SALLE_14",
                    "place": "DISTANCIEL",
                    "teamsLink": ""
                },
                {
                    "id": "IAPI014",
                    "name": "Accompagnement au mémoire",
                    "teacher": "lacanette veronique",
                    "startTime": "13:00",
                    "endTime": "16:30",
                    "day": "06/07/2023",
                    "classroom": "SALLE_14",
                    "place": "DISTANCIEL",
                    "teamsLink": ""
                }
            ]
        }
    ]
