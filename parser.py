import sys
import json
from bs4 import BeautifulSoup

def main():
    # Read data from stdin
    html = json.loads(sys.stdin.read())
    # Do something with the html
    print("HTML received from Node.js.")
    soup = BeautifulSoup(html, 'html.parser')
    print(soup.title)

if __name__ == "__main__":
    main()
