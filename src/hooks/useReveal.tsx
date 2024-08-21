import { useEffect } from 'react';

const useReveal = () => {
  useEffect(() => {
    const reveal = () => {
      const reveals = document.querySelectorAll('.reveal');
      const windowHeight = window.innerHeight * 1.2;

      reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 0; // Adjust to reveal as soon as 1px is visible

        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('active');
        } else {
          element.classList.remove('active'); // Ensure it removes the class if it's out of view
        }
      });
    };

    window.addEventListener('scroll', reveal);
    window.addEventListener('resize', reveal); // Ensure it recalculates on resize
    reveal(); // Call reveal on mount in case elements are already in view

    return () => {
      window.removeEventListener('scroll', reveal);
      window.removeEventListener('resize', reveal);
    };
  }, []);
};

export default useReveal;
