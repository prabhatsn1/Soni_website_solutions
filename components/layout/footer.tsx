import Link from "next/link";

import { getSiteData } from "@/lib/get-site-data";
import { DynamicIcon } from "@/lib/icon-map";

export function Footer() {
  const data = getSiteData();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container-x grid gap-10 py-16 md:grid-cols-4">
        <div className="flex flex-col gap-4 md:col-span-2">
          <span className="text-lg font-semibold tracking-tight">
            {data.brand.logoText}
          </span>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            {data.footer.description}
          </p>
          <div className="flex items-center gap-3 pt-2">
            {data.social.map((social) => (
              <a
                key={social.platform}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.platform}
                className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <DynamicIcon name={social.icon} className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold">Quick Links</span>
          {data.footer.quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold">Services</span>
          {data.footer.serviceLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="container-x flex flex-col items-center justify-between gap-4 border-t border-border py-6 text-xs text-muted-foreground md:flex-row">
        <span>
          &copy; {year} {data.footer.copyright}
        </span>
        <div className="flex items-center gap-4">
          <span>{data.contact.email}</span>
        </div>
      </div>
    </footer>
  );
}
