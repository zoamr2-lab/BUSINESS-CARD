import { useState } from "react";
import { Globe, Linkedin, MapPin, MessageCircle, Phone, Mail, Share2, UserPlus, RotateCcw, Briefcase, Award, GraduationCap, Heart } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import ContactLink from "./ContactLink";
import mahmoudPhoto from "@/assets/mahmoud-photo.jpg";
import etmamLogo from "@/assets/etmam-logo.png";
import { toast } from "@/hooks/use-toast";

const BusinessCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const linkedInUrl = "https://www.linkedin.com/in/mahmoud-abdulrahman10593";
  
  const socialLinks = [
    {
      href: "https://www.e-tec.sa/",
      icon: Globe,
      label: "Website",
    },
    {
      href: linkedInUrl,
      icon: Linkedin,
      label: "LinkedIn",
    },
    {
      href: "https://wa.me/966560303813",
      icon: MessageCircle,
      label: "WhatsApp",
    },
    {
      href: "mailto:Mahmoud.abdelrahman@e-tec.sa",
      icon: Mail,
      label: "Email",
    },
  ];

  const contactDetails = [
    {
      href: "tel:+966560303813",
      icon: Phone,
      label: "Call",
      text: "+966 560 303 813",
    },
    {
      href: "https://maps.google.com/?q=6719+حي،+السليمانية،+الرياض+12242",
      icon: MapPin,
      label: "Location",
      text: "As Sulimaniyah, Riyadh 12211",
    },
  ];

  const skills = [
    "Business Analysis",
    "Requirements Gathering",
    "Process Optimization",
    "Stakeholder Management",
    "Agile Methodology",
    "Data Analysis",
  ];

  const handleSaveContact = () => {
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:Mahmoud Abdelrahman
ORG:Etmam for Information Technology
TITLE:Business Analyst
TEL;TYPE=CELL:+966560303813
EMAIL:Mahmoud.abdelrahman@e-tec.sa
URL:https://www.e-tec.sa/
URL;TYPE=LinkedIn:${linkedInUrl}
ADR;TYPE=WORK:;;6719 حي، السليمانية;الرياض;;12242;Saudi Arabia
END:VCARD`;

    const blob = new Blob([vCard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Mahmoud_Abdelrahman.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Contact Saved",
      description: "VCard file downloaded successfully",
    });
  };

  const handleShare = async () => {
    const shareData = {
      title: "Mahmoud Abdelrahman - Business Analyst",
      text: "Connect with Mahmoud Abdelrahman, Business Analyst at Etmam for Information Technology",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          copyToClipboard();
        }
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Card link copied to clipboard",
    });
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="relative w-full max-w-md mx-auto perspective-1000">
      {/* Glow effect behind card */}
      <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse-glow" />
      
      {/* Flip Card Container */}
      <div 
        className={`flip-card-inner relative w-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
      >
        {/* Front Side */}
        <div className="flip-card-front backface-hidden">
          <div className="relative bg-card border border-border rounded-2xl overflow-hidden card-glow">
            {/* Gradient overlay at top */}
            <div 
              className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
              style={{ background: 'var(--gradient-glow)' }}
            />
            
            {/* Flip Button */}
            <button
              onClick={handleFlip}
              className="absolute top-4 left-4 z-20 flex items-center justify-center w-10 h-10 rounded-xl bg-secondary/50 border border-border hover:border-primary/50 hover:bg-primary text-muted-foreground hover:text-primary-foreground transition-all duration-300"
              aria-label="Flip card"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            
            {/* Header section */}
            <div className="relative pt-8 pb-6 px-6 text-center">
              {/* Company logo */}
              <div className="flex justify-center mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
                <img 
                  src={etmamLogo} 
                  alt="Etmam Logo" 
                  className="h-10 object-contain"
                />
              </div>
              
              {/* Profile photo */}
              <div className="relative inline-block mb-4 opacity-0 animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl animate-pulse-glow" />
                <div className="relative w-28 h-28 rounded-full p-1 bg-gradient-to-br from-primary to-primary/50">
                  <img
                    src={mahmoudPhoto}
                    alt="Mahmoud Abdelrahman"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              
              {/* Name and title */}
              <div className="opacity-0 animate-slide-up" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
                <h1 className="text-2xl font-display font-bold text-foreground mb-1">
                  Mahmoud Abdelrahman
                </h1>
                <p className="text-gradient font-semibold text-lg">
                  Business Analyst
                </p>
                <p className="text-muted-foreground text-sm mt-1">
                  Etmam for Information Technology
                </p>
              </div>
            </div>
            
            {/* Divider */}
            <div className="mx-6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            
            {/* Social links - icons only */}
            <div className="px-6 pt-6 pb-4">
              <div className="flex justify-center gap-3">
                {socialLinks.map((link, index) => (
                  <ContactLink
                    key={link.label}
                    {...link}
                    iconOnly
                    delay={400 + index * 80}
                  />
                ))}
              </div>
            </div>
            
            {/* Contact details - with description */}
            <div className="px-6 pb-4 space-y-3">
              {contactDetails.map((contact, index) => (
                <ContactLink
                  key={contact.label}
                  {...contact}
                  delay={700 + index * 100}
                />
              ))}
            </div>

            {/* Divider */}
            <div className="mx-6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            {/* QR Code Section */}
            <div className="px-6 py-6 opacity-0 animate-fade-in" style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}>
              <div className="flex flex-col items-center gap-3">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                  Scan to connect on LinkedIn
                </p>
                <div className="relative p-3 bg-secondary/30 rounded-xl border border-border">
                  <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-primary/50 to-primary/10 -z-10" />
                  <QRCodeSVG
                    value={linkedInUrl}
                    size={120}
                    bgColor="transparent"
                    fgColor="hsl(207, 90%, 54%)"
                    level="M"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-6 pb-6 flex gap-3 opacity-0 animate-slide-up" style={{ animationDelay: '1000ms', animationFillMode: 'forwards' }}>
              <button
                onClick={handleSaveContact}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <UserPlus className="w-5 h-5" />
                Save Contact
              </button>
              <button
                onClick={handleShare}
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-secondary/50 border border-border hover:border-primary/50 hover:bg-primary text-muted-foreground hover:text-primary-foreground transition-all duration-300"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className="flip-card-back backface-hidden rotate-y-180 absolute inset-0">
          <div className="relative bg-card border border-border rounded-2xl overflow-hidden card-glow h-full">
            {/* Gradient overlay at top */}
            <div 
              className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
              style={{ background: 'var(--gradient-glow)' }}
            />
            
            {/* Flip Button */}
            <button
              onClick={handleFlip}
              className="absolute top-4 left-4 z-20 flex items-center justify-center w-10 h-10 rounded-xl bg-secondary/50 border border-border hover:border-primary/50 hover:bg-primary text-muted-foreground hover:text-primary-foreground transition-all duration-300"
              aria-label="Flip card back"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Back Content */}
            <div className="pt-16 pb-6 px-6">
              {/* About Section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-display font-bold text-foreground">About Me</h2>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Passionate Business Analyst with expertise in bridging the gap between business needs and technology solutions. Dedicated to driving digital transformation and process optimization.
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6" />

              {/* Skills Section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-display font-bold text-foreground">Skills</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/20 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6" />

              {/* Experience Section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-display font-bold text-foreground">Experience</h2>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Business Analyst</p>
                      <p className="text-xs text-muted-foreground">Etmam for Information Technology</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6" />

              {/* Education Section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-display font-bold text-foreground">Education</h2>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Bachelor's Degree</p>
                    <p className="text-xs text-muted-foreground">Business Information Systems</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Flip hint */}
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <p className="text-xs text-muted-foreground">
                Tap <RotateCcw className="w-3 h-3 inline mx-1" /> to flip back
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
