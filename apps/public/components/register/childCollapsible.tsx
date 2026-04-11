import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@workspace/ui/components/collapsible";
import { ChevronDown, Trash } from "lucide-react";
import { Control } from "react-hook-form";
import { Button } from "@workspace/ui/components/button";
import { FieldGroup } from "@workspace/ui/components/field";
import ChildBasicInfo from "./childBasicInfo2";
import ChildNotes from "./childNotes2";
import FriendForm from "./friendForm2";

interface Child {
    firstname: string;
    infix?: string;
    lastname: string;
    age: number;
    swim_certificate: string;
    notes?: string;
    friends?: Array<{
        firstname: string;
        infix?: string;
        lastname: string;
    }>;
}

interface ChildCollapsibleProps {
    child: Child;
    childIndex: number;
    isOpen: boolean;
    onToggle: () => void;
    control: Control<any>;
    onAddFriend: () => void;
    onRemoveFriend: (friendIndex: number) => void;
    deleteChild: () => void;
}

export default function ChildCollapsible({
    child,
    childIndex,
    isOpen,
    onToggle,
    control,
    onAddFriend,
    onRemoveFriend,
    deleteChild,
}: ChildCollapsibleProps) {
    return (
        <Collapsible open={isOpen} onOpenChange={onToggle}>
            <div className="border border-border rounded-lg overflow-hidden">
                <CollapsibleTrigger asChild>
                    <div className="flex items-center justify-between p-4 bg-muted hover:bg-muted/80 cursor-pointer">
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold">
                                Kind {childIndex + 1}
                                {child.firstname &&
                                    `: ${child.firstname} ${child.infix || ""
                                    } ${child.lastname}`}
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
                                    Kind informatie
                                </h2>
                                <Button
                                    onClick={deleteChild}
                                    className=""
                                    variant={"destructive"}
                                >
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>
                            <hr className="border border-border" />
                        </div>

                        <ChildBasicInfo
                            control={control}
                            childIndex={childIndex}
                        />
                        <ChildNotes control={control} childIndex={childIndex} />

                        <div className="mb-5 flex flex-col gap-2">
                            <h2 className="font-semibold">
                                Vriendjes / Vriendinnetjes
                            </h2>
                            <hr className="border border-border" />
                        </div>

                        <FieldGroup className="flex flex-col gap-5">
                            {child?.friends?.map((friend, friendIndex) => (
                                <FriendForm
                                    key={friendIndex}
                                    control={control}
                                    childIndex={childIndex}
                                    friendIndex={friendIndex}
                                    onRemove={() => onRemoveFriend(friendIndex)}
                                />
                            ))}
                        </FieldGroup>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={onAddFriend}
                        >
                            Vriendje / Vriendinnetje Toevoegen
                        </Button>
                    </div>
                </CollapsibleContent>
            </div>
        </Collapsible>
    );
}
