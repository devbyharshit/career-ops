# Mode: offer-evaluator — The HR Counter-Strategy & Negotiation Engine

This mode is used when the candidate receives a formal job offer (e.g., offer letter, email, or verbal offer details). It analyzes the offer from an HR and Labor Law compliance perspective and generates a data-driven negotiation strategy.

## Input

The user pastes the offer details (salary, equity, benefits, PTO, probation, notice period, etc.).

## Block 1: Total Compensation Reality Check

Deconstruct the offer to separate guaranteed money from variable "hopes".

- **Guaranteed Base Pay**: Is the base salary competitive for this archetype and location? (Use WebSearch for market data).
- **Variable/Bonus**: Are bonuses "target" (discretionary) or guaranteed? 
- **Equity/Stock Options**: Vesting schedule analysis (standard is 1-year cliff, 4-year vest). Are these options (RSUs, ISOs) actually liquid or paper money?
- **Hidden Deductions**: Flag if HR is baking statutory benefits, overtime pay, or 13th-month mandatory pay into the "Total Target Comp" to inflate the number.

## Block 2: Labor Law & Compliance Scanner

Analyze the terms for illegal or predatory traps (adaptable to local jurisdiction based on `profile.yml` location):

- **Probation Period Trap**: Does the probation period exceed legal limits for the contract length? (e.g., in many places, a 6-month probation on a 1-year contract is illegal).
- **Probation Salary Trap**: Is the probation pay below the legal threshold of the full salary? (e.g., <80%).
- **Non-Compete Danger**: Is the non-compete overly broad? Does it include mandated severance/garden leave compensation? If not, it might be unenforceable but still dangerous.
- **Notice Period Asymmetry**: Does the company require 3 months notice from you, but only gives 2 weeks notice to fire you?

## Block 3: The "HR Buffer" Calculator

HR almost never leads with their maximum approved budget. They typically hold back a 10-15% buffer. 

- Calculate the likely maximum budget band for this role.
- Identify the candidate's leverage points (e.g., specific niche skills matched in the interview process, urgency of the hire).

## Block 4: Negotiation Playbook & Script Generator

Generate a polite, firm, data-driven counter-offer script. 

**Rules for the Script:**
- Never negotiate based on emotion or personal need.
- Always use the "Market Value" and "Specific Value Add" framing.
- Exploit the HR Buffer calculated in Block 3.
- If base salary is fixed/non-negotiable, provide a script to pivot the negotiation to a Sign-on Bonus, extra PTO, accelerated equity vesting, or a guaranteed 6-month salary review.

*Output*: A copy-pasteable email draft tailored to the candidate's specific situation.