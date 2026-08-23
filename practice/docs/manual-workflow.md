# Manual Workflow

> Brief description: This document is for taking some notes/steps for starting a new day

---

STEP 1: Review old working logs at @../STATUS.md, then updating if anything's not finished yet.

> - RULE: Before starting A NEW DAY-X, checking @practice/STATUS.md FIRST!

---

STEP 2: Add a new DAY-X with defined template at @../STATUS.md based on previous DAY notes

Example:

DAY {X}: {Things to learn}

NOTES: TBD

STATUS: INPROGRESS

BRANCH: day-{X}

---

STEP 3: Add more a new DAY-Y

Example:

DAY {Y}:TBD

NOTES: TBD

STATUS: TODO

BRANCH: TBD

---

STEP 4: Let's coding

- nvm use v19.1.0

---

STEP 5: Coding finished

- Updating @practice/STATUS.md file (Manually updating)
- Openning Claude Code
  - Add context such as providing @practice/STATUS.md, @practice/docs/day-x.md files + using git diff on the current branch (day-x) to summary what've DONE
  - Use above research to create a new PR to merge into main branch

