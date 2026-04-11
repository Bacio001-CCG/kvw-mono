"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@workspace/ui/components/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@workspace/ui/components/card";
import { Field } from "@workspace/ui/components/field";
import StepBreadcrumb from "./stepBreadcrumb";
import { SelectSettings } from "@/lib/database/schema";
import { toast } from "react-toastify";
import StepChild from "./stepChild";
import StepGuardian from "./stepGuardian";
import StepPayment from "./stepPayment";

const friendSchema = z.object({
    firstname: z
        .string()
        .min(2, "Voornaam moet minimaal 2 letters zijn.")
        .max(32, "Voornaam mag maximaal 32 letters zijn."),
    infix: z
        .string()
        .max(16, "Tussenvoegsel mag maximaal 16 letters zijn.")
        .optional(),
    lastname: z
        .string()
        .min(1, "Achternaam moet minimaal 2 letters zijn.")
        .max(32, "Achternaam mag maximaal 32 letters zijn."),
});

const childSchema = z.object({
    firstname: z
        .string()
        .min(2, "Voornaam moet minimaal 2 letters zijn.")
        .max(32, "Voornaam mag maximaal 32 letters zijn."),
    infix: z
        .string()
        .max(16, "Tussenvoegsel mag maximaal 16 letters zijn.")
        .optional(),
    lastname: z
        .string()
        .min(1, "Achternaam moet minimaal 2 letters zijn.")
        .max(32, "Achternaam mag maximaal 32 letters zijn."),
    age: z
        .number()
        .min(3, "Leeftijd moet minimaal 3 jaar zijn.")
        .max(16, "Leeftijd mag maximaal 16 jaar zijn."),
    swim_certificate: z.string().min(1, "Zwemdiploma is verplicht."),
    notes: z
        .string()
        .max(2048, "Extra informatie mag maximaal 2048 tekens zijn.")
        .optional(),
    friends: z.array(friendSchema).optional(),
});

const guardianSchema = z.object({
    firstname: z
        .string()
        .min(2, "Voornaam moet minimaal 2 letters zijn.")
        .max(32, "Voornaam mag maximaal 32 letters zijn."),
    infix: z
        .string()
        .max(16, "Tussenvoegsel mag maximaal 16 letters zijn.")
        .optional(),
    lastname: z
        .string()
        .min(1, "Achternaam moet minimaal 2 letters zijn.")
        .max(32, "Achternaam mag maximaal 32 letters zijn."),
    email: z.string().email("Ongeldig e-mailadres."),
    phone: z
        .string()
        .min(10, "Telefoonnummer moet minimaal 10 cijfers zijn.")
        .max(15, "Telefoonnummer mag maximaal 15 cijfers zijn."),
    adres: z
        .string()
        .min(5, "Adres moet minimaal 5 tekens zijn.")
        .max(100, "Adres mag maximaal 100 tekens zijn."),
    postal: z
        .string()
        .min(4, "Postcode moet minimaal 4 tekens zijn.")
        .max(10, "Postcode mag maximaal 10 tekens zijn."),
    city: z.string(),
    isPrimary: z.boolean(),
});

const formSchema = z.object({
    children: z.array(childSchema).min(1, "Minimaal 1 kind is verplicht."),
    guardians: z
        .array(guardianSchema)
        .min(1, "Minimaal 1 verzorger is verplicht."),
});

