
// import { useCallback, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./PracticeInterview.css";

// const API_URL =
//   import.meta.env.VITE_API_URL || "http://localhost:5000";

// const QUESTION_TIME = 300;

// const questionSets = {
//   Technical: [
//     {
//       question: "What is JavaScript?",
//       options: [
//         "A database",
//         "A programming language",
//         "An operating system",
//         "A web browser",
//       ],
//       answer: 1,
//       explanation:
//         "JavaScript is a programming language used to make websites interactive.",
//     },
//     {
//       question: "What is React?",
//       options: [
//         "A CSS framework",
//         "A database",
//         "A JavaScript library for building user interfaces",
//         "A programming language",
//       ],
//       answer: 2,
//       explanation:
//         "React is a JavaScript library for building user interfaces.",
//     },
//     {
//       question: "What does HTML stand for?",
//       options: [
//         "HyperText Markup Language",
//         "HighText Machine Language",
//         "Hyper Transfer Main Link",
//         "Home Tool Markup Language",
//       ],
//       answer: 0,
//       explanation: "HTML stands for HyperText Markup Language.",
//     },
//     {
//       question: "Which method converts JSON text into a JavaScript object?",
//       options: [
//         "JSON.stringify()",
//         "JSON.parse()",
//         "JSON.convert()",
//         "JSON.object()",
//       ],
//       answer: 1,
//       explanation:
//         "JSON.parse() converts valid JSON text into a JavaScript value.",
//     },
//     {
//       question: "Which hook is used to manage state in a React component?",
//       options: ["useRoute", "useFetch", "useState", "usePage"],
//       answer: 2,
//       explanation:
//         "The useState hook lets a React component store and update state.",
//     },
//   ],

//   HR: [
//     {
//       question: "Tell me about yourself.",
//       options: [
//         "Share your education, skills and relevant experience",
//         "Talk only about your hobbies",
//         "Say nothing about your skills",
//         "Discuss unrelated topics",
//       ],
//       answer: 0,
//       explanation:
//         "A strong introduction briefly covers your background, skills and career goals.",
//     },
//     {
//       question: "What is your biggest strength?",
//       options: [
//         "I never learn anything new",
//         "I avoid teamwork",
//         "I am willing to learn and solve problems",
//         "I never accept feedback",
//       ],
//       answer: 2,
//       explanation:
//         "Choose a genuine strength and support it with an example from your experience.",
//     },
//     {
//       question: "How do you handle feedback?",
//       options: [
//         "Ignore all feedback",
//         "Listen and use it to improve",
//         "Argue every time",
//         "Avoid the person giving feedback",
//       ],
//       answer: 1,
//       explanation:
//         "Constructive feedback can help you improve your work and skills.",
//     },
//     {
//       question: "Why should we hire you?",
//       options: [
//         "I do not want to learn",
//         "I have no interest in the role",
//         "I can contribute using relevant skills and a willingness to learn",
//         "I do not like working with others",
//       ],
//       answer: 2,
//       explanation:
//         "Connect your relevant skills, motivation and learning ability to the role.",
//     },
//     {
//       question: "Where do you see yourself in five years?",
//       options: [
//         "I want to stop learning",
//         "I want to develop expertise and take on more responsibility",
//         "I have no goals",
//         "I do not want to improve",
//       ],
//       answer: 1,
//       explanation:
//         "Describe realistic professional goals and how you want to grow.",
//     },
//   ],

//   Behavioral: [
//     {
//       question: "What would you do if you had a tight deadline?",
//       options: [
//         "Ignore the deadline",
//         "Prioritize tasks and communicate early",
//         "Wait until the last minute",
//         "Leave every task unfinished",
//       ],
//       answer: 1,
//       explanation:
//         "Prioritization, planning and communication help manage tight deadlines.",
//     },
//     {
//       question: "How would you handle a disagreement with a teammate?",
//       options: [
//         "Listen and discuss the issue respectfully",
//         "Stop communicating",
//         "Blame the teammate",
//         "Ignore the problem",
//       ],
//       answer: 0,
//       explanation:
//         "Respectful communication helps teams find a practical solution.",
//     },
//     {
//       question: "What if you do not know how to solve a task?",
//       options: [
//         "Give up immediately",
//         "Pretend you know everything",
//         "Research, try possible solutions and ask for help when needed",
//         "Ignore the task",
//       ],
//       answer: 2,
//       explanation:
//         "A good approach combines independent learning with asking for help when appropriate.",
//     },
//     {
//       question: "How do you manage multiple tasks?",
//       options: [
//         "Do random tasks without a plan",
//         "Prioritize by urgency and importance",
//         "Avoid making decisions",
//         "Forget the deadlines",
//       ],
//       answer: 1,
//       explanation:
//         "Prioritizing tasks helps you use time effectively.",
//     },
//     {
//       question: "How do you respond when you make a mistake?",
//       options: [
//         "Hide the mistake",
//         "Blame someone else",
//         "Accept it, correct it and learn from it",
//         "Repeat the mistake without reviewing it",
//       ],
//       answer: 2,
//       explanation:
//         "Accountability and learning from mistakes are valuable professional skills.",
//     },
//   ],
// };

