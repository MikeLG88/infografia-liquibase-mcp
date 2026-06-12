export function Card({ children, onClick }) {
  return (
    <div
      onClick={onClick}
      className="border p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-xl bg-white"
    >
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return <div>{children}</div>;
}
