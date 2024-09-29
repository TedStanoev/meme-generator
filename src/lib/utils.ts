import { clsx, type ClassValue } from "clsx"
import html2canvas from "html2canvas";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function downloadCanvas(element: HTMLElement) {
  const canvas = await html2canvas(element);
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "meme.png";
  link.click();
}