// export default function PracticeInterview() {
//   const navigate = useNavigate();

//   const [category, setCategory] = useState("Technical");
//   const [current, setCurrent] = useState(0);
//   const [selected, setSelected] = useState({});
//   const [seconds, setSeconds] = useState(QUESTION_TIME);
//   const [finished, setFinished] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [saved, setSaved] = useState(false);
//   const [saveError, setSaveError] = useState("");

//   const questions = questionSets[category];
//   const question = questions[current];

//   const score = questions.reduce(
//     (total, item, index) =>
//       total + (selected[index] === item.answer ? 1 : 0),
//     0
//   );

//   const answered = Object.keys(selected).length;
//   const minutes = Math.floor(seconds / 60);
//   const remainingSeconds = seconds % 60;
//   const percentage = Math.round((score / questions.length) * 100);

//   const finishInterview = useCallback(async () => {
//     if (saving || saved) return;

//     setFinished(true);
//     setSaving(true);
//     setSaveError("");

//     const token = localStorage.getItem("token");

//     if (!token) {
//       setSaving(false);
//       navigate("/login", { replace: true });
//       return;
//     }

//     const correctAnswers = questions.reduce(
//       (total, item, index) =>
//         total + (selected[index] === item.answer ? 1 : 0),
//       0
//     );

//     try {
//       const response = await fetch(`${API_URL}/api/interviews`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           category,
//           totalQuestions: questions.length,
//           correctAnswers,
//           answeredQuestions: Object.keys(selected).length,
//           durationSeconds: QUESTION_TIME - seconds,
//         }),
//       });

//       const data = await response.json();

//       if (response.status === 401 || response.status === 403) {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         navigate("/login", { replace: true });
//         return;
//       }

//       if (!response.ok) {
//         throw new Error(data.message || "Result save nahi hua.");
//       }

//       setSaved(true);
//     } catch (error) {
//       console.error("Save interview result error:", error);
//       setSaveError(
//         error.message || "Result save nahi hua. Dobara try karein."
//       );
//     } finally {
//       setSaving(false);
//     }
//   }, [category, questions, selected, seconds, saving, saved, navigate]);

//   // Interview ka timer.
//   useEffect(() => {
//     if (finished || seconds <= 0) return;

//     const timer = setInterval(() => {
//       setSeconds((previous) => Math.max(0, previous - 1));
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [finished, seconds]);

//   // Timer khatam hone par result automatically save hoga.
//   useEffect(() => {
//     if (seconds === 0 && !finished && !saved && !saving) {
//       finishInterview();
//     }
//   }, [seconds, finished, saved, saving, finishInterview]);

//   function startCategory(value) {
//     setCategory(value);
//     setCurrent(0);
//     setSelected({});
//     setSeconds(QUESTION_TIME);
//     setFinished(false);
//     setSaving(false);
//     setSaved(false);
//     setSaveError("");
//   }

//   function restart() {
//     startCategory(category);
//   }

//   function chooseAnswer(index) {
//     setSelected((previous) => ({
//       ...previous,
//       [current]: index,
//     }));
//   }

//   return (
//     <main className="practice-page">
//       <header className="practice-header">
//         <a href="/dashboard" className="practice-brand">
//           InterviewAI
//         </a>

//         <button
//           className="practice-back"
//           onClick={() => navigate("/dashboard")}
//         >
//           Back to Dashboard
//         </button>
//       </header>

//       <section className="practice-container">
//         <p className="practice-eyebrow">INTERVIEW PRACTICE</p>
//         <h1>Prepare for your next interview</h1>
//         <p className="practice-description">
//           Select a category, answer the questions and check your result.
//         </p>

