interface ProgressBarProps {
    currentStep: number
    totalSteps: number
  }
  
  export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
    const percentage = (currentStep / totalSteps) * 100
  
    return (
      <div className="w-full">
        <div className="h-[2px] rounded-full w-full bg-gray-200">
          <div className="h-[2px] rounded-full bg-black transition-all duration-300 ease-in-out" style={{ width: `${percentage}%` }}></div>
        </div>
      </div>
    )
  }
  