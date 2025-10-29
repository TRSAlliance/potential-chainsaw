// src/pages/Intro.jsx

export default function Intro() {
  return (
    <div className="min-h-screen bg-slate-900 text-white px-6 py-20 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Welcome to TRS Knowledge Galaxy</h1>

      <p className="text-slate-300 mb-4">
        This platform exists for one reason — to prepare people for the world that's coming.
        Education isn’t keeping up. So we built the real version:
      </p>

      <ul className="list-disc list-inside text-slate-300 space-y-2">
        <li>Business studies early, not late.</li>
        <li>Real-world survival skills and financial literacy.</li>
        <li>Technology that students actually use.</li>
        <li>News and truth systems with zero corporate distortion.</li>
        <li>Industry knowledge for jobs that matter.</li>
      </ul>

      <p className="text-slate-400 mt-6">
        This is the school we all should’ve had — built with AI, built by operators,
        built for the next generation.
      </p>
    </div>
  );
}
