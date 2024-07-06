import React from 'react'
import { PlusIcon } from "@heroicons/react/24/outline";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";

function TagsHeader({
    onSearchTags,
    onClickCreateNewTag
}: {
    onSearchTags: (searchText: string) => void,
    onClickCreateNewTag: () => void
}) {
    return (
        <>
            <h1 className="text-xl font-semibold mb-4">Tags</h1>
            <div className="w-full flex justify-between items-center gap-x-3 mb-6 border py-5 px-6 rounded-md">
                <SearchBar onSearch={onSearchTags} />
                <Button onClick={onClickCreateNewTag}>
                    <PlusIcon className="h-4 w-4 mr-1.5" />
                    Create Tag
                </Button>
            </div>
        </>
    )
}

export default TagsHeader