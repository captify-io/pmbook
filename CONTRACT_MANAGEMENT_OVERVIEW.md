# Contract Management System - Overview

## 🎯 What We're Building

A **simple, AI-powered system** for managing government contracts from funding (CLINs) through execution (tasks), designed to:

1. ✅ **Simplify compliance** - Auto-generate monthly CLIN reports
2. ✅ **Enable team autonomy** - Teams own outcomes and budgets
3. ✅ **Provide visibility** - Real-time budget burn, progress tracking
4. ✅ **Predict issues** - AI detects cost overruns, schedule delays
5. ✅ **Incentivize performance** - Teams benefit from successful delivery

---

## 📊 Data Flow

```
CONTRACT
   ↓
CLINs (Funding Buckets)
   │
   ├─→ $500k → OBJECTIVE 1: Modernize Platform
   │              ↓
   │           OUTCOME 1.1: API Gateway ($200k)
   │              ↓
   │           TASKS: Design, Build, Test, Deploy
   │              ↓
   │           TEAM: Platform Team (owns outcome)
   │
   └─→ $300k → OBJECTIVE 2: Data Migration
                  ↓
               OUTCOME 2.1: ETL Pipeline ($150k)
                  ↓
               TASKS: Schema design, Pipeline build
                  ↓
               TEAM: DataOps Team (owns outcome)
```

---

## 🏗️ Architecture

### **Database Tables**

```typescript
pmbook-CLIN {
  id, contractId, clinNumber, type,
  totalValue, fundedValue, obligatedValue, burnedValue,
  periodStart, periodEnd, status
}

pmbook-Objective {
  id, contractId, clinIds[],
  title, description, sowReference,
  totalBudget, allocatedBudget, remainingBudget,
  owner, functionalArea, priority, status
}

pmbook-Outcome {
  id, objectiveId, contractId,
  title, description, successCriteria, targetDate,
  allocatedBudget, burnedBudget, forecastBudget,
  ownerTeam, teamLead, status, percentComplete,
  deliverables[]
}

pmbook-Task {
  id, outcomeId,
  title, description, assignedTo, functionalArea,
  estimatedHours, actualHours, estimatedCost, actualCost,
  status, priority, dueDate
}

pmbook-CLINAllocation {
  id, clinId, objectiveId, amount, allocatedAt, allocatedBy
}

pmbook-MonthlyReport {
  id, contractId, clinId, reportMonth,
  plannedCost, actualCost, variance,
  plannedProgress, actualProgress,
  outcomesPlanned, outcomesCompleted,
  risks[], deliverables[], aiSummary
}
```

### **Key Features Implemented**

✅ **Contract Detail Page** (`/contracts/[id]`)
- Visual overview: Total value, burn rate, CLINs, objectives
- Tabs: CLINs, Objectives, Budget Flow, Reports
- Quick actions: Add CLIN, Create Objective, Generate Report

✅ **Objective Creation Wizard** (3-step process)
- Step 1: Basic info (title, owner, priority)
- Step 2: Budget allocation (select CLINs, amounts)
- Step 3: Review & create
- **Smart features:**
  - Auto-suggests budget split
  - Validates against available funds
  - Shows real-time impact

✅ **Type System**
- Full TypeScript definitions
- Enum types for status, priority, CLIN types
- Reusable interfaces across app

---

## 🎨 User Experience

### **Design Principles**

1. **Visual First**
   - Progress bars show budget burn
   - Colors indicate health (🟢 on-track, 🟡 warning, 🔴 at-risk)
   - Charts over tables

2. **Smart Defaults**
   - Auto-fill owner from current user
   - Suggest budget split across CLINs
   - Pre-populate dates from contract PoP

3. **Progressive Disclosure**
   - Start with essentials (title, budget)
   - Add detail as needed (success criteria, KPIs)
   - Advanced features hidden initially

4. **Contextual Help**
   - Tooltips explain each field
   - Examples shown in placeholders
   - "Why we need this" explanations

### **Workflows**

**PM Creates Objective:**
```
1. Click "+ Add Objective" on contract page
2. Wizard opens → Fill title, owner, area
3. Click "Next" → Drag budget from CLINs
4. Click "Auto-Suggest" → System distributes evenly
5. Review → Create → Done ✅
```

**Team Lead Creates Outcome:**
```
1. View "My Objectives" dashboard
2. Click objective → "+ Add Outcome"
3. Fill: What we're delivering, success criteria, target date
4. Set budget (max = objective remaining)
5. Create → Now visible to team
```

