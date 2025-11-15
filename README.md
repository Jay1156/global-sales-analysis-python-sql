# Sales EDA + To‑Do (localStorage) Repo

This repository contains:

- notebooks/data_cleaning_and_EDA.ipynb — the notebook you provided (data cleaning & EDA).
- sql/SQLQuery1.sql — your SQL queries (moved to the `sql/` folder).
- todo/index.html, todo/styles.css, todo/app.js — a small To‑Do list web application that uses localStorage (works in any browser; no server required).
- .gitignore — common ignores for Python/Jupyter and static projects.

How to use
- To view the notebook:
  1. Place `sales_data_sample.csv` in the `notebooks/` folder (if not already there).
  2. Open `notebooks/data_cleaning_and_EDA.ipynb` in JupyterLab or Jupyter Notebook.

- To use the To‑Do app:
  1. Open `todo/index.html` in a browser.
  2. Add tasks, edit, mark complete, delete — tasks persist via `localStorage`.

How to push these files to GitHub (example)
1. Create a new GitHub repo (or use `gh` CLI):
   - gh repo create YOUR_USERNAME/YOUR_REPO --public --source=. --remote=origin --push

2. Or from your terminal (after creating repo):
   - git init
   - git checkout -b main
   - git add .
   - git commit -m "Add notebook, SQL queries, and todo app (localStorage)"
   - git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO.git
   - git push -u origin main

Notes
- The To‑Do app is purely front-end and stores tasks in the browser's localStorage.
- The notebook already saves figures (revenue_trend.png, top_products.png) when run.
