"use client";

interface AdmissionCredentialSlipProps {
  studentName: string;
  loginId: string;
  tempPassword: string;
}

export default function AdmissionCredentialSlip({
  studentName,
  loginId,
  tempPassword,
}: AdmissionCredentialSlipProps) {
  return (
    <div
      id="credential-slip"
      className="mx-auto w-[210mm] bg-white p-10 text-black"
    >
      <div className="border-2 border-dashed border-slate-400 p-8">
        {/* Header */}
        <div className="text-center border-b pb-6">
          <h1 className="text-3xl font-bold">
            Feni Polytechnic Institute
          </h1>

          <p className="mt-2 text-lg font-medium">
            Student ERP Login Credential
          </p>

          <p className="text-sm text-slate-500">
            Admission Confirmation Slip
          </p>
        </div>

        {/* Information */}
        <div className="mt-8 space-y-5 text-lg">
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">
              Student Name
            </span>

            <span>{studentName}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">
              Login ID
            </span>

            <span className="font-mono text-xl font-bold">
              {loginId}
            </span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">
              Temporary Password
            </span>

            <span className="font-mono text-xl font-bold">
              {tempPassword}
            </span>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-10 rounded-xl border bg-slate-50 p-5">
          <h3 className="font-semibold">
            Instructions
          </h3>

          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm">
            <li>
              Login using the above Login ID and Password.
            </li>

            <li>
              Change your password after your first login.
            </li>

            <li>
              Keep these credentials confidential.
            </li>
          </ol>
        </div>

        {/* Footer */}
        <div className="mt-16 flex justify-between">
          <div>
            <div className="mt-10 border-t border-black pt-2 text-center">
              Student Signature
            </div>
          </div>

          <div>
            <div className="mt-10 border-t border-black pt-2 text-center">
              Registrar Signature
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}