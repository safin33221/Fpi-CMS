"use client";

import {
    BookOpen,
    Layers3,
    ClipboardList,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type Props = {
    totalSubjects: number;
    totalAssignments: number;
    totalSemesters: number;
};

export default function CurriculumStats({
    totalSubjects,
    totalAssignments,
    totalSemesters,
}: Props) {
    const stats = [
        {
            title: "Subjects",
            value: totalSubjects,
            icon: BookOpen,
            color:
                "bg-blue-500/10 text-blue-600",
        },
        {
            title: "Semesters",
            value: totalSemesters,
            icon: Layers3,
            color:
                "bg-violet-500/10 text-violet-600",
        },
        {
            title: "Assignments",
            value: totalAssignments,
            icon: ClipboardList,
            color:
                "bg-emerald-500/10 text-emerald-600",
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-3">
            {stats.map((item) => {
                const Icon = item.icon;

                return (
                    <Card key={item.title}>
                        <CardContent className="flex items-center justify-between p-6">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    {item.title}
                                </p>

                                <h2 className="mt-1 text-3xl font-bold">
                                    {item.value}
                                </h2>
                            </div>

                            <div
                                className={`rounded-xl p-3 ${item.color}`}
                            >
                                <Icon className="h-6 w-6" />
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}