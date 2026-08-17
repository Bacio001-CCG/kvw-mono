import { ComponentProps } from "react";

import { cn } from "@workspace/ui/lib/utils";

export function Card({ className, ...props }: ComponentProps<"div">) {
    return <div className={cn("bg-card text-card-foreground rounded-xl border py-6 shadow-sm", className)} {...props} />;
}

export function CardHeader({ className, ...props }: ComponentProps<"div">) {
    return <div className={cn("grid gap-2 px-6", className)} {...props} />;
}

export function CardTitle({ className, ...props }: ComponentProps<"h3">) {
    return <h3 className={cn("text-xl font-semibold leading-none", className)} {...props} />;
}

export function CardDescription({ className, ...props }: ComponentProps<"p">) {
    return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

export function CardContent({ className, ...props }: ComponentProps<"div">) {
    return <div className={cn("px-6", className)} {...props} />;
}
