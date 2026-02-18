const { default: Groq } = await import("groq-sdk");

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});
export async function generateSummary(name, skills) {
  try {
    console.log("🚀 Generating summary with GROQ...");

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Generate exactly 1 professional resume summary. Don't write any intro text like "here is your summary", just write the summary directly:

Name: ${name}
Skills: ${skills}`,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 500,
    });

    const text = completion.choices[0]?.message?.content || "";
    console.log("✅ Summary generated:", text);
    return text;
  } catch (error) {
    console.error("❌ Error:", error);
    throw error;
  }
}
export async function generateJobDescription(jobTitle, company) {
  try {
    console.log("💼 Generating job description with GROQ...");

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Generate 3-4 professional bullet points for a resume job description. Don't write any intro text, just write the bullet points directly:

Job Title: ${jobTitle}
Company: ${company}

Requirements:
- Start each point with action verbs
- Include quantifiable results if possible
- Make them ATS-friendly
- Format as bullet points with • symbol

Generate now:`,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 500,
    });

    const text = completion.choices[0]?.message?.content || "";
    return text;
  } catch (error) {
    throw error;
  }
}

export async function fixGrammar(resumeData, mode) {
  try {
    const resumeText = `
Full Name: ${resumeData.personal_info.full_name}
Email: ${resumeData.personal_info.email}
Phone: ${resumeData.personal_info.phone}
Location: ${resumeData.personal_info.location}
LinkedIn: ${resumeData.personal_info.linkedin}
Website: ${resumeData.personal_info.website}

Professional Summary:
${resumeData.professional_summary}

Experience:
${resumeData.experience
  .map(
    (exp) => `
Company: ${exp.company || ""}
Role: ${exp.role || ""}
Description: ${exp.description || ""}
`,
  )
  .join("\n")}

Education:
${resumeData.education
  .map(
    (edu) => `
Institution: ${edu.institution || ""}
Degree: ${edu.degree || ""}
`,
  )
  .join("\n")}

Projects:
${resumeData.project
  .map(
    (proj) => `
Title: ${proj.title || ""}
Description: ${proj.description || ""}
`,
  )
  .join("\n")}

Skills:
${resumeData.skills.join(", ")}
`;

    let prompt = "";

    if (mode === "grammar") {
      prompt = `
You are a professional editor.
Only find grammar, spelling and punctuation mistakes.
Show incorrect phrase → corrected version.
Do NOT rewrite full resume.

Resume:
${resumeText}
`;
    } else if (mode === "strongVerbs") {
      prompt = `
You are an expert resume coach.
Find weak action verbs and suggest stronger replacements.
Show: weak verb → powerful verb.
Do NOT rewrite full resume.

Resume:
${resumeText}
`;
    } else if (mode === "ats") {
      prompt = `
You are an ATS optimization expert.
Analyze resume for ATS compatibility.
Mention:
- Missing keywords
- Skill improvements
- Formatting issues
Give structured feedback.

Resume:
${resumeText}
`;
    } else if (mode === "improveall") {
      prompt = `
You are a professional resume reviewer and ATS expert.

Analyze the resume below and give short, clear feedback in this format:

1️⃣ Grammar Issues
- Show incorrect phrase → corrected version
- If none, say "No major grammar issues."

2️⃣ Strong Verb Suggestions
- weak verb → better verb

3️⃣ Improvement Suggestions
- Where to add numbers
- Weak descriptions
- Repetitive wording

4️⃣ ATS Feedback
- Missing keywords
- Skill improvements
- Formatting issues (if any)

5️⃣ Overall Score (Out of 10)
- Grammar:
- Content:
- ATS:

Keep it concise, bullet-based, and easy to read.
Do NOT rewrite the full resume.

Resume:
${resumeText}

`;
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      max_tokens: 1500,
    });

    return completion.choices[0]?.message?.content || text;
  } catch (error) {
    console.error(error);
    return null;
  }
}
