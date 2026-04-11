import { Controller, Control } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@workspace/ui/components/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "@workspace/ui/components/input-group";

interface ChildNotesProps {
    control: Control<any>;
    childIndex: number;
}

export default function ChildNotes({ control, childIndex }: ChildNotesProps) {
    return (
        <Controller
            name={`children.${childIndex}.notes`}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={`form-child-notes-${childIndex}`}>
                        Extra informatie
                    </FieldLabel>
                    <InputGroup>
                        <InputGroupTextarea
                            {...field}
                            id={`form-child-notes-${childIndex}`}
                            aria-invalid={fieldState.invalid}
                            placeholder="Bijzonderheden, allergieën, etc."
                            autoComplete="off"
                            required={false}
                            rows={10}
                        />
                        <InputGroupAddon align="block-end">
                            <InputGroupText className="tabular-nums">
                                {field.value?.length || 0} / 2048
                            </InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    );
}
