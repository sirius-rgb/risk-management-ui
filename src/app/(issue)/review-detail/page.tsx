import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function Page() {
  return (
    <section className="m-auto mt-8 p-8 sm:px-16">
      <h2 className="text-4xl  font-semibold text-gray-900 dark:text-white">
        Issue Review
      </h2>
      <p className="my-3 text-sm text-gray-400">
        What is the issue that you would like to review?
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="title">Issue ID</Label>
          <Textarea
            id="title"
            rows={1}
            // value={uniqueId}
            className="mb-4 mt-2 min-h-8"
            placeholder="R-123456789"
          />
        </div>
        <div>
          <Label htmlFor="title">System</Label>
          <Textarea
            id="title"
            rows={1}
            // value={randomString}
            className="mb-4 mt-2 min-h-8"
            placeholder="Helios"
          />
        </div>
      </div>

      <Label htmlFor="title">Issue Title</Label>
      <Textarea
        id="title"
        rows={1}
        className="mb-4 mt-2 min-h-8"
        placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit. "
      />
      <Label htmlFor="title">Issue Description</Label>
      <Textarea
        id="title"
        rows={1}
        className="mb-4 mt-2 min-h-64"
        placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit. "
      />

      <Label htmlFor="title">Revised Issue Title</Label>
      <Textarea
        id="title"
        rows={1}
        className="mb-4 mt-2 min-h-8"
        // defaultValue={revisedTitle}
        placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit. "
      />
      <Label htmlFor="title">Revised Issue Description</Label>
      <Textarea
        id="title"
        rows={1}
        className="mb-4 mt-2 min-h-8"
        // defaultValue={revisedDescription}
        placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit. "
      />
      <Label htmlFor="title">Additional Information Needed</Label>
      <Textarea
        id="title"
        rows={1}
        // value={additionalInfo}
        className="mb-4 mt-2 min-h-32"
        placeholder={`
        1. What is the risk or control gap?
        2. What is the impact of the risk or control gap?
        3. What is the proposed solution?
        `}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="title">Proposed Risk Taxonomy Linkage</Label>
          <Textarea
            id="title"
            rows={1}
            // value={uniqueId}
            className="mb-4 mt-2 min-h-8"
            placeholder="R-123456789 Risk of a failing asleep"
          />
        </div>
        <div>
          <Label htmlFor="title">Proposed Root Cause Taxonomy</Label>
          <Textarea
            id="title"
            rows={1}
            // value={randomString}
            className="mb-4 mt-2 min-h-8"
            placeholder="People"
          />
        </div>
      </div>
      <Button className="mb-4 mt-2 max-h-8 w-96">Review Again</Button>
    </section>
  )
}
