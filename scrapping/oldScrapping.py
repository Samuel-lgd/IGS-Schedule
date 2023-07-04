from bs4 import BeautifulSoup
import requests
from datetime import *

htmlSalles = ''
listSalles = []

htmlProf = ''
listProf = []


def get():
    # --- obtenir la date du jour pour l'url sous forme "mois/jour/annee"
    today = datetime.today()
    mois = today.strftime("%m")
    jour = int(today.strftime("%d"))
    annee = today.strftime("%Y")
    nomJour = today.strftime("%A")
    if nomJour == "Friday" or nomJour == "Saturday" or nomJour == "Sunday":
        jour += 4
    date = mois + "/" + str(jour) + "/" + annee

    # --- get tout l'html du site, le rend + lisible
    html = requests.get("https://edtmobiliteng.wigorservices.net//WebPsDyn.aspx?action=posEDTBEECOME&serverid=G&Tel=samuel.lagarde&date="+date +
                        "&hashURL=fb3f5bb164f7e41fe0a81800b7ed9372b75557798d900b65e0b94664e7e97fd35bbcc1ffa6e474a778b617ae6d4fbf176075a451d0b912422d8c75a08de6128d").text
    soup = BeautifulSoup(html, 'html.parser')

    # --- cherche l'endroit ou la salle est ecrite et le met dans "listSalles", sans espaces en trop

    for htmlSalles in soup.find_all('td', class_="TCSalle"):
        listSalles.append(htmlSalles.get_text())

    for htmlProf in soup.find_all('td', class_="TCProf"):
        listProf.append(htmlProf.get_text(separator="\nModule: "))
