import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useCallback,
  type FC,
  type ReactNode,
} from 'react';

interface FloatingContextType {
  registerElement: (id: string, element: HTMLElement, depth: number) => void;
  unregisterElement: (id: string) => void;
}

const FloatingContext = createContext<FloatingContextType | null>(null);

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  depth?: number;
}

export const FloatingElement: FC<FloatingElementProps> = ({
  children,
  className = '',
  depth = 1,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(Math.random().toString(36).substring(7));
  const context = useContext(FloatingContext);

  useEffect(() => {
    if (!elementRef.current || !context) return;
    const currentId = idRef.current;
    const currentElement = elementRef.current;
    context.registerElement(currentId, currentElement, depth);
    return () => {
      context.unregisterElement(currentId);
    };
  }, [depth, context]);

  return (
    <div ref={elementRef} className={`absolute will-change-transform ${className}`}>
      {children}
    </div>
  );
};

interface FloatingProps {
  children: ReactNode;
  className?: string;
  sensitivity?: number;
  easingFactor?: number;
}

export const Floating: FC<FloatingProps> = ({
  children,
  className = '',
  sensitivity = 1,
  easingFactor = 0.05,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsMap = useRef<
    Map<
      string,
      {
        element: HTMLElement;
        depth: number;
        currentPosition: { x: number; y: number };
      }
    >
  >(new Map());

  const mousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mousePosRef.current = {
          x: e.clientX - (rect.left + rect.width / 2),
          y: e.clientY - (rect.top + rect.height / 2),
        };
      } else {
        mousePosRef.current = {
          x: e.clientX - window.innerWidth / 2,
          y: e.clientY - window.innerHeight / 2,
        };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          mousePosRef.current = {
            x: touch.clientX - (rect.left + rect.width / 2),
            y: touch.clientY - (rect.top + rect.height / 2),
          };
        }
      }
    };

    const handleMouseLeave = () => {
      mousePosRef.current = { x: 0, y: 0 };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const registerElement = useCallback((id: string, element: HTMLElement, depth: number) => {
    elementsMap.current.set(id, {
      element,
      depth,
      currentPosition: { x: 0, y: 0 },
    });
  }, []);

  const unregisterElement = useCallback((id: string) => {
    elementsMap.current.delete(id);
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      elementsMap.current.forEach((item) => {
        const targetStrength = (item.depth * sensitivity) / 20;
        const targetX = mousePosRef.current.x * targetStrength;
        const targetY = mousePosRef.current.y * targetStrength;

        const dx = targetX - item.currentPosition.x;
        const dy = targetY - item.currentPosition.y;

        item.currentPosition.x += dx * easingFactor;
        item.currentPosition.y += dy * easingFactor;

        item.element.style.transform = `translate3d(${item.currentPosition.x.toFixed(2)}px, ${item.currentPosition.y.toFixed(2)}px, 0)`;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [sensitivity, easingFactor]);

  return (
    <FloatingContext.Provider value={{ registerElement, unregisterElement }}>
      <div ref={containerRef} className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}>
        {children}
      </div>
    </FloatingContext.Provider>
  );
};
