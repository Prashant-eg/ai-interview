
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Admin.css";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// export default function Admin() {
//   const navigate = useNavigate();
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [form, setForm] = useState({
//     question: "",
//     category: "Technical",
//     difficulty: "Easy",
//     options: ["", "", "", ""],
//     correctAnswer: "",
//     explanation: ""
//   });

//   const token = localStorage.getItem("token");

//   async function loadQuestions() {
//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch(`${API_URL}/api/admin/questions`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Questions load nahi hue.");
//       }

//       setQuestions(Array.isArray(data) ? data : data.questions || []);
//     } catch (err) {
//       setError(err.message || "Server se connect nahi ho paya.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }
//     loadQuestions();
//   }, []);

//   function updateOption(index, value) {
//     setForm((previous) => ({
//       ...previous,
//       options: previous.options.map((option, i) =>
//         i === index ? value : option
//       )
//     }));
//   }

//   async function addQuestion(event) {
//     event.preventDefault();
//     setError("");

//     if (!form.options.every((option) => option.trim())) {
//       setError("Please chaaron options fill karo.");
//       return;
//     }

//     if (!form.options.includes(form.correctAnswer)) {
//       setError("Correct answer options mein se select karo.");
//       return;
//     }

//     try {
//       const response = await fetch(`${API_URL}/api/admin/questions`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify(form)
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Question add nahi hua.");
//       }

//       setForm({
//         question: "",
//         category: "Technical",
//         difficulty: "Easy",
//         options: ["", "", "", ""],
//         correctAnswer: "",
//         explanation: ""
//       });

//       await loadQuestions();
//     } catch (err) {
//       setError(err.message);
//     }
//   }

//   async function deleteQuestion(id) {
//     if (!window.confirm("Kya aap ye question delete karna chahte hain?")) {
//       return;
//     }

//     try {
//       const response = await fetch(`${API_URL}/api/admin/questions/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Question delete nahi hua.");
//       }

//       await loadQuestions();
//     } catch (err) {
//       setError(err.message);
//     }
//   }

//   function logout() {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   }

//   return (
//     <main className="admin-page">
//       <header className="admin-header">
//         <div>
//           <p className="admin-eyebrow">INTERVIEWAI</p>
//           <h1>Admin Dashboard</h1>
//           <p>Manage your interview question bank.</p>
//         </div>

//         <div className="admin-actions">
//           <button onClick={() => navigate("/dashboard")}>
//             User Dashboard
//           </button>
//           <button className="admin-logout" onClick={logout}>
//             Logout
//           </button>
//         </div>
//       </header>

//       <section className="admin-stats">
//         <article className="admin-stat">
//           <span>Total Questions</span>
//           <strong>{questions.length}</strong>
//         </article>
//         <article className="admin-stat">
//           <span>Categories</span>
//           <strong>4</strong>
//         </article>
//         <article className="admin-stat">
//           <span>Difficulty Levels</span>
//           <strong>3</strong>
//         </article>
//       </section>

//       <section className="admin-card">
//         <h2>Add Interview Question</h2>

//         {error && <p className="admin-error">{error}</p>}

//         <form onSubmit={addQuestion} className="admin-form">
//           <label>
//             Question
//             <textarea
//               required
//               value={form.question}
//               onChange={(e) =>
//                 setForm({ ...form, question: e.target.value })
//               }
//               placeholder="Enter interview question"
//             />
//           </label>

//           <div className="admin-form-row">
//             <label>
//               Category
//               <select
//                 value={form.category}
//                 onChange={(e) =>
//                   setForm({ ...form, category: e.target.value })
//                 }
//               >
//                 <option>Technical</option>
//                 <option>HR</option>
//                 <option>Behavioral</option>
//                 <option>Aptitude</option>
//               </select>
//             </label>

//             <label>
//               Difficulty
//               <select
//                 value={form.difficulty}
//                 onChange={(e) =>
//                   setForm({ ...form, difficulty: e.target.value })
//                 }
//               >
//                 <option>Easy</option>
//                 <option>Medium</option>
//                 <option>Hard</option>
//               </select>
//             </label>
//           </div>

//           <h3>Four Answer Options</h3>

//           {form.options.map((option, index) => (
//             <label key={index}>
//               Option {index + 1}
//               <input
//                 required
//                 value={option}
//                 onChange={(e) => updateOption(index, e.target.value)}
//                 placeholder={`Enter option ${index + 1}`}
//               />
//             </label>
//           ))}

//           <label>
//             Correct Answer
//             <select
//               required
//               value={form.correctAnswer}
//               onChange={(e) =>
//                 setForm({ ...form, correctAnswer: e.target.value })
//               }
//             >
//               <option value="">Select correct answer</option>
//               {form.options
//                 .filter((option) => option.trim())
//                 .map((option, index) => (
//                   <option key={`${index}-${option}`} value={option}>
//                     {option}
//                   </option>
//                 ))}
//             </select>
//           </label>

//           <label>
//             Explanation (optional)
//             <textarea
//               value={form.explanation}
//               onChange={(e) =>
//                 setForm({ ...form, explanation: e.target.value })
//               }
//               placeholder="Explain why this answer is correct"
//             />
//           </label>

//           <button className="admin-submit" type="submit">
//             Add Question
//           </button>
//         </form>
//       </section>

//       <section className="admin-card">
//         <div className="admin-list-heading">
//           <h2>Manage Questions</h2>
//           <button onClick={loadQuestions}>Refresh</button>
//         </div>

//         {loading ? (
//           <p>Loading questions...</p>
//         ) : questions.length === 0 ? (
//           <p>No questions found yet.</p>
//         ) : (
//           <div className="admin-question-list">
//             {questions.map((item) => (
//               <article className="admin-question" key={item._id}>
//                 <div>
//                   <p className="admin-question-meta">
//                     {item.category} · {item.difficulty}
//                   </p>
//                   <h3>{item.question}</h3>
//                   <p>
//                     Correct answer: {item.correctAnswer}
//                   </p>
//                 </div>

//                 <button
//                   className="admin-delete"
//                   onClick={() => deleteQuestion(item._id)}
//                 >
//                   Delete
//                 </button>
//               </article>
//             ))}
//           </div>
//         )}
//       </section>
//     </main>
//   );
// }

































import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api.js";

const categories = ["Technical", "HR", "Behavioral", "Aptitude"];
const difficulties = ["Easy", "Medium", "Hard"];

const blankForm = {
  question: "",
  category: "Technical",
  difficulty: "Easy",
  options: ["", "", "", ""],
  correctAnswer: "",
  explanation: ""
};

export default function Admin() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [form, setForm] = useState(blankForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [questionData, analyticsData] = await Promise.all([
        api("/api/admin/questions"),
        api("/api/admin/analytics")
      ]);

      setQuestions(questionData.questions || []);
      setAnalytics(analyticsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  function updateOption(index, value) {
    const options = [...form.options];
    const oldValue = options[index];
    options[index] = value;

    setForm(current => ({
      ...current,
      options,
      correctAnswer:
        current.correctAnswer === oldValue ? "" : current.correctAnswer
    }));
  }

  async function addQuestion(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");

    try {
      if (form.options.some(option => !option.trim())) {
        throw new Error("Saare 4 options fill karein.");
      }

      if (!form.correctAnswer) {
        throw new Error("Correct answer select karein.");
      }

      await api("/api/admin/questions", {
        method: "POST",
        body: JSON.stringify(form)
      });

      setForm(blankForm);
      setNotice("Question successfully add ho gaya.");
      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function deleteQuestion(id) {
    if (!window.confirm("Kya aap is question ko delete karna chahte hain?")) {
      return;
    }

    setError("");
    setNotice("");

    try {
      await api(`/api/admin/questions/${id}`, {
        method: "DELETE"
      });

      setNotice("Question delete ho gaya.");
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  const totals = analytics?.totals;

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <p className="eyebrow">INTERVIEWAI / ADMIN</p>
          <h1>Admin Dashboard</h1>
          <p className="muted">
            Users, interview performance aur question bank manage karein.
          </p>
        </div>
        <div className="header-actions">
          <button className="btn secondary" onClick={() => navigate("/dashboard")}>
            User Dashboard
          </button>
          <button className="btn secondary" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      {error && <div className="alert">{error}</div>}
      {notice && <div className="success-message">{notice}</div>}

      <section className="stats-grid">
        <Stat label="Total users" value={totals?.totalUsers ?? "—"} />
        <Stat label="Successful logins" value={totals?.totalSuccessfulLogins ?? "—"} />
        <Stat label="Completed interviews" value={totals?.totalCompletedInterviews ?? "—"} />
        <Stat label="Average score" value={totals ? `${totals.averageScore}%` : "—"} />
        <Stat label="Question bank" value={questions.length} />
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <h2>Category performance</h2>
            <p className="muted">Har category ka average interview score.</p>
          </div>
          <button className="btn secondary" onClick={loadData} disabled={loading}>
            {loading ? "Loading..." : "Refresh data"}
          </button>
        </div>

        <div className="category-grid">
          {(analytics?.categoryPerformance || []).map(item => (
            <div className="category-card" key={item.category}>
              <h3>{item.category}</h3>
              <strong>{item.averageScore}%</strong>
              <p className="muted">
                {item.totalInterviews} completed interviews
              </p>
              <div className="progress">
                <span style={{ width: `${item.averageScore}%` }} />
              </div>
            </div>
          ))}
        </div>

        {!loading && analytics?.categoryPerformance?.length === 0 && (
          <p className="muted">Abhi interview results available nahi hain.</p>
        )}
      </section>

      <section className="panel">
        <h2>Add interview question</h2>
        <form className="admin-form" onSubmit={addQuestion}>
          <label>
            Question
            <textarea
              required
              value={form.question}
              onChange={e => setForm({ ...form, question: e.target.value })}
              placeholder="Enter interview question"
            />
          </label>

          <div className="setup-grid">
            <label>
              Category
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
              >
                {categories.map(item => <option key={item}>{item}</option>)}
              </select>
            </label>

            <label>
              Difficulty
              <select
                value={form.difficulty}
                onChange={e => setForm({ ...form, difficulty: e.target.value })}
              >
                {difficulties.map(item => <option key={item}>{item}</option>)}
              </select>
            </label>
          </div>

          {form.options.map((option, index) => (
            <label key={index}>
              Option {index + 1}
              <input
                required
                value={option}
                onChange={e => updateOption(index, e.target.value)}
                placeholder={`Enter option ${index + 1}`}
              />
            </label>
          ))}

          <label>
            Correct answer
            <select
              required
              value={form.correctAnswer}
              onChange={e => setForm({ ...form, correctAnswer: e.target.value })}
            >
              <option value="">Select correct answer</option>
              {form.options.filter(option => option.trim()).map((option, index) => (
                <option key={`${index}-${option}`} value={option}>{option}</option>
              ))}
            </select>
          </label>

          <label>
            Explanation (optional)
            <textarea
              value={form.explanation}
              onChange={e => setForm({ ...form, explanation: e.target.value })}
            />
          </label>

          <button className="btn primary" disabled={saving}>
            {saving ? "Adding..." : "Add question"}
          </button>
        </form>
      </section>

      <section className="panel">
        <h2>User analytics</h2>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Login count</th>
                <th>Interviews</th>
                <th>Average score</th>
                <th>Last login</th>
              </tr>
            </thead>
            <tbody>
              {(analytics?.users || []).map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.loginCount}</td>
                  <td>{user.totalInterviews}</td>
                  <td>{user.averageScore}%</td>
                  <td>
                    {user.lastLoginAt
                      ? new Date(user.lastLoginAt).toLocaleString()
                      : "Not recorded"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && analytics?.users?.length === 0 && (
            <p className="muted">Abhi koi registered user nahi hai.</p>
          )}
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <h2>Manage questions ({questions.length})</h2>
          <button className="btn secondary" onClick={loadData}>Refresh</button>
        </div>

        {questions.map(question => (
          <article className="question-row" key={question._id}>
            <div>
              <span className="pill">
                {question.category} · {question.difficulty}
              </span>
              <h3>{question.question}</h3>
              <p className="muted">
                Correct answer: {question.correctAnswer}
              </p>
            </div>
            <button
              className="btn danger"
              onClick={() => deleteQuestion(question._id)}
            >
              Delete
            </button>
          </article>
        ))}

        {!loading && questions.length === 0 && (
          <p className="muted">Question bank empty hai. Pehla question add karein.</p>
        )}
      </section>
    </main>
  );
}

function Stat({ label, value }) {
  return (
    <article className="stat-card">
      <span className="muted">{label}</span>
      <strong>{value}</strong>
    </article>
  );
}
