export default function RouteVisualizer({ route }) {
  const validColors = {
    "Red": "bg-red-600",
    "Yellow": "bg-yellow-400",
    "Blue": "bg-blue-600",
    "Grey": "bg-neutral-300",
  };

  if (!route) {
    return null;
  }

  const colors = route.colors;
  
  return (
    <div className="flex w-full h-4 rounded-md overflow-hidden">
      {colors.map((color, index) => {
        return (
          <div
            key={index}
            className={`flex-1 ${validColors[color]}`}
          />
        )
      })}
    </div>
  );
}