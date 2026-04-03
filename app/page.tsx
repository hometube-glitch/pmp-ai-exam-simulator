"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">
        PMP AI Exam Simulator
      </h1>

      <button
        onClick={() => router.push("/exam")}
        className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Start Exam
      </button>
    </div>
  );
}