//         <div className="category-buttons">
//           {Object.keys(questionSets).map((item) => (
//             <button
//               key={item}
//               className={`category-button ${
//                 category === item ? "active" : ""
//               }`}
//               onClick={() => startCategory(item)}
//               disabled={saving}
//             >
//               {item}
//             </button>
//           ))}
//         </div>

//         {!finished ? (
//           <section className="question-card">
//             <div className="question-meta">
//               <span>
//                 Question {current + 1} of {questions.length}
//               </span>
//               <span className="practice-timer">
//                 {minutes}:{String(remainingSeconds).padStart(2, "0")}
//               </span>
//             </div>

//             <div
//               className="practice-progress"
//               role="progressbar"
//               aria-valuenow={current + 1}
//               aria-valuemin={1}
//               aria-valuemax={questions.length}
//             >
//               <div
//                 style={{
//                   width: `${((current + 1) / questions.length) * 100}%`,
//                 }}
//               />
//             </div>

//             <h2>{question.question}</h2>

//             <div className="answer-options">
//               {question.options.map((option, index) => (
//                 <button
//                   type="button"
//                   key={option}
//                   className={`answer-option ${
//                     selected[current] === index ? "selected" : ""
//                   }`}
//                   aria-pressed={selected[current] === index}
//                   onClick={() => chooseAnswer(index)}
//                 >
//                   <span className="option-letter">
//                     {String.fromCharCode(65 + index)}
//                   </span>
//                   <span>{option}</span>
//                 </button>
//               ))}
//             </div>

//             {saveError && (
//               <div className="save-error" role="alert">
//                 {saveError}
//               </div>
//             )}

//             <div className="question-footer">
//               <span>{answered} answered</span>

//               {current > 0 && (
//                 <button
//                   className="secondary-button"
//                   onClick={() => setCurrent((value) => value - 1)}
//                 >
//                   Previous
//                 </button>
//               )}

//               {current < questions.length - 1 ? (
//                 <button
//                   className="primary-button"
//                   onClick={() => setCurrent((value) => value + 1)}
//                 >
//                   Next Question
//                 </button>
//               ) : (
//                 <button
//                   className="primary-button"
//                   onClick={finishInterview}
//                   disabled={saving}
//                 >
//                   {saving ? "Saving Result..." : "Finish Interview"}
//                 </button>
//               )}
//             </div>
//           </section>
//         ) : (
//           <section className="result-card">
//             <div className="result-icon">{saved ? "✓" : "!"}</div>
//             <h2>Interview Completed!</h2>
//             <p>
//               You completed the {category} practice interview.
//             </p>

//             <div className="score-circle">
//               <strong>{percentage}%</strong>
//               <span>Your Score</span>
//             </div>

//             <p>
//               Correct answers: {score} / {questions.length}
//             </p>
//             <p>
//               Questions answered: {answered} / {questions.length}
//             </p>

//             {saving && (
//               <p className="save-status">Saving your result...</p>
//             )}

//             {saved && (
//               <p className="save-success" role="status">
//                 Result saved successfully! Your Dashboard can now show it.
//               </p>
//             )}

//             {saveError && (
//               <div className="save-error" role="alert">
//                 <p>{saveError}</p>
//                 <button
//                   className="primary-button"
//                   onClick={finishInterview}
//                   disabled={saving}
//                 >
//                   {saving ? "Saving..." : "Try Saving Again"}
//                 </button>
//               </div>
//             )}

//             <div className="answer-review">
//               <h3>Answer Review</h3>

//               {questions.map((item, index) => (
//                 <div className="review-item" key={item.question}>
//                   <strong>
//                     {index + 1}. {item.question}
//                   </strong>

//                   <p>
//                     Your answer:{" "}
//                     {selected[index] !== undefined
//                       ? item.options[selected[index]]
//                       : "Not answered"}
//                   </p>

//                   <p>
//                     Correct answer: {item.options[item.answer]}
//                   </p>

//                   <small>{item.explanation}</small>
//                 </div>
//               ))}
//             </div>

//             <div className="result-actions">
//               <button className="primary-button" onClick={restart}>
//                 Try Again
//               </button>

//               <button
//                 className="secondary-button"
//                 onClick={() => navigate("/dashboard")}
//               >
//                 Back to Dashboard
//               </button>
//             </div>
//           </section>
//         )}
//       </section>
//     </main>
//   );
// }




































import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PracticeInterview.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const QUESTION_TIME = 300;

