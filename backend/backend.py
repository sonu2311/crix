from flask_lib import FlaskLib
import time

backend = FlaskLib()

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

backend.run(port=5504)
