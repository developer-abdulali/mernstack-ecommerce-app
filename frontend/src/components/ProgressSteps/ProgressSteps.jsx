// import React from "react";

// const ProgressSteps = ({ step1, step2, step3 }) => {
//   return (
//     <div className="flex justify-center items-center space-x-4">
//       <div className={`${step1 ? "text-green-500" : "text-gray-300"}`}>
//         <span className="ml-2">Login</span>
//         <div className="mt-2 text-lg text-center">✅</div>
//       </div>

//       {step2 && (
//         <>
//           {step1 && <div className="h-0.5 w-[10rem] bg-green-500"></div>}
//           <div className={`${step1 ? "text-green-500" : "text-gray-300"}`}>
//             <span>Shipping</span>
//             <div className="mt-2 text-lg text-center">✅</div>
//           </div>
//         </>
//       )}

//       <>
//         {step1 && step2 && step3 ? (
//           <div className="h-0.5 w-[10rem] bg-green-500"></div>
//         ) : (
//           ""
//         )}

//         <div className={`${step3 ? "text-green-500" : "text-gray-300"}`}>
//           <span className={`${!step3 ? "ml-[10rem]" : ""}`}>Summary</span>
//           {step1 && step2 && step3 ? (
//             <div className="mt-2 text-lg text-center">✅</div>
//           ) : (
//             ""
//           )}
//         </div>
//       </>
//     </div>
//   );
// };

// export default ProgressSteps;

import React from "react";

const ProgressSteps = ({ step1, step2, step3 }) => {
  const steps = [
    { label: "Login", completed: step1 },
    { label: "Shipping", completed: step2 },
    { label: "Summary", completed: step3 },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.label}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  step.completed
                    ? "bg-[#436C68] border-[#436C68] text-white"
                    : "border-gray-300 text-gray-300"
                }`}
              >
                {step.completed ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={`mt-2 text-sm ${
                  step.completed
                    ? "text-[#436C68] font-medium"
                    : "text-gray-500"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 ${
                  step.completed && steps[index + 1].completed
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;
