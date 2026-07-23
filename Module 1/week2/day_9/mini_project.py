import heapq
from collections import deque

# ==========================================
# DATA STRUCTURE DEFINITIONS
# ==========================================

# 1. TREE: Branch Hierarchy
class TreeNode:
    """Node representing a branch or staff position in the bank hierarchy."""
    def __init__(self, name):
        self.name = name
        self.children = []

    def add_child(self, child_node):
        self.children.append(child_node)

    def print_tree(self, level=0):
        indent = "  " * level
        print(f"{indent}- {self.name}")
        for child in self.children:
            child.print_tree(level + 1)


# 2. BST: Customer Account Storage
class BSTNode:
    """Node in a BST storing customer account numbers."""
    def __init__(self, account_num, owner):
        self.account_num = account_num
        self.owner = owner
        self.left = None
        self.right = None

class AccountBST:
    """BST for fast account lookups - Search/Insert: O(log n) average."""
    def __init__(self):
        self.root = None

    def insert(self, account_num, owner):
        if not self.root:
            self.root = BSTNode(account_num, owner)
        else:
            self._insert(self.root, account_num, owner)

    def _insert(self, node, account_num, owner):
        if account_num < node.account_num:
            if node.left is None:
                node.left = BSTNode(account_num, owner)
            else:
                self._insert(node.left, account_num, owner)
        else:
            if node.right is None:
                node.right = BSTNode(account_num, owner)
            else:
                self._insert(node.right, account_num, owner)

    def search(self, account_num):
        return self._search(self.root, account_num)

    def _search(self, node, account_num):
        if node is None or node.account_num == account_num:
            return node
        if account_num < node.account_num:
            return self._search(node.left, account_num)
        return self._search(node.right, account_num)


# 3. GRAPH: Customer Money Transfers
class TransferGraph:
    """Adjacency list graph representing financial network transfers."""
    def __init__(self):
        self.graph = {}

    def add_customer(self, name):
        if name not in self.graph:
            self.graph[name] = []

    def add_connection(self, sender, receiver):
        self.add_customer(sender)
        self.add_customer(receiver)
        self.graph[sender].append(receiver)

    def bfs(self, start_node):
        """Breadth-First Search to find all reachable nodes - O(V + E)."""
        if start_node not in self.graph:
            return []
        visited = set([start_node])
        queue = deque([start_node])
        reachable = []

        while queue:
            curr = queue.popleft()
            reachable.append(curr)
            for neighbor in self.graph[curr]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        return reachable


# ==========================================
# MAIN APPLICATION INTERFACE
# ==========================================

def main():
    # Initialize Structures
    root_branch = TreeNode("Addis Bank Head Office")
    transfer_net = TransferGraph()
    priority_queue = []  # Min-Heap
    account_bst = AccountBST()

    # Pre-populate sample BST account numbers
    sample_accounts = [(1002, "Almaz"), (1001, "Dawit"), (1005, "Tigist"), (1003, "Hanna")]
    for acc_no, owner in sample_accounts:
        account_bst.insert(acc_no, owner)

    while True:
        print("\n==========================================")
        print("    ADDIS BANK NETWORK & PRIORITY SYSTEM  ")
        print("==========================================")
        print("1. Add new branch / employee (Tree)")
        print("2. Add money transfer connection (Graph)")
        print("3. Show connected customers using BFS (Graph)")
        print("4. Add urgent transaction (Heap)")
        print("5. Process highest priority transaction (Heap)")
        print("6. Search customer account in BST")
        print("7. Display Bank Hierarchy (Tree)")
        print("8. Exit")
        
        choice = input("Enter choice (1-8): ").strip()

        if choice == "1":
            name = input("Enter branch/employee name: ").strip()
            new_node = TreeNode(name)
            root_branch.add_child(new_node)
            print(f"[O(1)] Added '{name}' under Head Office.")

        elif choice == "2":
            sender = input("Enter Sender Name: ").strip()
            receiver = input("Enter Receiver Name: ").strip()
            transfer_net.add_connection(sender, receiver)
            print(f"[O(1)] Transfer path added: {sender} -> {receiver}")

        elif choice == "3":
            start = input("Enter starting customer name: ").strip()
            connected = transfer_net.bfs(start)
            print(f"[O(V + E)] Customers reachable from {start}: {connected}")

        elif choice == "4":
            desc = input("Enter transaction description: ").strip()
            while True:
                prio_input = input("Enter priority level (e.g., 1 for High, 5 for Low): ").strip()
                try:
                    prio = int(prio_input)
                    break
                except ValueError:
                    print("❌ Invalid input! Please enter a number (e.g., 1, 2, 3).")

            heapq.heappush(priority_queue, (prio, desc))
            print(f"[O(log n)] Added transaction '{desc}' with priority {prio}.")

        elif choice == "5":
            if priority_queue:
                prio, desc = heapq.heappop(priority_queue)
                print(f"[O(log n)] Processed Highest Priority: [{prio}] {desc}")
            else:
                print("Priority Queue is empty!")

        elif choice == "6":
            while True:
                acc_input = input("Enter Account Number to search: ").strip()
                try:
                    acc_num = int(acc_input)
                    break
                except ValueError:
                    print("❌ Invalid input! Account numbers must be digits (e.g., 1001).")

            node = account_bst.search(acc_num)
            if node:
                print(f"[O(log n) Avg] Found! Account #{node.account_num} belongs to {node.owner}.")
            else:
                print(f"[O(log n) Avg] Account #{acc_num} not found.")

        elif choice == "7":
            print("\n--- Current Bank Hierarchy ---")
            root_branch.print_tree()

        elif choice == "8":
            print("Exiting Addis Bank System. Goodbye!")
            break
        else:
            print("Invalid selection. Try again.")

if __name__ == "__main__":
    main()