
# PDFolio 🚀

A web-based application to create a stunning portfolio website from a PDF resume—no coding needed.

PDFolio is a portfolio generator that turns your PDF resume or LinkedIn profile into a professional-looking personal website in under 60 seconds. It was built to help students, developers, and job seekers showcase their work online effortlessly, without touching a single line of code. With PDFolio, your resume doesn't just live in a file—it comes alive on the web.




## 🧰 Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **PDF Handling**: pdf-parse
- **AI Integration**: Gemini API
- **Database**: MongoDB Atlas
- **Others**: JavaScript, HTML5, CSS3


## ✨ Key Features

- 📄 **PDF Parsing** – Automatically extracts data from PDF resumes.
- 🌐 **Web Portfolio Generation** – Creates a fully responsive website from your resume.
- 🎨 **Unique Templates** – Choose from multiple beautiful, pre-designed templates.
- ⚙️ **AI-Powered Enhancements** – Auto-fills missing sections using intelligent suggestions.
- ⏱️ **Lightning Fast** – Portfolio live in less than 1 minute.
- 🔒 **No Code Required** – Simple, intuitive interface for anyone to use.



## 🚀 Getting Started
### Prerequisites

What did you learn while building this project? What challenges did you face and how did you overcome them?


Make sure you have the following installed:
- Node.js
- npm (Node Package Manager)
## ⚙️ Environment Variables

To run this project locally, create a `.env` file in the root of your backend directory and define the following environment variables:

| Variable Name            | Description                                      |
|--------------------------|--------------------------------------------------|
| `MONGODB_SECRET_KEY`     | Secret key used for signing tokens or sessions. |
| `GEMINI_API_KEY`         | API key for accessing the Gemini AI API.        |
| `MONGO_DB_URL`           | MongoDB Atlas connection string.                |
| `FRONTEND_BASE_URL`      | Base URL of your frontend (e.g., `http://localhost:5173`). |
| `BACKEND_BASE_URL`       | Base URL of your backend (e.g., `http://localhost:5000`). |
| `DEPLOYMENT_ENVIRONMENT` | Set to `"development"` or `"production"`.       |


### Installation Steps

```bash
# 1. Clone the repository
git clone https://github.com/anonymous-03/PDFolio.git

# 2. Navigate to the project folder
cd PDFolio

# 3. Install backend dependencies
cd backend
npm install

# 4. Add environment variables in .env file
# (See the "Environment Variables" section above)

# 5. Start the backend server
node index.js

# 6. Open a new terminal for frontend
cd ../frontend
npm install

# 7. Start the frontend server
npm run dev
```
    