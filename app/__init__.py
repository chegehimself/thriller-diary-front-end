"""
Code used to initialize the app module

PEP8 demands that names of constants should be in all caps.
Pylint, as PEP8, expects module level variables to be "constants".
"""
from flask import Flask

# Initialize the app
app = Flask(__name__, instance_relative_config=True)
app.secret_key = 'knowledge_comes_but_wisdom_lingers'

from app import views

# Load the config file
app.config.from_object('instance.config')