const questionSets = {
  Technical: [
    {
      question: "What is JavaScript?",
      options: [
        "A database",
        "A programming language",
        "An operating system",
        "A web browser",
      ],
      answer: 1,
      explanation:
        "JavaScript is a programming language used to make websites interactive.",
    },
    {
      question: "What is React?",
      options: [
        "A CSS framework",
        "A database",
        "A JavaScript library for building user interfaces",
        "A programming language",
      ],
      answer: 2,
      explanation:
        "React is a JavaScript library for building user interfaces.",
    },
    {
      question: "What does HTML stand for?",
      options: [
        "HyperText Markup Language",
        "HighText Machine Language",
        "Hyper Transfer Main Link",
        "Home Tool Markup Language",
      ],
      answer: 0,
      explanation: "HTML stands for HyperText Markup Language.",
    },
    {
      question: "Which method converts JSON text into a JavaScript object?",
      options: [
        "JSON.stringify()",
        "JSON.parse()",
        "JSON.convert()",
        "JSON.object()",
      ],
      answer: 1,
      explanation:
        "JSON.parse() converts valid JSON text into a JavaScript value.",
    },
    {
      question: "Which hook manages state in a React component?",
      options: ["useRoute", "useFetch", "useState", "usePage"],
      answer: 2,
      explanation:
        "The useState hook lets a React component store and update state.",
    },
  ],

  HR: [
    {
      question: "Tell me about yourself.",
      options: [
        "Share your education, skills and relevant experience",
        "Talk only about your hobbies",
        "Say nothing about your skills",
        "Discuss unrelated topics",
      ],
      answer: 0,
      explanation:
        "A strong introduction briefly covers your background, skills and career goals.",
    },
    {
      question: "What is your biggest strength?",
      options: [
        "I never learn anything new",
        "I avoid teamwork",
        "I am willing to learn and solve problems",
        "I never accept feedback",
      ],
      answer: 2,
      explanation:
        "Choose a genuine strength and support it with an example.",
    },
    {
      question: "How do you handle feedback?",
      options: [
        "Ignore all feedback",
        "Listen and use it to improve",
        "Argue every time",
        "Avoid the person giving feedback",
      ],
      answer: 1,
      explanation:
        "Constructive feedback helps you improve your work and skills.",
    },
    {
      question: "Why should we hire you?",
      options: [
        "I do not want to learn",
        "I have no interest in the role",
        "I can contribute using relevant skills and a willingness to learn",
        "I do not like working with others",
      ],
      answer: 2,
      explanation:
        "Connect your skills, motivation and learning ability to the role.",
    },
    {
      question: "Where do you see yourself in five years?",
      options: [
        "I want to stop learning",
        "I want to develop expertise and take on more responsibility",
        "I have no goals",
        "I do not want to improve",
      ],
      answer: 1,
      explanation:
        "Describe realistic professional goals and how you want to grow.",
    },
  ],

  Behavioral: [
    {
      question: "What would you do if you had a tight deadline?",
      options: [
        "Ignore the deadline",
        "Prioritize tasks and communicate early",
        "Wait until the last minute",
        "Leave every task unfinished",
      ],
      answer: 1,
      explanation:
        "Planning, prioritization and communication help manage tight deadlines.",
    },
    {
      question: "How would you handle a disagreement with a teammate?",
      options: [
        "Listen and discuss the issue respectfully",
        "Stop communicating",
        "Blame the teammate",
        "Ignore the problem",
      ],
      answer: 0,
      explanation:
        "Respectful communication helps teams find practical solutions.",
    },
    {
      question: "What if you do not know how to solve a task?",
      options: [
        "Give up immediately",
        "Pretend you know everything",
        "Research, try possible solutions and ask for help when needed",
        "Ignore the task",
      ],
      answer: 2,
      explanation:
        "Combine independent learning with asking for help when appropriate.",
    },
    {
      question: "How do you manage multiple tasks?",
      options: [
        "Do random tasks without a plan",
        "Prioritize by urgency and importance",
        "Avoid making decisions",
        "Forget the deadlines",
      ],
      answer: 1,
      explanation:
        "Prioritizing tasks helps you use time effectively.",
    },
    {
      question: "How do you respond when you make a mistake?",
      options: [
        "Hide the mistake",
        "Blame someone else",
        "Accept it, correct it and learn from it",
        "Repeat the mistake without reviewing it",
      ],
      answer: 2,
      explanation:
        "Accountability and learning from mistakes are valuable professional skills.",
    },
  ],

  Aptitude: [
    {
      question: "What is 25% of 240?",
      options: ["40", "50", "60", "80"],
      answer: 2,
      explanation: "240 × 25 / 100 = 60.",
    },
    {
      question: "Find the next number: 3, 6, 12, 24, ?",
      options: ["36", "42", "48", "54"],
      answer: 2,
      explanation: "Each number is multiplied by 2. 24 × 2 = 48.",
    },
    {
      question:
        "An item costs ₹800 and is sold for ₹1,000. What is the profit percentage?",
      options: ["20%", "25%", "30%", "15%"],
      answer: 1,
      explanation:
        "Profit = ₹200. Profit percentage = 200 / 800 × 100 = 25%.",
    },
    {
      question: "The average of 12, 18, 24, 30 and 36 is:",
      options: ["20", "22", "24", "26"],
      answer: 2,
      explanation:
        "Average = (12 + 18 + 24 + 30 + 36) / 5 = 24.",
    },
    {
      question: "A car travels 180 km in 3 hours. What is its average speed?",
      options: ["50 km/h", "60 km/h", "70 km/h", "90 km/h"],
      answer: 1,
      explanation: "Speed = Distance / Time = 180 / 3 = 60 km/h.",
    },
    {
      question:
        "If 8 workers complete a job in 6 days, how many days will 4 workers take at the same rate?",
      options: ["3 days", "6 days", "9 days", "12 days"],
      answer: 3,
      explanation:
        "Total work = 8 × 6 = 48 worker-days. 48 / 4 = 12 days.",
    },
    {
      question:
        "The ratio of boys to girls is 2:3. If there are 40 students, how many are girls?",
      options: ["16", "20", "24", "30"],
      answer: 2,
      explanation: "Girls = 3 / (2 + 3) × 40 = 24.",
    },
    {
      question:
        "A train 150 metres long crosses a pole in 10 seconds. What is its speed?",
      options: ["15 m/s", "10 m/s", "20 m/s", "25 m/s"],
      answer: 0,
      explanation: "Speed = 150 / 10 = 15 metres per second.",
    },
    {
      question:
        "What is the probability of getting an even number on a fair six-sided die?",
      options: ["1/6", "1/3", "1/2", "2/3"],
      answer: 2,
      explanation:
        "Even outcomes are 2, 4 and 6. Probability = 3 / 6 = 1 / 2.",
    },
    {
      question:
        "A father is 40 years old and his son is 10. After how many years will the father be twice as old as his son?",
      options: ["10 years", "15 years", "20 years", "25 years"],
      answer: 2,
      explanation:
        "40 + x = 2(10 + x). Solving the equation gives x = 20 years.",
    },
  ],
};

