import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  pulseSpeed: number;
  pulseDir: number;
}

const BackgroundParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({x:0,y:0});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];

    const initStars = () => {
      stars = [];
      const count = Math.floor((window.innerWidth * window.innerHeight) / 7000); // 密度适配屏幕
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5, // 细微的星光尺寸
          speedX: (Math.random() - 0.5) * 0.2, // 水平极速微动
          speedY: (Math.random() - 0.5) * 0.3 - 0.1, // 整体微微向上飘动
          opacity: Math.random(),
          pulseSpeed: 0.005 + Math.random() * 0.015,
          pulseDir: Math.random() > 0.5 ? 1 : -1,
        });
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', resize);
    resize();

    const onMouseMove = (e:MouseEvent)=>{
      const rect = canvas.getBoundingClientRect(); 
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    }
    
    window.addEventListener('mousemove',onMouseMove);



    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach((star) => {
        const dx = mouseRef.current.x - star.x;
        const dy = mouseRef.current.y - star.y;
        // 更新位置

          star.x += dx*0.00025;
          star.y += dy*0.00025;

        

        star.x += star.speedX;
        star.y += star.speedY;

        // 闪烁逻辑
        star.opacity += star.pulseSpeed * star.pulseDir;
        if (star.opacity <= 0.1) {
          star.opacity = 0.1;
          star.pulseDir = 1;
        } else if (star.opacity >= 1) {
          star.opacity = 1;
          star.pulseDir = -1;
        }

        // 越界重置到对侧
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // 绘制星星
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(8, 15, 50,${star.opacity})`;
        
        // 增加些许光晕效果
        if (star.size > 1.2) {
          ctx.shadowBlur = 4;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        } else {
          ctx.shadowBlur = 0;
        }


        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1,
        background: '#16161a', // 贴近图例的深空背景色
      }}
    />
  );
};

export default BackgroundParticles;

