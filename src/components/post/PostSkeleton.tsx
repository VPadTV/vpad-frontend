import { Skeleton } from "@nextui-org/react";

export default function PostSkeleton() {
  return (
    <div className="grid lg:grid-cols-[1fr,400px] xl:grid-cols-[1fr,450px] gap-6">
      <div className="rounded-lg bg-background dark:bg-cardBackground shadow-md overflow-hidden">
        <div className="p-4 md:p-6 border-b border-border dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <Skeleton className="flex rounded-full w-12 h-12" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-3 w-24 rounded-lg" />
              <Skeleton className="h-3 w-16 rounded-lg" />
            </div>
          </div>
        </div>

        <Skeleton className="w-full h-[400px]" />

        <div className="p-4 md:p-6">
          <Skeleton className="h-8 w-3/4 rounded-lg mb-4" />
          <Skeleton className="h-3 w-1/4 rounded-lg mb-6" />
          
          <div className="flex gap-2 mb-6">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-6 w-16 rounded-full" />
            ))}
          </div>
          
          <div className="space-y-2 mb-6">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-4 w-full rounded-lg" />
            ))}
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t border-border dark:border-zinc-800">
            <div className="flex gap-4">
              <Skeleton className="h-8 w-24 rounded-lg" />
              <Skeleton className="h-8 w-24 rounded-lg" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Comment section skeleton */}
      <div className="lg:sticky lg:top-[100px] lg:h-[calc(100vh-120px)] rounded-lg bg-background dark:bg-cardBackground shadow-md overflow-hidden p-4 md:p-6">
        <Skeleton className="h-8 w-36 rounded-lg mb-6" />
        
        <div className="space-y-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex gap-3">
              <Skeleton className="rounded-full w-10 h-10 shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32 rounded-lg" />
                <Skeleton className="h-3 w-full rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
