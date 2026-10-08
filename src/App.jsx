import { useEffect, useRef, useState } from "react";

import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Heart,
  Pause,
  Play,
  Sparkles,
  Star,
  Volume2,
  VolumeX,
} from "lucide-react";

import FloatingHearts from "./components/FloatingHearts";
import SectionHeading from "./components/SectionHeading";


/* =========================================================
   PHOTOS
========================================================= */

const photos = [
  {
    src: "/photos/first-memory.jpg",
    title: "The first little memory",
    note: "I didn't know this moment would become something I would always want to remember.",
  },
  {
    src: "/photos/memory-02.jpg",
    title: "The moments between",
    note: "Some of my favorite memories are the ones that weren't planned.",
  },
  {
    src: "/photos/memory-03.jpg",
    title: "Us, being us",
    note: "No perfect picture. Just us.",
  },
  {
    src: "/photos/memory-04.jpeg",
    title: "One of those days",
    note: "A small moment that somehow became a big memory.",
  },
  {
    src: "/photos/memory-05.jpeg",
    title: "Another little chapter",
    note: "And somehow, there were already so many memories.",
  },
  {
    src: "/photos/memory-06.jpeg",
    title: "The kind of happiness",
    note: "The kind that doesn't need a reason.",
  },
  {
    src: "/photos/memory-07.jpeg",
    title: "A memory worth keeping",
    note: "If I could save moments forever, this would be one of them.",
  },
  {
    src: "/photos/memory-08.jpeg",
    title: "Still my favorite",
    note: "Some pictures become special simply because Abhisheyy is in them.",
  },
  {
    src: "/photos/memory-09.jpeg",
    title: "And then there was us",
    note: "Maybe this was never just a collection of memories.",
  },
];


/* =========================================================
   APP
========================================================= */

