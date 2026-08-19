ALTER TABLE "child_registration_children" ADD COLUMN "swim_certificates" text;--> statement-breakpoint
ALTER TABLE "registration_cycles" ADD COLUMN "child_registrations_open" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "registration_cycles" ADD COLUMN "volunteer_registrations_open" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "volunteer_registrations" ADD COLUMN "availability_other" text;