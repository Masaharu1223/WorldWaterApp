"use client";

export default function LoadingSpinner() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-900">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-sky-400 border-t-transparent" />
        <p className="text-sky-300 text-sm">読み込み中...</p>
      </div>
    </div>
  );
}
