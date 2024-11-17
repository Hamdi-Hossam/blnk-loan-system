// ProgressBar.tsx
"use client";

import React from "react";

interface ProgressBarProps {
  progress: number; // The percentage of progress (0 to 100)
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 my-4">
      <div
        className="bg-primary h-full rounded-full transition-all"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
