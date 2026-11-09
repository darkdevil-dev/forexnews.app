export function Mark({ children }) {
  return (
    <span className="box-decoration-clone rounded-[3px] bg-signal px-[0.22em] py-[0.02em] font-bold text-black">
      {children}
    </span>
  );
}