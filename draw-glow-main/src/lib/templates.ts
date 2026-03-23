export interface DiagramTemplate {
  name: string;
  icon: string;
  category: string;
  code: string;
}

export const templates: DiagramTemplate[] = [
  {
    name: "Flowchart",
    icon: "GitBranch",
    category: "Basic",
    code: `graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]
    C --> E[End]
    D --> E`,
  },
  {
    name: "Sequence",
    icon: "ArrowRightLeft",
    category: "Basic",
    code: `sequenceDiagram
    participant Client
    participant API
    participant Database
    Client->>API: POST /login
    API->>Database: Query user
    Database-->>API: User data
    API-->>Client: JWT Token`,
  },
  {
    name: "Git Graph",
    icon: "GitFork",
    category: "Dev",
    code: `gitGraph
    commit
    branch develop
    checkout develop
    commit
    commit
    checkout main
    merge develop
    commit`,
  },
  {
    name: "Class Diagram",
    icon: "Boxes",
    category: "Dev",
    code: `classDiagram
    class User {
      +String name
      +String email
      +login()
      +logout()
    }
    class Admin {
      +manageUsers()
    }
    User <|-- Admin`,
  },
  {
    name: "State Machine",
    icon: "RefreshCw",
    category: "Basic",
    code: `stateDiagram-v2
    [*] --> Idle
    Idle --> Loading : fetch
    Loading --> Success : resolve
    Loading --> Error : reject
    Error --> Loading : retry
    Success --> [*]`,
  },
  {
    name: "Pie Chart",
    icon: "PieChart",
    category: "Data",
    code: `pie title Project Time
    "Development" : 45
    "Design" : 25
    "Testing" : 20
    "Deployment" : 10`,
  },
  {
    name: "ER Diagram",
    icon: "Database",
    category: "Dev",
    code: `erDiagram
    USER ||--o{ ORDER : places
    ORDER ||--|{ LINE_ITEM : contains
    PRODUCT ||--o{ LINE_ITEM : "ordered in"
    USER {
        int id PK
        string name
        string email
    }`,
  },
  {
    name: "Journey Map",
    icon: "Map",
    category: "Product",
    code: `journey
    title User Onboarding
    section Sign Up
      Visit site: 5: User
      Fill form: 3: User
      Verify email: 2: User
    section First Use
      Dashboard tour: 4: User
      Create project: 5: User`,
  },
];
