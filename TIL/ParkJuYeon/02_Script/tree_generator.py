from tree_module import TreeNode, IDGenerator
import json

def build_tree_from_inputs(script_input):
    id_generator = IDGenerator()
    nodes = {}

    # "script" 리스트 추출
    inputs = script_input[0]['script']

    # 노드 생성
    for entry in inputs:
        node = TreeNode(content=entry['content'])
        node.id = entry['id']  # 사용자 입력의 ID 사용
        nodes[entry['id']] = node

    # 응답 및 자식 노드 설정
    for entry in inputs:
        node = nodes[entry['id']]
        responses = entry.get('responses', {})

        for response, next_id in responses.items():
            if next_id in nodes:
                node.add_response(response, next_id)

    # 자식 노드 추가
    for entry in inputs:
        node = nodes[entry['id']]
        responses = entry.get('responses', {})

        for next_id in responses.values():
            if next_id in nodes:
                child_node = nodes[next_id]
                node.add_child(child_node)

    # 루트 노드 찾기
    root_id = next(id for id in nodes if not any(id in node.responses.values() for node in nodes.values()))
    root = nodes[root_id]

    return root


def load_inputs_from_json(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return json.load(file)


def save_to_json(file_path, data):
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=2)


script_json = load_inputs_from_json('tutorial.json')

# 트리 생성
root = build_tree_from_inputs(script_json)

# 트리 구조를 JSON으로 변환 (ensure_ascii=False 추가)
tree_json = json.dumps(root.to_dict(), ensure_ascii=False, indent=4)
print(tree_json)
save_to_json('script_tree.json', root.to_dict())