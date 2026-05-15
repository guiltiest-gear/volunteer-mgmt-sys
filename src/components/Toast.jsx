import { useEffect } from "preact/hooks";

export function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div class="toast">
      {message}
    </div>
  );
}
