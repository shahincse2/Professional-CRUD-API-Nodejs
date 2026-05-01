```markdown
# Professional Product Management API

This is a complete Backend API for managing products, built using **Node.js** and **Express.js**. It follows the **MVC (Model-View-Controller)** design pattern to ensure clean and maintainable code.

## 🚀 Features
*   **Full CRUD Functionality:** Create, Read, Update, and Delete products.
*   **Search Engine:** Filter products by name or product code.
*   **Input Validation:** Robust validation using `express-validator` to ensure data integrity.
*   **Security:** Rate-limiting implemented to prevent brute-force attacks.
*   **Smart Calculation:** Automated `TotalPrice` calculation based on quantity and unit price.
*   **Global Error Handling:** Custom 404 handler and global error middleware to prevent server crashes.
*   **Request Logging:** Real-time logging with `Morgan` for better debugging.

## 🛠️ Tech Stack
*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Data Storage:** Local JSON File (File System)
*   **Libraries:** express-validator, morgan, express-rate-limit, nodemon.

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
   
```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the server:**
   ```bash
   npm start
   ```
   The server will run at `http://localhost:3000`

## 🔗 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/api/v1/ReadProduct` | Get all products |
| GET | `/api/v1/ReadProduct/:id` | Get a single product by ID |
| GET | `/api/v1/SearchProduct?keyword=name` | Search products |
| POST | `/api/v1/CreateProduct` | Add a new product |
| POST | `/api/v1/UpdateProduct/:id` | Update product info |
| GET | `/api/v1/DeleteProduct/:id` | Remove a product |

---
```