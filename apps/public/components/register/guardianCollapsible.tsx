import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@workspace/ui/components/collapsible";
import { ChevronDown, Trash } from "lucide-react";
import { Control, Controller } from "react-hook-form";
import { Button } from "@workspace/ui/components/button";
import { Field, FieldLabel } from "@workspace/ui/components/field";
import GuardianBasicInfo from "./guardianBasicInfo";
import GuardianAddress from "./guardianAddress";
import { Checkbox } from "@workspace/ui/components/checkbox";

interface Guardian {
    firstname: string;
    infix?: string;
    lastname: string;
    email: string;
    phone: string;
    adres: string;
    postal: string;
    city: string;
    isPrimary: boolean;
}

interface GuardianCollapsibleProps {
    guardian: Guardian;
    guardianIndex: number;
    isOpen: boolean;
    onToggle: () => void;
    control: Control<any>;
    deleteGuardian?: () => void;
}

export default function GuardianCollapsible({
    guardian,
    guardianIndex,
    isOpen,
    onToggle,
    control,
    deleteGuardian,
}: GuardianCollapsibleProps) {
    return (
        <Collapsible open={isOpen} onOpenChange={onToggle}>
            <div className="border border-border rounded-lg overflow-hidden">
                <CollapsibleTrigger asChild>
                    <div className="flex items-center justify-between p-4 bg-muted hover:bg-muted/80 cursor-pointer">
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold">
                                Verzorger {guardianIndex + 1}
                                {guardian.firstname &&
                                    `: ${guardian.firstname} ${guardian.infix || ""
                                    } ${guardian.lastname}`}
                                {guardian.isPrimary && (
                                    <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                                        Primair
                                    </span>
                                )}
                            </h3>
                        </div>
                        <ChevronDown
                            className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""
                                }`}
                        />
                    </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <div className="p-4 space-y-5">
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between">
                                <h2 className="font-semibold">
                                    Verzorger informatie
                                </h2>
                                <Button
                                    onClick={deleteGuardian}
                                    className=""
                                    variant={"destructive"}
                                >
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>
                            <hr className="border border-border" />
                        </div>

                        <GuardianBasicInfo
                            control={control}
                            guardianIndex={guardianIndex}
                        />

                        <div className="flex flex-col gap-2">
                            <h2 className="font-semibold">Adresgegevens</h2>
                            <hr className="border border-border" />
                        </div>

                        <GuardianAddress
                            control={control}
                            guardianIndex={guardianIndex}
                        />

                        <Controller
                            name={`guardians.${guardianIndex}.isPrimary`}
                            control={control}
                            render={({ field }) => (
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`form-guardian-primary-${guardianIndex}`}
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                    <FieldLabel
                                        htmlFor={`form-guardian-primary-${guardianIndex}`}
                                        className="cursor-pointer"
                                    >
                                        Dit is de primaire verzorger
                                    </FieldLabel>
                                </div>
                            )}
                        />
                    </div>
                </CollapsibleContent>
            </div>
        </Collapsible>
    );
}
