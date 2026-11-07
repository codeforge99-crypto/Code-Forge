import React, { useEffect, useRef } from 'react';

export const HeroSphere = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement.clientHeight || 500);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle Sphere parameters
    const particleCount = 280;
    const radius = Math.min(width, height) * 0.38;
    const particles = [];

    // Distribute points evenly on a sphere (Fibonacci lattice)
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < particleCount; i++) {
      const y = 1 - (i / (particleCount - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      particles.push({
        origX: x,
        origY: y,
        origZ: z,
        x,
        y,
        z,
        baseRadius: radius,
        waveOffset: Math.random() * Math.PI * 2,
        speed: 0.02 + Math.random() * 0.02,
        colorIndex: Math.random()
      });
    }

    let angleX = 0;
    let angleY = 0;
    let targetAngleX = 0;
    let targetAngleY = 0;
    let time = 0;

    // Mouse movement interaction
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left) / width - 0.5;
      const mouseY = (e.clientY - rect.top) / height - 0.5;
      targetAngleY = mouseX * 1.5;
      targetAngleX = -mouseY * 1.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Smooth camera interpolation
      angleX += (targetAngleX - angleX) * 0.05 + 0.002;
      angleY += (targetAngleY - angleY) * 0.05 + 0.005;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw ambient background nebula glow
      const radialGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        radius * 1.3
      );
      radialGlow.addColorStop(0, 'rgba(34, 211, 238, 0.18)');
      radialGlow.addColorStop(0.5, 'rgba(139, 92, 246, 0.12)');
      radialGlow.addColorStop(1, 'rgba(7, 8, 12, 0)');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      const projected = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Fluid wave deformation
        const wave = Math.sin(time * 2 + p.waveOffset + p.origY * 4) * 14;
        const currentRadius = p.baseRadius + wave;

        let px = p.origX * currentRadius;
        let py = p.origY * currentRadius;
        let pz = p.origZ * currentRadius;

        // Rotation around Y
        let x1 = px * cosY - pz * sinY;
        let z1 = pz * cosY + px * sinY;

        // Rotation around X
        let y2 = py * cosX - z1 * sinX;
        let z2 = z1 * cosX + py * sinX;

        // Perspective projection
        const fov = 400;
        const scale = fov / (fov + z2 + 250);
        const projX = centerX + x1 * scale;
        const projY = centerY + y2 * scale;
        const alpha = Math.max(0.15, Math.min(1, (z2 + radius) / (2 * radius) + 0.2));

        projected.push({
          x: projX,
          y: projY,
          z: z2,
          scale,
          alpha,
          colorIndex: p.colorIndex
        });
      }

      // Sort by depth for correct z-rendering
      projected.sort((a, b) => a.z - b.z);

      // Draw connecting filaments between close points
      ctx.lineWidth = 0.7;
      for (let i = 0; i < projected.length; i += 2) {
        for (let j = i + 1; j < projected.length; j += 4) {
          const dx = projected[i].x - projected[j].x;
          const dy = projected[i].y - projected[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 38) {
            const lineAlpha = (1 - dist / 38) * projected[i].alpha * 0.35;
            ctx.strokeStyle = `rgba(34, 211, 238, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const dotRadius = Math.max(1, p.scale * 2.8);

        // Color gradient between cyan and purple
        const r = Math.round(34 + p.colorIndex * 105);
        const g = Math.round(211 - p.colorIndex * 119);
        const b = Math.round(238 + p.colorIndex * 8);

        ctx.beginPath();
        ctx.arc(p.x, p.y, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.alpha})`;
        ctx.shadowBlur = p.scale > 0.8 ? 8 : 0;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[450px] lg:h-[520px] flex items-center justify-center pointer-events-none">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing"
      />
      {/* Decorative concentric rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[85%] h-[85%] rounded-full border border-cyan-500/10 animate-[spin_40s_linear_infinite]" />
        <div className="w-[100%] h-[100%] rounded-full border border-purple-500/10 animate-[spin_60s_linear_infinite_reverse]" />
      </div>
    </div>
  );
};