export default function PracticeInterview() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("Technical");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState({});
  const [seconds, setSeconds] = useState(QUESTION_TIME);
  const [finished, setFinished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState("");

  const questions = questionSets[category];
  const question = questions[current];

  const score = questions.reduce(
    (total, item, index) =>
      total + (selected[index] === item.answer ? 1 : 0),
    0
  );

  const answered = Object.keys(selected).length;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const percentage = Math.round((score / questions.length) * 100);

  const finishInterview = useCallback(async () => {
    if (saving || saved) return;

    setFinished(true);
    setSaving(true);
    setSaveError("");

    const token = localStorage.getItem("token");

    if (!token) {
      setSaving(false);
      navigate("/login", { replace: true });
      return;
    }

    const correctAnswers = questions.reduce(
      (total, item, index) =>
        total + (selected[index] === item.answer ? 1 : 0),
      0
    );

    try {
      const response = await fetch(`${API_URL}/api/interviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          category,
          totalQuestions: questions.length,
          correctAnswers,
          answeredQuestions: Object.keys(selected).length,
          durationSeconds: QUESTION_TIME - seconds,
        }),
      });

      const data = await response.json();

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Result save nahi hua.");
      }

      setSaved(true);
    } catch (error) {
      console.error("Save interview result error:", error);
      setSaveError(
        error.message || "Result save nahi hua. Dobara try karein."
      );
    } finally {
      setSaving(false);
    }
  }, [category, questions, selected, seconds, saving, saved, navigate]);

  useEffect(() => {
    if (finished || seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((previous) => Math.max(0, previous - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [finished, seconds]);

  useEffect(() => {
    if (seconds === 0 && !finished && !saved && !saving) {
      finishInterview();
    }
  }, [seconds, finished, saved, saving, finishInterview]);

  function startCategory(value) {
    setCategory(value);
    setCurrent(0);
    setSelected({});
    setSeconds(QUESTION_TIME);
    setFinished(false);
    setSaving(false);
    setSaved(false);
    setSaveError("");
  }

  function restart() {
    startCategory(category);
  }

  function chooseAnswer(index) {
    setSelected((previous) => ({
      ...previous,
      [current]: index,
    }));
  }

  return (
    <main className="practice-page">
      <header className="practice-header">
        <a href="/dashboard" className="practice-brand">
          InterviewAI
        </a>

        <button
          type="button"
          className="practice-back"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
      </header>

      <section className="practice-container">
        <p className="practice-eyebrow">INTERVIEW PRACTICE</p>
        <h1>Prepare for your next interview</h1>
        <p className="practice-description">
          Select a category, answer the questions and check your result.
        </p>

        <div className="category-buttons">
          {Object.keys(questionSets).map((item) => (
            <button
              type="button"
              key={item}
              className={`category-button ${
                category === item ? "active" : ""
              }`}
              onClick={() => startCategory(item)}
              disabled={saving}
            >
              {item}
            </button>
          ))}
        </div>

        {!finished ? (
          <section className="question-card">
            <div className="question-meta">
              <span>
                Question {current + 1} of {questions.length}
              </span>
              <span className="practice-timer">
                {minutes}:{String(remainingSeconds).padStart(2, "0")}
              </span>
            </div>

            <div
              className="practice-progress"
              role="progressbar"
              aria-valuenow={current + 1}
              aria-valuemin={1}
              aria-valuemax={questions.length}
            >
              <div
                style={{
                  width: `${((current + 1) / questions.length) * 100}%`,
                }}
              />
            </div>

            <h2>{question.question}</h2>

            <div className="answer-options">
              {question.options.map((option, index) => (
                <button
                  type="button"
                  key={option}
                  className={`answer-option ${
                    selected[current] === index ? "selected" : ""
                  }`}
                  aria-pressed={selected[current] === index}
                  onClick={() => chooseAnswer(index)}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                </button>
              ))}
            </div>

            {saveError && (
              <div className="save-error" role="alert">
                {saveError}
              </div>
            )}

            <div className="question-footer">
              <span>{answered} answered</span>

              {current > 0 && (
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setCurrent((value) => value - 1)}
                >
                  Previous
                </button>
              )}

              {current < questions.length - 1 ? (
                <button
                  type="button"
                  className="primary-button"
                  onClick={() => setCurrent((value) => value + 1)}
                >
                  Next Question
                </button>
              ) : (
                <button
                  type="button"
                  className="primary-button"
                  onClick={finishInterview}
                  disabled={saving}
                >
                  {saving ? "Saving Result..." : "Finish Interview"}
                </button>
              )}
            </div>
          </section>
        ) : (
          <section className="result-card">
            <div className="result-icon">{saved ? "✓" : "!"}</div>
            <h2>Interview Completed!</h2>
            <p>
              You completed the {category} practice interview.
            </p>

            <div className="score-circle">
              <strong>{percentage}%</strong>
              <span>Your Score</span>
            </div>

            <p>
              Correct answers: {score} / {questions.length}
            </p>
            <p>
              Questions answered: {answered} / {questions.length}
            </p>

            {saving && (
              <p className="save-status">Saving your result...</p>
            )}

            {saved && (
              <p className="save-success" role="status">
                Result saved successfully! Your Dashboard can now show it.
              </p>
            )}

            {saveError && (
              <div className="save-error" role="alert">
                <p>{saveError}</p>
                <button
                  type="button"
                  className="primary-button"
                  onClick={finishInterview}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Try Saving Again"}
                </button>
              </div>
            )}

            <div className="answer-review">
              <h3>Answer Review</h3>

              {questions.map((item, index) => (
                <div className="review-item" key={item.question}>
                  <strong>
                    {index + 1}. {item.question}
                  </strong>

                  <p>
                    Your answer:{" "}
                    {selected[index] !== undefined
                      ? item.options[selected[index]]
                      : "Not answered"}
                  </p>

                  <p>
                    Correct answer: {item.options[item.answer]}
                  </p>

                  <small>{item.explanation}</small>
                </div>
              ))}
            </div>

            <div className="result-actions">
              <button
                type="button"
                className="primary-button"
                onClick={restart}
              >
                Try Again
              </button>

              <button
                type="button"
                className="secondary-button"
                onClick={() => navigate("/dashboard")}
              >
                Back to Dashboard
              </button>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
