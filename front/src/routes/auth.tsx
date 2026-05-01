import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

function AuthPage() {
  return (
    <div className="flex-1 flex items-center justify-center py-12">
      <div className="w-full max-w-sm mx-auto px-4">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-foreground mb-1">
            Вход в TeacherStory
          </h1>
          <p className="text-sm text-muted-foreground">
            Войдите, чтобы получить доступ ко всем альбомам
          </p>
        </div>

        <div className="space-y-3">
          {/* VK button */}
          <button
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-[#0077FF] text-white font-medium hover:bg-[#006AE6] transition-colors"
            disabled
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm3.08 14.27h-1.96c-.74 0-.97-.59-2.3-1.93-1.15-1.12-1.66-1.27-1.94-1.27-.4 0-.51.11-.51.65v1.76c0 .46-.15.74-1.36.74-2 0-4.22-1.21-5.78-3.47C2.7 9.83 2.2 7.73 2.2 7.21c0-.28.11-.54.65-.54h1.96c.49 0 .67.22.86.73.94 2.73 2.52 5.12 3.17 5.12.24 0 .35-.11.35-.72V9.36c-.07-1.26-.73-1.37-.73-1.82 0-.22.18-.44.47-.44h3.09c.41 0 .56.22.56.69v3.71c0 .41.19.56.3.56.24 0 .45-.15.9-.6 1.39-1.56 2.39-3.96 2.39-3.96.13-.28.35-.54.84-.54h1.96c.59 0 .72.3.59.69-.24 1.07-2.57 4.4-2.57 4.4-.2.33-.28.48 0 .85.2.28.86.85 1.3 1.37.82.93 1.45 1.71 1.62 2.25.17.54-.09.82-.63.82z" />
            </svg>
            VK ID
          </button>

          {/* Telegram button */}
          <button
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-[#2AABEE] text-white font-medium hover:bg-[#229ED9] transition-colors"
            disabled
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
            Telegram
          </button>

          {/* MAX button */}
          <button
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-[#8B5CF6] text-white font-medium hover:bg-[#7C3AED] transition-colors"
            disabled
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6zm-2-8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
            </svg>
            MAX
          </button>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-6">
          Авторизация потребуется для просмотра закрытых альбомов
        </p>
      </div>
    </div>
  );
}
