"use client";

import { useMemo, useRef } from "react";
import { Printer, Download, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IClassRoutine, Weekday } from "@/types/routine";
import { ISemester } from "@/types/semester";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    routines: IClassRoutine[];
    departmentName: string;
    semester: ISemester | null;
}

const DAYS_ORDER: Weekday[] = [
    "SATURDAY",
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
];

const DAY_LABELS: Record<Weekday, string> = {
    SATURDAY: "শনিবার (Saturday)",
    SUNDAY: "রবিবার (Sunday)",
    MONDAY: "সোমবার (Monday)",
    TUESDAY: "মঙ্গলবার (Tuesday)",
    WEDNESDAY: "বুধবার (Wednesday)",
    THURSDAY: "বৃহস্পতিবার (Thursday)",
    FRIDAY: "শুক্রবার (Friday)",
};

export default function PrintableRoutineModal({
    open,
    onOpenChange,
    routines,
    departmentName,
    semester,
}: Props) {
    const printAreaRef = useRef<HTMLDivElement>(null);

    // Group routines by Day
    const routinesByDay = useMemo(() => {
        const map = new Map<Weekday, IClassRoutine[]>();
        for (const day of DAYS_ORDER) {
            const list = routines
                .filter((r) => r.day === day)
                .sort((a, b) => a.startTime.localeCompare(b.startTime));
            map.set(day, list);
        }
        return map;
    }, [routines]);

    const handlePrint = () => {
        const content = printAreaRef.current;
        if (!content) return;

        const printWindow = window.open("", "_blank");
        if (!printWindow) return;

        printWindow.document.write(`
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>Class Routine - Feni Polytechnic Institute</title>
    <style>
        * { box-sizing: border-box; }
        html, body {
            margin: 0;
            padding: 10mm;
            background: #fff;
            color: #000;
            font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
            font-size: 12px;
        }
        @page {
            size: A4 landscape;
            margin: 8mm;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #000;
            padding-bottom: 8px;
            margin-bottom: 12px;
        }
        .gov-title {
            font-size: 13px;
            font-weight: bold;
            margin: 0;
            text-transform: uppercase;
        }
        .inst-title {
            font-size: 18px;
            font-weight: 900;
            margin: 3px 0;
            letter-spacing: 0.5px;
        }
        .sub-title {
            font-size: 13px;
            font-weight: bold;
            margin: 0;
        }
        .meta-bar {
            display: flex;
            justify-content: space-between;
            font-weight: bold;
            font-size: 11px;
            margin-top: 6px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 8px;
        }
        th, td {
            border: 1px solid #444;
            padding: 6px 8px;
            text-align: left;
            vertical-align: top;
        }
        th {
            background-color: #f0f0f0;
            font-weight: bold;
            text-align: center;
            font-size: 11px;
        }
        .class-badge {
            display: inline-block;
            background: #f4f4f4;
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 4px 6px;
            margin: 2px;
            font-size: 10.5px;
        }
        .subject-name {
            font-weight: bold;
            display: block;
        }
        .teacher-name {
            font-size: 10px;
            color: #333;
        }
        .room-tag {
            font-size: 9.5px;
            font-weight: bold;
            color: #004499;
        }
        .footer-signs {
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
            padding: 0 30px;
        }
        .signature-line {
            text-align: center;
            border-top: 1px dashed #000;
            padding-top: 4px;
            width: 180px;
            font-weight: bold;
            font-size: 11px;
        }
    </style>
</head>
<body>
    ${content.innerHTML}
    <script>
        window.onload = function() {
            window.print();
            window.onafterprint = function() { window.close(); }
        }
    </script>
</body>
</html>
        `);
        printWindow.document.close();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full sm:max-w-4xl md:max-w-5xl lg:max-w-6xl max-h-[92vh] overflow-y-auto p-6 sm:p-8">
                <DialogHeader className="flex flex-row items-center justify-between">
                    <DialogTitle className="text-lg font-bold">
                        অফিসিয়াল ক্লাস রুটিন প্রিভিউ ও প্রিন্ট (A4 Format)
                    </DialogTitle>
                    <div className="flex items-center gap-2 pr-6">
                        <Button size="sm" onClick={handlePrint} className="gap-1.5">
                            <Printer className="h-4 w-4" />
                            প্রিন্ট / PDF সংরক্ষণ
                        </Button>
                    </div>
                </DialogHeader>

                {/* Printable container */}
                <div
                    ref={printAreaRef}
                    className="border rounded-lg p-6 bg-white text-black shadow-sm"
                >
                    <div className="header text-center border-b-2 border-black pb-2 mb-3">
                        <p className="gov-title text-xs font-semibold uppercase tracking-wider text-slate-700">
                            গণপ্রজাতন্ত্রী বাংলাদেশ সরকার / কারিগরি শিক্ষা অধিদপ্তর
                        </p>
                        <h2 className="inst-title text-xl font-black text-slate-900 mt-0.5">
                            ফেনী পলিটেকনিক ইনস্টিটিউট, ফেনী
                        </h2>
                        <p className="sub-title text-sm font-bold text-slate-800">
                            ডিপার্টমেন্ট অব {departmentName || "ইঞ্জিনিয়ারিং"}
                        </p>
                        <div className="meta-bar flex justify-between font-bold text-xs mt-2 text-slate-600 px-1">
                            <span>সেমিস্টার: {semester ? `${semester.name} (${semester.number}th)` : "সকল সেমিস্টার"}</span>
                            <span>কার্যকরী অ্যাকাডেমিক সেশন: ২০২৫-২০২৬</span>
                            <span>প্রিন্টের তারিখ: {new Date().toLocaleDateString("bn-BD")}</span>
                        </div>
                    </div>

                    {/* Timetable Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-slate-400 text-xs">
                            <thead>
                                <tr className="bg-slate-100 text-slate-800">
                                    <th className="border border-slate-300 p-2 w-28 text-left">
                                        দিন (Day)
                                    </th>
                                    <th className="border border-slate-300 p-2 text-left">
                                        নির্ধারিত ক্লাস ও ল্যাব শিডিউল (Classes & Labs)
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {DAYS_ORDER.map((day) => {
                                    const dayClasses = routinesByDay.get(day) ?? [];
                                    return (
                                        <tr key={day} className="hover:bg-slate-50/50">
                                            <td className="border border-slate-300 p-2 font-bold bg-slate-50">
                                                {DAY_LABELS[day]}
                                            </td>
                                            <td className="border border-slate-300 p-2">
                                                {dayClasses.length === 0 ? (
                                                    <span className="text-slate-400 italic text-xs">
                                                        কোনো ক্লাস নির্ধারিত নেই
                                                    </span>
                                                ) : (
                                                    <div className="flex flex-wrap gap-2">
                                                        {dayClasses.map((item) => (
                                                            <div
                                                                key={item.id}
                                                                className="class-badge border border-slate-300 rounded p-1.5 bg-slate-50/90 text-left min-w-[140px]"
                                                            >
                                                                <span className="subject-name font-bold text-slate-900 block">
                                                                    {item.subjectAssignment.subject.name}
                                                                </span>
                                                                <span className="text-[10px] text-slate-600 block">
                                                                    কোড: {item.subjectAssignment.subject.code}
                                                                </span>
                                                                <span className="teacher-name text-[10.5px] text-slate-700 block mt-0.5">
                                                                    শিক্ষক: {item.teacher.user.name}
                                                                </span>
                                                                <div className="flex justify-between items-center text-[10px] text-blue-800 font-semibold mt-1 pt-1 border-t border-slate-200">
                                                                    <span>রুম {item.room.roomCode || item.room.code}</span>
                                                                    <span>{item.startTime} - {item.endTime}</span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Official Signatures */}
                    <div className="footer-signs flex justify-between mt-12 px-6 text-xs font-bold text-slate-700">
                        <div className="signature-line text-center border-t border-dashed border-black pt-1 w-40">
                            প্রস্তুতকারক (রুটিন কমিটি)
                        </div>
                        <div className="signature-line text-center border-t border-dashed border-black pt-1 w-40">
                            বিভাগীয় প্রধান (Head of Dept)
                        </div>
                        <div className="signature-line text-center border-t border-dashed border-black pt-1 w-40">
                            অধ্যক্ষ (Principal)
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

