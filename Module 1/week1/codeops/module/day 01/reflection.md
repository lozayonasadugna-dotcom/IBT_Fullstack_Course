1. What is the difference between Git and GitHub? 

Git → a tool on your computer that tracks and manages changes in your code (local version control).

GitHub → an online platform that hosts Git repositories, making them shareable and collaborative.

👉 In practice: Git manages your project history; GitHub lets you store and work on that history with others online.

2. What is the purpose of the terminal?
Purpose of the terminal: It’s the interface where you type commands directly to your computer.

In practice: You use it to run Git commands (like git init, git add, git commit) and interact with your local repository.

Key idea: The terminal gives you direct control over your system and tools like Git, rather than relying on graphical menus.

👉 Put simply: The terminal is where you execute commands to manage files, projects, and version control tasks efficiently.

3. What does git add do?
git add purpose: It stages changes (files you’ve modified or created) and prepares them to be included in the next commit.

In practice: When you run git add filename, that file is marked as “ready to commit.”

Key idea: It doesn’t save the changes yet — it just moves them into the staging area, so the next git commit will record them in the repository history.

👉 Put simply: git add tells Git which changes you want to include in your next snapshot.

4. What is the purpose of git commit?

Purpose of git commit: It permanently records the changes you’ve staged (with git add) into the repository’s history.

In practice: Each commit creates a snapshot of your project at that point in time, along with a message describing what changed.

Key idea: Commits are the building blocks of version control — they let you track progress, roll back if needed, and share a clear history of your work.

👉 Put simply: git commit saves your staged changes into the project’s timeline.

5. Write the daily Git workflow in the correct order.

Based on the Day 1 Practical Exercise document, the daily Git workflow is shown step by step:

Initialize a Git repository → git init

Check the repository status → git status

Stage files → git add

Commit changes → git commit -m "message"

Push to GitHub → git push

👉 In short: init → status → add → commit → push — that’s the daily Git workflow in the correct order.
