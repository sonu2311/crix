from flask_lib import FlaskLib
import time
import os
import database

backend = FlaskLib()

if os.environ.get('SONU_BACKEND_ENV') == 'mohit':
  db = database.Database(dbname='crix', user="mohitms", password="")
else:
  db = database.Database(dbname='crix', user="sonu", password="sonu_pass")

@backend.api('/hi')
def hi(d):
  return "Hello"

@backend.api('/my_name')
def my_name(d):
  time.sleep(1)
  return {"name": "I am React"}

@backend.api('/new_name')
def my_name(d):
  return {"name": "I am New Name"}

@backend.api('/sleep_for_5_seconds_and_return_name')
def my_name(d):
  time.sleep(5)
  return {"name": "[I am React][5s slept]"}

def IsLogin(session):
  if "login_key" in session and "id" in session["login_key"] and "role" in session["login_key"]:
    return True
  else:
    return False


def GetLoginId(session):
  if IsLogin(session):
    return session["login_key"]["id"]
  else:
    return 0


# Create account of a new user.
# Sample input: {name: "Sonu", email: "sonu@g.com", password: "pass"}
# Sample output: {"id": 4}
# Possible output: {"This email is already being used."}
@backend.api('/sign_up')
def SignUp(frontend_dict, session):
  query1="SELECT id from users where email={email}"
  if('role' not in frontend_dict):
    frontend_dict['role']='USER'
  if 'profile_pic' not in frontend_dict:
    frontend_dict['profile_pic'] = "images/person.png"
  if len(db.readQuery(query1, frontend_dict)) > 0: 
    return {"error": "This email is already being used"}
  query2 = ("INSERT into users (name, email,password,role, profile_pic) "
            "VALUES ({name}, {email}, {password} ,{role}, {profile_pic})"
            " RETURNING id ")
  new_id = db.readQuery(query2, frontend_dict)[0]["id"]
  session['login_key'] = {
    "id": new_id,
    "role": frontend_dict["role"],
    "name": frontend_dict["name"],
    "profile_pic": frontend_dict["profile_pic"]
  }
  return {"id": new_id}


# Login an already existing user.
# Sample input: {email: "a@b.com", password: "pass"}
# Sample output: {"id": 5}
# Possible output: {"error": "Email or password is incorrect."}
@backend.api('/login')
def Login(frontend_dict, session):
  query_output = db.readQuery("SELECT * from users where email={email} AND "
                              "password={password}", frontend_dict)
  if len(query_output) == 0:
    return {"error": "Email or password is incorrect."}
  uinfo = query_output[0]
  session['login_key'] = {
    "id": uinfo['id'],
    "role": uinfo['role'],
    "name": uinfo['name']}
  return {"id": uinfo['id']}


# Sample Usage:
# input: {"receiver_id": 33, "content": "Hello, how are you?"}
# output: None
#
# This API is used for sending message from currently logged in person to
# another person with given `receiver_id`.
# `content` is the main message to be sent.
# Internally this API will also store the current time.
# Note: This API could be called only if someone is logged in. It will return
#       error if no one is logged in.
@backend.api('/send_message')
def SendMessage(frontend_dict, session):
  if not IsLogin(session):
    return {"error": "You are not logged in"}
  frontend_dict["sender_id"] = GetLoginId(session)
  frontend_dict["chat_time"] = int(time.time())
  query = "INSERT INTO chat (sender_id, receiver_id, content, chat_time) values ({sender_id},{receiver_id}, {content},{chat_time})"
  db.writeQuery(query, frontend_dict)
  return {}


def PreprocessChatRow(row):
  row['chat_time_str'] = time.strftime('%Y-%m-%d %I:%M:%S %p', time.localtime(row['chat_time']))
  return row


CHAT_SUMMARY_QUERY = """
  SELECT
    other_person_id,
    chat.content,
    chat.sender_id,
    chat.chat_time,
    users.name,
    users.profile_pic
  FROM (
    SELECT other_person_id, max(id) as recent_message_id FROM (
      SELECT
        chat.id,
        (CASE
          WHEN sender_id = {login_id}
            THEN receiver_id
          ELSE
            sender_id
        END) as other_person_id
        FROM chat
        WHERE (sender_id = {login_id} OR receiver_id={login_id})
    ) A GROUP BY other_person_id
  ) Summary
  LEFT JOIN chat
    ON chat.id = recent_message_id
  LEFT JOIN users
    ON users.id = other_person_id
  ORDER BY
    recent_message_id DESC
  """


