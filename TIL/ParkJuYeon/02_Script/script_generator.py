from tree_module import TreeNode, IDGenerator
import json

id_generator = IDGenerator()

# 트리 노드 생성
root = TreeNode(content="Start")

node_a = TreeNode(content="Dialogue A")
node_b = TreeNode(content="Dialogue B")

choice_a1 = TreeNode(content="Choice A1")
choice_a2 = TreeNode(content="Choice A2")
choice_b1 = TreeNode(content="Choice B1")

root.add_child(node_a)
root.add_child(node_b)

node_a.add_child(choice_a1)
node_a.add_child(choice_a2)
node_b.add_child(choice_b1)

# 응답 설정
root.add_response("Go to A", node_a.id)
root.add_response("Go to B", node_b.id)
node_a.add_response("Choice A1", choice_a1.id)
node_a.add_response("Choice A2", choice_a2.id)
node_b.add_response("Choice B1", choice_b1.id)

tree_json = json.dumps(root.to_dict(), indent=4)
print(tree_json)
