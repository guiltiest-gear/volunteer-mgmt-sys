import pymysql.cursors  # pyright: ignore[reportUnusedImport]

from .constants import *

def init_tables() -> None:
    """Create the tables in the database"""
    connection = pymysql.connect(
        host=MYSQL_URL,
        user=MYSQL_USER,
        password=MYSQL_PASSWORD,
        database=MYSQL_DATABASE,
    )

    with connection:
        # Create the user_auth table
        # This needs to be done first as user_info depends on user_auth
        with connection.cursor() as cursor:
            # sql = "CREATE TABLE IF NOT EXISTS `user_auth` (`pw_id` INT AUTO_INCREMENT PRIMARY_KEY, `pw_salt` CHAR(64) NOT NULL, `pw_hash` CHAR(64) NOT NULL)"
            auth_sql: str = (
                "CREATE TABLE IF NOT EXISTS `user_auth` ("
                "`pw_id` INT AUTO_INCREMENT PRIMARY_KEY,"
                "`pw_salt` CHAR(64) NOT NULL,"
                "`pw_hash` CHAR(64) NOT NULL"
                ")"
            )
            _ = cursor.execute(auth_sql)
        connection.commit()

        # Create the user_info table
        with connection.cursor() as cursor:
            user_sql: str = (
                "CREATE TABLE IF NOT EXISTS `user_info` ("
                "`user_id` INT AUTO_INCREMENT PRIMARY_KEY,"
                "`name` VARCHAR(255)"
                "CONSTRAINT `fk_auth` FOREIGN KEY (`pw_id`) REFERENCES user_auth(`pw_id`)"
                ")"
            )
            _ = cursor.execute(user_sql)
        connection.commit()
