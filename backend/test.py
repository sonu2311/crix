import backend
import json

session = {}

def LoginOrSignup(info):
  response1 = backend.SignUp(info, session)
  if "error" not in response1:
    return response1["id"]
  response2 = backend.Login(info, session)
  assert("error" not in response2)
  return response2["id"]

def CreateAccounts():
  u1 = LoginOrSignup({"name": "Monu", "email": "monu@g.c", "password": "p1"})
  u2 = LoginOrSignup({"name": "Sonu", "email": "sonu@g.c", "password": "p2"})
  u3 = LoginOrSignup({"name": "Tonu", "email": "tonu@g.c", "password": "p3"})
  u4 = LoginOrSignup({"name": "Fonu", "email": "fonu@g.c", "password": "p4"})


def MakeLogin(login_id):
  session["login_key"] = {"id": login_id, "role": "USER"}


def Send(sender_id, receiver_id, msg):
  MakeLogin(sender_id)
  backend.SendMessage({"receiver_id": receiver_id, "content": msg}, session)

def Insert():
  pairs = [(3, 4), (3, 4), (4, 3), (3, 2), (3, 1),
           (1, 2), (1, 4), (2, 3), (2, 4), (3, 1),
           (3, 1), (3, 4), (1, 3), (4, 3), (1, 3),
           (1, 3), (3, 4), (4, 3), (1, 3), (3, 1),
           (3, 1), (3, 4), (1, 3), (4, 3), (1, 3),
           (1, 3), (3, 4), (4, 3), (1, 3)]
  for i, p in enumerate(pairs):
    Send(p[0], p[1], "M" + str(1 + i))

def TestOldMessageNewMessageGetter():
  MakeLogin(3)
  defaults = backend.GetOldMessages({"user_id": 4, "limit": 3}, session)
  print("Defaults = ", json.dumps(defaults, indent=2))
  older1 = backend.GetOldMessages({"user_id": 4, "limit": 3, "older_than": defaults["oldest_id"]}, session)
  print("Older 1 = ", json.dumps(older1, indent=2))
  older2 = backend.GetOldMessages({"user_id": 4, "limit": 3, "older_than": older1["oldest_id"]}, session)
  print("Older 2 = ", json.dumps(older1, indent=2))
  new1 = backend.GetNewMessages({"user_id": 4, "newer_than": defaults["newest_id"]}, session)
  print("new1 = ", json.dumps(new1, indent=2))
  Send(3, 4, "New Message1")
  Send(3, 4, "New Message2")
  new2 = backend.GetNewMessages({"user_id": 4, "newer_than": new1["newest_id"]}, session)
  print("new2 = ", json.dumps(new2, indent=2))
  Send(4, 3, "New Message3")
  Send(3, 4, "New Message4")
  Send(3, 4, "New Message5")
  Send(4, 3, "New Message6")
  Send(4, 3, "New Message7")
  Send(3, 4, "New Message10")
  MakeLogin(3)
  new3 = backend.GetNewMessages({"user_id": 4, "newer_than": new2["newest_id"]}, session)
  print("new3 = ", json.dumps(new3, indent=2))

def TestChatSummary():
  MakeLogin(3)
  print(json.dumps(backend.GetChatSummary({}, session), indent=2))


CreateAccounts()
Insert()
# TestOldMessageNewMessageGetter()

# TestChatSummary()
