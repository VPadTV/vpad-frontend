'use client'
import Posts from "@/components/home/Posts";
import Filter from "@/components/feed/Filter";
import { useParams } from 'next/navigation';
import { useState, useCallback } from 'react';

export default function TierFeedPage() {
    const params = useParams();
    const tierId = params.tierId as string;
    const [filters, setFilters] = useState({
        tags: [] as string[],
        search: ""
    });

    const handleFilterChange = useCallback((newFilters: { tags: string[], search: string }) => {
        setFilters(prevFilters => {
            if (
                prevFilters.search !== newFilters.search || 
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
            <Filter 
                tierId={tierId} 
                onFilterChange={handleFilterChange}
            />
            <Posts tierId={tierId} filters={filters} />
        </main>
    );
}