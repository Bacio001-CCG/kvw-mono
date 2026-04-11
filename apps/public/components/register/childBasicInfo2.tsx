import { Controller, Control, FieldErrors } from "react-hook-form";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@workspace/ui/components/select";

interface ChildBasicInfoProps {
    control: Control<any>;
    childIndex: number;
}

export default function ChildBasicInfo({
    control,
    childIndex,
}: ChildBasicInfoProps) {
    return (
        <FieldGroup className="">
            <FieldGroup className="flex-row gap-5">
                <Controller
                    name={`children.${childIndex}.firstname`}
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel
                                htmlFor={`form-child-firstname-${childIndex}`}
                            >
                                Voornaam *
                            </FieldLabel>
                            <Input
                                {...field}
                                id={`form-child-firstname-${childIndex}`}
                                aria-invalid={fieldState.invalid}
                                placeholder="Pietje"
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
                    name={`children.${childIndex}.infix`}
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel
                                htmlFor={`form-child-infix-${childIndex}`}
                            >
                                Tussenvoegsel
                            </FieldLabel>
                            <Input
                                {...field}
                                id={`form-child-infix-${childIndex}`}
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
                    name={`children.${childIndex}.lastname`}
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel
                                htmlFor={`form-child-lastname-${childIndex}`}
                            >
                                Achternaam *
                            </FieldLabel>
                            <Input
                                {...field}
                                id={`form-child-lastname-${childIndex}`}
                                aria-invalid={fieldState.invalid}
                                placeholder="Wegen"
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
                    name={`children.${childIndex}.age`}
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel
                                htmlFor={`form-child-age-${childIndex}`}
                            >
                                Leeftijd *
                            </FieldLabel>
                            <Select
                                value={String(field.value)}
                                onValueChange={(value) =>
                                    field.onChange(Number(value))
                                }
                            >
                                <SelectTrigger
                                    id={`form-child-age-${childIndex}`}
                                >
                                    <SelectValue placeholder="Selecteer leeftijd" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {Array.from(
                                            { length: 14 },
                                            (_, i) => i + 3
                                        ).map((age) => (
                                            <SelectItem
                                                key={age}
                                                value={age.toString()}
                                            >
                                                {age}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name={`children.${childIndex}.swim_certificate`}
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel
                                htmlFor={`form-child-swim_certificate-${childIndex}`}
                            >
                                Zwemdiploma *
                            </FieldLabel>
                            <Select
                                value={String(field.value)}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger
                                    id={`form-child-swim_certificate-${childIndex}`}
                                >
                                    <SelectValue placeholder="Selecteer diploma" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {["A", "B", "C", "Geen"].map(
                                            (diploma) => (
                                                <SelectItem
                                                    key={diploma}
                                                    value={diploma}
                                                >
                                                    {diploma}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
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
