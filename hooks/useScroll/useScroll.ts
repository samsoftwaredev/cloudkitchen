import { useState, useEffect } from 'react';

const getScroll = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

const useScroll = () => {
  const [scrollPosition, setScrollPosition] = useState({ height: 0, width: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(getScroll());
    }

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      return window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return scrollPosition;
}

export default useScroll