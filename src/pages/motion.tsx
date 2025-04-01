
import React, { ReactNode, CSSProperties } from 'react';

// Define types for animation variants
type Variant = {
  [key: string]: any;
};

type Variants = {
  [key: string]: Variant;
};

// Define types for animation props
interface MotionProps {
  children: ReactNode;
  initial?: any;
  animate?: any;
  whileInView?: any;
  whileHover?: any;
  transition?: any;
  variants?: Variants;
  viewport?: { once?: boolean; margin?: string };
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
}

// Simple animation component that uses CSS-based animations
export const motion = {
  div: ({ 
    children, 
    initial, 
    animate, 
    whileInView, 
    whileHover,
    transition, 
    variants,
    viewport,
    className = '',
    style = {},
    ...props 
  }: MotionProps) => {
    // Create CSS classes based on animation props
    let animationClasses = className;
    
    // Add animation classes based on properties
    if (animate && animate.opacity === 1) {
      animationClasses += ' animate-fadeIn';
    }
    
    if (initial && initial.y < 0) {
      style.transform = `translateY(${initial.y}px)`;
    }
    
    if (animate && animate.y === 0) {
      style.transform = 'translateY(0)';
    }
    
    // Apply transition
    if (transition) {
      style.transitionDuration = `${transition.duration || 0.3}s`;
      style.transitionDelay = transition.delay ? `${transition.delay}s` : '0s';
      style.transitionProperty = 'opacity, transform';
      style.transitionTimingFunction = 'ease-out';
    }
    
    // Apply initial opacity
    if (initial && initial.opacity === 0) {
      style.opacity = '0';
    }
    
    return (
      <div className={animationClasses} style={style} {...props}>
        {children}
      </div>
    );
  },
  p: (props: MotionProps) => <motion.div as="p" {...props} />,
  h1: (props: MotionProps) => <motion.div as="h1" {...props} />,
  h2: (props: MotionProps) => <motion.div as="h2" {...props} />,
  h3: (props: MotionProps) => <motion.div as="h3" {...props} />,
  ul: (props: MotionProps) => <motion.div as="ul" {...props} />,
  li: (props: MotionProps) => <motion.div as="li" {...props} />,
  section: (props: MotionProps) => <motion.div as="section" {...props} />,
  header: (props: MotionProps) => <motion.div as="header" {...props} />,
  footer: (props: MotionProps) => <motion.div as="footer" {...props} />,
  article: (props: MotionProps) => <motion.div as="article" {...props} />,
  aside: (props: MotionProps) => <motion.div as="aside" {...props} />,
  button: (props: MotionProps) => <motion.div as="button" {...props} />,
  span: (props: MotionProps) => <motion.div as="span" {...props} />,
};

export default motion;
