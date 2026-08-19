CREATE TYPE "public"."document_kind" AS ENUM('program', 'group_assignment', 'other');--> statement-breakpoint
CREATE TYPE "public"."emergency_contact_relation" AS ENUM('mother', 'father', 'parent', 'partner', 'grandparent', 'friend', 'other');--> statement-breakpoint
CREATE TYPE "public"."grade_level" AS ENUM('group_1', 'group_2', 'group_3', 'group_4', 'group_5', 'group_6', 'group_7', 'group_8', 'first_year_secondary_school');--> statement-breakpoint
CREATE TYPE "public"."pickup_permission" AS ENUM('may_leave_alone', 'picked_up');--> statement-breakpoint
CREATE TYPE "public"."registration_cycle_status" AS ENUM('draft', 'open', 'closed', 'archived');--> statement-breakpoint
CREATE TYPE "public"."registration_submission_status" AS ENUM('draft', 'submitted', 'payment_pending', 'confirmed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."school_type" AS ENUM('armhoefse_akker', 'panta_rhei', 'pendula', 'other');--> statement-breakpoint
CREATE TYPE "public"."sponsor_placement" AS ENUM('top', 'bottom', 'both');--> statement-breakpoint
CREATE TYPE "public"."swim_certificate_level" AS ENUM('a', 'b', 'c', 'none');--> statement-breakpoint
CREATE TYPE "public"."volunteer_availability" AS ENUM('all_days', 'event_week_only', 'other');--> statement-breakpoint
CREATE TYPE "public"."volunteer_preference" AS ENUM('lower', 'middle', 'upper', 'no_preference');--> statement-breakpoint
CREATE TABLE "child_registration_children" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"registration_id" uuid NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"birth_date" date NOT NULL,
	"school_type" "school_type" NOT NULL,
	"school_other_name" text,
	"grade_level" "grade_level" NOT NULL,
	"friend_request" text,
	"swim_certificate_level" "swim_certificate_level" DEFAULT 'none' NOT NULL,
	"has_liability_insurance" boolean DEFAULT false NOT NULL,
	"pickup_permission" "pickup_permission" DEFAULT 'picked_up' NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "child_registrations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cycle_id" uuid NOT NULL,
	"status" "registration_submission_status" DEFAULT 'draft' NOT NULL,
	"guardian_email" text NOT NULL,
	"guardian_phone_primary" text NOT NULL,
	"guardian_phone_secondary" text,
	"street_address" text NOT NULL,
	"postal_code" text NOT NULL,
	"city" text NOT NULL,
	"extra_donation_amount" numeric(10, 2) DEFAULT '0' NOT NULL,
	"terms_accepted" boolean DEFAULT false NOT NULL,
	"photo_consent_accepted" boolean DEFAULT false NOT NULL,
	"submitted_at" timestamp,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contact_messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"subject" text NOT NULL,
	"message" text NOT NULL,
	"source_page" text,
	"is_read" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "content_blocks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"page_slug" text NOT NULL,
	"block_key" text NOT NULL,
	"title" text,
	"body" text,
	"data" jsonb,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "content_blocks_page_slug_block_key_unique" UNIQUE("page_slug","block_key")
);
--> statement-breakpoint
CREATE TABLE "content_pages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"summary" text,
	"body" text NOT NULL,
	"is_published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "content_pages_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "registration_cycles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"year" integer NOT NULL,
	"label" text NOT NULL,
	"status" "registration_cycle_status" DEFAULT 'draft' NOT NULL,
	"is_test_mode" boolean DEFAULT false NOT NULL,
	"child_registrations_open_at" timestamp,
	"child_registrations_close_at" timestamp,
	"volunteer_registrations_open_at" timestamp,
	"volunteer_registrations_close_at" timestamp,
	"price_per_child" numeric(10, 2) DEFAULT '0' NOT NULL,
	"max_children_per_registration" integer DEFAULT 1 NOT NULL,
	"max_guardians_per_registration" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "registration_cycles_year_unique" UNIQUE("year")
);
--> statement-breakpoint
CREATE TABLE "site_documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cycle_id" uuid,
	"kind" "document_kind" NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"file_url" text NOT NULL,
	"opens_in_new_tab" boolean DEFAULT true NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sponsors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"website_url" text,
	"logo_url" text NOT NULL,
	"placement" "sponsor_placement" DEFAULT 'both' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "volunteer_registrations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cycle_id" uuid NOT NULL,
	"status" "registration_submission_status" DEFAULT 'draft' NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"phone_number" text NOT NULL,
	"street_address" text NOT NULL,
	"postal_code" text NOT NULL,
	"city" text NOT NULL,
	"emergency_contact_name" text NOT NULL,
	"emergency_contact_phone" text NOT NULL,
	"emergency_contact_relation" "emergency_contact_relation" NOT NULL,
	"birth_date" date NOT NULL,
	"has_bhv_certificate" boolean DEFAULT false NOT NULL,
	"availability" "volunteer_availability" DEFAULT 'event_week_only' NOT NULL,
	"age_group_preference" "volunteer_preference" DEFAULT 'no_preference' NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
ALTER TABLE "child_registration_children" ADD CONSTRAINT "child_registration_children_registration_id_child_registrations_id_fk" FOREIGN KEY ("registration_id") REFERENCES "public"."child_registrations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "child_registrations" ADD CONSTRAINT "child_registrations_cycle_id_registration_cycles_id_fk" FOREIGN KEY ("cycle_id") REFERENCES "public"."registration_cycles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_documents" ADD CONSTRAINT "site_documents_cycle_id_registration_cycles_id_fk" FOREIGN KEY ("cycle_id") REFERENCES "public"."registration_cycles"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "volunteer_registrations" ADD CONSTRAINT "volunteer_registrations_cycle_id_registration_cycles_id_fk" FOREIGN KEY ("cycle_id") REFERENCES "public"."registration_cycles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "child_registration_children_registration_id_idx" ON "child_registration_children" USING btree ("registration_id");--> statement-breakpoint
CREATE INDEX "child_registrations_cycle_id_idx" ON "child_registrations" USING btree ("cycle_id");--> statement-breakpoint
CREATE INDEX "child_registrations_status_idx" ON "child_registrations" USING btree ("status");--> statement-breakpoint
CREATE INDEX "contact_messages_email_idx" ON "contact_messages" USING btree ("email");--> statement-breakpoint
CREATE INDEX "content_blocks_page_slug_sort_order_idx" ON "content_blocks" USING btree ("page_slug","sort_order");--> statement-breakpoint
CREATE INDEX "site_documents_cycle_id_kind_idx" ON "site_documents" USING btree ("cycle_id","kind");--> statement-breakpoint
CREATE INDEX "sponsors_placement_sort_order_idx" ON "sponsors" USING btree ("placement","sort_order");--> statement-breakpoint
CREATE INDEX "volunteer_registrations_cycle_id_idx" ON "volunteer_registrations" USING btree ("cycle_id");--> statement-breakpoint
CREATE INDEX "volunteer_registrations_status_idx" ON "volunteer_registrations" USING btree ("status");