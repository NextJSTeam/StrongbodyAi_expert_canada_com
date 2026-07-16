"use client";

import { useRef, useState } from "react";
import { Paperclip, Send } from "lucide-react";

const POST_REQUEST_URL = "https://www.strongbody.ai/post-request";

export default function PostRequestCard() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [description, setDescription] = useState("");
  const [attachmentName, setAttachmentName] = useState("");
  const [error, setError] = useState("");

  function handleSubmit() {
    const trimmed = description.trim();
    if (!trimmed) {
      setError("Please describe what you need help with.");
      return;
    }

    const url = new URL(POST_REQUEST_URL);
    url.searchParams.set("description", trimmed);
    url.searchParams.set("source", "wellness-test");
    window.location.href = url.toString();
  }

  return (
    <section className="rounded-[22px] bg-[#fdf0f0] p-4 sm:rounded-[24px] sm:p-6">
      <div className="space-y-2.5">
        <p className="text-[15px] text-[#344054] sm:text-[16px]">Hi, there</p>
        <h2 className="max-w-[320px] text-[24px] leading-[1.25] font-semibold text-[#111827] sm:max-w-none sm:text-[28px] sm:leading-tight">
          What do you need help with today?
        </h2>
      </div>

      <div className="mt-5 rounded-[18px] border border-[#f1d9d9] bg-white p-4 shadow-[0_6px_20px_rgba(17,24,39,0.04)] sm:p-5">
        <textarea
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
            if (error) setError("");
          }}
          placeholder="Ask this seller anything - describe your problem or goal"
          className="min-h-[150px] w-full resize-none text-[15px] leading-7 text-[#111827] outline-none placeholder:text-[#98a2b3] sm:min-h-[120px] sm:text-base"
        />

        {error ? <p className="mt-2 text-sm font-medium text-[#da1f27]">{error}</p> : null}

        <div className="mt-4 flex items-end justify-between gap-3 border-t border-[#eef2f6] pt-4">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
              onChange={(event) => setAttachmentName(event.target.files?.[0]?.name || "")}
              className="hidden"
            />
            <button
              type="button"
              aria-label="Attach file"
              onClick={() => fileInputRef.current?.click()}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-[#f2f4f7] text-[#344054] transition hover:bg-[#e9edf3] sm:h-11 sm:w-11"
            >
              <Paperclip className="h-5 w-5" />
            </button>
            {attachmentName ? (
              <span className="min-w-0 truncate text-sm text-[#667085]">
                Add {attachmentName} after continuing on StrongBody.ai
              </span>
            ) : null}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex h-12 shrink-0 items-center gap-2 rounded-[12px] bg-[#e5242a] px-4 text-[15px] font-medium text-white hover:bg-[#cf1f25] sm:h-[42px] sm:px-5 sm:text-[16px]"
          >
            <Send className="h-4 w-4" />
            Submit Request
          </button>
        </div>
      </div>
    </section>
  );
}
