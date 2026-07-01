"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export interface SubjectOption {
    id: string;
    code: string;
    name: string;
}

type Props = {
    subjects: SubjectOption[];
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
};

export default function SearchableSubjectCombobox({
    subjects,
    value,
    onChange,
    disabled,
}: Props) {
    const [open, setOpen] =
        React.useState(false);

    const selected =
        subjects.find(
            (subject) =>
                subject.id === value
        );

    return (
        <Popover
            open={open}
            onOpenChange={setOpen}
        >
            <PopoverTrigger >
                <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    disabled={disabled}
                    className="w-full justify-between"
                >
                    {selected
                        ? `${selected.code} - ${selected.name}`
                        : "Select Subject"}

                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[420px] p-0">
                <Command>
                    <CommandInput placeholder="Search subject..." />

                    <CommandList>
                        <CommandEmpty>
                            No subject found.
                        </CommandEmpty>

                        <CommandGroup>
                            {subjects.map(
                                (subject) => (
                                    <CommandItem
                                        key={
                                            subject.id
                                        }
                                        value={`${subject.code} ${subject.name}`}
                                        onSelect={() => {
                                            onChange(
                                                subject.id
                                            );

                                            setOpen(
                                                false
                                            );
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value ===
                                                    subject.id
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />

                                        <div className="flex flex-col">
                                            <span className="font-medium">
                                                {
                                                    subject.code
                                                }
                                            </span>

                                            <span className="text-xs text-muted-foreground">
                                                {
                                                    subject.name
                                                }
                                            </span>
                                        </div>
                                    </CommandItem>
                                )
                            )}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}