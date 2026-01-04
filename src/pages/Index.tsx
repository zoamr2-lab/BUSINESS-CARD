import BusinessCard from "@/components/BusinessCard";
import AnimatedBackground from "@/components/AnimatedBackground";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <title>Mahmoud Abdelrahman | Business Analyst at Etmam</title>
      <meta 
        name="description" 
        content="Digital business card for Mahmoud Abdelrahman, Business Analyst at Etmam for Information Technology. Connect via LinkedIn, WhatsApp, or email." 
      />
      
      <div className="min-h-screen bg-background flex items-center justify-center p-4 overflow-hidden">
        {/* Animated particle background */}
        <AnimatedBackground />
        
        {/* Theme toggle */}
        <ThemeToggle />
        
        {/* Ambient background effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        </div>
        
        {/* Main content */}
        <main className="relative z-10 w-full">
          <BusinessCard />
        </main>
      </div>
    </>
  );
};

export default Index;