export default function App() {
  const [started, setStarted] = useState(false);
  const [secret, setSecret] = useState(false);
  const [birthday, setBirthday] = useState(false);

  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicMuted, setMusicMuted] = useState(false);

  const audioRef = useRef(null);
  const cursor = useRef(null);


  /* =======================================================
     START STORY + MUSIC
  ======================================================= */

  const startStory = async () => {
    setStarted(true);

    const audio = audioRef.current;

    if (!audio) {
      console.error("Audio element not found.");
      return;
    }

    try {
      audio.pause();
      audio.currentTime = 0;
      audio.volume = 0.65;
      audio.muted = false;

      await audio.play();

      setMusicPlaying(true);
      setMusicMuted(false);

      console.log("Music started successfully.");
    } catch (error) {
      console.error("Music playback failed:", error);
      setMusicPlaying(false);
    }
  };


  /* =======================================================
     MUSIC TOGGLE
  ======================================================= */

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) {
      console.error("Audio element not found.");
      return;
    }

    try {
      if (audio.paused) {
        audio.muted = false;
        audio.volume = 0.65;

        await audio.play();

        setMusicPlaying(true);
        setMusicMuted(false);
      } else {
        audio.pause();

        setMusicPlaying(false);
      }
    } catch (error) {
      console.error("Music playback error:", error);
    }
  };


  /* =======================================================
     MUTE
  ======================================================= */

  const toggleMute = () => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.muted = !audio.muted;

    setMusicMuted(audio.muted);
  };


  /* =======================================================
     CURSOR GLOW
  ======================================================= */

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!cursor.current) return;

      cursor.current.style.transform =
        `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    window.addEventListener(
      "pointermove",
      handlePointerMove
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );
    };
  }, []);


  return (
    <>
      {/* ===================================================
          BACKGROUND MUSIC
      =================================================== */}

      <audio
        ref={audioRef}
        src="/music/our-song.mp3"
        loop
        preload="auto"
        onPlay={() => setMusicPlaying(true)}
        onPause={() => setMusicPlaying(false)}
        onError={(e) => {
          console.error(
            "Audio error:",
            e.currentTarget.error
          );
        }}
      />


      <style>{`
        .story-page-progress-track > div:last-child i{display:none}
        .story-page-progress-track{overflow:visible}
        .story-page-title{white-space:nowrap}
        .story-continue-button{z-index:120}
        .final-special .birthday-final-eyebrow{display:block;margin-top:8px;color:#a66a80;font-size:10px;font-weight:900;letter-spacing:.22em}
        @media(max-width:760px){
          .story-page-progress{transform:scale(.86);transform-origin:top center}
          .story-page-title{font-size:8px}
        }

        /* FINAL VIBRANT PASS */
        .story{
          --vibe-1:#fff1cf;
          --vibe-2:#f4d8e8;
          --vibe-accent:#e36b91;
        }
        .story-color-atmosphere{
          position:fixed; inset:0; z-index:0; pointer-events:none; opacity:.92;
          transition:background 1.2s ease, filter 1.2s ease, opacity 1.2s ease;
          mix-blend-mode:normal;
        }
        .story-color-atmosphere.theme-0{background:radial-gradient(circle at 18% 22%,rgba(255,78,143,.28),transparent 26%),radial-gradient(circle at 82% 72%,rgba(255,184,79,.18),transparent 30%),linear-gradient(135deg,#251326,#43233b 52%,#17233b);}
        .story-color-atmosphere.theme-1{background:radial-gradient(circle at 18% 20%,rgba(47,181,255,.28),transparent 25%),radial-gradient(circle at 80% 72%,rgba(255,90,160,.20),transparent 30%),linear-gradient(135deg,#111d35,#243c61 52%,#24182f);}
        .story-color-atmosphere.theme-2{background:radial-gradient(circle at 20% 20%,rgba(255,131,70,.30),transparent 26%),radial-gradient(circle at 82% 72%,rgba(255,205,70,.20),transparent 30%),linear-gradient(135deg,#2b1720,#5a2b35 52%,#182238);}
        .story-color-atmosphere.theme-3{background:radial-gradient(circle at 18% 24%,rgba(49,201,151,.27),transparent 27%),radial-gradient(circle at 80% 70%,rgba(110,225,255,.18),transparent 30%),linear-gradient(135deg,#102a2b,#183d46 52%,#21182f);}
        .story-color-atmosphere.theme-4{background:radial-gradient(circle at 18% 20%,rgba(155,93,255,.30),transparent 27%),radial-gradient(circle at 82% 72%,rgba(255,70,163,.23),transparent 30%),linear-gradient(135deg,#211334,#442454 52%,#17243f);}
        .story-color-atmosphere.theme-5{background:radial-gradient(circle at 20% 20%,rgba(57,102,255,.32),transparent 26%),radial-gradient(circle at 82% 72%,rgba(178,62,255,.25),transparent 30%),linear-gradient(135deg,#0d1830,#241d4c 52%,#30152f);}
        .story-color-atmosphere.theme-6{background:radial-gradient(circle at 18% 20%,rgba(255,73,145,.32),transparent 28%),radial-gradient(circle at 82% 72%,rgba(255,184,47,.24),transparent 31%),radial-gradient(circle at 50% 50%,rgba(84,106,255,.15),transparent 34%),linear-gradient(135deg,#0c0c19,#29112f 50%,#101c35);}
        .story-color-atmosphere.theme-7{background:radial-gradient(circle at 18% 20%,rgba(255,73,145,.38),transparent 28%),radial-gradient(circle at 82% 72%,rgba(255,184,47,.25),transparent 31%),radial-gradient(circle at 50% 50%,rgba(84,106,255,.18),transparent 34%),linear-gradient(135deg,#0b0914,#241027 50%,#0c172b);}
        .story-chapter-shimmer{position:fixed;inset:0;z-index:2;pointer-events:none;background:linear-gradient(105deg,transparent 0%,rgba(255,255,255,.0) 40%,rgba(255,255,255,.72) 50%,rgba(255,255,255,.0) 60%,transparent 100%);animation:chapterShimmer 1.15s ease-out forwards;}
        @keyframes chapterShimmer{from{transform:translateX(-120%);opacity:.9}to{transform:translateX(120%);opacity:0}}
        .page-story-mode > *:not(.story-color-atmosphere):not(.story-chapter-shimmer){position:relative;z-index:3}
        .story-page-progress{z-index:20!important}
        .story-continue-button{z-index:9998!important;box-shadow:0 12px 35px rgba(190,58,112,.20)!important}
        .story-continue-button:hover{filter:saturate(1.25) brightness(1.03)}
        @media(max-width:760px){.story-chapter-shimmer{display:none}}
      `}</style>

      {/* Cursor */}
      <div
        ref={cursor}
        className="cursor-glow"
      />


      {/* Interactive AG hearts across the entire story */}
      {started && <FloatingAGHearts />}


      {/* ===================================================
          MAIN STORY
      =================================================== */}

      <AnimatePresence mode="wait">
        {!started ? (
          <Intro onStart={startStory} />
        ) : (
          <Story
            secret={secret}
            setSecret={setSecret}
            birthday={birthday}
            setBirthday={setBirthday}
          />
        )}
      </AnimatePresence>


      {/* ===================================================
          MUSIC PLAYER
      =================================================== */}

      <AnimatePresence>
        {started && (
          <motion.div
            className={`music-player ${
              musicPlaying ? "playing" : ""
            }`}
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              delay: 0.5,
              duration: 0.6,
              type: "spring",
              stiffness: 180,
            }}
          >
            <button
              type="button"
              className="music-main-button"
              onClick={toggleMusic}
              aria-label={
                musicPlaying
                  ? "Pause music"
                  : "Play music"
              }
            >
              <span className="music-icon">
                {musicPlaying ? (
                  <Pause size={15} />
                ) : (
                  <Play size={15} />
                )}
              </span>

              <span className="music-text">
                {musicPlaying
                  ? "OUR SONG IS PLAYING"
                  : "PLAY OUR SONG"}
              </span>

              <span className="music-heart">
                {musicPlaying ? "♥" : "♡"}
              </span>
            </button>

            <button
              type="button"
              className="music-volume"
              onClick={toggleMute}
              aria-label={
                musicMuted
                  ? "Unmute music"
                  : "Mute music"
              }
            >
              {musicMuted ? (
                <VolumeX size={15} />
              ) : (
                <Volume2 size={15} />
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


/* =========================================================
   INTRO
========================================================= */

function Intro({ onStart }) {
  return (
    <motion.main
      className="intro"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        scale: 1.04,
        filter: "blur(10px)",
      }}
    >
      <FloatingHearts count={30} />

      <div className="intro-blobs">
        <i />
        <i />
        <i />
      </div>

      <div className="intro-top">
        <span>
          FOR SOMEONE VERY SPECIAL
        </span>

        <span>
          01 / 07
        </span>
      </div>


      <div className="intro-scene">

        <motion.div
          className="orb orb-left"
          initial={{
            x: -90,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1.4,
          }}
        />

        <motion.div
          className="orb orb-right"
          initial={{
            x: 90,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1.4,
            delay: 0.2,
          }}
        />


        <motion.div
          className="person boy"
          initial={{
            x: -260,
            opacity: 0,
          }}
          animate={{
            x: -85,
            opacity: 1,
          }}
          transition={{
            duration: 1.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <b />
          <i />
          <em />
          <em />
        </motion.div>


        <motion.div
          className="person girl"
          initial={{
            x: 260,
            opacity: 0,
          }}
          animate={{
            x: 85,
            opacity: 1,
          }}
          transition={{
            duration: 1.8,
            delay: 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <b />
          <i />
          <em />
          <em />
        </motion.div>


        <motion.div
          className="center-heart"
          initial={{
            scale: 0,
            opacity: 0,
          }}
          animate={{
            scale: [0, 1.2, 1],
            opacity: 1,
          }}
          transition={{
            delay: 1.9,
            duration: 1,
          }}
        >
          ♥
        </motion.div>
      </div>


      <motion.div
        className="intro-copy"
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 1.7,
          duration: 1,
        }}
      >
        <span>
          A LITTLE STORY ABOUT TWO PEOPLE
        </span>

        <h1>
          Somewhere between
          <br />
          <i>ordinary</i> and extraordinary...
        </h1>

        <p>
          something beautiful happened.
        </p>


        <motion.button
          className="primary-button"
          onClick={onStart}
          whileHover={{
            y: -4,
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.97,
          }}
        >
          ENTER OUR STORY

          <ArrowRight size={16} />
        </motion.button>


        <motion.div
          className="music-start-hint"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 3,
            duration: 1,
          }}
        >
          <span>♫</span>

          the story has a soundtrack
        </motion.div>
      </motion.div>


      <div className="scroll-hint">
        SCROLL TO BEGIN

        <ArrowDown size={14} />
      </div>
    </motion.main>
  );
}


/* =========================================================
   STORY
========================================================= */

function Story({
  secret,
  setSecret,
  birthday,
  setBirthday,
}) {
  const [page, setPage] = useState(0);
  const [questionOpen, setQuestionOpen] = useState(false);

  const pageCount = 9;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [page]);

  const questions = [
    {
      eyebrow: "A LITTLE QUESTION",
      title: "If you could replay one kind of moment...",
      options: [
        "The completely unplanned ones",
        "The moments that made us laugh",
        "The quiet moments in between",
      ],
      response: "There really isn't a wrong answer here. Some moments just deserve another replay. ♥",
    },
    {
      eyebrow: "QUESTION TWO",
      title: "What makes a memory special?",
      options: [
        "The place",
        "The perfect picture",
        "The person you're with ♥",
      ],
      response: "Exactly. The people are what turn an ordinary moment into a memory. ♥",
    },
  ];

  const pageNames = [
    "THE BEGINNING",
    "FIRST MEMORY",
    "OUR LITTLE FILM",
    "OUR LITTLE VIDEO",
    "THE LITTLE THINGS",
    "IF I COULD FREEZE ONE MOMENT",
    "THE SECRET",
    "THE NEXT CHAPTER",
    "BIRTHDAY",
  ];

  const openQuestion = () => {
    // Exactly two question gates. After chapter 2, the story flows freely.
    if (page === 0 || page === 1) {
      setQuestionOpen(true);
      return;
    }

    setPage((current) => Math.min(current + 1, pageCount - 1));
  };

  const answerQuestion = () => {
    setQuestionOpen(false);
    setPage((current) =>
      Math.min(current + 1, pageCount - 1)
    );
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.94,
      y: 30,
      filter: "blur(12px)",
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
    },
    exit: {
      opacity: 0,
      scale: 1.04,
      y: -30,
      filter: "blur(12px)",
    },
  };

  return (
    <motion.main
      className="story page-story-mode"
      data-story-page={page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <FloatingHearts count={24} />

      {/* Gradual color atmosphere: every chapter gets its own mood. */}
      <div
        className={`story-color-atmosphere theme-${page}`}
        aria-hidden="true"
      />
      <div
        key={`chapter-shimmer-${page}`}
        className="story-chapter-shimmer"
        aria-hidden="true"
      />

      {/* =================================================
          TOP CHAPTER PROGRESS
      ================================================= */}

      <div className="story-page-progress">
        <div className="story-page-progress-track">
          {pageNames.map((name, index) => (
            <div
              key={name}
              className={
                index === page
                  ? "active"
                  : index < page
                  ? "visited"
                  : ""
              }
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <i />
            </div>
          ))}
        </div>

        <div className="story-page-title">
          {pageNames[page]}
        </div>
      </div>

      {/* =================================================
          PAGE CONTENT
      ================================================= */}

      <AnimatePresence mode="wait">
        {page === 0 && (
          <motion.section
            key="page-beginning"
            className="story-page-panel chapter-page-panel"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="watermark">01</div>

            <div className="chapter-page-inner">
              <SectionHeading eyebrow="THE FIRST CHAPTER">
                Before there was <i>us.</i>
              </SectionHeading>

              <motion.div
                className="chapter-text"
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.8 }}
              >
                <p>There was just Abhisheyy.</p>
                <p>There was just me.</p>
                <p>
                  And somehow, the universe put us
                  <br />
                  in the same story.
                </p>
              </motion.div>

              <motion.div
                className="chapter-mini-photo"
                initial={{
                  opacity: 0,
                  scale: 0.2,
                  rotate: -12,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: -4,
                }}
                transition={{
                  delay: 0.75,
                  type: "spring",
                  stiffness: 110,
                  damping: 13,
                }}
              >
                <img
                  src="/photos/first-memory.jpg"
                  alt="The beginning"
                />
                <span>the beginning of something beautiful</span>
              </motion.div>

              <motion.div
                className="chapter-page-heart"
                animate={{
                  y: [0, -9, 0],
                  rotate: [-5, 5, -5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Heart size={24} fill="currentColor" />
              </motion.div>
            </div>
          </motion.section>
        )}

        {page === 1 && (
          <motion.section
            key="page-memory"
            className="story-page-panel memory-page-panel"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <InteractiveMemoryPage />
          </motion.section>
        )}

        {page === 2 && (
          <motion.section
            key="page-film"
            className="story-page-panel film-page-panel"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <FilmReel />
          </motion.section>
        )}

        {page === 3 && (
          <motion.section
            key="page-video"
            className="story-page-panel video-page-panel"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <VideoStoryPage />
          </motion.section>
        )}

        {page === 4 && (
          <motion.section
            key="page-scrapbook"
            className="story-page-panel scrapbook-page-panel"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <LoveNotes
              secret={secret}
              setSecret={setSecret}
            />
          </motion.section>
        )}

        {page === 5 && (
          <motion.section
            key="page-freeze"
            className="story-page-panel freeze-page-panel"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <FreezeMomentPage onContinue={openQuestion} />
          </motion.section>
        )}

        {page === 6 && (
          <motion.section
            key="page-surprise"
            className="story-page-panel surprise-page-panel"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <SurprisePage />
          </motion.section>
        )}

        {page === 7 && (
          <motion.section
            key="page-next-chapter"
            className="story-page-panel next-chapter-page-panel"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <NextChapterPage />
          </motion.section>
        )}

        {page === 8 && (
          <motion.section
            key="page-final"
            className="story-page-panel final-page-panel"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Final
              birthday={birthday}
              setBirthday={setBirthday}
            />
          </motion.section>
        )}
      </AnimatePresence>

      {/* =================================================
          CONTINUE BUTTON
      ================================================= */}

      {page < pageCount - 1 && (
        <motion.button
          type="button"
          className="story-continue-button"
          onClick={openQuestion}
          style={{
            position: "fixed",
            left: "50%",
            bottom: "28px",
            transform: "translateX(-50%)",
            zIndex: 9998,
            pointerEvents: "auto",
          }}
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.7,
            duration: 0.6,
          }}
          whileHover={{
            y: -4,
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.97,
          }}
        >
          <span>
            {page === 0
              ? "OPEN THE FIRST MEMORY"
              : page === 1
              ? "PLAY THE NEXT CHAPTER"
              : page === 2
              ? "OPEN OUR VIDEO"
              : page === 3
              ? "SEE THE LITTLE THINGS"
              : page === 4
              ? "OPEN THE EMOTIONAL CHAPTER"
              : page === 5
              ? "OPEN THE SECRET"
              : page === 6
              ? "STEP INTO THE NEXT CHAPTER"
              : "OPEN THE FINAL PAGE"}
          </span>
          <ArrowRight size={17} />
        </motion.button>
      )}

      {page === pageCount - 1 && (
        <motion.div
          className="story-final-label"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Heart size={13} fill="currentColor" />
          THE END OF THIS LITTLE STORY
          <Heart size={13} fill="currentColor" />
        </motion.div>
      )}

      {/* =================================================
          QUESTION GATE
      ================================================= */}

      <AnimatePresence>
        {questionOpen && (
          <QuestionGate
            question={questions[page]}
            onAnswer={answerQuestion}
            onClose={() => setQuestionOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.main>
  );
}


/* =========================================================
   QUESTION GATE
========================================================= */

function QuestionGate({
  question,
  onAnswer,
  onClose,
}) {
  const [selected, setSelected] = useState(null);

  const choose = (index) => {
    if (selected !== null) return;

    setSelected(index);

    window.setTimeout(() => {
      onAnswer();
    }, 850);
  };

  return (
    <motion.div
      className="question-gate"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        pointerEvents: "auto",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <motion.div
        className="question-backdrop-heart heart-a"
        animate={{
          y: [0, -15, 0],
          rotate: [-8, 8, -8],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      >
        ♡
      </motion.div>

      <motion.div
        className="question-backdrop-heart heart-b"
        animate={{
          y: [0, 18, 0],
          rotate: [8, -8, 8],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
      >
        ✦
      </motion.div>

      <motion.div
        className="question-card"
        initial={{
          opacity: 0,
          scale: 0.78,
          y: 35,
          rotate: -1.5,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          rotate: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.88,
          y: -20,
        }}
        transition={{
          type: "spring",
          stiffness: 130,
          damping: 16,
        }}
      >
        <button
          type="button"
          className="question-close"
          onClick={onClose}
          aria-label="Close question"
        >
          ×
        </button>

        <motion.div
          className="question-icon"
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
          }}
        >
          <Heart size={28} fill="currentColor" />
        </motion.div>

        <span className="question-eyebrow">
          {question.eyebrow}
        </span>

        <h3>{question.title}</h3>

        <p className="question-instruction">
          Choose one. Your answer unlocks the next chapter.
        </p>

        <div className="question-options">
          {question.options.map((option, index) => (
            <motion.button
              type="button"
              key={option}
              className={
                selected === index
                  ? "selected"
                  : ""
              }
              onClick={() => choose(index)}
              whileHover={
                selected === null
                  ? {
                      x: 6,
                      scale: 1.015,
                    }
                  : {}
              }
              whileTap={
                selected === null
                  ? { scale: 0.98 }
                  : {}
              }
            >
              <span className="option-number">
                {String.fromCharCode(65 + index)}
              </span>

              <span>{option}</span>

              <span className="option-heart">
                {selected === index
                  ? "♥"
                  : "♡"}
              </span>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selected !== null ? (
            <motion.div
              key="response"
              className="question-response"
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              <Sparkles size={14} />
              <span>{question.response}</span>
            </motion.div>
          ) : (
            <motion.div
              key="hint"
              className="question-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              ♥ one answer is enough
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}


/* =========================================================
   INTERACTIVE MEMORY PAGE
========================================================= */

function InteractiveMemoryPage() {
  return (
    <div className="interactive-memory-page">
      <FloatingHearts count={18} />

      <motion.div
        className="memory-page-copy"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.8 }}
      >
        <span>MEMORY / 001</span>
        <h2>
          The moment
          <br />
          <i>I want to keep.</i>
        </h2>
        <p>
          Some pictures don't just capture a moment.
          <br />
          They capture a feeling.
        </p>
      </motion.div>

      <div className="interactive-memory-stage">
        <motion.div
          className="memory-orbit orbit-one"
          animate={{ rotate: 360 }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="memory-orbit orbit-two"
          animate={{ rotate: -360 }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.span
          className="memory-pop-heart heart-one"
          animate={{
            y: [0, -14, 0],
            rotate: [-7, 7, -7],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
          }}
        >
          ♡
        </motion.span>

        <motion.span
          className="memory-pop-heart heart-two"
          animate={{
            y: [0, 12, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        >
          ✦
        </motion.span>

        <motion.div
          className="memory-pop-photo"
          initial={{
            opacity: 0,
            scale: 0.1,
            rotate: -12,
            filter: "blur(18px)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: -2,
            filter: "blur(0px)",
          }}
          transition={{
            delay: 0.25,
            duration: 1.15,
            type: "spring",
            stiffness: 95,
            damping: 12,
          }}
        >
          <div className="memory-pop-number">
            01
          </div>

          <img
            src="/photos/first-memory.jpg"
            alt="Our first memory"
          />

          <motion.div
            className="memory-pop-shine"
            initial={{ x: "-130%" }}
            animate={{ x: "130%" }}
            transition={{
              delay: 1.1,
              duration: 1.1,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <motion.div
          className="memory-pop-note"
          initial={{
            opacity: 0,
            x: 80,
            rotate: 7,
          }}
          animate={{
            opacity: 1,
            x: 0,
            rotate: 4,
          }}
          transition={{
            delay: 1,
            duration: 0.9,
            type: "spring",
            stiffness: 100,
            damping: 14,
          }}
        >
          <span>♥</span>
          <strong>
            I still remember
            <br />
            how this moment felt.
          </strong>
          <small>
            — a memory worth keeping
          </small>
        </motion.div>
      </div>

      <motion.div
        className="memory-pop-bottom"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.35 }}
      >
        <span>10%</span>
        <div>
          <motion.i
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              delay: 0.9,
              duration: 1.1,
              ease: "easeOut",
            }}
          />
        </div>
        <span>100%</span>
      </motion.div>
    </div>
  );
}


/* =========================================================
   IF I COULD FREEZE ONE MOMENT
========================================================= */
function FreezeMomentPage({ onContinue }) {
  const lines = [
    "I think I'd choose one of those ordinary moments...",
    "the ones where nothing special was happening.",
    "Because somehow, those became my favorite memories.",
  ];

  return (
    <section className="freeze-moment-page">
      <style>{`
        .freeze-moment-page{position:relative;min-height:100%;width:100%;display:flex;align-items:center;justify-content:center;overflow:hidden;padding:clamp(70px,8vh,100px) clamp(18px,5vw,70px);background:radial-gradient(circle at 50% 45%,rgba(255,190,210,.42),transparent 38%),linear-gradient(135deg,#fff8f5 0%,#fdebf1 48%,#f9e7ed 100%);color:#5c3b46;box-sizing:border-box}
        .freeze-moment-page:before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.3;background-image:radial-gradient(rgba(122,77,94,.16) .7px,transparent .7px);background-size:18px 18px;mask-image:linear-gradient(to bottom,transparent,black 20%,black 80%,transparent)}
        .freeze-wrap{position:relative;z-index:2;width:min(1120px,100%);display:grid;grid-template-columns:minmax(260px,.82fr) minmax(300px,1.18fr);gap:clamp(35px,7vw,100px);align-items:center}
        .freeze-copy{max-width:510px}
        .freeze-eyebrow{display:flex;align-items:center;gap:10px;font-size:10px;letter-spacing:.28em;font-weight:800;color:#a26b7e;margin-bottom:20px}
        .freeze-eyebrow i{width:34px;height:1px;background:#c98ca0;display:block}
        .freeze-title{font-family:Georgia,'Times New Roman',serif;font-size:clamp(42px,5vw,72px);line-height:.98;letter-spacing:-.045em;font-weight:500;margin:0 0 24px;color:#553642}
        .freeze-title i{font-weight:400;color:#b36d86}
        .freeze-intro{font-size:15px;line-height:1.9;color:#795967;margin:0 0 22px;max-width:440px}
        .freeze-line{font-family:Georgia,'Times New Roman',serif;font-size:clamp(17px,1.7vw,22px);line-height:1.6;color:#62424e;margin:7px 0;opacity:0}
        .freeze-line.show{animation:freezeLine .8s forwards}
        .freeze-line:nth-child(2){animation-delay:.35s}.freeze-line:nth-child(3){animation-delay:.7s}
        @keyframes freezeLine{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .freeze-note{display:inline-flex;align-items:center;gap:10px;margin-top:28px;padding:12px 18px;border-radius:999px;background:rgba(255,255,255,.62);border:1px solid rgba(180,112,137,.18);box-shadow:0 12px 35px rgba(113,65,84,.09);font-family:cursive;font-size:16px;color:#8e596d;transform:rotate(-2deg)}
        .freeze-note span{font-family:inherit;color:#c36d8b}
        .freeze-button{margin-top:30px;border:0;border-radius:999px;padding:14px 20px;background:#6f4556;color:#fff8fb;font-size:10px;font-weight:800;letter-spacing:.16em;display:inline-flex;align-items:center;gap:13px;cursor:pointer;box-shadow:0 14px 30px rgba(83,49,64,.18);transition:transform .25s,box-shadow .25s}
        .freeze-button:hover{transform:translateY(-3px);box-shadow:0 18px 36px rgba(83,49,64,.23)}
        .freeze-visual{position:relative;min-height:540px;display:flex;align-items:center;justify-content:center}
        .freeze-halo{position:absolute;width:min(430px,75vw);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,rgba(255,178,204,.52),rgba(255,215,225,.16) 48%,transparent 70%);filter:blur(8px);animation:freezePulse 5s ease-in-out infinite}
        @keyframes freezePulse{0%,100%{transform:scale(.94);opacity:.7}50%{transform:scale(1.08);opacity:1}}
        .freeze-photo{position:relative;width:min(390px,72vw);aspect-ratio:4/5;padding:11px;background:#fffdfb;box-shadow:0 28px 70px rgba(91,55,69,.2);transform:rotate(-3deg);z-index:2;animation:freezePhoto 1.35s cubic-bezier(.16,1,.3,1) both}
        .freeze-photo:before{content:"";position:absolute;inset:0;border:1px solid rgba(119,77,92,.12);pointer-events:none;z-index:3}
        .freeze-photo img{width:100%;height:100%;display:block;object-fit:cover;filter:blur(16px);animation:freezeSharp 1.5s 0.15s ease-out forwards;transform:scale(.1);animation-name:freezePhoto,freezeSharp;animation-duration:1.35s,1.5s;animation-delay:0s,.15s;animation-fill-mode:both,forwards}
        @keyframes freezePhoto{from{opacity:0;transform:scale(.1) rotate(-10deg);filter:blur(18px)}to{opacity:1;transform:scale(1) rotate(-3deg);filter:blur(0)}}
        @keyframes freezeSharp{from{filter:blur(16px)}to{filter:blur(0)}}
        .freeze-caption{position:absolute;right:-35px;bottom:38px;background:#fff8df;padding:15px 18px;width:180px;box-shadow:0 14px 30px rgba(92,64,43,.13);transform:rotate(5deg);z-index:4;font-family:cursive;color:#765846;font-size:15px;line-height:1.45}
        .freeze-caption:before{content:"♥";position:absolute;top:-9px;left:50%;transform:translateX(-50%);font-family:Arial;color:#c97a96;font-size:15px}
        .freeze-stamp{position:absolute;left:8%;top:12%;z-index:4;border:1px solid rgba(170,101,126,.35);color:#a96880;border-radius:50%;width:72px;height:72px;display:flex;align-items:center;justify-content:center;text-align:center;font-size:8px;line-height:1.3;letter-spacing:.12em;transform:rotate(-13deg);background:rgba(255,255,255,.32)}
        .freeze-corner-heart{position:absolute;color:#ca7f98;font-size:28px;z-index:1;animation:floatFreeze 4s ease-in-out infinite}
        .freeze-corner-heart.one{left:5%;top:12%}.freeze-corner-heart.two{right:3%;top:23%;animation-delay:1s}.freeze-corner-heart.three{right:10%;bottom:8%;animation-delay:2s}
        @keyframes floatFreeze{0%,100%{transform:translateY(0) rotate(-5deg);opacity:.65}50%{transform:translateY(-13px) rotate(6deg);opacity:1}}
        @media(max-width:820px){.freeze-wrap{grid-template-columns:1fr;gap:24px;text-align:center}.freeze-copy{max-width:650px;margin:auto}.freeze-eyebrow{justify-content:center}.freeze-intro{margin-left:auto;margin-right:auto}.freeze-visual{min-height:430px}.freeze-caption{right:-8px;bottom:20px;width:155px;text-align:left}.freeze-stamp{left:2%;top:5%}.freeze-button{margin-top:24px}.freeze-corner-heart{display:none}}
        @media(max-width:520px){.freeze-moment-page{padding:78px 16px 55px}.freeze-title{font-size:43px}.freeze-line{font-size:17px}.freeze-visual{min-height:370px}.freeze-photo{width:min(300px,76vw)}.freeze-caption{right:-4px;width:138px;font-size:13px;padding:12px}.freeze-note{font-size:14px}.freeze-button{font-size:9px;padding:13px 16px}}
      `}</style>

      <span className="freeze-corner-heart one">♡</span>
      <span className="freeze-corner-heart two">✦</span>
      <span className="freeze-corner-heart three">♡</span>

      <div className="freeze-wrap">
        <motion.div className="freeze-copy" initial={{opacity:0,x:-35}} animate={{opacity:1,x:0}} transition={{duration:.9}}>
          <span className="freeze-eyebrow"><i />A QUIET LITTLE CHAPTER</span>
          <h2 className="freeze-title">If I Could<br /><i>Freeze One Moment...</i></h2>
          <p className="freeze-intro">Not the biggest moment. Not the most perfect picture. Just one of those ordinary seconds I wish I could keep a little longer.</p>
          <div>
            {lines.map((line,index)=><p key={line} className="freeze-line show">{line}</p>)}
          </div>
          <div className="freeze-note"><span>♥</span> I wish I could keep this moment forever.</div>
          <button type="button" className="freeze-button" onClick={onContinue}>KEEP THIS MOMENT <ArrowRight size={14}/></button>
        </motion.div>

        <motion.div className="freeze-visual" initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} transition={{duration:1,delay:.15}}>
          <div className="freeze-halo" />
          <div className="freeze-stamp">A MOMENT<br/>WORTH<br/>KEEPING</div>
          <div className="freeze-photo"><img src="/photos/memory-02.jpg" alt="A moment worth keeping" /></div>
          <div className="freeze-caption">Some moments become memories before Abhisheyy and I even realize they're happening.</div>
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   SURPRISE PAGE
========================================================= */

function SurprisePage() {
  return (
    <div className="surprise-page-content">
      <FloatingHearts count={22} />

      <motion.div
        className="surprise-page-heading"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="surprise-page-heart"
          animate={{
            scale: [1, 1.12, 1],
            rotate: [-4, 4, -4],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
          }}
        >
          <Heart size={38} fill="currentColor" />
        </motion.div>

        <span>ONE LAST LITTLE SURPRISE</span>

        <h2>
          Some memories
          <br />
          deserve their own little secret.
        </h2>

        <p>
          I kept these two here...
          <br />
          just because they're special to me.
        </p>
      </motion.div>

      <div className="surprise-page-photos">
        <motion.article
          className="surprise-page-photo photo-left"
          initial={{
            opacity: 0,
            scale: 0.15,
            rotate: -22,
            x: -130,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: -5,
            x: 0,
          }}
          transition={{
            delay: 0.55,
            duration: 0.95,
            type: "spring",
            stiffness: 105,
            damping: 13,
          }}
          whileHover={{
            scale: 1.07,
            rotate: -1,
            y: -10,
          }}
        >
          <div className="surprise-page-photo-image">
            <img
              src="/photos/surprise-01.jpeg"
              alt="A special memory"
            />
          </div>

          <div className="surprise-page-note">
            <span>♡</span>
            one of my favorites
          </div>
        </motion.article>

        <motion.article
          className="surprise-page-photo photo-right"
          initial={{
            opacity: 0,
            scale: 0.15,
            rotate: 22,
            x: 130,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 5,
            x: 0,
          }}
          transition={{
            delay: 0.85,
            duration: 0.95,
            type: "spring",
            stiffness: 105,
            damping: 13,
          }}
          whileHover={{
            scale: 1.07,
            rotate: 1,
            y: -10,
          }}
        >
          <div className="surprise-page-photo-image">
            <img
              src="/photos/surprise-02.jpeg"
              alt="Another special memory"
            />
          </div>

          <div className="surprise-page-note">
            <span>♡</span>
            this one too
          </div>
        </motion.article>
      </div>

      <motion.div
        className="surprise-page-final"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.7 }}
      >
        <span>And yes...</span>
        <strong>
          I'd choose these moments again.
        </strong>
        <Heart size={15} fill="currentColor" />
      </motion.div>
    </div>
  );
}


/* =========================================================
   CINEMATIC MEMORY REVEAL
========================================================= */

function MemoryReveal() {

  const sectionRef = useRef(null);

  const {
    scrollYProgress,
  } = useScroll({
    target: sectionRef,
    offset: [
      "start 85%",
      "end 30%",
    ],
  });


  /* Photo scale */

  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    [1.18, 1.06, 1]
  );


  /* Blur */

  const imageBlur = useTransform(
    scrollYProgress,
    [0, 0.25, 0.55],
    [18, 8, 0]
  );


  /* Opacity */

  const imageOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.65],
    [0.45, 0.8, 1]
  );


  /* Vertical movement */

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [70, 0]
  );


  /* Halo */

  const glowScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.4, 1.1, 1.35]
  );


  /* Note */

  const noteY = useTransform(
    scrollYProgress,
    [0.45, 0.75],
    [35, 0]
  );

  const noteOpacity = useTransform(
    scrollYProgress,
    [0.45, 0.7],
    [0, 1]
  );


  return (
    <section
      ref={sectionRef}
      className="cinematic-memory"
    >

      <div className="memory-background-glow" />


      {/* Heading */}

      <div className="cinematic-heading">

        <span>
          MEMORY / 001
        </span>

        <h2>
          The moment
          <br />
          <i>I want to keep.</i>
        </h2>

        <p>
          Some pictures don't just capture a moment.
          <br />
          They capture a feeling.
        </p>

      </div>


      {/* Photo area */}

      <div className="memory-stage">


        {/* Floating heart 1 */}

        <motion.span
          className="memory-float-heart heart-one"
          animate={{
            y: [0, -16, 0],
            rotate: [-8, 8, -8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ♡
        </motion.span>


        {/* Floating heart 2 */}

        <motion.span
          className="memory-float-heart heart-two"
          animate={{
            y: [0, 18, 0],
            rotate: [8, -8, 8],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ✦
        </motion.span>


        {/* Floating heart 3 */}

        <motion.span
          className="memory-float-heart heart-three"
          animate={{
            y: [0, -12, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ♡
        </motion.span>


        {/* Halo */}

        <motion.div
          className="memory-halo"
          style={{
            scale: glowScale,
          }}
        />


        {/* =================================================
            PHOTO
        ================================================= */}

        <motion.div
          className="cinematic-photo-frame"
          style={{
            y: imageY,
            scale: imageScale,
          }}
        >

          <div className="photo-number">
            01
          </div>


          <motion.img
            src={photos[0].src}
            alt={photos[0].title}
            style={{
              filter: imageBlur,
              opacity: imageOpacity,
            }}
          />


          <div className="photo-overlay" />


          <div className="photo-corner top-left" />
          <div className="photo-corner top-right" />
          <div className="photo-corner bottom-left" />
          <div className="photo-corner bottom-right" />


          <motion.div
            className="photo-light"
            style={{
              opacity: imageOpacity,
            }}
          />

        </motion.div>


        {/* =================================================
            HANDWRITTEN NOTE
        ================================================= */}

        <motion.div
          className="memory-note"
          style={{
            y: noteY,
            opacity: noteOpacity,
          }}
        >

          <span className="note-pin">
            ♥
          </span>


          <p>
            "I still remember how
            <br />
            this moment felt."
          </p>


          <small>
            — a memory worth keeping
          </small>

        </motion.div>

      </div>


      {/* =================================================
          REVEAL BAR
      ================================================= */}

      <motion.div
        className="memory-reveal-label"
        style={{
          opacity: imageOpacity,
        }}
      >

        <span>
          THE MEMORY REVEALS ITSELF
        </span>


        <div className="reveal-line">

          <motion.i
            style={{
              scaleX: scrollYProgress,
            }}
          />

        </div>


        <span>
          100%
        </span>

      </motion.div>


      {/* Bottom caption */}

      <motion.div
        className="memory-bottom-note"
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          delay: 0.5,
          duration: 1,
        }}
      >

        <Heart
          size={14}
          fill="currentColor"
        />

        <span>
          and somehow, this became one of my
          favorite memories.
        </span>

        <Heart
          size={14}
          fill="currentColor"
        />

      </motion.div>

    </section>
  );
}


/* =========================================================
   FILM REEL
========================================================= */

function VideoStoryPage() {
  const [ready, setReady] = useState(true);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="video-story-page">
      <div className="video-story-noise" aria-hidden="true" />
      <div className="video-story-orb video-orb-one" aria-hidden="true" />
      <div className="video-story-orb video-orb-two" aria-hidden="true" />

      <div className="video-story-copy">
        <span className="video-story-kicker">
          CHAPTER 04 · A LITTLE MOVING MEMORY
        </span>

        <h2>
          Some memories
          <br />
          <i>should move.</i>
        </h2>

        <p>
          Pictures keep a moment still.
          <br />
          This one lets it breathe again.
        </p>

        <div className="video-story-line">
          <span />
          <small>PRESS PLAY · WATCH US EXIST FOR A FEW SECONDS</small>
          <span />
        </div>
      </div>

      <div className="video-story-stage">
        <div className="video-story-film-frame">
          <div className="video-story-film-edge top" aria-hidden="true">
            {Array.from({ length: 16 }).map((_, i) => <i key={i} />)}
          </div>

          <div className="video-story-video-wrap">
            <div className="video-story-badge">OUR LITTLE FILM · 01</div>
            <video
              ref={videoRef}
              className="video-story-video"
              src="/videos/our-story.mp4"
              poster="/photos/memory-08.jpeg"
              controls
              playsInline
              preload="metadata"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onError={() => setReady(false)}
            />

            {!ready && (
              <div className="video-story-missing">
                <div className="video-story-missing-icon">♥</div>
                <strong>Add your video here</strong>
                <span>Place your file at <code>public/videos/our-story.mp4</code></span>
              </div>
            )}
          </div>

          <div className="video-story-film-edge bottom" aria-hidden="true">
            {Array.from({ length: 16 }).map((_, i) => <i key={i} />)}
          </div>
        </div>

        <button
          type="button"
          className={`video-story-play ${playing ? "is-playing" : ""}`}
          onClick={togglePlayback}
        >
          {playing ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
          <span>{playing ? "PAUSE OUR LITTLE FILM" : "PLAY OUR LITTLE FILM"}</span>
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="video-story-footer">
        <span>one little video</span>
        <b>♥</b>
        <span>one very big memory</span>
      </div>
    </section>
  );
}


function FilmReel() {

  const [active, setActive] =
    useState(0);

  const [playing, setPlaying] =
    useState(false);

  const [dragStart, setDragStart] =
    useState(null);

  const [dragX, setDragX] =
    useState(0);

  const filmItems = photos;


  /* Next */

  const next = () => {
    setActive((current) =>
      Math.min(
        current + 1,
        filmItems.length - 1
      )
    );
  };


  /* Previous */

  const prev = () => {
    setActive((current) =>
      Math.max(
        current - 1,
        0
      )
    );
  };


  /* Autoplay */

  useEffect(() => {

    if (!playing) {
      return undefined;
    }

    const timer =
      setInterval(() => {

        setActive((current) => {

          if (
            current >=
            filmItems.length - 1
          ) {
            setPlaying(false);
            return current;
          }

          return current + 1;
        });

      }, 3600);


    return () => {
      clearInterval(timer);
    };

  }, [playing]);


  /* Pointer down */

  const onPointerDown = (e) => {

    e.currentTarget.setPointerCapture?.(
      e.pointerId
    );

    setDragStart(e.clientX);
    setDragX(0);
  };


  /* Pointer move */

  const onPointerMove = (e) => {

    if (dragStart === null) {
      return;
    }

    setDragX(
      e.clientX - dragStart
    );
  };


  /* Pointer up */

  const onPointerUp = () => {

    if (dragStart === null) {
      return;
    }

    if (dragX < -60) {
      next();
    }

    if (dragX > 60) {
      prev();
    }

    setDragStart(null);
    setDragX(0);
  };


  return (
    <section className="film-reel-section">

      <FloatingHearts count={16} />


      {/* Heading */}

      <div className="film-intro">

        <span>
          CHAPTER 03 · OUR LITTLE FILM
        </span>

        <h2>
          Some moments
          <br />
          <i>deserve to be replayed.</i>
        </h2>

        <p>
          Drag the film. Every frame holds a
          little piece of us.
        </p>

      </div>


      {/* Projector stage */}

      <div className="projector-stage">


        {/* Left reel */}

        <div
          className="film-reel reel-left"
          aria-hidden="true"
        >

          <div className="reel-core">

            <Heart
              size={25}
              fill="currentColor"
            />

          </div>


          {Array.from({
            length: 8,
          }).map((_, i) => (

            <i
              key={i}
              style={{
                transform:
                  `rotate(${i * 45}deg)`,
              }}
            />

          ))}

        </div>


        {/* Film window */}

        <div className="film-window">

          <div
            className="film-strip"
            onPointerDown={
              onPointerDown
            }
            onPointerMove={
              onPointerMove
            }
            onPointerUp={
              onPointerUp
            }
            onPointerCancel={
              onPointerUp
            }
            style={{
              cursor:
                dragStart === null
                  ? "grab"
                  : "grabbing",
            }}
          >


            {/* Top sprockets */}

            <div className="sprocket-row top">

              {Array.from({
                length: 34,
              }).map((_, i) => (

                <i key={i} />

              ))}

            </div>


            {/* Film track */}

            <div
              className="film-track"
              style={{
                transform:
                  `translate3d(calc(var(--film-center-offset) - ${
                    active
                  } * var(--film-step) + ${
                    dragX
                  }px), -50%, 0)`,
              }}
            >

              {filmItems.map(
                (photo, i) => (

                  <motion.button
                    type="button"
                    className={`film-frame ${
                      i === active
                        ? "active"
                        : ""
                    }`}
                    key={photo.src}
                    onClick={() =>
                      setActive(i)
                    }
                    animate={{
                      scale:
                        i === active
                          ? 1
                          : 0.82,

                      opacity:
                        i === active
                          ? 1
                          : 0.52,

                      rotate:
                        i === active
                          ? 0
                          : i % 2
                          ? 1.5
                          : -1.5,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 160,
                      damping: 20,
                    }}
                  >

                    <span className="frame-number">
                      {String(i + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>


                    {photo.type === "video" ? (
                      <>
                        <span className="video-badge">VIDEO</span>
                        <video
                          src={photo.src}
                          poster={photo.poster}
                          muted
                          loop
                          playsInline
                          controls
                          preload="metadata"
                          onPointerDown={(event) => event.stopPropagation()}
                          onPointerMove={(event) => event.stopPropagation()}
                        />
                      </>
                    ) : (
                      <img
                        src={photo.src}
                        alt={photo.title}
                        draggable="false"
                      />
                    )}


                    <span className="frame-caption">
                      {photo.title}
                    </span>

                  </motion.button>

                )
              )}

            </div>


            {/* Bottom sprockets */}

            <div className="sprocket-row bottom">

              {Array.from({
                length: 34,
              }).map((_, i) => (

                <i key={i} />

              ))}

            </div>

          </div>

        </div>


        {/* Right reel */}

        <div
          className="film-reel reel-right"
          aria-hidden="true"
        >

          <div className="reel-core">

            <Heart
              size={25}
              fill="currentColor"
            />

          </div>


          {Array.from({
            length: 8,
          }).map((_, i) => (

            <i
              key={i}
              style={{
                transform:
                  `rotate(${i * 45}deg)`,
              }}
            />

          ))}

        </div>

      </div>


      {/* =================================================
          CONTROLS
      ================================================= */}

      <div className="film-controls">

        <button
          type="button"
          onClick={prev}
          disabled={active === 0}
        >
          <ArrowLeft size={15} />
        </button>


        <button
          type="button"
          className="play-button"
          onClick={() =>
            setPlaying(
              (current) => !current
            )
          }
        >

          {playing ? (
            <Pause size={15} />
          ) : (
            <Play size={15} />
          )}

          {playing
            ? "PAUSE FILM"
            : "PLAY FILM"}

        </button>


        <button
          type="button"
          onClick={next}
          disabled={
            active ===
            filmItems.length - 1
          }
        >
          <ArrowRight size={15} />
        </button>

      </div>


      {/* =================================================
          FILM META
      ================================================= */}

      <div className="film-meta">

        <div>

          <span>
            FRAME
          </span>

          <strong>

            {String(
              active + 1
            ).padStart(2, "0")}

            {" / "}

            {String(
              filmItems.length
            ).padStart(2, "0")}

          </strong>

        </div>


        <div className="film-progress">

          <span
            style={{
              width:
                `${
                  ((active + 1) /
                    filmItems.length) *
                  100
                }%`,
            }}
          />

        </div>


        <div className="film-note">

          <span>
            {filmItems[active].title}
          </span>

          <p>
            {filmItems[active].note}
          </p>

        </div>

      </div>


      {/* Bottom message */}

      <motion.div
        className="film-pause-note"
        key={active}
        initial={{
          opacity: 0,
          y: 12,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >

        <Sparkles size={13} />

        {active ===
        filmItems.length - 1
          ? "THE LAST FRAME... FOR NOW."
          : "KEEP THIS FRAME A LITTLE LONGER."}

      </motion.div>

      <div className="film-touch-hint">
        <span>← SWIPE / DRAG →</span>
        <b>•</b>
        <span>OR TAP A FRAME</span>
      </div>

    </section>
  );
}


/* =========================================================
   LITTLE THINGS / SCRAPBOOK
========================================================= */
function LoveNotes({
  secret,
  setSecret,
}) {
  const memoryPhotos = [
    {
      src: "/photos/memory-02.jpg",
      title: "That little moment",
      note: "I wish I could press pause here.",
      secret: "I didn't know then how much this tiny moment would mean to me later.",
      rotate: -5,
    },
    {
      src: "/photos/memory-03.jpg",
      title: "Just us",
      note: "No perfect picture. Just my favorite people.",
      secret: "This is the kind of picture that makes me smile without even trying.",
      rotate: 4,
    },
    {
      src: "/photos/memory-04.jpeg",
      title: "One of those days",
      note: "A normal day that somehow became special.",
      secret: "Nothing extraordinary happened here. Somehow, Abhisheyy, I still remember it.",
      rotate: -3,
    },
    {
      src: "/photos/memory-05.jpeg",
      title: "The tiny things",
      note: "These are the moments I remember the most.",
      secret: "The little moments are the ones I never want to lose.",
      rotate: 5,
    },
    {
      src: "/photos/memory-06.jpeg",
      title: "A little happiness",
      note: "Abhisheyy makes ordinary moments feel different.",
      secret: "Abhisheyy probably doesn't realize how much happiness he brings into ordinary days.",
      rotate: -4,
    },
    {
      src: "/photos/memory-07.jpeg",
      title: "Another chapter",
      note: "And somehow, the story keeps getting better.",
      secret: "If memories had a favorite chapter, I think this would be one of mine.",
      rotate: 3,
    },
    {
      src: "/photos/memory-08.jpeg",
      title: "Still one of my favorites",
      note: "Some memories simply stay.",
      secret: "I could look at this picture a hundred times and still find something to love.",
      rotate: -5,
    },
    {
      src: "/photos/memory-09.jpeg",
      title: "Keep this one",
      note: "Because I definitely am.",
      secret: "Maybe the best part of all these memories is that there are still more to make with Abhisheyy.",
      rotate: 4,
    },
  ];

  const [openNote, setOpenNote] = useState(null);

  return (
    <section className="memory-scrapbook enhanced-scrapbook">

      <FloatingHearts count={18} />

      <style>{`
        .enhanced-scrapbook{
          position:relative;
          min-height:100%;
          overflow:hidden;
          background:
            radial-gradient(circle at 50% 38%,rgba(255,184,211,.28),transparent 36%),
            linear-gradient(135deg,#fff9f7 0%,#fdeef3 52%,#fff7f3 100%);
        }

        .enhanced-scrapbook .scrapbook-stage{
          perspective:1200px;
        }

        .enhanced-scrapbook .scrapbook-photo{
          cursor:pointer;
          transform-style:preserve-3d;
          will-change:transform;
          transition:box-shadow .35s ease;
        }

        .enhanced-scrapbook .scrapbook-photo:hover{
          box-shadow:0 28px 55px rgba(109,65,83,.22);
        }

        .enhanced-scrapbook .scrapbook-photo-inner{
          position:relative;
          overflow:hidden;
        }

        .enhanced-scrapbook .scrapbook-photo-inner:after{
          content:"";
          position:absolute;
          inset:-30%;
          background:linear-gradient(115deg,transparent 35%,rgba(255,255,255,.6) 50%,transparent 65%);
          transform:translateX(-120%) rotate(8deg);
          animation:memorySweep 5s ease-in-out infinite;
          pointer-events:none;
        }

        @keyframes memorySweep{
          0%,55%{transform:translateX(-120%) rotate(8deg)}
          75%,100%{transform:translateX(120%) rotate(8deg)}
        }

        .enhanced-scrapbook .scrapbook-photo img{
          transition:transform .7s cubic-bezier(.16,1,.3,1),filter .5s ease;
        }

        .enhanced-scrapbook .scrapbook-photo:hover img{
          transform:scale(1.06);
        }

        .scrapbook-note-trigger{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:10px;
          margin-top:10px;
          padding:8px 10px 7px;
          border-top:1px dashed rgba(116,76,92,.22);
          color:#a3667d;
          font-size:9px;
          font-weight:800;
          letter-spacing:.12em;
          text-transform:uppercase;
        }

        .scrapbook-note-trigger .note-arrow{
          display:inline-flex;
          align-items:center;
          justify-content:center;
          width:27px;
          height:27px;
          flex:0 0 27px;
          border-radius:50%;
          background:#f4c4d4;
          color:#fff;
          box-shadow:0 7px 14px rgba(174,91,123,.18);
          transition:transform .3s ease,background .3s ease;
        }

        .scrapbook-photo:hover .note-arrow{
          transform:translateX(4px) scale(1.08);
          background:#b96f89;
        }

        .scrapbook-secret-note{
          position:absolute;
          left:50%;
          bottom:-16px;
          width:min(225px,90%);
          padding:15px 17px 16px;
          border-radius:4px;
          background:#fff6d9;
          color:#705344;
          box-shadow:0 20px 38px rgba(87,59,42,.18);
          transform:translate(-50%,105%) rotate(-2deg);
          z-index:60;
          border:1px solid rgba(150,111,74,.08);
        }

        .scrapbook-secret-note:before{
          content:"";
          position:absolute;
          top:-8px;
          left:50%;
          width:45px;
          height:14px;
          transform:translateX(-50%) rotate(-3deg);
          background:rgba(245,202,213,.8);
        }

        .scrapbook-secret-note strong{
          display:block;
          margin-bottom:6px;
          font-family:Georgia,"Times New Roman",serif;
          font-size:14px;
          color:#85576a;
        }

        .scrapbook-secret-note p{
          margin:0;
          font-family:cursive;
          font-size:14px;
          line-height:1.5;
        }

        .scrapbook-secret-note .secret-close{
          position:absolute;
          top:6px;
          right:7px;
          width:21px;
          height:21px;
          border:0;
          background:transparent;
          color:#9e7180;
          cursor:pointer;
          font-size:16px;
        }

        .scrapbook-secret-spark{
          position:absolute;
          left:50%;
          top:-22px;
          pointer-events:none;
          color:#d97e9c;
        }

        @media(max-width:760px){
          .scrapbook-secret-note{
            position:fixed;
            left:50%;
            bottom:84px;
            width:min(310px,82vw);
            transform:translate(-50%,0) rotate(-1deg);
            z-index:1000;
          }
        }
      `}</style>

      <motion.div
        className="scrapbook-heading"
        initial={{ opacity:0, y:40 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true, amount:.3 }}
        transition={{ duration:1 }}
      >
        <span>THE LITTLE THINGS</span>

        <h2>
          A few moments
          <br />
          <i>I would keep forever.</i>
        </h2>

        <p>
          One picture at a time.
          <br />
          One little memory at a time.
        </p>
      </motion.div>

      <div className="scrapbook-stage">
        <motion.div
          className="scrapbook-glow"
          animate={{ scale:[1,1.12,1], opacity:[.45,.7,.45] }}
          transition={{ duration:5, repeat:Infinity, ease:"easeInOut" }}
        />

        <motion.div
          className="scrapbook-center"
          initial={{ scale:0, opacity:0 }}
          whileInView={{ scale:1, opacity:1 }}
          viewport={{ once:true }}
          transition={{ delay:.3, type:"spring", stiffness:120, damping:12 }}
        >
          <Heart size={30} fill="currentColor" />
          <span>Abhisheyy<br /><small>♡</small></span>
        </motion.div>

        {memoryPhotos.map((memory,index) => {
          const isOpen = openNote === index;

          return (
            <motion.article
              key={memory.src}
              className={`scrapbook-photo scrapbook-photo-${index+1} ${isOpen ? "note-open" : ""}`}
              initial={{
                opacity:0,
                scale:.15,
                y:100,
                rotate:memory.rotate*3,
                filter:"blur(12px)",
              }}
              whileInView={{
                opacity:1,
                scale:1,
                y:0,
                rotate:memory.rotate,
                filter:"blur(0px)",
              }}
              viewport={{ once:true, amount:.25 }}
              transition={{
                delay:.35+index*.18,
                duration:.95,
                type:"spring",
                stiffness:95,
                damping:13,
              }}
              whileHover={{
                scale:1.07,
                rotate:0,
                y:-12,
                zIndex:30,
                transition:{ duration:.3 },
              }}
              onClick={() => setOpenNote(isOpen ? null : index)}
            >
              <motion.div
                className="scrapbook-pin"
                animate={{ y:[0,-3,0] }}
                transition={{
                  duration:2.5+index*.2,
                  repeat:Infinity,
                  ease:"easeInOut",
                }}
              >
                ♥
              </motion.div>

              <div className="scrapbook-photo-inner">
                <div className="scrapbook-photo-number">
                  {String(index+2).padStart(2,"0")}
                </div>

                <img src={memory.src} alt={memory.title} loading="lazy" />
              </div>

              <div className="scrapbook-note">
                <strong>{memory.title}</strong>
                <p>{memory.note}</p>

                <div className="scrapbook-note-trigger">
                  <span>{isOpen ? "SECRET FOUND" : "TAP FOR A LITTLE SECRET"}</span>
                  <span className="note-arrow">
                    {isOpen ? "×" : "→"}
                  </span>
                </div>
              </div>

              <span className="scrapbook-sparkle">
                {index%2===0 ? "✦" : "♡"}
              </span>

              <AnimatePresence>
                {isOpen && (
                  <>
                    <motion.div
                      className="scrapbook-secret-spark"
                      initial={{ opacity:0, scale:.2, y:12 }}
                      animate={{ opacity:1, scale:1, y:-5 }}
                      transition={{ type:"spring", stiffness:180 }}
                    >
                      ✦ ♥ ✦
                    </motion.div>

                    <motion.div
                      className="scrapbook-secret-note"
                      initial={{ opacity:0, y:22, scale:.72, rotate:-6 }}
                      animate={{ opacity:1, y:0, scale:1, rotate:-2 }}
                      exit={{ opacity:0, y:18, scale:.8, rotate:4 }}
                      transition={{ type:"spring", stiffness:150, damping:14 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        className="secret-close"
                        onClick={() => setOpenNote(null)}
                        aria-label="Close secret note"
                      >
                        ×
                      </button>

                      <strong>Abhisheyy, a little secret...</strong>
                      <p>{memory.secret}</p>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>

      <motion.div
        className="scrapbook-bottom"
        initial={{ opacity:0, y:25 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }}
        transition={{ delay:1.2, duration:.8 }}
      >
        <div className="scrapbook-line" />
        <span>every picture has a story</span>
        <Heart size={14} fill="currentColor" />
        <span>and every story has Abhisheyy</span>
        <div className="scrapbook-line" />
      </motion.div>

      <motion.button
        className="secret-memory-button"
        onClick={() => setSecret(true)}
        whileHover={{ scale:1.04, y:-4 }}
        whileTap={{ scale:.97 }}
      >
        <Sparkles size={15} />
        <span>THERE'S ONE MORE THING</span>
        <Heart size={15} fill="currentColor" />
      </motion.button>

      <AnimatePresence>
        {secret && (
          <motion.div
            className="modal"
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{ opacity:0 }}
          >
            <motion.div
              className="modal-card surprise-card"
              initial={{ scale:.7, opacity:0, y:50 }}
              animate={{ scale:1, opacity:1, y:0 }}
              exit={{ scale:.7, opacity:0, y:50 }}
              transition={{ type:"spring", stiffness:110, damping:14 }}
            >
              <button className="close" onClick={() => setSecret(false)}>×</button>

              <motion.div
                className="surprise-heart"
                initial={{ scale:0, rotate:-20 }}
                animate={{ scale:1, rotate:0 }}
                transition={{ delay:.25, type:"spring", stiffness:180, damping:10 }}
              >
                <Heart size={42} fill="currentColor" />
              </motion.div>

              <motion.span
                className="surprise-eyebrow"
                initial={{ opacity:0, y:15 }}
                animate={{ opacity:1, y:0 }}
                transition={{ delay:.45 }}
              >
                ONE LAST LITTLE SURPRISE
              </motion.span>

              <motion.h3
                initial={{ opacity:0, y:20 }}
                animate={{ opacity:1, y:0 }}
                transition={{ delay:.55 }}
              >
                Some memories
                <br />
                deserve their own little secret.
              </motion.h3>

              <motion.p
                className="surprise-message"
                initial={{ opacity:0 }}
                animate={{ opacity:1 }}
                transition={{ delay:.7 }}
              >
                I kept these two here...
                <br />
                just because they're special to me.
              </motion.p>

              <div className="surprise-photos">
                <motion.div
                  className="surprise-photo surprise-photo-one"
                  initial={{ opacity:0, scale:.2, rotate:-18, x:-80 }}
                  animate={{ opacity:1, scale:1, rotate:-5, x:0 }}
                  transition={{ delay:.85, duration:.8, type:"spring", stiffness:120, damping:12 }}
                  whileHover={{ scale:1.08, rotate:-1, y:-8 }}
                >
                  <div className="surprise-photo-frame">
                    <img src="/photos/surprise-01.jpeg" alt="A special memory" />
                  </div>
                  <div className="surprise-photo-note">
                    <span>♡</span>
                    <p>one of my favorites</p>
                  </div>
                </motion.div>

                <motion.div
                  className="surprise-photo surprise-photo-two"
                  initial={{ opacity:0, scale:.2, rotate:18, x:80 }}
                  animate={{ opacity:1, scale:1, rotate:5, x:0 }}
                  transition={{ delay:1.1, duration:.8, type:"spring", stiffness:120, damping:12 }}
                  whileHover={{ scale:1.08, rotate:1, y:-8 }}
                >
                  <div className="surprise-photo-frame">
                    <img src="/photos/surprise-02.jpeg" alt="Another special memory" />
                  </div>
                  <div className="surprise-photo-note">
                    <span>♡</span>
                    <p>this one too</p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="surprise-final-line"
                initial={{ opacity:0, y:15 }}
                animate={{ opacity:1, y:0 }}
                transition={{ delay:1.45 }}
              >
                <span>And yes...</span>
                <strong>I'd choose these moments again.</strong>
                <Heart size={15} fill="currentColor" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* =========================================================
   INTERACTIVE AG HEARTS
========================================================= */

function FloatingAGHearts() {
  const hearts = [
    { id: 1, x: 7, y: 18, delay: 0, size: 44, rotate: -12, text: "AG" },
    { id: 2, x: 17, y: 67, delay: 0.7, size: 38, rotate: 8, text: "♡" },
    { id: 3, x: 28, y: 34, delay: 1.2, size: 34, rotate: -5, text: "AG" },
    { id: 4, x: 41, y: 16, delay: 1.8, size: 40, rotate: 9, text: "✦" },
    { id: 5, x: 56, y: 70, delay: 0.4, size: 42, rotate: -8, text: "AG" },
    { id: 6, x: 69, y: 28, delay: 1.4, size: 36, rotate: 7, text: "♡" },
    { id: 7, x: 82, y: 58, delay: 2, size: 44, rotate: -10, text: "AG" },
    { id: 8, x: 92, y: 20, delay: 0.9, size: 35, rotate: 12, text: "✦" },
    { id: 9, x: 5, y: 84, delay: 1.7, size: 34, rotate: 6, text: "♡" },
    { id: 10, x: 37, y: 84, delay: 2.4, size: 40, rotate: -7, text: "AG" },
    { id: 11, x: 73, y: 87, delay: 1.1, size: 37, rotate: 10, text: "♡" },
    { id: 12, x: 96, y: 74, delay: 2.1, size: 41, rotate: -6, text: "AG" },
  ];

  const [kissed, setKissed] = useState(null);

  const handleHeart = (id) => {
    setKissed(id);

    window.setTimeout(() => {
      setKissed((current) =>
        current === id ? null : current
      );
    }, 1050);
  };

  return (
    <div
      className="ag-heart-field"
      aria-label="Interactive floating hearts"
    >
      {hearts.map((heart) => (
        <motion.button
          key={heart.id}
          type="button"
          className="ag-heart"
          style={{
            "--heart-x": `${heart.x}%`,
            "--heart-y": `${heart.y}%`,
            "--heart-size": `${heart.size}px`,
            "--heart-rotate": `${heart.rotate}deg`,
          }}
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{
            opacity: 1,
            scale: [0, 1.05, 0.96, 1],
            y: [20, -8, 0],
          }}
          transition={{
            delay: heart.delay,
            duration: 1.15,
            type: "spring",
            stiffness: 130,
            damping: 12,
          }}
          whileHover={{ scale: 1.15, y: -5 }}
          whileTap={{ scale: 0.78 }}
          onClick={() => handleHeart(heart.id)}
          aria-label="Tap this heart"
        >
          <span className="ag-heart-shape">♥</span>
          <span className="ag-heart-text">{heart.text}</span>

          <AnimatePresence>
            {kissed === heart.id && (
              <motion.span
                className="kiss-pop"
                initial={{
                  opacity: 0,
                  scale: 0.3,
                  y: 8,
                  rotate: -12,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: -34,
                  rotate: 8,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.7,
                  y: -62,
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                💋
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      ))}
    </div>
  );
}
/* =========================================================
   NEXT CHAPTER - DARK CONSTELLATION PAGE
========================================================= */

function NextChapterPage() {
  const [lit, setLit] = useState(false);

  return (
    <section className="next-chapter-page">
      <div className="next-chapter-stars" aria-hidden="true">
        {Array.from({ length: 22 }).map((_, index) => (
          <span key={index} style={{ ["--i"]: index }}>✦</span>
        ))}
      </div>

      <motion.div
        className="next-chapter-copy"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <span className="next-chapter-kicker">A PAGE THAT DOESN'T END HERE</span>
        <h2>There are still<br /><i>so many tomorrows.</i></h2>
        <p>
          This story isn't really about the pictures we've already taken.
          It's about all the ordinary little days we haven't lived yet.
        </p>

        <motion.button
          type="button"
          className={`next-chapter-promise ${lit ? "is-lit" : ""}`}
          onClick={() => setLit((value) => !value)}
          whileHover={{ scale: 1.03, y: -3 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="next-chapter-orbit">♥</span>
          <span>{lit ? "I'LL KEEP CHOOSING YOU ♥" : "TAP TO MAKE A LITTLE PROMISE"}</span>
          <span>✦</span>
        </motion.button>

        <AnimatePresence mode="wait">
          {lit ? (
            <motion.div
              key="promise"
              className="next-chapter-reveal"
              initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8 }}
            >
              <strong>For every version of us still waiting to happen.</strong>
              <span>Abhisheyy × Pattu · chapter after chapter</span>
            </motion.div>
          ) : (
            <motion.div key="hint" className="next-chapter-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              One final little secret before the birthday page.
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="next-chapter-memory-grid">
        {[
          ["/photos/memory-06.jpeg", "the days still ahead", -6],
          ["/photos/memory-08.jpeg", "one more chapter", 4],
          ["/photos/memory-09.jpeg", "still us", -3],
        ].map(([src, label, rotate], index) => (
          <motion.div
            key={src}
            className={`next-chapter-photo next-photo-${index + 1}`}
            initial={{ opacity: 0, y: 35, scale: .84, rotate: rotate * 2 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate }}
            transition={{ delay: .25 + index * .16, type: "spring", stiffness: 95, damping: 14 }}
            whileHover={{ y: -10, rotate: 0, scale: 1.05, zIndex: 10 }}
          >
            <img src={src} alt={label} />
            <span>{label}</span>
          </motion.div>
        ))}
      </div>

      <div className="next-chapter-bottom">
        <span>NO ENDING YET</span><i /><Heart size={13} fill="currentColor" /><i /><span>JUST ANOTHER BEGINNING</span>
      </div>
    </section>
  );
}


/* =========================================================
   FINAL BIRTHDAY - ENHANCED
========================================================= */

function Final({
  birthday,
  setBirthday,
}) {
  const [revealed, setRevealed] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [midnightOpen, setMidnightOpen] = useState(false);

  const finalPhotos = [
    { src:"/photos/memory-02.jpg", label:"the moment", rotate:-6, position:"p1" },
    { src:"/photos/memory-03.jpg", label:"just us", rotate:5, position:"p2" },
    { src:"/photos/memory-05.jpeg", label:"a little happiness", rotate:-4, position:"p3" },
    { src:"/photos/memory-08.jpeg", label:"still my favorite", rotate:6, position:"p4" },
  ];

  return (
    <section className="final-special">
      <style>{`
        .final-special{
          position:relative;
          min-height:100%;
          width:100%;
          overflow:hidden;
          display:flex;
          align-items:center;
          justify-content:center;
          padding:72px 28px 58px;
          box-sizing:border-box;
          background:
            radial-gradient(circle at 50% 48%,rgba(255,177,205,.34),transparent 34%),
            radial-gradient(circle at 15% 20%,rgba(255,221,231,.62),transparent 28%),
            linear-gradient(135deg,#fffaf7,#fcecf2 52%,#fff8f5);
          color:#5a3947;
        }

        .final-special:before{
          content:"";
          position:absolute;
          inset:0;
          opacity:.25;
          background-image:radial-gradient(rgba(122,77,94,.18) .7px,transparent .7px);
          background-size:19px 19px;
          pointer-events:none;
        }

        .final-special-glow{
          position:absolute;
          width:520px;
          height:520px;
          border-radius:50%;
          background:radial-gradient(circle,rgba(255,157,192,.28),transparent 68%);
          filter:blur(10px);
          animation:finalGlow 6s ease-in-out infinite;
          pointer-events:none;
        }

        @keyframes finalGlow{
          0%,100%{transform:scale(.9);opacity:.65}
          50%{transform:scale(1.12);opacity:1}
        }

        .final-special-content{
          position:relative;
          z-index:4;
          width:min(1120px,100%);
          display:grid;
          grid-template-columns:.85fr 1.15fr;
          gap:50px;
          align-items:center;
        }

        .final-special-copy{
          max-width:480px;
        }

        .final-special-kicker{
          display:flex;
          align-items:center;
          gap:10px;
          color:#ad6b83;
          font-size:10px;
          font-weight:900;
          letter-spacing:.27em;
          margin-bottom:20px;
        }

        .final-special-kicker i{
          width:34px;
          height:1px;
          background:#cc8ca2;
        }

        .final-special-title{
          margin:0;
          font-family:Georgia,"Times New Roman",serif;
          font-size:clamp(45px,5.5vw,76px);
          line-height:.95;
          letter-spacing:-.055em;
          font-weight:500;
          color:#563744;
        }

        .final-special-title i{
          color:#b96d88;
          font-weight:400;
        }

        .final-special-copy p{
          margin:25px 0 0;
          font-size:15px;
          line-height:1.9;
          color:#795966;
          max-width:430px;
        }

        .final-name{
          display:inline-block;
          margin-top:19px;
          font-family:cursive;
          font-size:26px;
          color:#b76986;
          transform:rotate(-3deg);
        }

        .final-reveal-button{
          margin-top:27px;
          border:1px solid rgba(164,96,122,.18);
          background:rgba(255,255,255,.7);
          color:#704354;
          border-radius:999px;
          padding:14px 19px;
          cursor:pointer;
          display:inline-flex;
          align-items:center;
          gap:12px;
          font-size:10px;
          font-weight:900;
          letter-spacing:.16em;
          box-shadow:0 14px 35px rgba(91,55,69,.1);
          backdrop-filter:blur(12px);
        }

        .final-reveal-button span:last-child{
          display:inline-flex;
          align-items:center;
          justify-content:center;
          width:27px;
          height:27px;
          border-radius:50%;
          background:#f0bfd0;
          color:white;
        }

        .final-memory-universe{
          position:relative;
          min-height:530px;
          display:flex;
          align-items:center;
          justify-content:center;
          perspective:1200px;
        }

        .final-universe-ring{
          position:absolute;
          width:410px;
          height:410px;
          border:1px solid rgba(185,105,135,.22);
          border-radius:50%;
          box-shadow:0 0 0 28px rgba(255,255,255,.12),0 0 80px rgba(211,123,153,.12);
          animation:universeSpin 18s linear infinite;
        }

        .final-universe-ring:before,
        .final-universe-ring:after{
          content:"";
          position:absolute;
          inset:35px;
          border:1px dashed rgba(185,105,135,.2);
          border-radius:50%;
        }

        .final-universe-ring:after{
          inset:74px;
          border-style:solid;
          opacity:.55;
        }

        @keyframes universeSpin{
          to{transform:rotate(360deg)}
        }

        .final-center{
          position:relative;
          z-index:8;
          width:185px;
          height:185px;
          border-radius:50%;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          text-align:center;
          background:rgba(255,255,255,.78);
          border:1px solid rgba(180,105,133,.18);
          box-shadow:0 25px 70px rgba(100,55,74,.18),inset 0 0 40px rgba(255,194,213,.3);
          backdrop-filter:blur(14px);
        }

        .final-center-heart{
          color:#c87592;
          font-size:31px;
          line-height:1;
          animation:centerBeat 2.3s ease-in-out infinite;
        }

        @keyframes centerBeat{
          0%,100%{transform:scale(1)}
          50%{transform:scale(1.13)}
        }

        .final-center small{
          margin-top:10px;
          font-size:9px;
          font-weight:900;
          letter-spacing:.25em;
          color:#9c687b;
        }

        .final-center-name{
          margin-top:6px;
          font-family:Georgia,"Times New Roman",serif;
          font-size:28px;
          color:#63404e;
        }

        .final-orbit-photo{
          position:absolute;
          width:155px;
          padding:8px 8px 14px;
          background:#fffdfb;
          box-shadow:0 20px 45px rgba(91,55,69,.2);
          transform-style:preserve-3d;
          cursor:pointer;
        }

        .final-orbit-photo img{
          display:block;
          width:100%;
          aspect-ratio:1/1.15;
          object-fit:cover;
        }

        .final-orbit-label{
          display:block;
          margin-top:8px;
          text-align:center;
          font-family:cursive;
          font-size:12px;
          color:#80596a;
        }

        .final-orbit-photo.p1{left:50%;top:50%}
        .final-orbit-photo.p2{left:50%;top:50%}
        .final-orbit-photo.p3{left:50%;top:50%}
        .final-orbit-photo.p4{left:50%;top:50%}

        .final-special-bottom{
          position:absolute;
          left:50%;
          bottom:25px;
          transform:translateX(-50%);
          z-index:7;
          display:flex;
          align-items:center;
          gap:12px;
          color:#a06a7d;
          font-size:9px;
          font-weight:900;
          letter-spacing:.2em;
          white-space:nowrap;
        }

        .final-special-bottom i{
          width:30px;
          height:1px;
          background:#d8a7b8;
        }

        .final-last-line{
          margin-top:20px;
          font-family:cursive;
          color:#986276;
          font-size:16px;
        }

        .final-special-overlay{
          position:fixed;
          inset:0;
          z-index:2000;
          display:flex;
          align-items:center;
          justify-content:center;
          padding:20px;
          background:rgba(71,40,52,.45);
          backdrop-filter:blur(18px);
        }

        .final-special-card{
          position:relative;
          width:min(560px,92vw);
          max-height:90vh;
          overflow:auto;
          padding:42px 34px 32px;
          text-align:center;
          border-radius:28px;
          background:linear-gradient(145deg,#fffdfb,#fff1f5);
          border:1px solid rgba(255,255,255,.8);
          box-shadow:0 35px 100px rgba(54,31,41,.28);
        }

        .final-special-card:before{
          content:"";
          position:absolute;
          inset:12px;
          border:1px solid rgba(185,105,135,.15);
          border-radius:21px;
          pointer-events:none;
        }

        .final-special-close{
          position:absolute;
          right:17px;
          top:14px;
          width:34px;
          height:34px;
          border:0;
          border-radius:50%;
          background:#f5d3de;
          color:#855268;
          font-size:20px;
          cursor:pointer;
          z-index:3;
        }

        .final-special-card .final-card-heart{
          color:#c87592;
          font-size:38px;
        }

        .final-special-card h3{
          margin:12px 0 13px;
          font-family:Georgia,"Times New Roman",serif;
          font-size:clamp(38px,7vw,58px);
          line-height:.95;
          font-weight:500;
          color:#583845;
        }

        .final-special-card h3 i{
          color:#ba708b;
          font-weight:400;
        }

        .final-special-card p{
          max-width:420px;
          margin:0 auto;
          color:#795967;
          line-height:1.8;
          font-size:14px;
        }

        .final-special-mini-row{
          display:flex;
          justify-content:center;
          gap:12px;
          margin:24px auto;
        }

        .final-special-mini{
          width:95px;
          padding:6px 6px 9px;
          background:white;
          box-shadow:0 10px 24px rgba(87,53,68,.15);
        }

        .final-special-mini img{
          width:100%;
          aspect-ratio:1;
          object-fit:cover;
          display:block;
        }

        .final-special-sign{
          font-family:cursive;
          color:#a4647a;
          font-size:17px;
          line-height:1.6;
        }

        .final-special-name{
          display:block;
          font-family:Georgia,"Times New Roman",serif;
          font-size:28px;
          color:#65414f;
        }

        .final-special-card button.final-memory-close{
          margin-top:22px;
          border:0;
          border-radius:999px;
          background:#704556;
          color:#fff;
          padding:13px 20px;
          font-size:9px;
          font-weight:900;
          letter-spacing:.16em;
          cursor:pointer;
        }

        @media(max-width:820px){
          .final-special{padding:80px 18px 70px;overflow:auto}
          .final-special-content{grid-template-columns:1fr;gap:15px}
          .final-special-copy{text-align:center;max-width:650px;margin:auto}
          .final-special-kicker{justify-content:center}
          .final-special-copy p{margin-left:auto;margin-right:auto}
          .final-memory-universe{min-height:460px;transform:scale(.82)}
          .final-special-bottom{display:none}
        }

        @media(max-width:520px){
          .final-special-title{font-size:45px}
          .final-memory-universe{min-height:390px;transform:scale(.66);margin:-35px 0}
          .final-special-copy p{font-size:13px}
          .final-orbit-photo{width:145px}
          .final-special-card{padding:38px 22px 26px}
          .final-special-mini{width:78px}
        }
      `}</style>

      <div className="final-special-glow" />

      <div className="final-special-content">
        <motion.div
          className="final-special-copy"
          initial={{ opacity:0, x:-45 }}
          animate={{ opacity:1, x:0 }}
          transition={{ duration:1, ease:[.16,1,.3,1] }}
        >
          <span className="final-special-kicker">
            <i />
            THE LAST PAGE
          </span>

          <h2 className="final-special-title">
            Happy Birthday,
            <br />
            <i>Abhisheyy.</i>
          </h2>

          <p>
            After every little memory, every laugh, every ordinary day
            that somehow became special, I wanted the last page to be
            simple.
          </p>

          <span className="final-name">This one is for Abhisheyy ♡</span>

          <div>
            <motion.button
              type="button"
              className="final-reveal-button"
              onClick={() => setRevealed(true)}
              whileHover={{ y:-4, scale:1.03 }}
              whileTap={{ scale:.97 }}
            >
              <span>{revealed ? "YOU FOUND IT" : "REVEAL THE LAST LITTLE THING"}</span>
              <span>{revealed ? "♥" : "→"}</span>
            </motion.button>
          </div>

          <motion.button
            type="button"
            className="love-letter-open"
            onClick={() => setLetterOpen(true)}
            whileHover={{ y:-4, scale:1.03 }}
            whileTap={{ scale:.97 }}
          >
            <span className="love-letter-icon">✉</span>
            <span>OPEN MY LOVE LETTER</span>
            <span>♥</span>
          </motion.button>

          <motion.button
            type="button"
            className="midnight-promise-open"
            onClick={() => setMidnightOpen(true)}
            whileHover={{ y:-4, scale:1.03 }}
            whileTap={{ scale:.97 }}
          >
            <span className="midnight-promise-icon">✦</span>
            <span>OPEN THE MIDNIGHT PROMISE</span>
            <span>→</span>
          </motion.button>

          <AnimatePresence mode="wait">
            {revealed ? (
              <motion.div
                key="revealed"
                className="final-last-line"
                initial={{ opacity:0, y:12 }}
                animate={{ opacity:1, y:0 }}
              >
                If I could choose this story again, I'd still choose Abhisheyy. ♡
              </motion.div>
            ) : (
              <motion.div
                key="hidden"
                className="final-last-line"
                initial={{ opacity:0 }}
                animate={{ opacity:1 }}
              >
                There is one more little thing hidden here...
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="final-memory-universe"
          initial={{ opacity:0, scale:.88 }}
          animate={{ opacity:1, scale:1 }}
          transition={{ duration:1.15, delay:.2 }}
        >
          <div className="final-universe-ring" />

          <motion.div
            className="final-center"
            initial={{ scale:0, opacity:0 }}
            animate={{ scale:1, opacity:1 }}
            transition={{ delay:.75, type:"spring", stiffness:110, damping:14 }}
          >
            <div className="final-center-heart">♥</div>
            <motion.button
              type="button"
              className={`final-center-name ${revealed ? "is-revealed" : ""}`}
              onClick={() => setRevealed((value) => !value)}
              whileTap={{ scale: 0.94 }}
              aria-label="Reveal a little message for Abhisheyy"
            >
              Abhisheyy
              <span>{revealed ? "you found the little secret ♡" : "tap me"}</span>
            </motion.button>
            <small>MY FAVORITE PERSON</small>
          </motion.div>

          {finalPhotos.map((photo,index) => (
            <motion.div
              key={photo.src}
              className={`final-orbit-photo ${photo.position}`}
              initial={{
                opacity:0,
                scale:.72,
                rotate:photo.rotate*1.7,
              }}
              animate={{
                opacity:1,
                scale:1,
                rotate:photo.rotate,
              }}
              transition={{
                delay:.85+index*.2,
                duration:.9,
                type:"spring",
                stiffness:105,
                damping:13,
              }}
              whileHover={{
                scale:1.12,
                rotate:0,
                zIndex:20,
                boxShadow:"0 30px 60px rgba(91,55,69,.28)",
              }}
            >
              <img src={photo.src} alt={photo.label} />
              <span className="final-orbit-label">{photo.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="final-special-bottom">
        <span>ONE STORY</span>
        <i />
        <Heart size={13} fill="currentColor" />
        <i />
        <span>ONE ABHISH</span>
      </div>

      <AnimatePresence>
        {letterOpen && (
          <motion.div
            className="love-letter-overlay"
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{ opacity:0 }}
          >
            <motion.div
              className="love-letter-card"
              initial={{ opacity:0, scale:.72, y:60, rotate:-3 }}
              animate={{ opacity:1, scale:1, y:0, rotate:0 }}
              exit={{ opacity:0, scale:.8, y:35, rotate:2 }}
              transition={{ type:"spring", stiffness:105, damping:15 }}
            >
              <button
                type="button"
                className="love-letter-close"
                onClick={() => setLetterOpen(false)}
                aria-label="Close love letter"
              >
                ×
              </button>

              <div className="love-letter-flare">♥</div>
              <span className="love-letter-eyebrow">A LETTER I REALLY MEAN</span>
              <h3>For my <i>Kanmaniyee</i> ♡</h3>

              <div className="love-letter-body">
                <p>
                  I would never leave you, Kanmaniyee. I love you so much.
                </p>
                <p>
                  Through the loud days, the quiet days, the silly days and
                  every little chapter still waiting for us, I want you beside me.
                </p>
                <p>
                  You are not just a beautiful memory in my story. You are the
                  person I want to keep making memories with.
                </p>
                <p className="love-letter-pattu">
                  Always yours,<br />
                  <strong>Pattu ♥</strong>
                </p>
              </div>

              <div className="love-letter-mini-hearts">♥ ✦ ♥ ✦ ♥</div>

              <button
                type="button"
                className="love-letter-done"
                onClick={() => setLetterOpen(false)}
              >
                KEEP THIS LETTER CLOSE ♥
              </button>
            </motion.div>
          </motion.div>
        )}

        {midnightOpen && (
          <motion.div
            className="midnight-overlay"
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{ opacity:0 }}
          >
            <motion.div
              className="midnight-card"
              initial={{ opacity:0, scale:.72, y:55, rotate:-2 }}
              animate={{ opacity:1, scale:1, y:0, rotate:0 }}
              exit={{ opacity:0, scale:.78, y:35 }}
              transition={{ type:"spring", stiffness:105, damping:15 }}
            >
              <button
                type="button"
                className="midnight-close"
                onClick={() => setMidnightOpen(false)}
                aria-label="Close midnight promise"
              >×</button>

              <div className="midnight-stars">✦　·　✦　·　✦</div>
              <span className="midnight-eyebrow">A LITTLE THING FOR 12:00 AM</span>

              <div className="midnight-photo-wrap">
                <motion.img
                  src="/photos/memory-03.jpg"
                  alt="A favorite memory"
                  initial={{ filter:"blur(16px)", scale:.9, opacity:0 }}
                  animate={{ filter:"blur(0px)", scale:1, opacity:1 }}
                  transition={{ duration:1.2, delay:.25 }}
                />
                <span className="midnight-photo-glow" />
              </div>

              <h3>Even when everything<br /><i>goes quiet...</i></h3>
              <p>
                I'd still look for you. I'd still choose you.
                And if I got to start this story all over again,
                I'd find my way back to you.
              </p>

              <div className="midnight-promise-line">
                <span>my promise</span>
                <strong>I'm staying. ♥</strong>
              </div>

              <div className="midnight-signature">Pattu · for Kanmaniyee</div>

              <button
                type="button"
                className="midnight-done"
                onClick={() => setMidnightOpen(false)}
              >
                KEEP THIS ONE TOO ✦
              </button>
            </motion.div>
          </motion.div>
        )}

        {birthday && (
          <motion.div
            className="final-special-overlay"
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{ opacity:0 }}
          >
            <motion.div
              className="final-special-card"
              initial={{ opacity:0, scale:.7, y:40, rotate:-2 }}
              animate={{ opacity:1, scale:1, y:0, rotate:0 }}
              exit={{ opacity:0, scale:.75, y:30 }}
              transition={{ type:"spring", stiffness:105, damping:15 }}
            >
              <button
                type="button"
                className="final-special-close"
                onClick={() => setBirthday(false)}
                aria-label="Close birthday message"
              >
                ×
              </button>

              <motion.div
                className="final-card-heart"
                animate={{ scale:[1,1.13,1] }}
                transition={{ duration:2.2, repeat:Infinity }}
              >
                ♥
              </motion.div>

              <span className="birthday-final-eyebrow">FOR ABHISHEYY ♥</span>

              <div className="birthday-feature-photo">
                <img src="/photos/memory-03.jpg" alt="A favorite memory of us" />
                <span>one more memory to keep</span>
              </div>

              <h3>
                Happy
                <br />
                <i>Birthday, Abhisheyy.</i>
              </h3>

              <p>
                I hope this year gives you back even a fraction of the
                happiness, laughter and warmth you have brought into my life.
                Thank you for becoming one of my favorite parts of this story.
              </p>

              <div className="final-special-mini-row">
                <div className="final-special-mini">
                  <img src="/photos/memory-05.jpeg" alt="Memory" />
                </div>
                <div className="final-special-mini">
                  <img src="/photos/memory-07.jpeg" alt="Memory" />
                </div>
                <div className="final-special-mini">
                  <img src="/photos/memory-03.jpg" alt="Memory" />
                </div>
              </div>

              <div className="final-special-sign">
                with all my love,
                <span className="final-special-name">always ♡</span>
              </div>

              <button
                type="button"
                className="birthday-letter-secondary"
                onClick={() => { setBirthday(false); setLetterOpen(true); }}
              >
                READ THE LETTER ♥
              </button>

              <button
                type="button"
                className="final-memory-close"
                onClick={() => setBirthday(false)}
              >
                KEEP THIS MOMENT
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
