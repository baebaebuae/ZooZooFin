import json

# JSON data
query = input("json 파일명 입력: ")
path = f'./{query}.json'
with open(path, mode='r', encoding='utf-8') as json_file:
    data = json.load(json_file)

def build_script_tree(scripts, scriptId=1, indent=0, visited=None):
    if visited is None:
        visited = set()

    tree = ''
    script = next((s for s in scripts if s['scriptId'] == scriptId), None)
    
    if script:
        if scriptId in visited:
            tree += '  ' * indent + f"(Return: Script {scriptId})\n"
            return tree
        visited.add(scriptId)

        tree += '  ' * indent + "Script {}: {}\n".format(script['scriptId'], script['content'].replace("\n", " "))


        
        for response in script.get('responses', []):
            if response['selection']:
                tree += '  ' * (indent + 1) + f"- {response['selection']}\n"
            if response['nextScript'] is not None:
                next_indent = indent + 2 if response['nextScript'] != 0 else indent  # Keep same indentation for Script 0
                tree += build_script_tree(scripts, response['nextScript'], next_indent, visited)
    
    return tree

script_tree = build_script_tree(data)
print(script_tree)

import matplotlib.pyplot as plt
from matplotlib import font_manager

def save_tree_as_image(script_tree, filename=f"{query}.png"):
    fig, ax = plt.subplots(figsize=(10, 10))
    ax.text(0.05, 0.95, script_tree, fontsize=10, verticalalignment='top', fontfamily='NanumGothic')
    ax.axis('off')
    plt.savefig(filename, bbox_inches='tight', dpi=300)

save_tree_as_image(script_tree)

