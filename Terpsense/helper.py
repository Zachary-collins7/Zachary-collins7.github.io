import json
import random
import string
import os
dir_path = os.path.dirname(os.path.realpath(__file__))



def randomName(L):
    def randomStrGen(N):
        return ''.join(random.choices(string.ascii_uppercase + string.digits, k=N))
    strLens = [random.randrange(2, 10) for _ in range(L)]
    return " ".join(randomStrGen(N) for N in strLens)


def createProducts(count):
    def budLink(i):
        return f"https://zachary-collins7.github.io/Terpsense/image/bud{i%3}.png"

    for i in range(count):
        product = {
            "id": i,
            "dispensary_id": random.randrange(0, 3),
            "name": randomName(4),
            "description": randomName(20),
            "image": budLink(i),
            "type": "bud",
            "created_at": "2022-02-18T04:03:40.000000Z",
            "updated_at": "2022-02-18T04:03:40.000000Z"
        }

    with open(f"{dir_path}/api/product/{i}.json", "w") as f:
        json.dump(product, f)


def createDispos(count):
    def dispoLink(i):
        return f"https://picsum.photos/{i}/101/300/300"

    for i in range(count):
        dispo = {
            "id": i,
            "user_id": 5,
            "name": randomName(4),
            "description": randomName(20),
            "image": dispoLink(i),
            "address": "abc",
            "long": "0.0000000",
            "lat": "0.0000000",
            "created_at": "2022-02-18T04:03:40.000000Z",
            "updated_at": "2022-02-18T04:03:40.000000Z"
        }
    
        with open(f"{dir_path}/api/dispo/{i}.json", "w") as f:
            json.dump(dispo, f)


def createFeed(count, contentCount):
    sectionCount = 5
    sectionNames = [
        ["For you", "Popular near you"],
        ["Nearby Dispensaries"],
        ["Weed > alc?"]
    ]
    slugs = [
        "product",
        "dispo",
        "banner"
    ]
    sectionTypes = [
        "scroll",
        "highlight",
        "banner"
    ]    

    for i in range(count):
        sections = []
        for j in range(sectionCount):
            sectionType = 1 if random.random() <= 0.1 else 0 # 0 = scroll | 10% chance of highlight
            sectionContentType = random.randrange(0, 3)  # 0 = product
            contentCount = random.randrange(5, 30)

            if sectionContentType == 2: #force matching sectionType if slug is banner
                sectionType = 2
                
            if sectionType > 0: #force 1 content if highlight or banner
                countentCount = 1

            newSection = {
                "title": random.choice(sectionNames[sectionContentType]),
                "description": randomName(10),
                "type": sectionTypes[sectionType],
                "slug": slugs[sectionContentType],
                "content": random.choices(range(30), k=contentCount)
            }
            sections.append(newSection)

        feed = {
            "sections": sections,
        }

        with open(f"{dir_path}/api/feed/{i}.json", "w") as f:
            json.dump(feed, f)


productCount, dispoCount = 50, 50
createProducts(productCount)
createDispos(dispoCount)
createFeed(30, min(productCount, dispoCount))
