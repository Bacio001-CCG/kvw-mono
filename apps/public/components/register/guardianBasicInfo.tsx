import { Controller, Control } from "react-hook-form";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { Checkbox } from "@workspace/ui/components/checkbox";

interface GuardianBasicInfoProps {
    control: Control<any>;
    guardianIndex: number;
}

export default function GuardianBasicInfo({
    control,
    guardianIndex,
}: GuardianBasicInfoProps) {
    return (
        <FieldGroup className="">
            <FieldGroup className="flex-row gap-5">
                <Controller
                    name={`guardians.${guardianIndex}.firstname`}
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel
                                htmlFor={`form-guardian-firstname-${guardianIndex}`}
                            >
                                Voornaam *
                            </FieldLabel>
                            <Input
                                {...field}
                                id={`form-guardian-firstname-${guardianIndex}`}
                                aria-invalid={fieldState.invalid}
                                placeholder="Jan"
                                autoComplete="off"
                                required={true}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name={`guardians.${guardianIndex}.infix`}
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel
                                htmlFor={`form-guardian-infix-${guardianIndex}`}
                            >
                                Tussenvoegsel
                            </FieldLabel>
                            <Input
                                {...field}
                                id={`form-guardian-infix-${guardianIndex}`}
                                aria-invalid={fieldState.invalid}
                                placeholder="van der"
                                autoComplete="off"
                                required={false}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name={`guardians.${guardianIndex}.lastname`}
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel
                                htmlFor={`form-guardian-lastname-${guardianIndex}`}
                            >
                                Achternaam *
                            </FieldLabel>
                            <Input
                                {...field}
                                id={`form-guardian-lastname-${guardianIndex}`}
                                aria-invalid={fieldState.invalid}
                                placeholder="Jansen"
                                autoComplete="off"
                                required={true}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>
            <FieldGroup className="flex-row gap-5">
                <Controller
                    name={`guardians.${guardianIndex}.email`}
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel
                                htmlFor={`form-guardian-email-${guardianIndex}`}
                            >
                                E-mailadres *
                            </FieldLabel>
                            <Input
                                {...field}
                                type="email"
                                id={`form-guardian-email-${guardianIndex}`}
                                aria-invalid={fieldState.invalid}
                                placeholder="jan@voorbeeld.nl"
                                autoComplete="email"
                                required={true}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name={`guardians.${guardianIndex}.phone`}
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel
                                htmlFor={`form-guardian-phone-${guardianIndex}`}
                            >
                                Telefoonnummer *
                            </FieldLabel>
                            <Input
                                {...field}
                                type="tel"
                                id={`form-guardian-phone-${guardianIndex}`}
                                aria-invalid={fieldState.invalid}
                                placeholder="06 12345678"
                                autoComplete="tel"
                                required={true}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>
        </FieldGroup>
    );
}
