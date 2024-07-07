'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { Dialog } from "@/components/ui/dialog"
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useFetchTags } from "@/query-api/queries/useFetchTags";
import Info from "@/components/Info";
import NotFound from "@/components/NotFound";
import SkeletonTable from "@/components/SkeletonTable";
import TagsHeader from "@/components/tags/TagsHeader";
import TagDialogContent from "@/components/tags/TagDialogContent";
import ContactDialogContent from "@/components/ContactDialogContent";
import TagsTableHeader from "@/components/tags/TagsTableHeader";

const TAGS_INFO = "Tags allow users to categorize their content based on specific themes, target audiences, or campaign objectives. Effortlessly filter through vast libraries of generated content to find the exact pieces that align with current marketing strategies.";

function Tags() {
    const { data: tags, isLoading: isLoadingTags, isFetched: isFetchedTags } = useFetchTags();
    const [searchTerm, setSearchTerm] = useState("");

    const onSearchTags = (searchText: string) => {
        setSearchTerm(searchText);
    }

    const filteredTags = useMemo(() => {
        return tags?.filter((tag: Tag) => tag.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [tags, searchTerm]);

    const hasReachedTagLimit = tags?.length === 20;
    const [tagToEdit, setTagToEdit] = useState<Tag | null>();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const onClickCreateNewTag = () => {
        setIsDialogOpen(true);
        setTagToEdit(null);
    }

    const onClickEditTag = (tag: Tag) => {
        setTagToEdit(tag);
    }

    const onTagSuccess = () => {
        setTagToEdit(null);
        setIsDialogOpen(false)
        setSearchTerm("");
    }

    return (

        <div className="relative h-full py-7 px-10 flex flex-col align-center overflow-y-scroll">
            <TagsHeader onSearchTags={onSearchTags} onClickCreateNewTag={onClickCreateNewTag} />

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                {hasReachedTagLimit ?
                    <ContactDialogContent /> :
                    <TagDialogContent tagToEdit={tagToEdit} onTagSuccess={onTagSuccess} />
                }
            </Dialog >

            <Table className="mb-14">
                <TagsTableHeader />
                <TableBody>
                    {!isLoadingTags && filteredTags?.map((tag: Tag) => (
                        <TableRow key={tag.id}>
                            <TableCell className="w-1/4 py-2">
                                <Badge variant="default">{tag.name}</Badge>
                            </TableCell>
                            <TableCell className="w-2/4 py-2">
                                <span className="w-full">
                                    {tag.description}
                                </span>
                            </TableCell>
                            <TableCell className="w-full flex justify-end py-2">
                                <Button
                                    variant="link"
                                    onClick={() => {
                                        onClickEditTag(tag)
                                        setIsDialogOpen(true)
                                    }}>
                                    <PencilSquareIcon className="h-6 w-6 text-gray-400 hover:text-blue-600" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    {isLoadingTags && <SkeletonTable />}
                </TableBody>
            </Table>

            {isFetchedTags && !isLoadingTags && filteredTags?.length === 0 && (
                <NotFound>
                    <Button onClick={onClickCreateNewTag} variant="link" className="px-0">
                        Create a new tag.
                    </Button>
                </NotFound>
            )}

            <div className="pb-20">
                <Info msg={TAGS_INFO} learnMoreLink="/learn-more" />
            </div>
        </div>

    )
}

export default Tags;