from collections import deque
import heapq

# 1. BST Node & In-Order Traversal
class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def insert(node, value):
    if node is None:
        return Node(value)
    if value < node.value:
        node.left = insert(node.left, value)
    else:
        node.right = insert(node.right, value)
    return node

def in_order(node):
    if node is None:
        return
    in_order(node.left)
    print(node.value, end=" ")
    in_order(node.right)

# 2. Recursive Tree Depth
def height(node):
    if node is None:
        return 0
    return 1 + max(height(node.left), height(node.right))

# 3 & 4. Graph BFS and DFS
def bfs(graph, start):
    seen = {start}
    q = deque([start])
    order = []
    while q:
        node = q.popleft()
        order.append(node)
        for neighbor in graph.get(node, []):
            if neighbor not in seen:
                seen.add(neighbor)
                q.append(neighbor)
    return order, seen

def dfs(graph, start, seen=None):
    if seen is None:
        seen = set()
    seen.add(start)
    for neighbor in graph.get(start, []):
        if neighbor not in seen:
            dfs(graph, neighbor, seen)
    return seen

# 5. Priority Queue (5 Tuples)
pq = []
tasks = [(3, "Audit"), (1, "Fraud Alert"), (5, "Log Maintenance"), (2, "Wire Transfer"), (4, "Backup")]
for t in tasks:
    heapq.heappush(pq, t)

while pq:
    print(heapq.heappop(pq))