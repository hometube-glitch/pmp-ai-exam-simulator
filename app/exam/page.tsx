"use client";

import { useEffect, useState } from "react";
import questions from "@/data/questions.json";

export default function Exam() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [time, setTime] = useState(60);

  const current = questions[index];

  // ⏱️ Timer
  useEffect(() => {
    if (time <= 0) {
      localStorage.setItem("results", JSON.stringify(answers));
      window.location.href = "/dashboard";
      return;
    }

    const timer = setTimeout(() => {
      setTime(time - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [time]);

  const handleAnswer = (i: number) => {
    const updated = [
      ...answers,
      {
        ...current,
        selected: i,
        correct: i === current.answer
      }
    ];

    setAnswers(updated);

    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      localStorage.setItem("results", JSON.stringify(updated));
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-xl">

        <div className="flex justify-between mb-4">
          <h2 className="font-bold text-lg">
            Question {index + 1}
          </h2>
          <span className="text-red-500 font-bold">
            ⏱️ {time}s
          </span>
        </div>

        <p className="mb-4 text-white">
          {current.question}
        </p>

        <div className="space-y-3">
          {current.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className="w-full border p-3 rounded-lg hover:bg-gray-700 text-left text-white"
            >
              {opt}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}