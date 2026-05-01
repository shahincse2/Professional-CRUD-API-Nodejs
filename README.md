```markdown
# Professional Product Management API

This is a robust Backend API for managing product inventories, built with **Node.js** and **Express.js**. The project follows the **MVC (Model-View-Controller)** design pattern to ensure clean code separation and scalability.

## 🚀 Key Features

*   **Full CRUD Operations:** Seamlessly Create, Read, Update, and Delete products.
*   **Advanced Search Engine:** Search for products instantly using name or product code via query parameters.
*   **Robust Input Validation:** Uses `express-validator` to ensure all incoming data is accurate and secure.
*   **Security (Rate Limiting):** Implemented `express-rate-limit` to prevent brute-force attacks and API abuse.
*   **Smart Business Logic:** Automated `TotalPrice` calculation logic on the server side to maintain data integrity.
*   **Request Logging:** Real-time HTTP request logging using `Morgan` for easier debugging and monitoring.
*   **Global Error Handling:** Centralized error-handling middleware to ensure the server stays up even during unexpected errors.

## 🛠️ Tech Stack

*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Data Storage:** Local JSON File System (Database ready architecture)
*   **Middleware:** Morgan, Express-Rate-Limit, Express-Validator

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/shahincse2/Professional-CRUD-API-Nodejs.git](https://github.com/shahincse2/Professional-CRUD-API-Nodejs.git)
   ```

2. **Navigate to the directory:**
   ```bash
   cd Professional-CRUD-API-Nodejs
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the server:**
   ```bash
   npm start
   ```
   The server will run at `http://localhost:3000`

## 🔗 API Endpoints (v1)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/v1/ReadProduct` | Retrieve all products |
| **GET** | `/api/v1/ReadProduct/:id` | Retrieve a single product by ID |
| **GET** | `/api/v1/SearchProduct?keyword=name` | Search products by name/code |
| **POST** | `/api/v1/CreateProduct` | Create a new product |
| **POST** | `/api/v1/UpdateProduct/:id` | Update an existing product |
| **GET** | `/api/v1/DeleteProduct/:id` | Delete a product by ID |

---
**Developed By:** [Md Shahin Alam](https://github.com/shahincse2)
```