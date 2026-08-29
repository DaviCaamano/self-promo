import { ComponentProps, ComponentType, JSX } from 'react';
import { MotionProps, motion } from 'framer-motion';

/**
 * framer-motion 10 derives its prop types from React 18's `ReactHTML` factory
 * map, which React 19 no longer shapes the same way. The generic collapses to
 * `unknown` and every DOM prop (className, type, role, aria-*) gets rejected.
 * Rebuilding the props from `ComponentProps` restores them; the runtime
 * components are untouched, so this is a typing fix only.
 */
type MotionComponent<T extends keyof JSX.IntrinsicElements> = ComponentType<
  Omit<ComponentProps<T>, keyof MotionProps> & MotionProps
>;

export const MotionButton = motion.button as unknown as MotionComponent<'button'>;
export const MotionDiv = motion.div as unknown as MotionComponent<'div'>;
