'use client'
import Posts from "@/components/home/Posts";
import Filter from "@/components/feed/Filter";
import { useState, useCallback } from "react";

export default function FeedPage() {
  const [filters, setFilters] = useState({
    tags: [] as string[],
    search: "",
    sortBy: "latest"
  });

  const handleFilterChange = useCallback((newFilters: { tags: string[], search: string, sortBy: string }) => {
    setFilters(prevFilters => {
      if (
        prevFilters.search !== newFilters.search || 
        prevFilters.sortBy !== newFilters.sortBy ||
        prevFilters.tags.length !== newFilters.tags.length ||
        prevFilters.tags.some((tag, i) => newFilters.tags[i] !== tag)
      ) {
        return newFilters;
      }
      return prevFilters;
    });
  }, []);

  return (
    <main className="bg-background text-foreground">
  
        <Filter onFilterChange={handleFilterChange} />
        <Posts filters={filters} />
      
    </main>
  );
}
