import json

with open("./data/spotify_data.json", "r", encoding="utf-8") as f:
    spotify_data = json.load(f)

with open("./data/track_moods.json", "r", encoding="utf-8") as f:
    mood_data = json.load(f)

for album in spotify_data:
    new_tracks = []

    for track in album["tracks"]:
        if isinstance(track, str):
            track_title = track
            spotify_url = None
        else:
            track_title = track["title"]
            spotify_url = track.get("spotify")

        mood_info = mood_data.get(track_title, {
            "mood": [],
            "situation": [],
            "energy": "unknown",
            "keywords": []
        })

        new_tracks.append({
            "title": track_title,
            "spotify": spotify_url,
            **mood_info
        })

    album["tracks"] = new_tracks

with open("./data/merged_data.json", "w", encoding="utf-8") as f:
    json.dump(spotify_data, f, ensure_ascii=False, indent=2)