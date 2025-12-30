"use client";

import { useState } from "react";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentType: "thread" | "post" | "user";
  contentId: string;
  contentTitle?: string;
}

const reportReasons = [
  { id: "spam", label: "สแปมหรือโฆษณา", icon: "📢" },
  { id: "offensive", label: "เนื้อหาไม่เหมาะสม", icon: "⚠️" },
  { id: "harassment", label: "คุกคามหรือข่มขู่", icon: "😡" },
  { id: "misinformation", label: "ข้อมูลเท็จ", icon: "❌" },
  { id: "copyright", label: "ละเมิดลิขสิทธิ์", icon: "©️" },
  { id: "other", label: "อื่นๆ", icon: "📝" },
];

export function ReportModal({ isOpen, onClose, contentType, contentId, contentTitle }: ReportModalProps) {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const getContentTypeLabel = () => {
    switch (contentType) {
      case "thread": return "กระทู้";
      case "post": return "โพสต์";
      case "user": return "ผู้ใช้";
    }
  };

  const handleSubmit = async () => {
    if (!selectedReason) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Report submitted:", {
      contentType,
      contentId,
      reason: selectedReason,
      details,
    });

    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setSelectedReason(null);
      setDetails("");
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            🚩 รายงาน{getContentTypeLabel()}
          </h2>
          {contentTitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {contentTitle}
            </p>
          )}
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              ส่งรายงานสำเร็จ
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              ขอบคุณสำหรับการรายงาน ทีมงานจะตรวจสอบโดยเร็ว
            </p>
          </div>
        ) : (
          <>
            {/* Content */}
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  เหตุผลในการรายงาน
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {reportReasons.map((reason) => (
                    <button
                      key={reason.id}
                      onClick={() => setSelectedReason(reason.id)}
                      className={`p-3 rounded-lg border-2 text-left transition-all ${
                        selectedReason === reason.id
                          ? "border-red-500 bg-red-50 dark:bg-red-900/30"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <span className="mr-2">{reason.icon}</span>
                      <span className="text-sm">{reason.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  รายละเอียดเพิ่มเติม (ไม่บังคับ)
                </label>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="อธิบายเพิ่มเติม..."
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleSubmit}
                disabled={!selectedReason || isSubmitting}
                className={`px-4 py-2 rounded-lg font-medium ${
                  selectedReason && !isSubmitting
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? "กำลังส่ง..." : "ส่งรายงาน"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Report button component
interface ReportButtonProps {
  contentType: "thread" | "post" | "user";
  contentId: string;
  contentTitle?: string;
}

export function ReportButton({ contentType, contentId, contentTitle }: ReportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
        title="รายงาน"
      >
        <span>🚩</span>
        <span>รายงาน</span>
      </button>
      <ReportModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        contentType={contentType}
        contentId={contentId}
        contentTitle={contentTitle}
      />
    </>
  );
}
