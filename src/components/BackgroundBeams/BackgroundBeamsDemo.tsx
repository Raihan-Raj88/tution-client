"use client";
import { BackgroundBeams } from "../ui/background-beams";

export const BackgroundBeamsDemo = () => {
  return (
    <div className="h-[200px] md:h-[300px] w-full rounded-md bg-transparent relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4"></div>
      <BackgroundBeams />
    </div>
  );
};
