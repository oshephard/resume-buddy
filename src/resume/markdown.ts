import type { ContactBlock, ResumeAst, ResumeEntry, ResumeSection } from "./types.js";

function escapeMarkdownInline(text: string): string {
  return text.replace(/([\\`*_{}[\]()#+\-.!|>])/g, "\\$1");
}

function joinContact(contact: ContactBlock | undefined): string[] {
  if (!contact) {
    return [];
  }
  const parts: string[] = [];
  if (contact.emails?.length) {
    parts.push(contact.emails.join(", "));
  }
  if (contact.phones?.length) {
    parts.push(contact.phones.join(", "));
  }
  if (contact.location) {
    parts.push(contact.location);
  }
  if (contact.profiles?.length) {
    for (const p of contact.profiles) {
      parts.push(`${p.label}: ${p.url}`);
    }
  }
  return parts;
}

function formatDateRange(entry: ResumeEntry): string | undefined {
  const hasStart = Boolean(entry.startDate);
  const hasEnd = entry.endDate !== undefined && entry.endDate !== null;
  const current = entry.isCurrent === true;
  if (!hasStart && !hasEnd && !current) {
    return undefined;
  }
  const start = entry.startDate ?? "";
  let end: string;
  if (current) {
    end = "Present";
  } else if (entry.endDate === null) {
    end = "Present";
  } else {
    end = entry.endDate ?? "";
  }
  if (!start && !end) {
    return undefined;
  }
  if (start && end) {
    return `${start} – ${end}`;
  }
  return start || end;
}

function renderEntry(entry: ResumeEntry): string[] {
  const lines: string[] = [];
  const bits: string[] = [];
  if (entry.title) {
    bits.push(`**${escapeMarkdownInline(entry.title)}**`);
  }
  if (entry.organization) {
    bits.push(escapeMarkdownInline(entry.organization));
  }
  const where = [entry.location, formatDateRange(entry)].filter(Boolean).join(" · ");
  if (where) {
    bits.push(escapeMarkdownInline(where));
  }
  if (bits.length) {
    lines.push(bits.join(" — "));
  }
  for (const b of entry.bullets) {
    const t = b.text.trim();
    if (t.length) {
      lines.push(`- ${escapeMarkdownInline(t)}`);
    }
  }
  return lines;
}

function renderSection(section: ResumeSection): string[] {
  const lines: string[] = [];
  lines.push(`## ${escapeMarkdownInline(section.title)}`);
  lines.push("");
  if (!section.entries.length) {
    return lines;
  }
  for (const entry of section.entries) {
    lines.push(...renderEntry(entry));
    lines.push("");
  }
  while (lines.length && lines[lines.length - 1] === "") {
    lines.pop();
  }
  lines.push("");
  return lines;
}

/**
 * Render Resume AST as plain, ATS-friendly Markdown (headings and bullets only).
 */
export function exportResumeAstToMarkdown(resume: ResumeAst): string {
  const out: string[] = [];
  out.push(`# ${escapeMarkdownInline(resume.metadata.fullName)}`);
  out.push("");
  if (resume.metadata.headline) {
    out.push(escapeMarkdownInline(resume.metadata.headline));
    out.push("");
  }
  const contactLines = joinContact(resume.metadata.contact);
  if (contactLines.length) {
    out.push(contactLines.map((c) => escapeMarkdownInline(c)).join(" · "));
    out.push("");
  }
  if (resume.metadata.summary) {
    out.push("## Summary");
    out.push("");
    out.push(escapeMarkdownInline(resume.metadata.summary));
    out.push("");
  }
  for (const section of resume.sections) {
    out.push(...renderSection(section));
  }
  while (out.length && out[out.length - 1] === "") {
    out.pop();
  }
  return `${out.join("\n")}\n`;
}
