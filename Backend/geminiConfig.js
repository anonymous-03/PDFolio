import {GoogleGenAI} from '@google/genai';
import 'dotenv/config'
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

async function generateJson(pdfText) {

    const prompt = `
  You are an expert technical resume parser. Analyze the following resume text and convert it into a structured JSON object. 
  The JSON object must follow this exact schema, including all specified keys and data types. Be as accurate as possible.

  {
    "personalInfo": {
      "name": "string",
      "title": "string",
      "location": "string"
    },
    "landing": {
      "headline": "string",
      "subheadline": "string"
    },
    "summary": {
      "content": "A detailed paragraph summarizing the profile.",
      "highlights": ["An array of key achievement strings."],
      "yearsExperience": 0, // A number, even if it is 0 for students
      "specialization": "string"
    },
    "skills": {
      "technical": ["Array of technical skills like languages and frameworks."],
      "tools": ["Array of tools and technologies like Git, Figma, etc."],
      "soft": ["Array of soft skills or areas of expertise."]
    },
    "projects": [
      {
        "name": "string",
        "description": "string",
        "tech": ["Array of strings for technologies used."]
      }
    ],
    "experience": [
      {
        "title": "string",
        "company": "string",
        "period": "string, e.g., 'Jan 2022 - Present'",
        "description": "string"
      }
    ],
    "achievements": ["Array of strings detailing achievements."],
    "contact": {
      "email": "string",
      "phone": "string"
    },
    "footer": {
      "socials": {
        "linkedin": "Full LinkedIn URL as a string.",
        "github": "Full GitHub URL as a string."
      }
    }
  }
  Note: Don't forget to add summary of the profile in summary Section using ATS Friendly Keywords. headline (should not be name) and sub headline in the landing section should be short and crisp.
  Only output the raw, minified JSON object. Do not include any other text, explanation, or markdown formatting like \`\`\`json.
  
  Here is the resume text to parse:
  ---
  ${pdfText}
`;
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });
  
  const jsonObject = JSON.parse(response.text);
    
return jsonObject;
}

export default generateJson;