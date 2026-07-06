"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";

import { getSiteData } from "@/lib/get-site-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  email: z.string().trim().email("Please enter a valid email address."),
  businessName: z.string().trim().min(2, "Please enter your business name."),
  service: z.string().min(1, "Please select a service."),
  budget: z.string().min(1, "Please select a budget range."),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more (at least 10 characters)."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const data = getSiteData();
  const [status, setStatus] = React.useState<"idle" | "success" | "error">(
    "idle"
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      businessName: "",
      service: "",
      budget: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card px-8 py-16 text-center">
        <CheckCircle2 className="size-12 text-success" />
        <h3 className="text-xl font-semibold">Message sent successfully</h3>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          Thanks for reaching out! {data.contact.responseTime}
        </p>
        <Button variant="outline" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 md:p-8"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            placeholder="Jane Doe"
            aria-invalid={Boolean(errors.name)}
            {...register("name")}
          />
          {errors.name ? (
            <p role="alert" className="text-xs text-destructive">
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="jane@company.com"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          {errors.email ? (
            <p role="alert" className="text-xs text-destructive">
              {errors.email.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="businessName">Business name</Label>
        <Input
          id="businessName"
          placeholder="Your Company LLC"
          aria-invalid={Boolean(errors.businessName)}
          {...register("businessName")}
        />
        {errors.businessName ? (
          <p role="alert" className="text-xs text-destructive">
            {errors.businessName.message}
          </p>
        ) : null}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="service">Service interested in</Label>
          <Select
            value={watch("service")}
            onValueChange={(value) => setValue("service", value, { shouldValidate: true })}
          >
            <SelectTrigger id="service" aria-invalid={Boolean(errors.service)}>
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {data.contact.formServiceOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.service ? (
            <p role="alert" className="text-xs text-destructive">
              {errors.service.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="budget">Budget</Label>
          <Select
            value={watch("budget")}
            onValueChange={(value) => setValue("budget", value, { shouldValidate: true })}
          >
            <SelectTrigger id="budget" aria-invalid={Boolean(errors.budget)}>
              <SelectValue placeholder="Select a budget range" />
            </SelectTrigger>
            <SelectContent>
              {data.contact.budgetOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.budget ? (
            <p role="alert" className="text-xs text-destructive">
              {errors.budget.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Project details</Label>
        <Textarea
          id="message"
          placeholder="Tell us a bit about your business and what you're looking for..."
          aria-invalid={Boolean(errors.message)}
          {...register("message")}
        />
        {errors.message ? (
          <p role="alert" className="text-xs text-destructive">
            {errors.message.message}
          </p>
        ) : null}
      </div>

      {status === "error" ? (
        <p role="alert" className="text-sm text-destructive">
          Something went wrong sending your message. Please try again or email
          us directly at {data.contact.email}.
        </p>
      ) : null}

      <Button
        type="submit"
        variant="gradient"
        size="lg"
        disabled={isSubmitting}
        className="w-full md:w-fit"
      >
        {isSubmitting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Send className="size-4" />
        )}
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
