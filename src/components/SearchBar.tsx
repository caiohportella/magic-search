"use client";

import React, { useRef, useTransition, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const defaultQuery = searchParams.get("query") || "";
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSearching, startTransition] = useTransition();
  const router = useRouter();
  const [query, setQuery] = useState<string>(defaultQuery);

  const search = () => {
    startTransition(() => {
      router.push(`/search?query=${query}`);
    });
  };

  return (
    <div className="relative w-full h-14 flex flex-col bg-white">
      <div className="relative h-14 z-10 rounded-md">
        <Input
          value={query}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              search();
            }

            if (e.key === "Escape") {
              inputRef?.current?.blur();
            }
          }}
          ref={inputRef}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isSearching}
          className="absolute inset-0 h-full"
        />
        <Button
          onClick={() => search()}
          disabled={isSearching}
          size="sm"
          className="absolute right-0 inset-y-0 h-full rounded-l-none"
        >
          {isSearching ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <Search />
          )}
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
