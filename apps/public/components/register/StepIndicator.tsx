interface StepIndicatorProps {
    currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
    const steps = [
        { number: 1, label: "Kind" },
        { number: 2, label: "Ouder / Voogdij" },
        { number: 3, label: "Betaling" },
    ];

    return (
        <div className="w-full relative h-20 flex gap-2">
            {steps.map((step, index) => (
                <div
                    key={step.number}
                    className={`h-full flex-1 flex items-center justify-center relative ${
                        currentStep >= step.number
                            ? "bg-primary text-primary-foreground"
                            : "bg-white"
                    }`}
                >
                    <span className="relative z-10">{step.label}</span>
                    {index < steps.length - 1 && (
                        <div
                            className={`absolute -right-[20px] top-0 h-0 w-0 border-t-[40px] border-t-transparent border-l-[20px] border-b-[40px] border-b-transparent z-20 ${
                                currentStep >= step.number
                                    ? `border-l-primary ${
                                          currentStep > step.number
                                              ? "border-t-primary! border-b-primary!"
                                              : ""
                                      }`
                                    : "border-l-white"
                            }`}
                        ></div>
                    )}
                </div>
            ))}
        </div>
    );
}
