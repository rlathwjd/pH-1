import requests
import base64
import json
import time
import os
from dotenv import load_dotenv

load_dotenv()

client_id = os.getenv("SPOTIFY_CLIENT_ID")
client_secret = os.getenv("SPOTIFY_CLIENT_SECRET")

def get_token():
    url = "https://accounts.spotify.com/api/token"
    headers = {
        "Authorization": "Basic " + base64.b64encode(
            f"{client_id}:{client_secret}".encode()
        ).decode(),
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {"grant_type": "client_credentials"}

    res = requests.post(url, headers=headers, data=data)

    if res.status_code != 200:
        print("토큰 발급 실패:", res.status_code)
        print(res.text)
        return None

    return res.json()["access_token"]


def spotify_get(url, headers, params=None):
    while True:
        res = requests.get(url, headers=headers, params=params)

        if res.status_code == 429:
            retry_after = int(res.headers.get("Retry-After", 5))
            print(f"429 발생: {retry_after}초 대기")
            time.sleep(retry_after + 1)
            continue

        if res.status_code != 200:
            print("요청 실패:", res.status_code)
            print("REQUEST URL:", res.url)
            print(res.text[:500])
            return None

        return res.json()


def get_all_artist_albums(artist_id, headers):
    albums = []
    offset = 0
    limit = 10

    while True:
        data = spotify_get(
            f"https://api.spotify.com/v1/artists/{artist_id}/albums",
            headers=headers,
            params={
                "include_groups": "album,single",
                "market": "KR",
                "limit": limit,
                "offset": offset
            }
        )

        if data is None:
            break

        items = data.get("items", [])
        albums.extend(items)

        if not data.get("next"):
            break

        offset += limit
        time.sleep(1)

    return albums


def fetch_data():
    token = get_token()
    if token is None:
        return

    headers = {"Authorization": f"Bearer {token}"}

    # 아티스트 검색
    search_data = spotify_get(
        "https://api.spotify.com/v1/search",
        headers=headers,
        params={
            "q": "pH-1",
            "type": "artist",
            "limit": 1
        }
    )

    if search_data is None:
        return

    artist_id = search_data["artists"]["items"][0]["id"]

    # 앨범/싱글/참여 앨범 전체 가져오기
    albums = get_all_artist_albums(artist_id, headers)

    result = []
    seen_album_ids = set()

    # 앨범별로 트랙 가져오기
    for album in albums:
        if album["id"] in seen_album_ids:
            continue

        seen_album_ids.add(album["id"])

        tracks_data = spotify_get(
            f"https://api.spotify.com/v1/albums/{album['id']}/tracks",
            headers=headers,
            params={
                "market": "KR",
                "limit": 50
            }
        )

        if tracks_data is None:
            continue

        tracks = []

        for track in tracks_data["items"]:
            tracks.append({
                "title": track["name"],
                "spotify": track["external_urls"]["spotify"]
            })

        result.append({
            "title": album["name"],
            "date": album["release_date"],
            "image": album["images"][0]["url"] if album["images"] else "",
            "tracks": tracks
        })

        time.sleep(1)

    with open("data/spotify_data.json", "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    print("완료!")


fetch_data()