import { Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Card className="w-[300px]">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="mt-4 text-lg font-semibold text-primary">Loading...</p>
        </CardContent>
      </Card>
    </div>
  )
}