import { useEffect } from 'react';

interface BodyClassManagerProps {
  element?: HTMLElement | null;
  className: string;
}

const BodyClassManager: React.FC<BodyClassManagerProps> = ({
  element = document.body,
  className,
}) => {
  useEffect(() => {
    if (element) {
      element.classList.add(className);

      return () => {
        element.classList.remove(className);
      };
    }
  }, [element, className]);

  return null; // This component doesn't render anything
};

export default BodyClassManager;
