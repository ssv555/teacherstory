import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Camera, GraduationCap, Heart } from "lucide-react";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            Более 30 лет педагогического стажа
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            История одного
            <span className="text-primary"> призвания</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Хронологическое фотопортфолио учителя. Выпуски, первые звонки,
            школьные праздники и самые яркие моменты за более чем три десятилетия.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              <Camera className="w-5 h-5" />
              Смотреть фотоальбомы
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Выпуски</h3>
              <p className="text-sm text-muted-foreground">
                Фотографии каждого выпуска — первоклассники, которые стали выпускниками
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <Camera className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Школьные события</h3>
              <p className="text-sm text-muted-foreground">
                Первое сентября, праздники, экскурсии, конкурсы и соревнования
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Хроника</h3>
              <p className="text-sm text-muted-foreground">
                Путь от первого урока до сегодняшнего дня в фотографиях и историях
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline placeholder */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Хронология
          </h2>
          <p className="text-muted-foreground mb-8">
            Скоро здесь появится интерактивная хроника карьеры
          </p>
          <div className="h-px bg-border w-32 mx-auto" />
        </div>
      </section>
    </div>
  );
}
