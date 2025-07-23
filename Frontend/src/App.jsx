import { useState } from 'react'
import LandingPage from './pages/Home'
import './App.css'
import ToastContextProvider from './context/ToastContextProvider'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import UserProfile from './Pages/UserProfile'
import './themes.css'
import { ThemeProvider } from './context/ThemeContext'
import ResumeUpload from './Pages/ResumeUpload'
import TemplateSelection from './Pages/TemplateSelection'
import CascadeLayout from './Templates/CascadeLayout'
import NovaLayout from './Templates/NovaLayout'
import KyotoLayout from './Templates/KyotoLayout'
import TerminalLayout from './Templates/TerminalLayout'
import GalleryLayout from './Templates/GalleryLayout'
import InfographicLayout from './Templates/InfographicLayout'
import { AuthProvider } from './context/AuthContext'
import OAuthCallback from './components/Auth/OAuthCallback'
import PortfolioLink from './Pages/Portfoliolink'
import ProtectedRoute from './components/Utils/ProtectedRoute'

const resumeData = {
  "personalInfo": {
    "name": "Nikhil Raj",
    "title": "Computer Science and Engineering Student",
    "location": "Assam, India"
  },
  "landing": {
    "headline": "Computer Science and Engineering student with experience in web development and machine learning.",
    "subheadline": "Seeking opportunities to apply skills in software engineering and data science to build impactful solutions."
  },
  "summary": {
    "content": "Nikhil Raj is a dedicated Computer Science and Engineering student at the National Institute of Technology, Silchar, with a strong foundation in data structures, algorithms, and software development. He has practical experience in machine learning through a research internship focused on Optical Music Recognition, where he trained a Mask R-CNN model. Additionally, he has demonstrated full-stack development skills by leading and building web applications like 'Track My Growth' and 'Wanderla' using the MERN stack. A proficient problem-solver with over 1200+ DSA problems solved, he is passionate about leveraging technology to create efficient and scalable solutions.",
    "highlights": [
      "Contributed to an Optical Music Recognition (OMR) system, training a Mask R-CNN model and improving symbol detection by 6%.",
      "Led the development of a personalized analytics app ('Track My Growth') for tracking 13+ coding activities.",
      "Developed a full-stack property listing platform ('Wanderla') with secure user authentication using Passport.js.",
      "Achieved a top 12.48% ranking on LeetCode with a max rating of 1708.",
      "Solved over 1200+ DSA problems across various competitive programming platforms."
    ],
    "yearsExperience": 0,
    "specialization": "Full-Stack Web Development and Machine Learning"
  },
  "skills": {
    "technical": [
      "C",
      "C++",
      "SQL",
      "Javascript",
      "Node.js",
      "MATLAB",
      "R",
      "Express.js",
      "Mongoose",
      "Tailwind",
      "EJS",
      "React.Js",
      "MySQL",
      "MongoDB",
      "Windows",
      "Linux"
    ],
    "tools": [
      "Figma",
      "Git",
      "Github"
    ],
    "soft": [
      "Data Structures and Algorithms",
      "Discrete Structures",
      "Computer Architecture and Organisation",
      "OOPS",
      "Computer Networks",
      "Operating System",
      "Compiler Design",
      "Database Management System"
    ]
  },
  "projects": [
    {
      "name": "Track My Growth",
      "description": "Led and Designed and developed a personalized analytics application that tracked over 13+ coding activities from platforms like LeetCode, CodeChef, and InterviewBit. Integrated RESTful APIs to seamlessly fetch user data in real-time, improving data accuracy by 20%. Built Optimized backend using Node.js and Express.js, reducing API latency by 35% and enhancing server efficiency. Leveraged MongoDB to store and manage user progress data for over 100+ users, ensuring scalability and performance.",
      "tech": [
        "MongoDB",
        "Express.js",
        "React.js",
        "Node.js",
        "RESTful APIs",
        "Chart.js",
        "Git",
        "GitHub"
      ]
    },
    {
      "name": "Wanderla",
      "description": "Developed a property listing platform using HTML, CSS, JavaScript, EJS, and Node.js, facilitating property management for over 100+ users. Implemented user authentication and authorization using Passport.js, securing sensitive routes and improving account safety for all users. Integrated Express.js to build RESTful APIs, enabling efficient CRUD operations and reducing server response time by 30%.",
      "tech": [
        "HTML",
        "CSS",
        "JavaScript",
        "EJS",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Mongoose",
        "Passport.js",
        "Git",
        "GitHub"
      ]
    }
  ],
  "experience": [
    {
      "title": "Research Intern – Optical Music Recognition",
      "company": "SN Bose Research Internship",
      "period": "May 2025 – July 2025",
      "description": "Contributed to the development of an Optical Music Recognition (OMR) system to digitize handwritten sheet music. Trained a Mask R-CNN model on the MUSCIMA++ dataset (140 annotated images). Implemented a staff line detection and removal method that reduced symbol misclassification in noisy inputs by 6%. Assisted in converting detected symbols into MusicXML, enabling compatibility with digital score playback tools."
    }
  ],
  "achievements": [
    "Among the top 12.48% in Leetcode: Max-Rating of 1708 and the best rank of 1727 in Weekly contest 450",
    "Top 4 Finalist at “Code Clash” coding event among 1200 cadidates",
    "Solved more than 1200+ DSA Problems over various platforms like Leetcode, Codechef",
    "Ranked 5th in Enigma 36.0 Coding Contest Conducted by Computer Science Society NIT Silchar"
  ],
  "contact": {
    "email": "nikhil.work22@gmail.com",
    "phone": "+91-9341657526"
  },
  "footer": {
    "socials": {
      "linkedin": "",
      "github": ""
    }
  }
};
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={
          <>
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          </>

        } />
        {/* <Route path='/profile' element={<UserProfile />} /> */}
        <Route path='/upload' element={
          <>
            <ProtectedRoute>
              <ResumeUpload />
            </ProtectedRoute>
          </>
        } />
        <Route path='/select-template' element={
          <>
            <ProtectedRoute>
              <TemplateSelection />
            </ProtectedRoute>
          </>
        } />
        <Route path='/auth/callback' element={<OAuthCallback />} />
        <Route path='/portfolio-link' element={
          <>
            <ProtectedRoute>
              <PortfolioLink />
            </ProtectedRoute>
          </>
        } />
        <Route path='/portfolio'>
          <Route path='Cascade/:pid' element={<CascadeLayout />} />
          <Route path='Nova/:pid' element={<NovaLayout />} />
          <Route path='Kyoto/:pid' element={<KyotoLayout />} />
          <Route path='Terminal/:pid' element={<TerminalLayout />} />
          <Route path='The Gallery/:pid' element={<GalleryLayout />} />
          <Route path='The Infographic/:pid' element={<InfographicLayout />} />
        </Route>
      </>

    )
  )

  return (
    <AuthProvider>
      <ToastContextProvider>
        <ThemeProvider>
          <RouterProvider router={router}>
          </RouterProvider>
        </ThemeProvider>
      </ToastContextProvider>
    </AuthProvider>

  )
}

export default App
