import requests
import pprint 
pp = pprint.PrettyPrinter(indent=3)


def add_player(name,table):
    url = "http://localhost:3000/sit"

    payload = {
        "name": name,
        "table": table
    }
    headers = {"Content-Type": "application/json"}

    response = requests.request("POST", url, json=payload, headers=headers)

    return response.json()

def setup(table):
    url = "http://localhost:3000/setup"

    payload = {"table": table}
    headers = {"Content-Type": "application/json"}

    response = requests.request("POST", url, json=payload, headers=headers)
    return response.json()

def getgame(table):
    url = f"http://localhost:3000/{table}/standing"

    headers = {"Content-Type": "application/json"}

    response = requests.request("GET", url, headers=headers)
    return response.json()  

def update(table):
    url = f"http://localhost:3000/{table}/update"

    headers = {"Content-Type": "application/json"}

    response = requests.request("GET", url, headers=headers)
    return response.json()  

def play(name, table, action):
    url = f"http://localhost:3000/{table}/play"

    payload = {
        "name": name,
        "action": action
    }
    headers = {"Content-Type": "application/json"}

    response = requests.request("POST", url, json=payload, headers=headers)

def reset(table):
    url = f"http://localhost:3000/{table}/reset"
    response = requests.request("GET", url)

table = 2
players = [
    "aq",
    "jason",
    "bruh"
]

for i in players:
    add_player(i, table)

setup(table)

# update(2)

pp.pprint(getgame(table)["players"])

for i in players:
    while not getgame(table)["players"][i]["bust"]:
        play(i,table,"hit")
        print(getgame(table)["players"][i])


pp.pprint(getgame(table))
print()
reset(table)

pp.pprint(getgame(table))