class IDGenerator:
    def __init__(self):
        self.current_id = 0
    
    def get_next_id(self):
        self.current_id += 1
        return self.current_id

id_generater= IDGenerator()

class TreeNode:
    def __init__(self, content, responses=None):
        self.id = id_generater.get_next_id()
        self.content = content
        self.responses = responses if responses is not None else {}
        self.children = []

    def add_response(self, response, next_node_id):
        self.responses[response] = next_node_id

    def add_child(self, child_node):
        self.children.append(child_node)

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'responses': self.responses,
            'children': [child.to_dict() for child in self.children]
        }