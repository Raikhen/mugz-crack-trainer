import { Loader2 } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

interface LoadingCardProps {
  text?: string
}

export function LoadingCard({ text = "Loading..." }: LoadingCardProps) {
  return (
    <Card className="w-64">
      <CardContent className="flex flex-col items-center justify-center p-6">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-2 text-sm text-muted-foreground">{text}</p>
      </CardContent>
    </Card>
  )
}