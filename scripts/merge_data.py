import json

with open("spotify_data.json", "r", encoding="utf-8") as f:
    spotify_data = json.load(f)

with open("track_moods.json", "r", encoding="utf-8") as f:
    mood_data = json.load(f)

for album in spotify_data:
    new_tracks = []

    for track in album["tracks"]:
        track_title = track if isinstance(track, str) else track["title"]

        mood_info = mood_data.get(track_title, {
            "mood": [],
            "situation": [],
            "energy": "unknown",
            "keywords": []
        })

        new_tracks.append({
            "title": track_title,
            **mood_info
        })

    album["tracks"] = new_tracks

with open("merged_data.json", "w", encoding="utf-8") as f:
    json.dump(spotify_data, f, ensure_ascii=False, indent=2)