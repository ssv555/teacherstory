import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { BookOpen, Images } from "lucide-react";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="flex flex-col min-h-dvh">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-semibold text-foreground hover:text-primary transition-colors">
            <BookOpen className="w-5 h-5 text-primary" />
            <span>TeacherStory</span>
          </Link>

          <nav className="flex items-center gap-1">
            <Link
              to="/"
              className="px-3 py-1.5 text-sm rounded-lg hover:bg-secondary transition-colors text-muted-foreground [&.active]:text-foreground [&.active]:bg-secondary"
            >
              Главная
            </Link>
            <Link
              to="/gallery"
              className="px-3 py-1.5 text-sm rounded-lg hover:bg-secondary transition-colors text-muted-foreground [&.active]:text-foreground [&.active]:bg-secondary flex items-center gap-1.5"
            >
              <Images className="w-4 h-4" />
              Галерея
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-muted-foreground">
          TeacherStory &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}