**Team Member Works Task:**
```
1. Dashboard shows "My Tasks"
2. Click task → Update status to "In Progress"
3. Log hours worked
4. If need another team → Create ticket
5. Mark complete → Outcome auto-updates
```

---

## 🤖 AI Capabilities (Planned)

### **1. Cost Prediction**
```typescript
Analyzes:
- Historical burn rates by team
- Similar past outcomes (pattern matching)
- Task complexity vs. time estimates

Predicts:
"Outcome 'API Gateway' will cost $215k (budget: $200k)
 based on Platform team's velocity"
```

### **2. Risk Detection**
```typescript
Monitors:
- Tasks stale > 7 days
- Budget burn > 80% with < 50% work done
- CLIN depletion outpacing period end

Alerts:
"⚠️ CLIN 0002 will deplete 45 days before PoP ends
 Recommend: Reallocate $50k from CLIN 0005"
```

### **3. Smart Recommendations**
```typescript
Suggests:
- Team assignment: "DevOps has 30% capacity, best fit for Outcome Y"
- Budget reallocation: "CLIN 0005 underutilized at 15% burn"
- Task prioritization: "Work Outcome A first, blocks 3 teams"
```

### **4. Auto-Report Generation**
```typescript
Monthly CLIN Report includes:
- Executive summary (AI-written)
- Cost/Schedule/Performance metrics
- Deliverables completed (from outcomes)
- Risk register (auto-detected)
- Forecast for next period

Export: PDF, Excel, JSON
```

---

## 📈 Success Metrics

### **User Adoption**
- ✅ 80% of teams using within 30 days
- ✅ < 5 min to create an objective
- ✅ < 10 clicks to assign a task

### **Business Impact**
- ✅ 50% reduction in report generation time
- ✅ 20% improvement in budget forecast accuracy
- ✅ 30% faster outcome delivery

### **Technical Performance**
- ✅ < 2 sec page load
- ✅ 99% uptime
- ✅ Zero data loss

---

## 🚀 Next Steps

### **Week 1: Core Functionality**
- [ ] Implement CLIN CRUD operations
- [ ] Build Objective creation API
- [ ] Create Outcome management page
- [ ] Add Task board (Kanban style)

### **Week 2: Team Dashboards**
- [ ] PM Dashboard (all contracts)
- [ ] Team Lead Dashboard (my objectives)
- [ ] Team Member Dashboard (my tasks)
- [ ] Inter-team ticket system

### **Week 3: Budget Visualization**
- [ ] Sankey diagram: CLINs → Objectives → Outcomes
- [ ] Budget waterfall chart
- [ ] Burn-down tracking by CLIN
- [ ] Real-time allocation validation

### **Week 4: Reporting**
- [ ] Monthly CLIN report generator
- [ ] Cost/Schedule/Performance metrics
- [ ] Risk/Issue tracking
- [ ] Export to PDF/Excel

### **Week 5-6: AI Integration**
- [ ] Connect Bedrock agent
- [ ] Cost prediction model
- [ ] Risk detection rules
- [ ] Smart recommendations
- [ ] Auto-generate report summaries

### **Week 7: Team Incentives**
- [ ] Performance scoring
- [ ] Leaderboards
- [ ] Recognition system
- [ ] Gamification elements

---

## 📝 Key Decisions Made

1. **CLIN Types Supported:** FFP, T&M, CPFF, CPIF, FPIF
2. **Objectives from SOW:** PMs create, map to CLINs
3. **Outcomes by Teams:** Team leads define, own budgets
4. **Task Assignment:** Individual or team level
5. **Budget Approval:** Team leads have visibility + approval authority
6. **Reporting Cadence:** Monthly CLIN reports
7. **AI Priority:** Cost prediction → Risk detection → Recommendations
8. **Team Autonomy:** Full ownership of outcomes, budgets, execution

---

## 🔧 Technical Stack

**Frontend:**
- Next.js 15 (App Router)
- React Server Components
- Tailwind CSS v4
- Shadcn UI
- TypeScript

**Backend:**
- DynamoDB tables (pmbook-*)
- Platform API proxy
- AWS Bedrock (AI)

**Deployment:**
- Elastic Beanstalk
- GitHub Actions CI/CD

---

## 📞 Questions & Feedback

**Slack:** #pmbook-dev
**Email:** dev-team@captify.io
**Docs:** [Implementation Roadmap](./IMPLEMENTATION_ROADMAP.md)

---

**Status:** ✅ Phase 1 Started - Core data model + Contract detail page complete
**Next:** Build CLIN management UI + Objective API
