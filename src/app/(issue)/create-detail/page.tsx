import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function Page() {
  return (
    <section className="m-auto mt-8 p-8 sm:px-16">
      <h2 className="text-4xl  font-semibold text-gray-900">Issue Creation</h2>
      <p className="my-3 text-sm text-gray-400">
        Please Provide Details of Control or Risk Gaps Below
      </p>
      <Label htmlFor="title">Proposed Issue Title</Label>
      <Textarea
        id="title"
        rows={1}
        className="mb-4 mt-2 min-h-8"
        placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit. "
      />

      <Button className="mb-4 mt-2 max-h-8 w-96">Review</Button>
    </section>
  )
}
