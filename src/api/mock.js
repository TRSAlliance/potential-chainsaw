/**
 * Mock API Client - Standby Mode
 * All components calling external APIs are in STANDBY until system sync is complete.
 * This provides mock responses to prevent runtime errors.
 */

const MOCK_DATA = {
  agents: [
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
  ],
  tasks: [
    {
      id: 'task-1',
      title: 'System Health Check',
      description: 'Comprehensive diagnostics of core components',
      status: 'completed',
      priority: 'high',
      created_date: new Date(Date.now() - 3600000).toISOString(),
      assigned_agents: ['agent-1', 'agent-3']
    },
    {
      id: 'task-2',
      title: 'API Integration Standby',
      description: 'All external API calls in standby mode pending system sync',
      status: 'in_progress',
      priority: 'urgent',
      created_date: new Date(Date.now() - 1800000).toISOString(),
      assigned_agents: ['agent-2', 'agent-4']
    },
    {
      id: 'task-3',
      title: 'Firestore Simulation Test',
      description: 'Testing mock database with sample data',
      status: 'pending',
      priority: 'medium',
      created_date: new Date(Date.now() - 900000).toISOString(),
      assigned_agents: ['agent-3']
    }
  ]
};

export const mockAPIClient = {
  // Agents
  getAgents: async () => {
    console.warn('📋 [STANDBY] getAgents - returning mock data');
    return new Promise(resolve => {
      setTimeout(() => resolve(MOCK_DATA.agents), 500);
    });
  },

  getAgent: async (id) => {
    console.warn(`📋 [STANDBY] getAgent(${id}) - returning mock data`);
    return new Promise(resolve => {
      setTimeout(() => {
        const agent = MOCK_DATA.agents.find(a => a.id === id);
        resolve(agent);
      }, 300);
    });
  },

  // Tasks
  getTasks: async () => {
    console.warn('📋 [STANDBY] getTasks - returning mock data');
    return new Promise(resolve => {
      setTimeout(() => resolve(MOCK_DATA.tasks), 500);
    });
  },

  getTask: async (id) => {
    console.warn(`📋 [STANDBY] getTask(${id}) - returning mock data`);
    return new Promise(resolve => {
      setTimeout(() => {
        const task = MOCK_DATA.tasks.find(t => t.id === id);
        resolve(task);
      }, 300);
    });
  },

  createTask: async (taskData) => {
    console.warn('📋 [STANDBY] createTask - returning mock response');
    return new Promise(resolve => {
      setTimeout(() => {
        const newTask = {
          id: `task-${Date.now()}`,
          ...taskData,
          created_date: new Date().toISOString(),
          status: 'pending'
        };
        MOCK_DATA.tasks.push(newTask);
        resolve(newTask);
      }, 500);
    });
  },

  updateTask: async (id, updates) => {
    console.warn(`📋 [STANDBY] updateTask(${id}) - returning mock response`);
    return new Promise(resolve => {
      setTimeout(() => {
        const task = MOCK_DATA.tasks.find(t => t.id === id);
        if (task) {
          Object.assign(task, updates);
        }
        resolve(task);
      }, 300);
    });
  },

  deleteTask: async (id) => {
    console.warn(`📋 [STANDBY] deleteTask(${id}) - mock operation`);
    return new Promise(resolve => {
      setTimeout(() => {
        MOCK_DATA.tasks = MOCK_DATA.tasks.filter(t => t.id !== id);
        resolve({ success: true, id });
      }, 300);
    });
  },

  // Orchestration
  createOrchestrationPlan: async (taskData) => {
    console.warn('📋 [STANDBY] createOrchestrationPlan - returning mock plan');
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
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
        });
      }, 1000);
    });
  },

  // LLM Integration (mocked)
  invokeLLM: async (config) => {
    console.warn('📋 [STANDBY] invokeLLM - returning mock response');
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          steps: [
            {
              step_id: '1',
              description: 'Analyze requirements and prepare resources',
              agent_id: 'agent-1',
              dependencies: [],
              status: 'pending'
            },
            {
              step_id: '2',
              description: 'Execute main task logic',
              agent_id: 'agent-4',
              dependencies: ['1'],
              status: 'pending'
            }
          ],
          estimated_duration: 300,
          complexity_score: 5
        });
      }, 1200);
    });
  }
};

export default mockAPIClient;
