# API Standby Mode: Technical Documentation

## Overview

The **API Standby Mode** is a defensive architecture pattern that allows your application to function completely independently while external APIs are being configured or when you want to test the internal system logic.

---

## How It Works

### 1. Feature Flag System

```javascript
// src/api/integrations.js
const USE_MOCK_API = true  // ← Master toggle

if (USE_MOCK_API) {
  // Use mock client (all responses from memory)
  return mockAPIClient.getAgents()
} else {
  // Use real API endpoints
  return fetch('https://api.yourdomain.com/agents')
}
```

### 2. Mock Client Architecture

```
src/api/mock.js
  ├── MOCK_DATA object
  │   ├── agents: [4 pre-configured agents]
  │   └── tasks: [3 sample tasks]
  └── mockAPIClient
      ├── getAgents()
      ├── getTasks()
      ├── createTask()
      ├── updateTask()
      ├── invokeLLM()
      └── Console logging with [STANDBY] tags
```

### 3. Request Flow

```
Component (TaskCreator.jsx)
    ↓
InvokeLLM(config)
    ↓
src/api/integrations.js (router)
    ↓
[if USE_MOCK_API === true]
    ↓
src/api/mock.js (mockAPIClient)
    ↓
MOCK_DATA object
    ↓
Component (receives mock response)
    ↓
Console log: [STANDBY] invokeLLM - returning mock response
```

---

## Mock Data Specifications

### Agents (4 Pre-configured)

```javascript
[
  {
    id: 'agent-1',
    name: 'Sentinel Analysis Engine',
    type: 'language_model',
    status: 'active',
    version: '2.4',
    description: 'Strategic analysis and planning'
  },
  {
    id: 'agent-2',
    name: 'Chain Forensics Unit',
    type: 'computer_vision',
    status: 'active',
    version: '1.8',
    description: 'Deep code inspection and vulnerability detection'
  },
  {
    id: 'agent-3',
    name: 'Data Optimizer',
    type: 'data_processor',
    status: 'active',
    version: '3.1',
    description: 'Performance optimization and metrics'
  },
  {
    id: 'agent-4',
    name: 'Task Executor',
    type: 'task_executor',
    status: 'active',
    version: '2.0',
    description: 'Workflow orchestration and execution'
  }
]
```

### Tasks (3 Sample)

```javascript
[
  {
    id: 'task-1',
    title: 'System Health Check',
    status: 'completed',
    priority: 'high',
    assigned_agents: ['agent-1', 'agent-3']
  },
  {
    id: 'task-2',
    title: 'API Integration Standby',
    status: 'in_progress',
    priority: 'urgent',
    assigned_agents: ['agent-2', 'agent-4']
  },
  {
    id: 'task-3',
    title: 'Firestore Simulation Test',
    status: 'pending',
    priority: 'medium',
    assigned_agents: ['agent-3']
  }
]
```

### Orchestration Plan (LLM Response)

```javascript
{
  steps: [
    {
      step_id: '1',
      description: 'Analysis phase',
      agent_id: 'agent-1',
      dependencies: [],
      status: 'pending'
    },
    {
      step_id: '2',
      description: 'Execution phase',
      agent_id: 'agent-4',
      dependencies: ['1'],
      status: 'pending'
    },
    {
      step_id: '3',
      description: 'Optimization phase',
      agent_id: 'agent-3',
      dependencies: ['2'],
      status: 'pending'
    }
  ],
  estimated_duration: 300,
  complexity_score: 6
}
```

---

## Response Latency

Mock APIs simulate realistic network latency:

```javascript
// Quick responses (fast operations)
getAgent(id)     → 300ms delay
getAgents()      → 500ms delay

// Slow responses (compute-intensive operations)
invokeLLM()      → 1200ms delay
createPlan()     → 1000ms delay
```

This prevents developers from making assumptions about instant responses.

---

## Console Logging

Every mock API call logs to console:

```javascript
console.warn('📋 [STANDBY] getAgents - returning mock data')
console.warn('📋 [STANDBY] invokeLLM - returning mock response')
console.warn('📋 [STANDBY] createTask - returning mock response')
```

**Why console.warn()?**
- Stands out in DevTools
- Yellow color makes it visible
- Developers know to switch to real APIs before production

---

## Switching to Real APIs

### Step 1: Disable Mock Mode

```javascript
// src/api/integrations.js
const USE_MOCK_API = false  // ← Change this
```

### Step 2: Implement Real Endpoints

```javascript
export const InvokeLLM = async (config) => {
  if (USE_MOCK_API) {
    return apiClient.invokeLLM(config)
  }
  
  // TODO: Implement real LLM API call
  const response = await fetch('https://api.yourdomain.com/llm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config)
  })
  return response.json()
}
```

### Step 3: Test Gradually

```javascript
// Migrate one endpoint at a time
const USE_MOCK_AGENTS = true   // Real agents
const USE_MOCK_TASKS = false   // Mock tasks
const USE_MOCK_LLM = true      // Mock LLM
```

---

## Error Handling

Mock APIs can simulate errors:

```javascript
// Simulate network timeout
await new Promise(resolve => {
  setTimeout(() => resolve(MOCK_DATA), 10000)  // 10s timeout
})

// Simulate error response
if (Math.random() > 0.9) {
  throw new Error('Mock API error - simulating failure')
}
```

---

## Performance Characteristics

| Metric | Mock API | Real API (typical) |
|--------|----------|-------------------|
| Latency | 300-1200ms | 500-3000ms |
| Variability | Predictable | Variable |
| Availability | 100% | Depends on provider |
| Cost | $0 | Per-request fees |
| Reliability | Guaranteed | Provider-dependent |

---

## Best Practices

✅ **Always use mock API during development**

✅ **Test error handling with mock failures**

✅ **Keep console warnings visible** — warns about standby mode

✅ **Implement real APIs incrementally** — switch one at a time

✅ **Monitor console logs** — verify which APIs are being called

✅ **Add feature flags** — allow gradual rollout to production

---

## Troubleshooting

### Problem: Components render but no data shows
**Solution:** Check console for [STANDBY] logs. If not present, mock API isn't active.

### Problem: Real API call fails
**Solution:** Check USE_MOCK_API flag. Verify endpoint URL and authentication.

### Problem: Data inconsistency
**Solution:** Mock data is in-memory. Check if it's being modified correctly in mockAPIClient.

---

## Summary

API Standby Mode provides:

✅ **Complete independence** from external dependencies  
✅ **Realistic test data** for all components  
✅ **Graceful migration** path to real APIs  
✅ **Predictable latency** for performance testing  
✅ **Transparent logging** for debugging  
✅ **Zero cost** during development  

---

*This system is designed to give you 100% control over API integration.* 🎯
