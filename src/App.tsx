import { useState } from "react";
import { BackgroundMusic } from "./components/BackgroundMusic";
import { FlowerCollectGame } from "./components/FlowerCollectGame";
import { FloatingDecorations } from "./components/FloatingDecorations";
import { FinalReveal } from "./components/FinalReveal";
import { LoveLetter } from "./components/LoveLetter";
import { OpeningScreen } from "./components/OpeningScreen";
import { PhotoMemoriesCarousel } from "./components/PhotoMemoriesCarousel";
import { RomanticQuiz } from "./components/RomanticQuiz";

type AppStep = "intro" | "quiz" | "flowers" | "letter";

function App() {
  const [step, setStep] = useState<AppStep>("intro");

  return (
    <main className={`app-shell app-shell--${step}`}>
      <BackgroundMusic />
      <FloatingDecorations />

      {step === "intro" && <OpeningScreen onYes={() => setStep("quiz")} />}

      {step === "quiz" && <RomanticQuiz onComplete={() => setStep("flowers")} />}

      {step === "flowers" && (
        <FlowerCollectGame onComplete={() => setStep("letter")} />
      )}

      {step === "letter" && (
        <div className="letter-page">
          <LoveLetter />
          <PhotoMemoriesCarousel />
          <FinalReveal />
        </div>
      )}
    </main>
  );
}

export default App;
