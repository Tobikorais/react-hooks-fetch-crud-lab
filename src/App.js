import React, { useEffect, useState } from "react";

function App() {
  const [questions, setQuestions] = useState([]);
  const [viewQuestions, setViewQuestions] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const handleNewQuestion = () => {
    const newQuestion = { id: Date.now(), prompt: "New Question" };
    setQuestions([...questions, newQuestion]);
  };

  const handleDeleteQuestion = (id) => {
    setQuestions(questions.filter((question) => question.id !== id));
  };

  const handleUpdateAnswer = (id, newAnswer) => {
    setQuestions(
      questions.map((question) =>
        question.id === id ? { ...question, answer: newAnswer } : question
      )
    );
  };

  return (
    <main>
      <nav>
        <button onClick={() => setViewQuestions(false)}>New Question</button>
        <button onClick={() => setViewQuestions(true)}>View Questions</button>
      </nav>
      <section>
        <h1>Quiz Questions</h1>
        {viewQuestions ? (
          <ul>
            {questions.map((question) => (
              <li key={question.id}>
                {question.prompt}
                <button onClick={() => handleDeleteQuestion(question.id)}>
                  Delete Question
                </button>
                <select
                  onChange={(e) =>
                    handleUpdateAnswer(question.id, e.target.value)
                  }
                >
                  <option value="">Select Answer</option>
                  <option value="1">Answer 1</option>
                  <option value="2">Answer 2</option>
                  <option value="3">Answer 3</option>
                </select>
              </li>
            ))}
          </ul>
        ) : (
          <button onClick={handleNewQuestion}>Add New Question</button>
        )}
      </section>
    </main>
  );
}

export default App;
