# Direct Supply

A leading global enterprise seeks to improve and optimize its pricing strategy through the development of a Direct Supply. This will allow users to input product data, analyze pricing trends, and optimal pricing recommendations.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Default Credentials](#default-credentials)

## Overview

In the digital era, efficient pricing is crucial for businesses to stay competitive. The client requires a web application that enables business users to determine optimal pricing strategies based on demand forecasts, and market conditions. The goal is to create a multi-functional interface that addresses these needs effectively. The application should integrate several functionalities while maintaining ease of use and performance efficiency.

## Prerequisites

- Python 3.8+
- Node.js 16+
- npm 8+
- this project is created on Node.js v20.14.0 and python 3.13.0

## Installation

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Create a `.env` file with the following configuration:

   ```env
   # You can modify these as per your requirements
   SECRET_KEY=your-secret-key
   JWT_SECRET_KEY=your-jwt-secret-key
   DATABASE_URL=sqlite:///test.db
   ```

3. Create and activate virtual environment:

   ```bash
   # Create virtual environment
   python3 -m venv venv

   # Activate virtual environment
   # On Unix or MacOS:
   source venv/bin/activate
   # On Windows:
   .\venv\Scripts\activate
   ```

4. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

5. Initialize the database and create required data:

   ```bash
   # Initialize database
   flask init-db

   # Create admin user
   flask create-admin

   # Create categories (Required for product API)
   flask create-categories
   ```

6. Start the backend server:

   ```bash
   python run.py
   ```

   Note the server address (default: http://127.0.0.1:8000)

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Create a `.env` file:

   ```env
   VITE_REACT_APP_BACKEND="http://localhost:8000/api/v1/"
   ```

3. Install dependencies and start the development server:

   ```bash
   # Install dependencies
   npm install

   # Start development server
   npm run dev
   ```

## Usage

1. Access the application through the URL provided by the frontend development server
2. Log in using the default credentials provided below
3. Start managing products and viewing optimization recommendations

## Default Credentials

```
Email: admin@example.com
Password: admin123
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
