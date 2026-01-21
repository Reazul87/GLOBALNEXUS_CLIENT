# [Global Nexus](https://global-nexus-a10.web.app/) - Import/Export Hub

![Landing Picture](./public/Landing.png)

Global Nexus is a comprehensive web application designed to streamline import and export operations, providing a central hub for product information, trade regulations, and user management. This platform aims to enhance transparency, improve compliance, and facilitate cross-border trade transactions, particularly in Bangladesh.

## Features

### User Authentication and Authorization

- **User Registration:** New users can create accounts with email/password or Google authentication.
- **User Login:** Existing users can log in securely with email/password or Google.
- **User Logout:** Securely sign out from the application.
- **Profile Management:** Users can view their profile details.

### Product Management

- **Add Export:** Users can add new products for export, including details like product name, image, price, origin country, rating, and available quantity.
- **All Products:** Browse a list of all available products with search functionality.
- **Product Details:** View detailed information about each product.
- **My Exports:** View a list of products exported by the current user.
- **My Imports:** View a list of products imported by the current user with options to remove imported items.

### Trade Information Hub

- **Rules & Regulations:** Access information on general and product-specific documents, tariff rates, duty & tax benefits, and an approximate duty calculator.
- **About the System:** Learn about the comprehensive searchable repository of documents, compliances, and conditions required for import/export.
- **Key Information:** Understand the objectives, features, and beneficiaries of the Import Export Hub.

### User Interface

- **Responsive Navbar:** Navigation bar with links to Home, All Products, My Exports, My Imports, Add Export, and user-specific actions (login/logout, profile, settings).
- **Theme Toggle:** Switch between light and dark themes.
- **Interactive Product Cards:** Display product information clearly with images, names, prices, origin countries, and ratings.
- **Toast Notifications:** Provides user feedback for actions like login, logout, and product additions.

## Technologies Used

- **React.js:** Frontend library for building user interfaces.
- **React Router:** For navigation and routing within the application.
- **Context API:** For state management (e.g., `AuthContext`).
- **Tailwind CSS & DaisyUI:** For styling and UI components.
- **React Icons:** For various icons used across the application.
- **React Hot Toast:** For beautiful and responsive toast notifications.
- **Lucide React:** For additional icons (e.g., eye icons for password visibility).

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn
- A running backend server (as indicated by `https://global-nexus-backend.vercel.app` in the fetch requests).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Reazul87/REACT_ASSIGNMENT_B12A10.git
    cd global-nexus
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Set up environment variables:**
    You might need a `.env` file in the root directory for things like Firebase configuration (for authentication) or the backend API URL.

    ```
    # Example .env content
    VITE_FIREBASE_API_KEY=YOUR FIREBASE CONFIG
    VITE_FIREBASE_AUTH_DOMAIN=YOUR FIREBASE CONFIG
    VITE_FIREBASE_PROJECT_ID=YOUR FIREBASE CONFIG
    VITE_FIREBASE_STORAGE_BUCKET=YOUR FIREBASE CONFIG
    VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR FIREBASE CONFIG
    VITE_FIREBASE_APP_ID=YOUR FIREBASE CONFIG

    # ... other firebase configs
    REACT_APP_BACKEND_URL=https://global-nexus-backend.vercel.app
    ```

### Running the Application

1.  **Start the frontend development server:**

    ```bash
    npm run dev
    ```

    The application should open in your browser at `http://localhost:3000` (or another port if 3000 is in use).

2.  **Ensure the backend server is running:**
    This application communicates with a backend server, which is assumed to be running at `https://global-nexus-backend.vercel.app`. Make sure your backend is properly set up and running for full functionality.

    <!-- VITE_USER_EMAIL=welcome@gmail.com
    VITE_USER_PASSWORD=Welcome123 -->
