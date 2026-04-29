import requests
import base64
import json
import time

client_id = "cbb734ec170d4ca482b5a8bab13e7332"
client_secret = "afd7f679b32a49d8b992d2f5ef967cb8"

def get_token():
    url = "https://accounts.spotify.com/api/token"
    headers = {
        "Authorization": "Basic " + base64.b64encode(f"{client_id}:{client_secret}".encode()).decode(),
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {"grant_type": "client_credentials"}

    res = requests.post(url, headers=headers, data=data)
    return res.json()["access_token"]

def fetch_data():
    token = get_token()
    headers = {"Authorization": f"Bearer {token}"}

    # 아티스트 검색
    res = requests.get(
        "https://api.spotify.com/v1/search",
        headers=headers,
        params={"q": "pH-1", "type": "artist", "limit": 1}
    )
    artist_id = res.json()["artists"]["items"][0]["id"]

    # 앨범 가져오기
    res = requests.get(
        f"https://api.spotify.com/v1/artists/{artist_id}/albums",
        headers=headers,
        params={"limit": 10}
    )

    albums = res.json()["items"]
    result = []

    for album in albums:
        tracks_res = requests.get(
            f"https://api.spotify.com/v1/albums/{album['id']}/tracks",
            headers=headers
        )

        tracks = [t["name"] for t in tracks_res.json()["items"]]

        result.append({
            "title": album["name"],
            "date": album["release_date"],
            "image": album["images"][0]["url"] if album["images"] else "",
            "tracks": tracks
        })

    with open("spotify_data.json", "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    print("완료!")

fetch_data()