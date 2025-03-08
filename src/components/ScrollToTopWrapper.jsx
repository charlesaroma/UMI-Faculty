import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTopWrapper = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Use instant instead of smooth for better UX
    });
  }, [location.pathname]);

  return children;
};

export default ScrollToTopWrapper; 