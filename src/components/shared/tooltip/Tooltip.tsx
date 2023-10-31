import { CSSProperties, PropsWithChildren, ReactNode, useState } from 'react';
import styles from './tooltip.module.scss';

export enum ToolTipAnchor {
  top,
  right,
  bottom,
  left,
}
export interface ToolTipProps extends PropsWithChildren {
  anchor?: ToolTipAnchor;
  distance?: string;
  content: string | ReactNode;
  name?: string;
  open?: boolean;
  setOpen?: Setter<boolean>;
  wrapper?: {
    style?: CSSProperties;
    className?: string;
  };
  tooltip?: {
    style?: CSSProperties;
    className?: string;
  };
}

/**
 * A tooltip which displays top, right, bottom, or left of the wrapped child.
 * @param anchor - enum ToolTipAnchor: (OPTIONAL) Determines the direction that the tooltip will display.
 *    Defaults to showing the tooltip below the wrapped element.
 * @param children - ReactNode: Element being wrapped. If styling is needed for the wrapper, use 'wrapper' property.
 * @param distance - string: (OPTIONAL) a string ending in 'px, em, rem' which sets the distance between the child
 * @param content - string | ReactNode: A string or react component which will be displayed within the tooltip
 *    element and the tooltip.
 *    Defaults to 1 rem (16px)
 * @param open - boolean: (OPTIONAL) External state management for this tooltip. if left undefined, this tooltip will display when the
 *    wrapped element is moused over.
 * @param setOpen - Setter<boolean>: (OPTIONAL) External state management for this tooltip. if left undefined, this tooltip will display when the
 *    wrapped element is moused over.
 * @param wrapper - style and classNames to add to the element which wraps the provided child element.
 * @param tip - style and classNames to add to the tooltip element.
 * @constructor
 */
export const Tooltip = ({
  anchor = ToolTipAnchor.bottom,
  name,
  children,
  content,
  distance = '1.5rem',
  open,
  setOpen,
  wrapper,
  tooltip,
}: ToolTipProps) => {
  const [selfManagedOpen, setSelfManagedOpen] = useState<boolean>(false);

  const isOpen = typeof open === 'undefined' ? selfManagedOpen : open;
  const setIsOpen = typeof setOpen === 'undefined' ? setSelfManagedOpen : setOpen;
  const events = {
    onMouseEnter: () => setIsOpen(true),
    onMouseLeave: () => setIsOpen(false),
  };

  return (
    <div className={`tooltip ${name} relative w-max h-max ${wrapper?.className}`} style={wrapper?.style} {...events}>
      {children}
      <div
        className={`tooltip-framer fade_3 ${tooltip?.className} ${isOpen ? ' fadeIn' : 'fadeOut'} ${styles.backdrop}`}
        style={{ ...getPosition(anchor, distance), ...tooltip?.style }}
      >
        {content}
      </div>
    </div>
  );
};

const getPosition = (anchor: ToolTipAnchor, distance: string) => {
  switch (anchor) {
    case ToolTipAnchor.top:
      return {
        bottom: `calc(100% + ${distance})`,
        left: '50%',
        transform: 'translateX(-50%)',
      };
    case ToolTipAnchor.right:
      return {
        right: `calc(100% + ${distance})`,
        top: '50%',
        transform: 'translateY(-50%)',
      };
    case ToolTipAnchor.bottom:
      return {
        top: `calc(100% + ${distance})`,
        left: '50%',
        transform: 'translateX(-50%)',
      };
    case ToolTipAnchor.left:
      return {
        left: `calc(100% + ${distance})`,
        top: '50%',
        transform: 'translateY(-50%)',
      };
  }
};
