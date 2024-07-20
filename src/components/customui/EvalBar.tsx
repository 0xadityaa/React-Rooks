"use client";

const EvalBar = ({ score }: { score: number }) => {
  const maxScore = 1000; // Maximum score in centipawns
  const width = (Math.min(Math.abs(score), maxScore) / maxScore) * 100; // Convert score to percentage

  return (
    <>
      <div className="relative rounded-md flex flex-col items-center justify-center h-[500px] w-[80px] bg-gray-200 text-center">
        <div className="absolute top-0 w-full text-xl text-black font-light text-pretty align-text-top z-10">
          {-1 * score}
        </div>
        <div className="relative h-full w-full">
          <div
            style={{
              height: `${width}%`,
              width: `100%`,
              background: score > 0 ? "red" : "green",
              transition: "width 0.3s ease",
            }}
            className="absolute top-0 left-0 h-full"
          />
        </div>
      </div>
    </>
  );
};

export default EvalBar;
