import { CheckCircle, Clock } from 'lucide-react';

/**
 * Status Timeline Component
 * Displays order status progress with steps
 */
const StatusTimeline = ({ statusSteps, currentStepIndex }) => {
  return (
    <div className="bg-white border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] p-6 sm:p-8 mb-6 transform rotate-1">
      <h2 className="text-xl font-black text-gray-900 mb-8 underline decoration-wavy decoration-2 underline-offset-4">Order Status</h2>

      <div className="space-y-6">
        {statusSteps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStepIndex;
          const isCompleted = index < currentStepIndex;

          return (
            <div key={step.id} className="relative">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className={`w-12 h-12 border-3 border-gray-900 flex items-center justify-center flex-shrink-0 transition-all ${
                    isCompleted
                      ? 'bg-gray-900'
                      : isActive
                      ? 'bg-white'
                      : 'bg-gray-100'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6 text-white" />
                  ) : (
                    <Icon
                      className={`w-6 h-6 ${
                        isActive ? 'text-gray-900' : 'text-gray-400'
                      }`}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <h3
                    className={`font-black text-lg mb-1 ${
                      isActive || isCompleted
                        ? 'text-gray-900'
                        : 'text-gray-400'
                    }`}
                  >
                    {step.label}
                  </h3>
                  <p
                    className={`text-sm font-medium ${
                      isActive || isCompleted ? 'text-gray-600' : 'text-gray-400'
                    }`}
                  >
                    {step.description}
                  </p>
                  {isActive && (
                    <div className="mt-3 flex items-center gap-2 text-gray-900">
                      <Clock className="w-4 h-4 animate-pulse" />
                      <span className="text-sm font-bold">In Progress...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Connector Line */}
              {index < statusSteps.length - 1 && (
                <div
                  className={`absolute left-6 top-12 w-1 h-6 ${
                    index < currentStepIndex ? 'bg-gray-900' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatusTimeline;
