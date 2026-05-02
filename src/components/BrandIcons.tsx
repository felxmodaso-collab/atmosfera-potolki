type IconProps = { size?: number; className?: string };

export function WhatsAppIcon({ size = 20, className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} aria-hidden>
      <g transform="translate(0 -0.4)">
        <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.01zM12.04 20.15h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.21 8.21 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.42 5.83c0 4.54-3.7 8.24-8.25 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.49-.4-.42-.55-.43h-.47c-.16 0-.42.06-.64.31-.22.25-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.02.39 1.37.51.57.18 1.1.16 1.51.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.47-.28z"/>
      </g>
    </svg>
  );
}

export function TelegramIcon({ size = 20, className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} aria-hidden>
      <g transform="translate(0 0.5)">
        <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19l-9.5 6L3.6 11.96c-.88-.25-.89-.86.2-1.3l16.45-6.34c.73-.33 1.43.18 1.15 1.3l-2.8 13.18c-.19.91-.74 1.13-1.5.71L13 16.4l-1.97 1.91c-.23.23-.42.42-.83.42z"/>
      </g>
    </svg>
  );
}

export function MaxIcon({ size = 20, className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} aria-hidden>
      <circle cx="12" cy="12" r="10.4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7.4 16.6 V8 H9.4 L12 12.4 L14.6 8 H16.6 V16.6 H14.9 V11.2 L12.5 15.2 H11.5 L9.1 11.2 V16.6 Z" fill="currentColor" />
    </svg>
  );
}

export function PhoneIcon({ size = 20, className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} aria-hidden>
      <path d="M19.5 14.5c-1.16 0-2.28-.18-3.32-.53a.93.93 0 0 0-.95.22l-2.05 2.05a14.06 14.06 0 0 1-6.15-6.15l2.05-2.05a.93.93 0 0 0 .22-.95A10.5 10.5 0 0 1 8.77 3.77a.93.93 0 0 0-.93-.93H4.5c-.51 0-.93.42-.93.93C3.57 12.31 9.69 18.43 18.07 18.43c.51 0 .93-.42.93-.93v-3.34a.93.93 0 0 0-.93-.93z"/>
    </svg>
  );
}
