import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function StokeCard() {
  return (
    <Card className="shadow-xl lg:block hidden">
      <CardHeader>
        <CardTitle className="text-neutral-800">Get hyped</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-w-16 aspect-h-9 rounded-md overflow-hidden">
          <iframe src="https://www.youtube.com/embed/vDxkxEwobRg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </CardContent>
    </Card>
  );
}