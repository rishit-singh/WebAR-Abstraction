import requests
import json
import os
import requests

class EndPointEnum:
    Repos = int(0)
    Stars = int(1)

class HTTP:
    def Get(url: str, headers: dict()):
       req = Request()

class GithubSession:
    BaseURL = str("https://api.github.com")

    APIKey = str()
    
    EndPointStrings = list(["/repos"])

    def GetEndPoint(endPoint: int):
        if (not(endPoint in range(2))):
            return None
        return str(f"{}")
    def GetAPIKey(self):
        try:
            self.APIKey = os.environ["GH_KEY"]
            return self.APIKey
        except:
            print("Failed to verify API key.")
        return str() 

    def __init__(self, keyVar: str):
        self.GetAPIKey()

    def Authorize():
         
        return
    
    def GetRepos():
         

