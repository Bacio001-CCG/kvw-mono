"use client";

import { SelectSettings } from "@/lib/database/schema";
import { childSchema, formSchema } from "./childForm";
import { toast } from "react-toastify";
import ChildCollapsible from "./childCollapsiblee";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function StepChild({
    children,
    form,
    openChildren,
    toggleChild,
    setOpenChildren,
    settings,
}: {
    children: z.infer<typeof formSchema>["children"];
    form: ReturnType<typeof useForm<z.infer<typeof formSchema>>>;
    openChildren: number[];
    toggleChild: (childIndex: number) => void;
    setOpenChildren: React.Dispatch<React.SetStateAction<number[]>>;
    settings: SelectSettings;
}) {
    const addChild = () => {
        if (children.length === settings.maxChildrenPerRegistration) {
            toast.error(
                `Je kunt maximaal ${settings.maxChildrenPerRegistration} kinderen per registratie toevoegen.`
            );
            return;
        }
        const currentChildren = form.getValues("children");
        form.setValue("children", [
            ...currentChildren,
            {
                firstname: "",
                infix: "",
                lastname: "",
                age: 8,
                swim_certificate: "Geen",
                notes: "",
                friends: [],
            },
        ]);
        setOpenChildren([...openChildren, currentChildren.length]);
    };

    const addFriend = (childIndex: number) => {
        const currentChildren = form.getValues("children");
        const currentFriends = currentChildren[childIndex].friends || [];
        currentChildren[childIndex].friends = [
            ...currentFriends,
            {
                firstname: "",
                infix: "",
                lastname: "",
            },
        ];
        form.setValue("children", currentChildren);
    };

    const removeFriend = (childIndex: number, friendIndex: number) => {
        const currentChildren = form.getValues("children");
        const currentFriends = currentChildren[childIndex].friends || [];
        currentChildren[childIndex].friends = currentFriends.filter(
            (_: unknown, idx: number) => idx !== friendIndex
        );
        form.setValue("children", currentChildren);
    };

    return (
        <>
            {children.map(
                (child: z.infer<typeof childSchema>, childIndex: number) => (
                    <ChildCollapsible
                        key={childIndex}
                        child={child}
                        childIndex={childIndex}
                        isOpen={openChildren.includes(childIndex)}
                        onToggle={() => toggleChild(childIndex)}
                        control={form.control}
                        deleteChild={() => {
                            const currentChildren = form.getValues("children");
                            form.setValue(
                                "children",
                                currentChildren.filter(
                                    (_: unknown, idx: number) =>
                                        idx !== childIndex
                                )
                            );
                            setOpenChildren(
                                openChildren.filter((idx) => idx !== childIndex)
                            );
                        }}
                        onAddFriend={() => addFriend(childIndex)}
                        onRemoveFriend={(friendIndex) =>
                            removeFriend(childIndex, friendIndex)
                        }
                    />
                )
            )}

            <Button type="button" variant="secondary" onClick={addChild}>
                Extra Kind Toevoegen
            </Button>
        </>
    );
}
