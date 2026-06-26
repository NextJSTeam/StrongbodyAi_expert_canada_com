import React from "react";

type Props = {
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  compact?: boolean;
  light?: boolean;
};

export default function BiSectionHeader({
  title,
  description,
  align = "left",
  compact = false,
  light = false,
}: Props) {
  const center = align === "center";
  return (
    <header className={`max-w-3xl ${compact ? "mb-0" : "bi-section-header"} ${center ? "mx-auto text-center" : ""}`}>
      <h2 className={`section-title ${center ? "mx-auto" : ""} ${light ? "!text-white" : ""}`}>{title}</h2>
      {description && (
        <p className={`bi-lead mt-4 ${center ? "mx-auto" : ""} ${light ? "!text-white/75" : ""}`}>
          {description}
        </p>
      )}
    </header>
  );
}
