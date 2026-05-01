import { createFileRoute } from "@tanstack/react-router";
import { Images } from "lucide-react";

export const Route = createFileRoute("/gallery/")({
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <Images className="w-7 h-7 text-primary" />
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Фотоальбомы
        </h1>
      </div>

      <div className="text-center py-20 text-muted-foreground">
        <Images className="w-16 h-16 mx-auto mb-4 opacity-30" />
        <p className="text-lg">Альбомы пока не добавлены</p>
        <p className="text-sm mt-2">Здесь скоро появятся фотографии</p>
      </div>
    </div>
  );
}
