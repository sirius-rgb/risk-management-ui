import { TabsList, TabsTrigger } from "@/components/ui/tabs"

export const TabList = () => {
  const tablist = ["Issue", "Taxonomy Cause", "Action", "Control"]
  return (
    <TabsList className="flex w-full gap-2 bg-white dark:bg-background">
      {tablist.map((tab, index) => (
        <TabsTrigger
          key={index}
          value={tab}
          className="flex-1 rounded-md bg-gray-100 px-4 py-2 text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-gray-800 data-[state=active]:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:focus:ring-gray-400 dark:data-[state=active]:bg-gray-600"
        >
          {tab}
        </TabsTrigger>
      ))}
    </TabsList>
  )
}
