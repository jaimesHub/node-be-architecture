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

- git checkout -b day-X
- @day-x.md 
  - summary 
  - taking notes
- Commit each part that you think is important to log

---

STEP 5: Coding finished

- Updating @practice/STATUS.md file (Manually updating)
- Openning Claude Code
  - Add context such as providing @practice/STATUS.md, @practice/docs/day-x.md files + using git diff on the current branch (day-x) to summary what've DONE
  - Create a description for PR first
  - User review -&gt; Reject/Approve
  - Approve -&gt; Use above research to create a new PR to merge into main branch
  - DRAFT PROMPT
    ```markdown
        Đã update xong @practice/STATUS.md, @practice/docs/day-X.md. Kết hợp 2 files này kèm git commit history của branch day-X để summary lại những gì đã hoàn thành cho Day X.
    
        Tạo description cho PR để MR từ day-X branch vào main branch.
    
        Sau khi tôi review xong thì thực hiện:
    
        1. commit & push code hiện tại lên day-X branch 
    
        2. tạo PR để MR từ day-X vào main branch (sau khi APPROVED)
    ```

