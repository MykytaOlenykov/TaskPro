import json
from pathlib import Path


dirStatic = Path(__file__).parent / "src" / "static" / "backgrounds"

data = []
first = True

for dir in dirStatic.iterdir():
    dir_name = dir.name

    if first:
        if dir_name == "preview":
            for file in dir.iterdir():
                idx = str(file).index("/static")
                data.append(
                    {"id": file.name.replace(".jpg", ""), "previewUrl": str(file)[idx:]}
                )
        first = False
    else:
        for file in dir.iterdir():
            file_id = file.name.replace(".jpg", "").replace("@2x", "")
            idx = str(file).index("/static")

            for p, d in enumerate(data):
                if d["id"] != file_id:
                    continue

                if dir_name not in data[p]:
                    data[p][dir_name] = {}

                if "@2x" in file.name:
                    data[p][dir_name]["largeUrl"] = str(file)[idx:]
                else:
                    data[p][dir_name]["baseUrl"] = str(file)[idx:]

                break

for d in data:
    del d["id"]


dataPath = Path(__file__).parent / "fixtures" / "init-db"

with open(dataPath / "backgrounds.json", "w") as fp:
    json.dump(data, fp=fp, indent=2)

dirStatic = Path(__file__).parent / "src" / "static" / "icons"


data = []

for file in dirStatic.iterdir():
    idx = str(file).index("/static")

    data.append({"url": str(file)[idx:]})

with open(dataPath / "icons.json", "w") as fp:
    json.dump(data, fp=fp, indent=2)
