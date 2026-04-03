"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie } from "recharts";

export default function Dashboard() {
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("results") || "[]");
    setResults(data);
  }, []);

  const total = results.length;
  const correct = results.filter(r => r.correct).length;
  const wrong = total - correct;
  const percentage = total ? (correct / total) * 100 : 0;

  const domainStats: any = {};

  results.forEach((q) => {
    if (!domainStats[q.domain]) {
      domainStats[q.domain] = { total: 0, correct: 0 };
    }
    domainStats[q.domain].total++;
    if (q.correct) domainStats[q.domain].correct++;
  });

  const chartData = [
    { name: "Correct", value: correct },
    { name: "Wrong", value: wrong }
  ];

  return (
    <div className="p-6 max-w-2xl mx-auto bg-black text-white min-h-screen">

      <h1 className="text-3xl font-bold mb-6 text-center">
        Exam Results
      </h1>

      <div className="bg-gray-800 p-4 rounded-xl mb-6 text-center">
        <p>Total: {total}</p>
        <p>Correct: {correct}</p>
        <p className="text-xl font-bold">
          Score: {percentage.toFixed(2)}%
        </p>
      </div>

      <div className="flex justify-center mb-6">
        <PieChart width={250} height={250}>
          <Pie data={chartData} dataKey="value" outerRadius={100} />
        </PieChart>
      </div>

      <div className="bg-gray-800 p-4 rounded-xl mb-6">
        <h2 className="font-bold mb-3">Domain Analysis</h2>

        {Object.keys(domainStats).map((domain) => {
          const d = domainStats[domain];
          const percent = (d.correct / d.total) * 100;

          return (
            <div key={domain} className="mb-3">
              <p>{domain}</p>
              <p>{d.correct}/{d.total} ({percent.toFixed(0)}%)</p>

              <div className="w-full bg-gray-600 h-2 rounded">
                <div
                  className="bg-blue-500 h-2 rounded"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gray-800 p-4 rounded-xl mt-6">
        <h2 className="font-bold mb-3">Review Answers</h2>

        {results.map((q, i) => (
          <div key={i} className="mb-4 border-b pb-2">
            <p>{q.question}</p>
            <p>Your: {q.options[q.selected]}</p>
            <p>Correct: {q.options[q.answer]}</p>
            <p className="text-gray-400 text-sm">
              💡 {q.explanation}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        {percentage > 70 ? (
          <p className="text-green-400 font-bold">Likely Pass ✅</p>
        ) : (
          <p className="text-red-400 font-bold">Needs Improvement ❌</p>
        )}
      </div>

    </div>
  );
}