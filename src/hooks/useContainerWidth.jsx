import { useEffect, useState, useRef } from 'react';

// Custom hook untuk melacak lebar sebuah elemen
function useContainerWidth() {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(entries => {
      // Ambil lebar dari entry yang pertama
      const contentRect = entries[0].contentRect;
      setWidth(contentRect.width);
    });

    observer.observe(ref.current);

    // Clean-up function saat komponen di-unmount
    return () => observer.disconnect();
  }, []);

  return [ref, width];
}

export default useContainerWidth;