"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { SelectSettings } from "@/lib/database/schema";

export default function StepPayment({
    childrenCount,
    settings,
}: {
    childrenCount: number;
    settings: SelectSettings;
}) {
    return (
        <>
            <div className="flex flex-col w-2/3 mx-auto gap-4 my-10">
                <h1 className="font-bold text-3xl text-center">
                    KVW Hekos Registratie
                </h1>
                <p className="text-sm text-center text-muted-foreground">
                    U bent bijna klaar met uw inschrijving, u kunt nu de
                    betaling voldoen. Na ontvangst van uw betaling zullen wij uw
                    inschrijving definitief maken.
                </p>
                <Image
                    src={"/child.jpg"}
                    alt={"child"}
                    width={500}
                    height={300}
                    className="rounded-lg mx-auto my-10"
                />
                <span className="text-center text-muted-foreground">
                    Registratie voor {childrenCount} kind: €{" "}
                    {parseFloat(settings.pricePerChild) * childrenCount}
                </span>
                <Button className="mx-auto" size="lg" type="submit">
                    Nu betalen (€{" "}
                    {parseFloat(settings.pricePerChild) * childrenCount})
                </Button>
            </div>
        </>
    );
}
