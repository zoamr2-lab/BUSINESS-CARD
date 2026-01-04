import { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, isActive: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      density: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.density = Math.random() * 30 + 1;
      }

      update() {
        const mouse = mouseRef.current;
        
        // Calculate distance from mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (mouse.isActive && distance < maxDistance) {
          // Calculate force direction (repel from mouse)
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          
          // Calculate force strength (stronger when closer)
          const force = (maxDistance - distance) / maxDistance;
          const directionX = forceDirectionX * force * this.density * -1;
          const directionY = forceDirectionY * force * this.density * -1;

          this.x += directionX * 0.6;
          this.y += directionY * 0.6;
        } else {
          // Smoothly return to base position with floating motion
          if (this.x !== this.baseX) {
            const dx = this.baseX - this.x;
            this.x += dx * 0.05;
          }
          if (this.y !== this.baseY) {
            const dy = this.baseY - this.y;
            this.y += dy * 0.05;
          }
        }

        // Add subtle floating motion
        this.baseX += this.speedX;
        this.baseY += this.speedY;

        // Wrap around edges
        if (this.baseX > canvas!.width) this.baseX = 0;
        if (this.baseX < 0) this.baseX = canvas!.width;
        if (this.baseY > canvas!.height) this.baseY = 0;
        if (this.baseY < 0) this.baseY = canvas!.height;
      }

      draw() {
        if (!ctx) return;
        const mouse = mouseRef.current;
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Glow effect when near mouse
        let glowOpacity = this.opacity;
        let glowSize = this.size;
        
        if (mouse.isActive && distance < 150) {
          const intensity = 1 - distance / 150;
          glowOpacity = Math.min(this.opacity + intensity * 0.5, 1);
          glowSize = this.size + intensity * 2;
          
          // Add glow
          ctx.shadowBlur = 15 * intensity;
          ctx.shadowColor = `hsla(207, 90%, 54%, ${intensity * 0.8})`;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(207, 90%, 54%, ${glowOpacity})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 12000);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const connectParticles = () => {
      if (!ctx) return;
      const mouse = mouseRef.current;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            // Check if either particle is near mouse for enhanced connection
            const mouseDist1 = Math.sqrt(
              Math.pow(mouse.x - particles[i].x, 2) + 
              Math.pow(mouse.y - particles[i].y, 2)
            );
            const mouseDist2 = Math.sqrt(
              Math.pow(mouse.x - particles[j].x, 2) + 
              Math.pow(mouse.y - particles[j].y, 2)
            );
            
            let lineOpacity = 0.15 * (1 - distance / 120);
            
            if (mouse.isActive && (mouseDist1 < 150 || mouseDist2 < 150)) {
              const intensity = 1 - Math.min(mouseDist1, mouseDist2) / 150;
              lineOpacity = Math.min(lineOpacity + intensity * 0.3, 0.6);
            }

            ctx.beginPath();
            ctx.strokeStyle = `hsla(207, 90%, 54%, ${lineOpacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.isActive = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isActive = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
        mouseRef.current.isActive = true;
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.isActive = false;
    };

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener("resize", () => {
      resizeCanvas();
      initParticles();
    });
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
};

export default AnimatedBackground;
