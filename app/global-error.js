"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Algo salió mal</h2>
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Intentar de nuevo
          </button>
        </div>
      </body>
    </html>
  );
} 