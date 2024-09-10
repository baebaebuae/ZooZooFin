import json
import os

FILE_PATH = 'tutorial.json'  # 고정된 파일 경로


def load_json():
    if os.path.exists(FILE_PATH):
        with open(FILE_PATH, 'r', encoding='utf-8') as file:
            return json.load(file)
    return {"category": "tutorial", "script": [], "actions": []}


def save_json(data):
    with open(FILE_PATH, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=2)


def get_next_id():
    data = load_json()
    # print(data[0]['script'])
    scripts = len(data[0]['scripts'])
    # print(scripts)

    if not scripts:
        return 1
    return scripts + 1


def create_item(content, responses=None, item_type='script'):
    if item_type not in ['script', 'action']:
        raise ValueError("Invalid item_type. Must be 'script' or 'action'.")

    load_data = load_json()
    data = load_data[0]['scripts']

    next_id = get_next_id()
    item = {
        "id": next_id,
        "type": item_type,
        "content": content,
        "responses": responses
    }

    data.append(item)
    print(load_data)
    save_json(load_data)
    return next_id


def read_item(id):
    load_data = load_json()
    data = load_data[0]['scripts']

    for item in data:
        if item['id'] == id:
            return item
    return None


def update_item(id, new_content, new_responses):
    load_data = load_json()
    data = load_data[0]['scripts']

    for item in data:
        if item['id'] == id:
            item['content'] = new_content
            item['responses'] = new_responses
            break

    save_json(load_data)


# 예시 사용법
# item_id = create_item("test2")
# print(f"Created item ID: {item_id}")

# print(read_item(item_id))

# update_item(item_id, "업데이트된 내용", {"next": 3})
