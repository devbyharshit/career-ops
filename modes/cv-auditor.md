# Mode: cv-auditor — The Recruiter & ATS Pre-Flight Check

This mode acts as a strict "Insider Audit" from the perspective of an Applicant Tracking System (ATS) parser and a human recruiter evaluating a CV for 6 seconds. It helps the user fix issues before generating the final PDF.

## Input

Read `cv.md` (and `article-digest.md` if available). 
Optionally, read the target Job Description if the user provides it.

## Block 1: ATS Parsing Optimization

Simulate how systems like Workday, Taleo, Greenhouse, and Lever parse the CV.

**Identify traps:**
- Are there non-standard date formats? (ATS prefers MM/YYYY or Month Year, e.g., 01/2023 or Jan 2023)
- Are section headers clear and standard? (Experience, Education, Skills)
- Are there multi-column layouts implied by formatting that might get flattened incorrectly?
- Are keywords missing or buried? Evaluate "Hard Requirements" (must exact-match) vs "Soft Preferences".

*Actionable output*: Provide a list of structural changes required for 100% clean parsing.

## Block 2: The "Recruiter Eye" Scorecard (STAR Density)

Human recruiters scan for proof, not claims. Review the bullet points in the Work Experience section.

**Measure the STAR method density (Situation, Task, Action, Result):**
- **Weak:** "Responsible for project management and cloud migration." (Just listing a duty)
- **Strong:** "Led a cross-functional team of 5 (Task) using Agile (Action), migrating the legacy monolith to AWS and reducing delivery time by 20% (Result)."

*Actionable output*: 
1. Highlight the **Top 3 strongest bullets** in the CV that will hook a recruiter.
2. Flag the **Top 3 weakest bullets** (the "fluff") that need rewriting. Provide a suggested rewrite for each using the STAR format, pulling metrics from `article-digest.md` if available.

## Block 3: Red Flag Detection

Recruiters are trained to spot risks. Highlight any:
- Unexplained employment gaps (> 3-6 months)
- Job hopping patterns (multiple stints < 1 year)
- Over-titling (e.g., "CTO" of a 1-person company applying for a Mid-Level role)
- Skill stuffing (listing 50 programming languages indiscriminately)

*Actionable output*: Provide mitigation strategies for any red flags (e.g., how to reframe a gap as a sabbatical or project building phase).

## Block 4: Strategic Recommendations

Provide 2-3 high-level suggestions on how to improve the candidate's positioning for their target archetypes (based on `config/profile.yml` or `modes/_profile.md`).