import { Controller, Control } from "react-hook-form";
import { Button } from "@workspace/ui/components/button";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { Trash2 } from "lucide-react";

interface FriendFormProps {
    control: Control<any>;
    childIndex: number;
    friendIndex: number;
    onRemove: () => void;
}

export default function FriendForm({
    control,
    childIndex,
    friendIndex,
    onRemove,
}: FriendFormProps) {
    return (
        <div className="flex flex-col gap-2 p-4 border border-border rounded-md">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Vriend(in) {friendIndex + 1}</h3>
                <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={onRemove}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
            <FieldGroup className="flex-row gap-5">
                <Controller
                    name={`children.${childIndex}.friends.${friendIndex}.firstname`}
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel
                                htmlFor={`form-friend-firstname-${childIndex}-${friendIndex}`}
                            >
                                Voornaam *
                            </FieldLabel>
                            <Input
                                {...field}
                                id={`form-friend-firstname-${childIndex}-${friendIndex}`}
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
                    name={`children.${childIndex}.friends.${friendIndex}.infix`}
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel
                                htmlFor={`form-friend-infix-${childIndex}-${friendIndex}`}
                            >
                                Tussenvoegsel
                            </FieldLabel>
                            <Input
                                {...field}
                                id={`form-friend-infix-${childIndex}-${friendIndex}`}
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
                    name={`children.${childIndex}.friends.${friendIndex}.lastname`}
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel
                                htmlFor={`form-friend-lastname-${childIndex}-${friendIndex}`}
                            >
                                Achternaam *
                            </FieldLabel>
                            <Input
                                {...field}
                                id={`form-friend-lastname-${childIndex}-${friendIndex}`}
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
        </div>
    );
}
