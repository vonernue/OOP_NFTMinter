import psycopg2
import paramiko
from sshtunnel import SSHTunnelForwarder

def connectToDB():
  host = "13.115.231.25"
  username = "ubuntu"
  dbname = "timescaledb"
  user = "postgres"
  password = "oop666"
  sslmode = "require"

  # mypkey = paramiko.RSAKey.from_private_key_file('/Users/siang/.ssh/oop.cer')
  # tunnel =  SSHTunnelForwarder(
  #         (host, 22),
  #         ssh_username = username,
  #         ssh_pkey = mypkey,
  #         remote_bind_address=('localhost', 5432),
  #         local_bind_address=('127.0.0.1', ))
  # tunnel.start()

  conn = psycopg2.connect(dbname = dbname, user = user, password = password, host = 'localhost', port = tunnel.local_bind_port)
  print("Connection established")

  cursor = conn.cursor()
  
  # Clean up
  return conn, cursor
  

def insert(conn, cursor, age, gender):
    cursor.execute(f"INSERT INTO people (age, gender) VALUES ({age}, \'{gender}\');")
    print("Inserted 1 rows of data")
    conn.commit()

def disConnect(conn, cursor):
    cursor.close()
    conn.close()




if __name__ == "__main__":
  print("Start connect")
  connectToDB()
  print("End")