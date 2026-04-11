import { Controller, Control } from "react-hook-form";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";

interface GuardianAddressProps {
    control: Control<any>;
    guardianIndex: number;
}

export default function GuardianAddress({
    control,
    guardianIndex,
}: GuardianAddressProps) {
    return (
        <FieldGroup className="">
            <Controller
                name={`guardians.${guardianIndex}.address`}
                control={control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                            htmlFor={`form-guardian-address-${guardianIndex}`}
                        >
                            Adres *
                        </FieldLabel>
                        <Input
                            {...field}
                            id={`form-guardian-address-${guardianIndex}`}
                            aria-invalid={fieldState.invalid}
                            placeholder="Hoofdstraat 123"
                            autoComplete="street-address"
                            required={true}
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
            <FieldGroup className="flex-row gap-5">
                <Controller
                    name={`guardians.${guardianIndex}.postal`}
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel
                                htmlFor={`form-guardian-postal-${guardianIndex}`}
                            >
                                Postcode *
                            </FieldLabel>
                            <Input
                                {...field}
                                id={`form-guardian-postal-${guardianIndex}`}
                                aria-invalid={fieldState.invalid}
                                placeholder="1234 AB"
                                autoComplete="postal-code"
                                required={true}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name={`guardians.${guardianIndex}.city`}
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel
                                htmlFor={`form-guardian-city-${guardianIndex}`}
                            >
                                Plaats *
                            </FieldLabel>
                            <Input
                                {...field}
                                id={`form-guardian-city-${guardianIndex}`}
                                aria-invalid={fieldState.invalid}
                                placeholder="Amsterdam"
                                autoComplete="address-level2"
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
