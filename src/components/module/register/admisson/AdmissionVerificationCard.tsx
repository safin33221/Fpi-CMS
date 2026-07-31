"use client";

import { useRef, useState, useTransition } from "react";
import { useReactToPrint } from "react-to-print";
import { CheckCircle2, Copy, Loader2, Printer } from "lucide-react";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { createAdmission } from "@/services/admisson/create-admission";
import AdmissionCredentialSlip from "./AdmissionCredentialSlip";
import { IStudent } from "@/types/student";

export default function AdmissionVerificationCard({
  student,
}: {
  student: IStudent;
}) {
  const [credential, setCredential] = useState<{
    loginId: string;
    tempPassword: string;
    studentName: string;
  } | null>(null);

  const [open, setOpen] = useState(false);

  const [feeVerified, setFeeVerified] = useState(false);
  const [documentVerified, setDocumentVerified] = useState(false);
  const [remarks, setRemarks] = useState("");

  const [isPending, startTransition] = useTransition();

  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (!credential) return;

    const printWindow = window.open(
      "",
      "_blank",
      "width=800,height=700"
    );

    if (!printWindow) return;

    printWindow.document.write(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Student Credential</title>

<style>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:Arial,sans-serif;
}

body{
  background:#fff;
  padding:40px;
}

.card{
  width:420px;
  margin:auto;
  border:2px solid #000;
  border-radius:12px;
  padding:24px;
}

.logo{
  text-align:center;
  margin-bottom:20px;
}

.logo h2{
  font-size:24px;
}

.logo p{
  margin-top:6px;
  color:#666;
}

.row{
  margin-top:18px;
}

.label{
  color:#666;
  font-size:13px;
}

.value{
  margin-top:4px;
  font-size:20px;
  font-weight:bold;
}

.note{
  margin-top:30px;
  border-top:1px dashed #999;
  padding-top:15px;
  font-size:13px;
}

@media print{

  body{
    padding:0;
  }

  .card{
    border:none;
    width:100%;
    box-shadow:none;
  }

}
</style>

</head>

<body>

<div class="card">

<div class="logo">
<h2>Feni Polytechnic Institute</h2>
<p>Student Login Credential</p>
</div>

<div class="row">
<div class="label">Student Name</div>
<div class="value">${credential.studentName}</div>
</div>

<div class="row">
<div class="label">Login ID</div>
<div class="value">${credential.loginId}</div>
</div>

<div class="row">
<div class="label">Temporary Password</div>
<div class="value">${credential.tempPassword}</div>
</div>

<div class="note">
Please change your password after your first login.
</div>

</div>

<script>
window.onload = function () {
  window.print();
  window.onafterprint = function () {
    window.close();
  };
};
</script>

</body>
</html>
`);

    printWindow.document.close();
  };

  const handleConfirmAdmission = () => {
    startTransition(async () => {
      try {
        const result = await createAdmission(student.id, {
          feeVerified,
          documentVerified,
          remarks,
        });

        setCredential(result);
        setOpen(true);

        toast.success("Admission confirmed successfully.");
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to confirm admission."
        );
      }
    });
  };

  return (
    <>
      <Card className="sticky top-6 rounded-2xl">
        <CardHeader>
          <CardTitle>Admission Verification</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-center gap-3 rounded-xl border p-4">
            <Checkbox
              checked={feeVerified}
              onCheckedChange={(v) => setFeeVerified(Boolean(v))}
            />
            <Label>Admission Fee Verified</Label>
          </div>

          <div className="flex items-center gap-3 rounded-xl border p-4">
            <Checkbox
              checked={documentVerified}
              onCheckedChange={(v) => setDocumentVerified(Boolean(v))}
            />
            <Label>Documents Verified</Label>
          </div>

          <div className="space-y-2">
            <Label>Remarks</Label>

            <Textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>

          <Button
            className="w-full"
            disabled={
              !feeVerified ||
              !documentVerified ||
              isPending
            }
            onClick={handleConfirmAdmission}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Confirming...
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Confirm Admission
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className=" max-w-4xl  p-6">
          <DialogHeader>
            <DialogTitle>
              Admission Successful
            </DialogTitle>

            <DialogDescription>
              Print or copy the student&apos;s login credentials.
            </DialogDescription>
          </DialogHeader>

          {credential && (
            <>
              <div className="flex justify-center overflow-x-auto rounded-xl border bg-muted/20 p-4">
                <AdmissionCredentialSlip
                  studentName={credential.studentName}
                  loginId={credential.loginId}
                  tempPassword={credential.tempPassword}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `Login ID: ${credential.loginId}
Password: ${credential.tempPassword}`
                    );

                    toast.success("Copied");
                  }}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>

                <Button
                  className="flex-1"
                  onClick={handlePrint}
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}