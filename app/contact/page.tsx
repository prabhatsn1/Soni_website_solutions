import type { Metadata } from "next";
import { Mail, Clock, CalendarClock, MapPin } from "lucide-react";

import { getSiteData } from "@/lib/get-site-data";
import { PageHero } from "@/components/page-hero";
import { SectionContainer } from "@/components/sections/section-container";
import { ContactForm } from "@/components/forms/contact-form";
import { FadeIn } from "@/components/motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function generateMetadata(): Metadata {
  const seo = getSiteData().seo.contact;
  return { title: seo.title, description: seo.description };
}

export default function ContactPage() {
  const data = getSiteData();
  const { contact } = data;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's build something great together"
        description="Tell us about your business and your goals. We'll get back to you within one business day."
      />

      <SectionContainer>
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_1.2fr]">
          <FadeIn className="flex flex-col gap-6">
            <Card className="gap-4 px-6 py-6">
              <CardContent className="flex flex-col gap-5 px-0">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-5 shrink-0 text-accent" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <a href={`mailto:${contact.email}`} className="text-sm text-muted-foreground hover:text-accent">
                      {contact.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-accent" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{contact.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 size-5 shrink-0 text-accent" />
                  <div>
                    <p className="text-sm font-medium">Availability</p>
                    <p className="text-sm text-muted-foreground">{contact.availability}</p>
                    <p className="text-xs text-muted-foreground">{contact.responseTime}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="gap-3 px-6 py-6">
              <CardContent className="flex flex-col gap-3 px-0">
                <div className="flex items-center gap-3">
                  <CalendarClock className="size-5 shrink-0 text-accent" />
                  <p className="text-sm font-medium">Prefer to talk it through?</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Book a free 20-minute discovery call directly on our calendar.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <a href={contact.calendlyUrl} target="_blank" rel="noopener noreferrer">
                    Book a Call
                  </a>
                </Button>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.05}>
            <ContactForm />
          </FadeIn>
        </div>
      </SectionContainer>
    </>
  );
}
