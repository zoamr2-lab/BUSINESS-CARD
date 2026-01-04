import { LucideIcon } from "lucide-react";

interface ContactLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  text?: string;
  delay?: number;
  iconOnly?: boolean;
}

const ContactLink = ({ href, icon: Icon, label, text, delay = 0, iconOnly = false }: ContactLinkProps) => {
  if (iconOnly) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="group flex items-center justify-center w-12 h-12 rounded-xl bg-secondary/50 border border-border hover:border-primary/50 hover:bg-primary text-foreground hover:text-primary-foreground transition-all duration-300 animate-scale-in"
        style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
      >
        <Icon className="w-5 h-5" />
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border border-border hover:border-primary/50 hover:bg-secondary transition-all duration-300 opacity-0 animate-slide-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
          {label}
        </span>
        <span className="text-foreground font-medium truncate group-hover:text-primary transition-colors duration-300">
          {text}
        </span>
      </div>
    </a>
  );
};

export default ContactLink;