# Returns the summary of recent chats to be shown in left panel. These chat
# summary are of currently logged in person.
#
# Sample Input: {}
#
# Sample Output:
# {
#   "chat_summary": [
#     {
#        "name": "Mohit",
#        "other_person_id": 2,
#        "content": "Hello, how are you ?",
#        "profile_pic": "images/person.png",
#        "sender_id": 2
#     },
#     {...},
#      ...
#   ]
# }
# 
@backend.api('/get_chat_summary')
def GetChatSummary(frontend_dict, session):
  frontend_dict["login_id"] = GetLoginId(session)
  summary_list = db.readQuery(CHAT_SUMMARY_QUERY, frontend_dict)
  for i in summary_list:
    PreprocessChatRow(i)
  return {"chat_summary": summary_list}


ONE_PERSON_CHAT_QUERY = "SELECT chat.*, users.name from chat left join users on chat.sender_id = users.id where ((sender_id = {login_id} AND receiver_id={user_id}) OR (sender_id = {user_id} AND receiver_id={login_id})) "


# Returns recent chat history with one person. This chat history will be loaded
# when we open chat-window with one person. Note that by default we don't load
# entire chat history. We only load recent 20 messages. Older messages can be
# loaded if end user decides to scroll up in the history.
# 
# Sample input 1: {"user_id": 3, "older_than": None, "limit": 20}

# Sample input 2: {"user_id": 3, "older_than": 238,  "limit": 20}

# Sample output:
# {
#   "messages": [
#     {
#      "id": 123,
#      "sender_id": 4,
#      "name": "Sonu",
#      "content": "Hello, how are you?",
#      "chat_time": 1603000303,
#      "chat_time_str": "23-4-2021 04:50 PM",
#     },
#     {
#      "id": 135,
#      "sender_id": 3,
#      "name": "Mohit",
#      "content": "Good",
#      "chat_time": 1603000305,
#      "chat_time_str": "23-4-2021 04:52 PM",
#     },
#     {...},
#     ...
#     {"id": 231, "sender_id": 4, ...}
#   ],
#   "oldest_id": 123,
#   "newest_id": 231,
# }
#
# Sample input 1 is used by default when opening one-person chat window for the
# first time. This will load only 20 recent messages. If we want to load more
# older messages by scrolling it up, we can call this API with sample input 2
# with a specific `older_than` value. This API will return 20 more messages with
# that person having "id" less than `older_than` value. This way we can load
# older messages by calling this API again and again.
#
# Response: This API returns a list of messages, `oldest_id` and `newest_id`.
# Client should store `oldest_id` and `newest_id` values, so that these values
# can we used in subsequent `/get_old_messages` or `/get_new_messages` APIs.
# For example, when calling `/get_old_messages` again, client might pass this
# value for `older_than`. Similarly `newest_id` value can be used for calling
# '/get_new_messages' to get only new messages.

@backend.api('/get_old_messages')
def GetOldMessages(frontend_dict, session):
  frontend_dict["login_id"] = GetLoginId(session)
  query = ONE_PERSON_CHAT_QUERY
  if frontend_dict.get("older_than"):
    query += " AND chat.id < {older_than} "
  query += " ORDER BY chat.id desc LIMIT {limit}"
  frontend_dict["limit"] = frontend_dict.get("limit", 20)
  messages = db.readQuery(query, frontend_dict)
  messages = messages[::-1]
  for message in messages:
    PreprocessChatRow(message)
  output = {
    "messages": messages,
    "oldest_id": (0 if len(messages) == 0 else messages[0]["id"]),
    "newest_id": (0 if len(messages) == 0 else messages[-1]["id"])
  }
  return output



# Returns new messages with one person. This API should be called again and
# again using a timer to keep on looking for new messages.

# Sample input: {"user_id": 3, "newer_than": 238}

# Sample output: Format is same as output of '/get_old_messages' API with
# only one difference, `oldest_id` key will not be present.
# {
#   "messages": [
#     {
#      "id": 239,
#      "sender_id": 4,
#      "name": "Sonu",
#      "content": "Hello, how are you?",
#      "chat_time": 1603000303,
#      "chat_time_str": "23-4-2021 04:50 PM",
#     },
#     {...},
#     ...
#     {"id": 250, "sender_id": 4, ...}
#   ],
#   "newest_id": 250,
# }
#

# Client might want to store the `newest_id` returned from previous API, so
# that it can be used in next API call to `/get_new_messages`.

@backend.api('/get_new_messages')
def GetNewMessages(frontend_dict, session):
  frontend_dict["login_id"] = GetLoginId(session)
  query = ONE_PERSON_CHAT_QUERY + " AND chat.id > {newer_than} ORDER BY chat.id ASC"
  messages = db.readQuery(query, frontend_dict)
  for message in messages:
    PreprocessChatRow(message)
  output = {
    "messages": messages,
    "newest_id": (frontend_dict["newer_than"] if len(messages) == 0 else messages[-1]["id"])
  }
  return output


if __name__ == "__main__":
  backend.run(port=5504)
