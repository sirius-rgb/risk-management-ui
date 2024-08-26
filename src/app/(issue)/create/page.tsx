import { FileUpIcon, FolderUp, UploadIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function Page() {
  return (
    <section className="m-auto mt-8 p-8 sm:px-16">
      {/* min-h-screen  */}
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

      <Label htmlFor="description">
        Description of the Risk or Control Gaps
      </Label>
      <Textarea
        id="description"
        className="mb-4 mt-2 min-h-64"
        placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere hic aspernatur architecto quod reprehenderit non repellat doloribus rem asperiores distinctio quisquam itaque libero consequuntur ipsa, assumenda facilis exercitationem sequi corporis.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere hic aspernatur architecto quod reprehenderit non repellat doloribus rem asperiores distinctio quisquam itaque libero consequuntur ipsa, assumenda facilis exercitationem sequi corporis.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere hic aspernatur architecto quod reprehenderit non repellat doloribus rem asperiores distinctio quisquam itaque libero consequuntur ipsa, assumenda facilis exercitationem sequi corporis.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere hic aspernatur architecto quod reprehenderit non repellat doloribus rem asperiores distinctio quisquam itaque libero consequuntur ipsa, assumenda facilis exercitationem sequi corporis.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere hic aspernatur architecto quod reprehenderit non repellat doloribus rem asperiores distinctio quisquam itaque libero consequuntur ipsa, assumenda facilis exercitationem sequi corporis."
      />
      <Label htmlFor="support">Any supporting files for uplaoad /reivew?</Label>
      <div className="relative my-3">
        <Input
          id="support"
          type="file"
          className="absolute inset-0 cursor-pointer opacity-0"
        />
        <button className="flex h-10 w-full items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <UploadIcon className="mr-2" />
          {/* <FileUpIcon className="mr-2" /> */}
          Upload File
        </button>
      </div>
      <Button className="mb-4 mt-2 max-h-8 w-96">
        <a href="/create-detail">Review</a>
      </Button>
    </section>
  )
}
