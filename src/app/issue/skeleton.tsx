import { Skeleton } from "@/components/ui/skeleton"

export default function IssueSkeleton() {
  return (
    <div className="mt-4 px-4">
      <Skeleton className="mb-4 h-16 bg-slate-300" />
      <Skeleton className="mb-4 h-12 bg-slate-300" />
      <Skeleton className="mb-4 h-48 bg-slate-300" />
      <Skeleton
        className="mb-2 h-8
       w-1/6 bg-slate-300"
      />
      <div className="flex gap-2">
        <Skeleton
          className="h-10 w-2/12
         bg-slate-300"
        />
        <Skeleton
          className="h-10 w-3/12
         bg-slate-300"
        />
      </div>
    </div>
  )
}