export default function ChildForm({ settings }: { settings: SelectSettings }) {
    const [currentStep, setCurrentStep] = React.useState(1);
    const [openChildren, setOpenChildren] = React.useState<number[]>([0]);
    const [openGuardian, setOpenGuardian] = React.useState<number[]>([0]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            children: [
                {
                    firstname: "",
                    infix: "",
                    lastname: "",
                    age: 8,
                    swim_certificate: "Geen",
                    notes: "",
                    friends: [],
                },
            ],
            guardians: [
                {
                    firstname: "",
                    infix: "",
                    lastname: "",
                    email: "",
                    phone: "",
                    adres: "",
                    postal: "",
                    city: "",
                    isPrimary: true,
                },
            ],
        },
    });

    const children = form.watch("children");

    const getStepWithErrors = (errors: any) => {
        if (errors.children) {
            return 1;
        }
        if (errors.guardians) {
            return 2;
        }
        return null;
    };

    function onSubmit(data: z.infer<typeof formSchema>) {
        toast.success("Formulier succesvol verzonden!");
    }

    const toggleChild = (childIndex: number) => {
        if (openChildren.includes(childIndex)) {
            setOpenChildren(openChildren.filter((idx) => idx !== childIndex));
        } else {
            setOpenChildren([...openChildren, childIndex]);
        }
    };

    // Validate current step before moving to next
    const handleNext = async () => {
        let isValid = false;

        if (currentStep === 1) {
            isValid = await form.trigger("children");
        } else if (currentStep === 2) {
            isValid = await form.trigger("guardians");
        }

        if (isValid) {
            setCurrentStep(Math.min(3, currentStep + 1));
        } else {
            // Forceer een state update om errors zichtbaar te maken
            await form.trigger(); // Trigger all validations

            const errors = form.formState.errors;
            const errorStep = getStepWithErrors(errors);

            if (errorStep && errorStep !== currentStep) {
                setCurrentStep(errorStep);
            }

            toast.error("Vul alle verplichte velden correct in.");
        }
    };

    // Handle form submission with error checking
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const isValid = await form.trigger();

        if (!isValid) {
            const errors = form.formState.errors;
            const errorStep = getStepWithErrors(errors);

            if (errorStep) {
                setCurrentStep(errorStep);
                toast.error(
                    `Er zijn fouten in stap ${errorStep}. Controleer je invoer.`
                );
            }
            return;
        }

        form.handleSubmit(onSubmit)();
    };

    return (
        <Card className="w-full pt-0 overflow-hidden">
            <StepBreadcrumb currentStep={currentStep} />
            {currentStep === 1 && (
                <CardHeader>
                    <CardTitle>Kind Registratie</CardTitle>
                    <CardDescription>
                        Vul het onderstaande formulier in om een kind te
                        registreren.
                    </CardDescription>
                </CardHeader>
            )}
            {currentStep === 2 && (
                <CardHeader>
                    <CardTitle>Verzorger Registratie</CardTitle>
                    <CardDescription>
                        Vul het onderstaande formulier in om een verzorger te
                        registreren.
                    </CardDescription>
                </CardHeader>
            )}
            <CardContent>
                <form
                    id="form-child"
                    className="flex flex-col gap-5"
                    onSubmit={handleSubmit}
                >
                    {currentStep === 1 && (
                        <StepChild
                            settings={settings}
                            children={children}
                            form={form}
                            openChildren={openChildren}
                            toggleChild={toggleChild}
                            setOpenChildren={setOpenChildren}
                        />
                    )}
                    {currentStep === 2 && (
                        <StepGuardian
                            settings={settings}
                            form={form}
                            openGuardian={openGuardian}
                            setOpenGuardian={setOpenGuardian}
                        />
                    )}
                    {currentStep === 3 && (
                        <StepPayment
                            childrenCount={children.length}
                            settings={settings}
                        />
                    )}
                </form>
            </CardContent>
            <CardFooter>
                <Field orientation="horizontal">
                    <Button
                        type="button"
                        variant="outline"
                        disabled={currentStep === 1}
                        onClick={() =>
                            setCurrentStep(Math.max(1, currentStep - 1))
                        }
                    >
                        Vorige
                    </Button>
                    <Button
                        type="button"
                        className="ml-auto"
                        onClick={handleNext}
                    >
                        Volgende
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    );
}

export { formSchema, childSchema, friendSchema, guardianSchema };
