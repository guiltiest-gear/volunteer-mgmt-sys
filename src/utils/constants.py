import os

MYSQL_URL = os.getenv("MYSQL_URL", default="localhost")
MYSQL_USER = os.getenv("MYSQL_USER", default="mysql")
MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD")
MYSQL_DATABASE = os.getenv("MYSQL_DATABASE", default="volunteerDB")
