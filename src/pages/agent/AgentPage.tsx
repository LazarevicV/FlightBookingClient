import React from "react";

import { cn } from "@/lib/utils";
// import { CoursesTab } from "./courses/CoursesTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FlightsTab } from "./flights/FlightsTab";
// import { SchoolsTab } from "./schools/SchoolsTab";

const AgentPage: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("w-full flex justify-center items-center", className)}>
      <Tabs defaultValue="unos" className="max-w-4xl w-full">
        <TabsList>
          <TabsTrigger value="unos">Unos i pregled letova</TabsTrigger>
          <TabsTrigger value="potvrda">Potvrda rezervacija</TabsTrigger>
        </TabsList>
        <TabsContent value="unos">
          <FlightsTab />
        </TabsContent>
        <TabsContent value="potvrda">{/* <CoursesTab /> */}</TabsContent>
      </Tabs>
    </div>
  );
};

export { AgentPage };
