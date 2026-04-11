"use client";

import { SelectSettings } from "@/lib/database/schema";
import { formSchema, guardianSchema } from "./childForm";
import { toast } from "react-toastify";
import GuardianCollapsible from "./guardianCollapsible";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";

export default function StepGuardian({
    form,
    openGuardian,
    setOpenGuardian,
    settings,
}: {
    form: ReturnType<typeof useForm<z.infer<typeof formSchema>>>;
    openGuardian: number[];
    setOpenGuardian: React.Dispatch<React.SetStateAction<number[]>>;
    settings: SelectSettings;
}) {
    const guardians = form.watch("guardians") || [];

    const addGuardian = () => {
        if (guardians.length === settings.maxGuardiansPerRegistration) {
            toast.error(
                `Je kunt maximaal ${settings.maxGuardiansPerRegistration} verzorgers per registratie toevoegen.`
            );
            return;
        }
        const currentGuardians = form.getValues("guardians") || [];
        form.setValue("guardians", [
            ...currentGuardians,
            {
                firstname: "",
                infix: "",
                lastname: "",
                email: "",
                phone: "",
                adres: "",
                postal: "",
                city: "",
                isPrimary: false,
            },
        ]);
        setOpenGuardian([...openGuardian, currentGuardians.length]);
    };

    const toggleGuardian = (guardianIndex: number) => {
        if (openGuardian.includes(guardianIndex)) {
            setOpenGuardian(
                openGuardian.filter((idx) => idx !== guardianIndex)
            );
        } else {
            setOpenGuardian([...openGuardian, guardianIndex]);
        }
    };

    return (
        <>
            {guardians.map(
                (
                    guardian: z.infer<typeof guardianSchema>,
                    guardianIndex: number
                ) => (
                    <GuardianCollapsible
                        key={guardianIndex}
                        guardian={guardian}
                        guardianIndex={guardianIndex}
                        isOpen={openGuardian.includes(guardianIndex)}
                        onToggle={() => toggleGuardian(guardianIndex)}
                        control={form.control}
                        deleteGuardian={
                            guardianIndex > 0
                                ? () => {
                                      const currentGuardians =
                                          form.getValues("guardians");
                                      form.setValue(
                                          "guardians",
                                          currentGuardians.filter(
                                              (_: unknown, idx: number) =>
                                                  idx !== guardianIndex
                                          )
                                      );
                                      setOpenGuardian(
                                          openGuardian.filter(
                                              (idx) => idx !== guardianIndex
                                          )
                                      );
                                  }
                                : undefined
                        }
                    />
                )
            )}

            <Button type="button" variant="secondary" onClick={addGuardian}>
                Extra Verzorger Toevoegen
            </Button>
        </>
    );
}
