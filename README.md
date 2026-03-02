# 🚀 Project: Smart Logistics Routing API

## 📝 Overview

This project is a RESTful API designed to solve a core computer science and logistics problem: **finding the most efficient path** between locations on a predefined network (a **Graph**). The goal is to build a robust, production-ready backend service that accepts route constraints and returns optimal routing solutions.

This project was specifically designed to target **TypeScript** and modern backend frameworks (e.g., NestJS, Fastify, Hono).

## ✨ Key Technical Objectives

Successful completion of this project requires demonstrating proficiency in the following backend domains:

1.  **RESTful API Design:** Implement the requested endpoints.
2.  **Algorithm Implementation:** Implementing a complex graph traversal algorithm.
3.  **Type Safety & Structure:** Utilizing TypeScript to enforce strict contracts across the entire application.
4.  **API Documentation:** Generating industry-standard documentation (OpenAPI/Swagger) directly from the codebase.

## ⚙️ Technology Stack

| Component | Technology | Reasoning |
| :--- | :--- | :--- |
| **Language** | **TypeScript** | Required for type safety and advanced structure. |
| **Database** | **In Memory** or **PostgreSQL** or **MongoDB** | To persist the network data (Nodes, Edges, Weights). If in memory just store the last 5 networks |
| **Testing** | **Jest** | Required for comprehensive unit testing of the core algorithm logic. |
| **Documentation** | Auto-generation of OpenAPI Specification from code. |

## 📐 Project Endpoints

The API will expose two main sets of functionality: **Network Management** (CRUD for the Graph) and **Route Calculation** (the core algorithm).

### 1. Network Management Endpoints

| HTTP Method | Endpoint | Description | Body Example |
| :--- | :--- | :--- | :--- |
| **POST** | `/network/upload` | Uploads a new graph definition (Nodes and Edges) and return the ID of the graph. | `{"edges":[{"from":"A","to":"B","cost":10},{"from":"A","to":"C","cost":5},{"from":"B","to":"D","cost":8},{"from":"C","to":"D","cost":12},{"from":"D","to":"E","cost":12},{"from":"D","to":"F","cost":4},{"from":"F","to":"G","cost":4},{"from":"E","to":"G","cost":9},{"from":"C","to":"H","cost":8},{"from":"D","to":"H","cost":4},{"from":"F","to":"H","cost":1}]}` |
| **GET** | `/network/nodes/{id}` | Retrieves all defined nodes/locations from. | *None* |

### 2. Route Optimization Endpoint

| HTTP Method | Endpoint | Description | Core Requirement | Body Example | Suggested Response |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **POST** | `/route/optimize/{id}` | Calculates the optimal path between two points returning the cost and the route that should be taken (e.g A -> C -> D -> E). | **Must implement the algorithm.** | `{"originNodeId": "A","destinationNodeId":"E"}` | `{"graphId":"uuid-123","totalCost":25.5,"path":["A","C","D","E"],"durationMs":4}` |
| **GET** | `/docs` | Serves the generated **Swagger UI**. | **Must be auto-generated.** | *None* | *None* |

## 🧠 The Core Algorithm Challenge

The primary challenge lies in implementing the logic for the `/route/optimize` endpoint.

### Algorithm Requirement
The backend service must implement **Dijkstra's Algorithm** or **A\* Search** to find the shortest path between the `originNodeId` and the `destinationNodeId`.



### Image of Dijkstra Algorithm Graph
![alt text](docs/resources/dijkstras-image.jpeg)


### Complex Scenarios
The algorithm must be able to handle request bodies that include dynamic constraints:

1.  **Preference Switching:** The endpoint must accept a `preference` (e.g., `"shortest"`, `"fastest"`) and change the weight used in the calculation accordingly (e.g., using distance cost vs. time cost).
2.  **Constraint Filtering:** If the request specifies `constraints: { "avoidHighways": true }`, the algorithm must **temporarily ignore** or assign infinite cost to any edge tagged as a "highway," forcing a compliant, potentially longer route.
3.  **Error Handling:** Gracefully handle cases where the destination is unreachable or the input nodes are invalid (return `404 Not Found` or `400 Bad Request`).

That's a very common and professional way to handle a take-home project! It sets a clear, modern workflow expectation.

Here is the updated section to insert into the **Submission Checklist** of the `README.md` for the **Smart Logistics Routing API** (Project C).

---

## ✅ Submission Checklist & Workflow

A successful submission should include:

* [ ] Complete source code for the REST API.
* [ ] A working implementation of **Dijkstra's Algorithm** within a service layer.
* [ ] Clear **TypeScript Interfaces** for `Node`, `Edge`, and the various Request DTOs.
* [ ] Unit tests using **Jest** for the core routing algorithm (i.e., testing the function that calculates the path directly).
* [ ] Proof that the Swagger documentation is accessible and accurately reflects all endpoints and data schemas.

### 💻 Submission Workflow

The expected delivery method for this project is as follows:

1.  **Fork this Repository:** Create a private fork of the original project repository (or create a new private repository if the project was provided as a zip/template).
2.  **Develop:** Complete all required features and tests within your private repository.
3.  **Invite:** Once development is complete, **invite the hiring manager/recruiter** (or specific email address, e.g., `[Insert Reviewer Email Here]`) as a **Collaborator** to your private repository.
4.  **Notification:** Notify the reviewer that the code is ready and providing the link to the repository or perform an invitation to your repository.

***Please DO NOT submit the code as a zip file or a Pull Request (PR) to the original repository.*** This process allows us to review your commit history and development workflow directly.

## ✅ Project Setup & Running Instructions

To set up and run the Smart Logistics Routing API, follow these steps:
1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/ArturoBal/smart-logistics-api.git
    cd smart-logistics-api
    ```
2.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add the necessary environment variables shown below.
    ```env
    API_PORT=3001

    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=postgres
    DB_NAME=smart-logistics-db
    DB_PASSWORD=s3cr3tP@ssw0rd
    DB_SYNCHRONIZE=false
    ```

3.  **Install Dependencies:**
    ```bash
    yarn install
    or
    npm install
    ```
4. **Initialize Docker to create database:**
    ```bash
    docker-compose up -d
    or
    docker compose up
    ```
    
5.  **Run Migration to initialize database schema:**
    ```bash 
    yarn typeorm:migration:run
    or
    npm run typeorm:migration:run
    ```

6.  **Start the API:**
    ```bash
    yarn start
    or
    npm start
    ```

7.  **Access the API Documentation:**
    Open your browser and navigate to `http://localhost:3001/docs` to view the Swagger UI documentation for the API.

## 🧪 Running Tests

To run the tests for the Smart Logistics Routing API, use the following commands:

```bash
yarn test
or
npm test
```

This will execute all unit tests, particularly those focused on the core routing algorithm, and provide a report of the test results.

## 📂 Project Structure

The project is organized into the following key directories and files:
```
src/
├── controllers/        # API route handlers
├── services/           # Business logic and algorithm implementation
├── entities/           # Database models/entities
├── migrations/         # Database migration files
├── dtos/               # Data Transfer Objects for request/response validation
├── utils/              # Utility functions and helpers
├── app.ts              # Main application entry point
├── server.ts           # Server setup and configuration
├── swagger.ts          # Swagger documentation setup
├── tests/              # Unit tests for the application
├── .env                # Environment variables configuration
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── README.md           # Project documentation and instructions
```
This structure promotes separation of concerns, making it easier to maintain and scale the application as needed. Each directory has a specific role, ensuring that the codebase remains organized and manageable.