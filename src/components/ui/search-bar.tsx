'use client';

import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import { cn } from '@/src/lib/utils';

import { Input } from './input';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  onSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SEARCH_PARAM = 'search';

export const SearchBar: React.FC<SearchBarProps> = ({ className, placeholder = 'Buscar...', onSearch }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (onSearch) {
      onSearch(event);
    }
    // Update the URL search params
    const params = new URLSearchParams(searchParams.toString());
    if (newValue) {
      params.set(SEARCH_PARAM, newValue);
    } else {
      params.delete(SEARCH_PARAM);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className={cn('relative w-full md:max-w-2xl', className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        className="pl-8 h-10 bg-card border-border/60 focus-visible:ring-primary/20 focus-visible:border-primary/40"
        onChange={handleSearch}
        defaultValue={searchParams.get(SEARCH_PARAM)?.toString()}
      />
    </div>
  );
};
