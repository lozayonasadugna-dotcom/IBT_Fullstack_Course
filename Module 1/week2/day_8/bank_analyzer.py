"""
Addis Bank - Console Transaction Analyzer
Features:
- Recursive balance calculation
- Merge sort for ordering transactions by amount/date
- Linear & Binary search
- Recursive threshold reporting
"""

from datetime import datetime


class AddisBankAnalyzer:
    def __init__(self):
        # Sample dataset: list of dicts
        self.transactions = [
            {"id": 101, "amount": 1500.0, "date": "2026-03-01", "type": "deposit"},
            {"id": 102, "amount": -200.0, "date": "2026-03-02", "type": "withdrawal"},
            {"id": 103, "amount": 4500.0, "date": "2026-03-05", "type": "deposit"},
            {"id": 104, "amount": -1200.0, "date": "2026-03-04", "type": "withdrawal"},
            {"id": 105, "amount": 800.0, "date": "2026-03-03", "type": "deposit"},
        ]

    # -------------------------------------------------------------
    # 1. Recursive Total Balance Calculation
    # -------------------------------------------------------------
    def calculate_balance_recursive(self, txns=None):
        if txns is None:
            txns = self.transactions

        # Base case
        if not txns:
            return 0.0

        # Recursive case: current amount + rest of list balance
        return txns[0]["amount"] + self.calculate_balance_recursive(txns[1:])

    # -------------------------------------------------------------
    # 2. Merge Sort Implementation (Sort by amount or date)
    # -------------------------------------------------------------
    def merge_sort(self, txns, key="amount"):
        if len(txns) <= 1:
            return txns

        mid = len(txns) // 2
        left_half = self.merge_sort(txns[:mid], key)
        right_half = self.merge_sort(txns[mid:], key)

        return self._merge(left_half, right_half, key)

    def _merge(self, left, right, key):
        merged = []
        i = j = 0

        while i < len(left) and j < len(right):
            val_left = left[i][key]
            val_right = right[j][key]

            if key == "date":
                val_left = datetime.strptime(val_left, "%Y-%m-%d")
                val_right = datetime.strptime(val_right, "%Y-%m-%d")

            if val_left <= val_right:
                merged.append(left[i])
                i += 1
            else:
                merged.append(right[j])
                j += 1

        merged.extend(left[i:])
        merged.extend(right[j:])
        return merged

    # -------------------------------------------------------------
    # 3. Linear Search (Unsorted Data)
    # -------------------------------------------------------------
    def linear_search_by_id(self, txn_id):
        for txn in self.transactions:
            if txn["id"] == txn_id:
                return txn
        return None

    # -------------------------------------------------------------
    # 4. Binary Search (Requires Sorted Data)
    # -------------------------------------------------------------
    def binary_search_by_amount(self, sorted_txns, target_amount):
        left, right = 0, len(sorted_txns) - 1

        while left <= right:
            mid = (left + right) // 2
            if sorted_txns[mid]["amount"] == target_amount:
                return sorted_txns[mid]
            elif sorted_txns[mid]["amount"] < target_amount:
                left = mid + 1
            else:
                right = mid - 1

        return None

    # -------------------------------------------------------------
    # BONUS: Recursive Report Generation (Above Threshold)
    # -------------------------------------------------------------
    def filter_above_threshold_recursive(self, threshold, txns=None):
        if txns is None:
            txns = self.transactions

        # Base Case
        if not txns:
            return []

        # Recursive Case
        rest = self.filter_above_threshold_recursive(threshold, txns[1:])
        if abs(txns[0]["amount"]) >= threshold:
            return [txns[0]] + rest
        return rest


# --- Console Application Execution ---
if __name__ == "__main__":
    app = AddisBankAnalyzer()

    print("==========================================")
    print("      ADDIS BANK TRANSACTION ANALYZER     ")
    print("==========================================")

    # 1. Recursive Balance
    balance = app.calculate_balance_recursive()
    print(f"\n[1] Total Account Balance: {balance:.2f} ETB")

    # 2. Sorting
    sorted_by_amount = app.merge_sort(app.transactions, key="amount")
    print("\n[2] Transactions Sorted by Amount:")
    for t in sorted_by_amount:
        print(f"    ID: {t['id']} | Amount: {t['amount']:>8.2f} ETB | Date: {t['date']}")

    # 3. Linear Search
    search_id = 103
    result_ls = app.linear_search_by_id(search_id)
    print(f"\n[3] Linear Search (ID = {search_id}):")
    print(f"    Found: {result_ls}")

    # 4. Binary Search
    target_amt = 800.0
    result_bs = app.binary_search_by_amount(sorted_by_amount, target_amt)
    print(f"\n[4] Binary Search (Amount = {target_amt} ETB):")
    print(f"    Found: {result_bs}")

    # 5. Bonus: Recursive Threshold Report
    threshold = 1000.0
    large_txns = app.filter_above_threshold_recursive(threshold)
    print(f"\n[5] Report: Transactions >= {threshold:.2f} ETB:")
    for t in large_txns:
        print(f"    ID: {t['id']} | Amount: {t['amount']:>8.2f} ETB")