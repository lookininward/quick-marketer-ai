'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useFetchTags } from "@/query-api/queries/useFetchTags";
import Info from "@/components/Info";
import NotFound from "@/components/NotFound";
import SearchBar from "@/components/SearchBar";
import ContactForm from "@/components/ContactForm";
import SkeletonTable from "@/components/SkeletonTable";
import TagForm from "@/components/tags/TagForm";

function Tags() {
    const { data: tags, isLoading: isLoadingTags, isFetched: isFetchedTags, refetch: refetchTags } = useFetchTags();
    const [searchTerm, setSearchTerm] = useState("");

    const onSearchTags = (searchText: string) => {
        setTimeout(() => {
            setSearchTerm(searchText);
        }, 500);
    }

    const filteredTags = useMemo(() => {
        return tags?.filter((tag: Tag) => tag.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [tags, searchTerm]);


    const hasReachedTagLimit = tags?.length === 10;

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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <div className="relative h-full py-7 px-10 pb-0 flex flex-col align-center">
                <h1 className="text-xl font-semibold mb-4">Tags</h1>
                <div className="w-full flex justify-between items-center gap-x-3 mb-6 border py-5 px-6 rounded-md">
                    <SearchBar onSearch={onSearchTags} />
                    <DialogTrigger>
                        <Button >
                            <PlusIcon className="h-4 w-4 mr-1.5" />
                            Create Tag
                        </Button>
                    </DialogTrigger>
                </div>

                <DialogContent onCloseAutoFocus={() => setTagToEdit(undefined)}>
                    {hasReachedTagLimit ? (
                        <>
                            <DialogHeader>
                                <DialogTitle>Thank You for Checking This Demo Out!</DialogTitle>
                                <DialogDescription>
                                    If you want to get in touch to expand on this or work with me in some other way, enter your email and message, and Il get back to you ASAP. You can also learn more about me by visiting my LinkedIn, GitHub, etc. You can see the full source code for this demo at: [your GitHub repository link].
                                </DialogDescription>
                            </DialogHeader>
                            <ContactForm />
                        </>
                    ) : (
                        <>
                            <DialogHeader>
                                <DialogTitle>{tagToEdit ? "Edit" : "Create"} Tag</DialogTitle>
                            </DialogHeader>
                            <TagForm
                                tag={tagToEdit!}
                                onSuccess={onTagSuccess}
                            />
                        </>
                    )}
                </DialogContent>

                <Table className="mb-14">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {!isLoadingTags && filteredTags?.map((tag: Tag) => (
                            <TableRow key={tag.id}>
                                <TableCell className="w-1/4">
                                    <Badge variant="default">{tag.name}</Badge>
                                </TableCell>
                                <TableCell className="w-2/4">
                                    <span className="w-full">
                                        {tag.description}
                                    </span>
                                </TableCell>
                                <TableCell className="w-full flex justify-end">
                                    <DialogTrigger onClick={() => onClickEditTag(tag)}>
                                        <PencilSquareIcon className="h-6 w-6 text-gray-400 hover:text-blue-600" />
                                    </DialogTrigger>
                                </TableCell>
                            </TableRow>
                        ))}
                        {isLoadingTags && <SkeletonTable />}
                    </TableBody>
                </Table>

                {isFetchedTags && !isLoadingTags && filteredTags?.length === 0 && (
                    <NotFound>
                        <Button
                            onClick={onClickCreateNewTag}
                            variant="link"
                            className="px-0"
                        >
                            Create a new tag.
                        </Button>
                    </NotFound>
                )}

                <Info
                    msg={"Tags allow users to categorize their content based on specific themes, target audiences, or campaign objectives. Effortlessly filter through vast libraries of generated content to find the exact pieces that align with current marketing strategies."}
                    learnMoreLink="/learn-more"
                />
            </div>
        </Dialog >
    )
}

export default Tags;