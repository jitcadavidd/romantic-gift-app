import type { RomanticContent } from "../types/content";

export const romanticContent: RomanticContent = {
  introTitle: "Hello Honey, I have a special gift for YOU. Do you want to see it?",
  introSubtitle: "Try pressing No",
  yesButtonLabel: "Yes",
  noButtonLabel: "No",
  noButtonMessages: [
    "Nope, wrong answer.",
    "Try again, but maybe choose Yes.",
    "This button is emotionally unavailable.",
    "You were not supposed to click that.",
    "Okay, I will make it easier: press Yes."
  ],

  quizTitle: "Romantic Quiz",
  quizSubtitle: "A few tiny questions before the surprise opens.",
  wrongAnswerMessages: [
    "Hmm, almost. Try again.",
    "Are you sure? I think your heart knows this one.",
    "Wrong, but still a cute answer.",
    "No worries, one more try.",
    "Think about us for a second."
  ],
  quizQuestions: [
    {
      id: "favorite-memory",
      type: "text",
      question: "Where did we ate on our first date?",
      acceptedAnswers: ["MC", "mc", "mac", "McDonald's", "mcdonald's", "McDonald", "mcdonald"],
      placeholder: "Type your answer..."
    },
    {
      id: "thing-i-say",
      type: "text",
      question: "What flower did I bring to you for the second date?",
      acceptedAnswers: ["hortensie", "hortensii", "lalele", "lalea"],
      placeholder: "Type your answer..."
    },
    {
      id: "favorite-thing",
      type: "multiple-choice",
      question: "What is my favorite thing about you?",
      options: ["Your smile", "Your heart", "Your patience", "All of the above"],
      correctAnswer: "All of the above"
    },
    {
      id: "favorite-thing",
      type: "text",
      question: "How do I like to call you?",
      acceptedAnswers: ["Dede", "Denisa", "iubito", "buburuzo"],
      placeholder: "Type your answer..."
    },

    {
      id: "do-i-love-you",
      type: "multiple-choice",
      question: "Do I love you?",
      options: ["Yes", "Very much", "More than you know", "All answers are correct"],
      correctAnswer: "All answers are correct"
    }
  ],

  flowersTitle: "Inainte sa se deschida scrisoarea...",
  flowersSubtitle: "Colecteaza 5 floricele mici",
  flowersProgressLabel: "floricele colectate",
  openLetterButtonLabel: "Deschide scrisoarea",
  flowerMessages: [
    {
      id: "smile",
      label: "Flower 1",
      message: "Pentru zambetul tau!"
    },
    {
      id: "patience",
      label: "Flower 2",
      message: "Pentru rabdarea ta!"
    },
    {
      id: "happiness",
      label: "Flower 3",
      message: "Pentru felul in care ma faci fericit!"
    },
    {
      id: "kindness",
      label: "Flower 4",
      message: "Pentru bunatatea ta!"
    },
    {
      id: "you",
      label: "Flower 5",
      message: "Because YOU are enough."
    },
    {
      id: "pray",
      label: "Flower 6",
      message: "Pentru ca Dumnzeu mi te a trimis in cale."
    }
  ],

  letterTitle: "Iubita mea,",
  letterBody: `Sunt eu David, iti scriu aceste randuri pentru ca te iubesc nespus. Incerc sa scriu, dar ma gandesc parca sa fiu un poet, sa scriu frumos
  dar eu nu ma pricep. Am luat 8,75 la romana la BAC:)). Deci a sa incerc sa exprim ce simt pentru tine in cuvintele mele. As vrea sa fiu langa tine cand
  vei citi aceste randuri, sa ma joc prin parul tau si sa raman coplesit de cei mai frumosi ochi.

  Am asteptat mult mult, unde ai intarziat oare atat ...? Dar Domnul stie de ce, el are planul Lui mereu si de curand ne a intersectat caile noastre si sunt
  asa multumitor pentru darul nespus de pretuit, adica pentru tine buburuza mea. Vreau sa aduc multiri tie Doamne ca ai fost asa de bun, si vreau sa fii totdeauna
  intre mine si Denisa, tu sa fii stanca si adapostul nostru. Sa ne pazesti, sa ne dai intelepciune in conflicte, sa ne ajuti sa ne smerim unul fata de altul si
  astfel sa insabusim orgoliile noastre. Dede iubesc asa multe la tinee iubesc virtutile pe care Dumnezeu le a lucrat in tine, rabdarea ta nespus de mare fata de
  anxietatile mea, deschiderea ta spre aplanarea conflictelor, blandetea ta in dicutiile mai aprinse cand poate chiar emotional nu esti bine. Iubesc credinciosia ta, 
  si faptul ca L urmezi pe El cel ce ne-a adus impreuna. Iubesc sufletul tau care arata smerenie, dragoste, caldura, empatie. Ador felul tau de a fi, doar stii ce
  mult imi place expresivitatea ta, nu? Asa ma topesc. Si nu in ultimul rand, ohh, ochii tai ca doua pietre pretioase fara de pret care mi arata blandetea ta,
  obrajii tai fini ca matasea, buzele tale ca petalele celor mai parfumate flori, mainile tale jucause.

  Mi amintesc primul nostru date, nu ti am spus atunci dar am fost empatic cand imi povesteai putin prin ce treci si asa mult overthink am facut daca pot sa ti 
  ofer siguranta, ca n am raspuns o zi. Iti multumesc ca ai avut rabdare cu mine. Oo si ce dragut mi s a parut ca ai zis ca vrei la Mc ca ti e foame:)). Incerc 
  sa mi amintesc primul sarut, stiu ziua dar nu mai stiu locul, pentru ca paream pe alta lume. Atatea amintiri, dar scriu scrisoarea la 2 noaptea, si parca nu mi
  mai amintesc asa multe..

  Buburuza mea, ai inceput sa schimbi viata mea. Ma ajuti sa nu ma mai gandesc atat de mult anxietatile mele sa nu ma mai privesc asa dur. Mi arati o dragoste care 
  lucreaza in mine. Cred ca Dumnezeu lucreaza la vindecarea mea prin tine, si la fel vreau si eu sa fiu un sprijin pentru tine. Vreau ca toate dorintele tale sa 
  se implineasca, vreau sa te ajut sa devii cea mai buna versiune a ta, sa te sustin in ceea ce tu doresti sa devii.

  Stiu ca sunt un om imperfect, mai si gresesc mai am si scaderi. Dar stiu ca vreau sa fiu sincer cu tine, si ca mi doresc sa te intristez cat mai putin. Vreau sa
  promit ca voi lupta cu mine, si cu orice sta impotriva sa te iubesc mai mult cu fiecare zi. Vreau sa te las cu acest verset: "Apele cele mari nu pot să stingă 
  dragostea, şi râurile n-ar putea s-o înece.” — Cântarea Cântărilor 8:7.

  Denisa you're enough just as you are. And I LOVE YOUU.

  Iti multumesc pentru cine esti, iti multumesc pentru dragostea si rabdarea pe care mi o arati. Ii multumesc Domnul ca te a dus in viata mea, si tie ca ai acceptat

Pentru totdeauna al tau,
David`,

  memoriesTitle: "Our memories",
  memoriesSubtitle: "A collection of our favorite moments together",
  photos: [
    {
      src: "/photos/YOU1.jpg",
      caption: "YOU"
    },
    {
      src: "/photos/US2.jpg",
      caption: "Second datee"
    },
    {
      src: "/photos/US3.jpg",
      caption: "Noi facand sport:))"
    },
    {
      src: "/photos/US6.jpg",
      caption: "First wedding togheter"
    },
    {
      src: "/photos/US4.jpg",
      caption: "Travelling togheter"
    },
    {
      src: "/photos/US5.jpg",
      caption: "Travelling togheter"
    },
    {
      src: "/photos/PIC3.jpg",
      caption: "First picnic togheter"
    },
    {
      src: "/photos/PIC2.jpg",
      caption: "I loveeeee you"
    }
  ],

  finalRevealTitle: "Your final surprise is here",
  finalRevealButtonLabel: "Open final surprise",
  finalRevealText: "TOO many more memories!",
  finalRevealVideoUrl: "https://drive.google.com/file/d/1-z_17914DMP6DTL0Mk50mDElniU91xZX/view",
  backgroundMusicYoutubeUrl: "https://www.youtube.com/watch?v=SUvHWZ3iiJo&list=RDSUvHWZ3iiJo&start_radio=1"
};
