from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import requests
import re
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class RecommendRequest(BaseModel):
    moods: List[str]

with open("./data/merged_data.json", "r", encoding="utf-8") as f:
    music_data = json.load(f)

# llm 응답 파싱
def parse_llm_json(text):
    text = text.replace("```json", "").replace("```", "").strip()

    match = re.search(r"\[.*\]", text, re.DOTALL)
    if not match:
        return []

    try:
        return json.loads(match.group())
    except json.JSONDecodeError:
        return []

@app.post("/recommend")
def recommend(req: RecommendRequest):
    # 후보곡 먼저 줄이기
    candidates = []

    for album in music_data:
        for track in album["tracks"]:
            tag_text = " ".join(
                track.get("mood", []) +
                track.get("situation", []) +
                track.get("keywords", [])
            )

            if any(mood in tag_text for mood in req.moods):
                candidates.append({
                    "title": track["title"],
                    "album": album["title"],
                    "spotify": track.get("spotify"),
                    "mood": track.get("mood", []),
                    "situation": track.get("situation", []),
                    "keywords": track.get("keywords", []),
                    "image": album["image"]
                })

    candidates = candidates[:8]

    prompt = f"""
너는 pH-1 팬사이트의 음악 추천 AI야.

사용자 취향: {", ".join(req.moods)}

아래 후보곡 중에서 사용자 취향에 가장 잘 맞는 곡 3개를 골라줘.
반드시 서로 다른 곡 3개를 선택해.
같은 곡 또는 동일한 제목은 절대 중복해서 선택하지 마.
반드시 JSON 배열만 출력해.
설명 문장, 코드블록, ```json, 마크다운은 절대 쓰지 마.

[
  {{
    "title": "곡 제목",
    "album": "앨범명",
    "reason": "추천 이유를 짧고 자연스럽게 작성"
  }}
]

후보곡:
{json.dumps(candidates, ensure_ascii=False, indent=2)}
"""

    res = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "gemma3",
            "prompt": prompt,
            "stream": False
        }
    )

    llm_text = res.json()["response"]
    recommendations = parse_llm_json(llm_text)

    for rec in recommendations:
        for cand in candidates:
            if rec.get("title") == cand.get("title") and rec.get("album") == cand.get("album"):
                rec["image"] = cand.get("image")
                rec["spotify"] = cand.get("spotify")
                break

    return {
        "moods": req.moods,
        "recommendations": recommendations
    }