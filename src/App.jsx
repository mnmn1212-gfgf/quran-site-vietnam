import React, { useEffect, useMemo, useRef, useState } from "react";
import { LazyMotion, domAnimation, motion } from "framer-motion";
import sanaLogo from "./assets/sana-logo.png";
import voiceMp3 from "./assets/voice.mp3";
import {
  BookOpen,
  Building2,
  Crown,
  ExternalLink,
  Eye,
  Globe,
  Headphones,
  HeartHandshake,
  Languages,
  Layers3,
  Link2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Mic2,
  MonitorPlay,
  Pause,
  Play,
  Radio,
  RotateCcw,
  Send,
  ShieldCheck,
  SkipBack,
  SkipForward,
  Sparkles,
  Stars,
  Target,
  Users,
  Volume2,
} from "lucide-react";

const ACCENT = "#D4B06A";
const CTA_DARK = "#0A2F36";

const OUTER_GRADIENT =
  "bg-[linear-gradient(135deg,rgba(6,28,36,0.97)_0%,rgba(11,59,54,0.95)_34%,rgba(15,118,110,0.92)_68%,rgba(212,176,106,0.82)_100%)]";
const INNER_GRADIENT =
  "bg-[linear-gradient(135deg,rgba(6,28,36,0.98)_0%,rgba(11,59,54,0.94)_42%,rgba(15,118,110,0.88)_100%)]";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

const pulseGlow = {
  opacity: [0.2, 0.45, 0.2],
  scale: [1, 1.03, 1],
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
};

const containerClass =
  "relative z-10 mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-10 xl:px-14";
const glass =
  "border border-white/10 bg-white/10 md:backdrop-blur-xl backdrop-blur-sm shadow-[0_8px_22px_rgba(0,0,0,0.14)]";
const softCard = `rounded-[2rem] ${glass}`;
const gradientOuterCard = `rounded-[2rem] border border-white/10 ${OUTER_GRADIENT} md:backdrop-blur-xl backdrop-blur-sm shadow-[0_8px_22px_rgba(0,0,0,0.14)]`;

const navItems = [
  { label: "Giới thiệu", href: "#about" },
  { label: "Tính năng", href: "#features" },
  { label: "Tác phẩm của chúng tôi", href: "#portfolio" },
  { label: "Đối tác", href: "#partners" },
  { label: "Liên hệ", href: "#contact" },
];

const stats = [
  { value: "+100", label: "Ngôn ngữ toàn cầu mục tiêu" },
  { value: "24/7", label: "Truy cập toàn cầu liên tục" },
  { value: "114", label: "Toàn bộ surah" },
  { value: "HQ", label: "Âm thanh & video chất lượng cao" },
];

const heroCards = [
  { value: "114", label: "Các surah" },
  { value: "30", label: "Phần Qur'an" },
  { value: "Tinh tuyển", label: "Nội dung AV" },
];

const heroBadges = [
  { icon: Sparkles, title: "Ánh sáng và vẻ đẹp của Qur'an" },
  { icon: Globe, title: "Thông điệp gửi đến thế giới" },
];

const identityCards = [
  {
    icon: Users,
    title: "Chúng tôi là ai",
    text: "Sana là một sáng kiến waqf chuyên truyền bá ý nghĩa của Kinh Qur'an Thánh đến toàn thế giới thông qua các kênh âm thanh và hình ảnh kết hợp giữa lối đọc truyền cảm với bản dịch chính xác, mang đến một trải nghiệm tinh thần trọn vẹn giúp lời của Allah đến gần trái tim con người bằng nhiều ngôn ngữ trên thế giới.",
  },
  {
    icon: Eye,
    title: "Tầm nhìn",
    text: "Trở thành nền tảng hàng đầu toàn cầu trong việc truyền tải ý nghĩa của Kinh Qur'an Thánh đến mỗi người bằng chính ngôn ngữ của họ thông qua một phương thức hiện đại kết hợp vẻ đẹp, sự xuất sắc và công nghệ tiên tiến.",
  },
  {
    icon: Target,
    title: "Sứ mệnh",
    text: "Cung cấp nội dung âm thanh và hình ảnh về Qur'an đã được dịch, giúp ý nghĩa của Kinh Qur'an Thánh trở nên rõ ràng và dễ tiếp cận, góp phần dẫn dắt con người và giới thiệu lời của Allah đến thế giới theo cách hấp dẫn và sâu sắc.",
  },
];

const features = [
  {
    icon: Languages,
    title: "Bản dịch đa ngôn ngữ",
    desc: "Truyền tải ý nghĩa của Kinh Qur'an Thánh đến mọi người bằng chính ngôn ngữ của họ thông qua cách diễn đạt rõ ràng và chính xác, giữ trọn thông điệp vốn có.",
  },
  {
    icon: Headphones,
    title: "Trải nghiệm nghe nhìn tích hợp",
    desc: "Các kênh kết hợp lối đọc truyền cảm với văn bản dịch trong một trải nghiệm nhẹ nhàng xứng đáng với sự uy nghi của Kinh Qur'an.",
  },
  {
    icon: Globe,
    title: "Phạm vi tiếp cận toàn cầu liên tục",
    desc: "Sự hiện diện trên nền tảng số và vệ tinh giúp mở rộng khả năng tiếp cận trên các châu lục và nền tảng suốt ngày đêm.",
  },
  {
    icon: HeartHandshake,
    title: "Một waqf vì Allah",
    desc: "Một sứ mệnh da’wah toàn cầu mà bất kỳ ai ủng hộ, đóng góp hoặc hưởng lợi từ nó đều cùng chia sẻ phần thưởng.",
  },
];

const channels = [
  {
    icon: Radio,
    title: "Kênh vệ tinh & phát thanh",
    desc: "Phát sóng ý nghĩa của Kinh Qur'an Thánh qua các kênh âm thanh và hình ảnh đến với mọi người ở nhiều quốc gia bằng chính ngôn ngữ của họ.",
  },
  {
    icon: MonitorPlay,
    title: "Nền tảng mạng xã hội & trang web",
    desc: "Sự hiện diện số năng động giúp nội dung Qur'an dễ tiếp cận và dễ chia sẻ trên quy mô rộng.",
  },
  {
    icon: Layers3,
    title: "Ứng dụng & phương tiện số đa dạng",
    desc: "Trải nghiệm hiện đại và linh hoạt cho phép người dùng theo dõi nội dung Qur'an theo cách phù hợp với nhiều thiết bị và nền tảng khác nhau.",
  },
];

const partners = [
  {
    icon: ShieldCheck,
    title: "Cơ quan Sharia & tổ chức Hồi giáo",
    desc: "Các bên đã đóng góp những bản dịch ý nghĩa Kinh Qur'an đã được phê duyệt, bảo đảm tính chính xác và nền tảng học thuật vững chắc.",
  },
  {
    icon: Mic2,
    title: "Những qari có ảnh hưởng với giọng đọc truyền cảm",
    desc: "Những người đã làm phong phú dự án bằng các lối đọc khiêm nhường và xúc động, chạm đến trái tim theo cách gần gũi và cuốn hút.",
  },
  {
    icon: Headphones,
    title: "Công ty sản xuất âm thanh & kỹ thuật",
    desc: "Những đơn vị đã cung cấp bản ghi chất lượng cao và xử lý nghe nhìn chuyên nghiệp.",
  },
  {
    icon: Users,
    title: "Nhà sản xuất & tình nguyện viên",
    desc: "Những người đã góp phần phát triển và xuất bản nội dung để nội dung đó có thể đến với đông đảo khán giả nhất trên toàn thế giới.",
  },
];

const impactCards = [
  {
    icon: Globe,
    title: "Tiếp cận toàn cầu",
    desc: "Thông điệp của Kinh Qur'an Thánh đã đến với các gia đình ở nhiều quốc gia trên thế giới thông qua nhiều ngôn ngữ nói với con người bằng tiếng mẹ đẻ của họ.",
  },
  {
    icon: Languages,
    title: "Bản dịch đáng tin cậy",
    desc: "Các bản dịch chính xác về ý nghĩa Kinh Qur'an đã được cung cấp dưới sự giám sát của các tổ chức học thuật đáng tin cậy để bảo đảm sự chuẩn xác.",
  },
  {
    icon: Headphones,
    title: "Trải nghiệm tích hợp",
    desc: "Nội dung kết hợp lối đọc trang nghiêm với bản dịch hiển thị trực quan để tạo nên một trải nghiệm tinh thần xúc động và dễ hiểu.",
  },
  {
    icon: Send,
    title: "Thông điệp không ngừng lan tỏa",
    desc: "Dự án góp phần lan tỏa sự hướng dẫn và giới thiệu lời của Allah đến thế giới thông qua phong cách hiện đại tiếp cận nhiều nhóm khán giả khác nhau.",
  },
];

const portfolioVideos = [
  `${import.meta.env.BASE_URL}videos/v1.mp4`,
  `${import.meta.env.BASE_URL}videos/v2.mp4`,
  `${import.meta.env.BASE_URL}videos/v3.mp4`,
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

function sectionBadge(icon, text, textColor = "text-white") {
  const Icon = icon;
  return (
    <div
      className={`inline-flex max-w-full items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2.5 text-xs font-semibold ${textColor} backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.14)] sm:px-5 sm:py-3 sm:text-sm`}
    >
      <Icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: ACCENT }} />
      <span className="truncate">{text}</span>
    </div>
  );
}

function LargeSectionBadge({ icon: Icon, text }) {
  return (
    <div
      className="inline-flex max-w-full items-center gap-3 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-base font-bold backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.14)] sm:px-8 sm:py-4 sm:text-xl lg:text-2xl"
      style={{ color: ACCENT }}
    >
      <Icon
        className="h-5 w-5 shrink-0 sm:h-7 sm:w-7"
        style={{ color: ACCENT }}
      />
      <span className="truncate">{text}</span>
    </div>
  );
}

function AppStoreIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <path d="M9 15.5 14.5 8" />
      <path d="M11 8h4" />
      <path d="M9.5 15.5H15" />
      <path d="M10.5 12h5" />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 4.5v15l8.8-7.5L5 4.5Z" />
      <path d="m13.8 12 3.6-3 1.6 1.1c1.2.8 1.2 2.1 0 2.9L17.4 14l-3.6-2Z" />
      <path d="m17.4 9-8.2-3.6" />
      <path d="m17.4 15-8.2 3.6" />
    </svg>
  );
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function HeroAudioPlayer({ isMobile }) {
  const audioRef = useRef(null);
  const blobUrlRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const previousBarsRef = useRef([]);

  const BARS_COUNT = isMobile ? 24 : 48;
  const HALF_BARS = BARS_COUNT / 2;
  const MIN_BAR_HEIGHT = isMobile ? 8 : 10;
  const MAX_BAR_HEIGHT = isMobile ? 22 : 34;

  const idleBars = useMemo(() => {
    const half = Array.from({ length: HALF_BARS }, (_, i) => {
      const t = i / Math.max(1, HALF_BARS - 1);
      return Math.round((isMobile ? 9 : 12) + t * 3);
    });
    return [...half.slice().reverse(), ...half];
  }, [HALF_BARS, isMobile]);

  const [bars, setBars] = useState(idleBars);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    previousBarsRef.current = idleBars;
    setBars(idleBars);
  }, [idleBars]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let cancelled = false;

    const loadAudioAsBlob = async () => {
      try {
        const response = await fetch(voiceMp3, { cache: "force-cache" });
        const blob = await response.blob();
        if (cancelled) return;

        const objectUrl = URL.createObjectURL(blob);
        blobUrlRef.current = objectUrl;
        audio.src = objectUrl;
        audio.load();
      } catch {
        if (!cancelled) {
          audio.src = voiceMp3;
          audio.load();
        }
      }
    };

    loadAudioAsBlob();

    return () => {
      cancelled = true;
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration || 0);
    const onTime = () => setCurrentTime(audio.currentTime || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      previousBarsRef.current = idleBars;
      setBars(idleBars);
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("durationchange", onLoaded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("durationchange", onLoaded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, [idleBars]);

  useEffect(() => {
    if (isMobile && !isPlaying) {
      previousBarsRef.current = idleBars;
      setBars(idleBars);
      return;
    }

    if (!isPlaying) {
      previousBarsRef.current = idleBars;
      setBars(idleBars);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const analyser = analyserRef.current;
    if (!analyser) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const animateBars = () => {
      analyser.getByteFrequencyData(dataArray);

      let total = 0;
      for (let i = 0; i < bufferLength; i += 1) total += dataArray[i];
      const globalEnergy = total / bufferLength / 255;

      const halfBars = Array.from({ length: HALF_BARS }, (_, index) => {
        const start = Math.floor((index / HALF_BARS) * bufferLength);
        const end = Math.floor(((index + 1) / HALF_BARS) * bufferLength);

        let localSum = 0;
        let count = 0;

        for (let i = start; i < end; i += 1) {
          localSum += dataArray[i];
          count += 1;
        }

        const localEnergy = count ? localSum / count / 255 : 0;
        const mixedEnergy = localEnergy * 0.68 + globalEnergy * 0.32;
        const height =
          MIN_BAR_HEIGHT + mixedEnergy * (MAX_BAR_HEIGHT - MIN_BAR_HEIGHT);

        return clamp(height, MIN_BAR_HEIGHT, MAX_BAR_HEIGHT);
      });

      const mirroredBars = [...halfBars.slice().reverse(), ...halfBars];

      const animatedBars = mirroredBars.map((value, index) => {
        const previous = previousBarsRef.current[index] ?? idleBars[index];
        return Math.round(previous * 0.55 + value * 0.45);
      });

      previousBarsRef.current = animatedBars;
      setBars(animatedBars);
      animationFrameRef.current = requestAnimationFrame(animateBars);
    };

    animationFrameRef.current = requestAnimationFrame(animateBars);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [
    HALF_BARS,
    MAX_BAR_HEIGHT,
    MIN_BAR_HEIGHT,
    idleBars,
    isPlaying,
    isMobile,
  ]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  const setupAnalyser = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioContextRef.current) {
      const context = new AudioContextClass();
      const analyser = context.createAnalyser();
      analyser.fftSize = 128;
      analyser.smoothingTimeConstant = 0.92;

      const source = context.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(context.destination);

      audioContextRef.current = context;
      analyserRef.current = analyser;
    }

    if (audioContextRef.current?.state === "suspended") {
      await audioContextRef.current.resume().catch(() => {});
    }
  };

  const progress = useMemo(
    () => (duration ? (currentTime / duration) * 100 : 0),
    [currentTime, duration]
  );

  const togglePlay = async () => {
    const el = audioRef.current;
    if (!el) return;

    await setupAnalyser();

    if (el.paused) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  };

  const seekBy = (delta) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = Math.max(
      0,
      Math.min(el.duration || 0, (el.currentTime || 0) + delta)
    );
  };

  const replay = async () => {
    const el = audioRef.current;
    if (!el) return;
    await setupAnalyser();
    el.currentTime = 0;
    el.play().catch(() => {});
  };

  const toggleMute = () => {
    const el = audioRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  const handleSeek = (event) => {
    const el = audioRef.current;
    if (!el) return;
    const next = Number(event.target.value);
    el.currentTime = next;
    setCurrentTime(next);
  };

  return (
    <div className="mt-5 rounded-[1.35rem] border border-white/10 bg-[rgba(7,37,44,0.56)] p-3 sm:p-4">
      <audio
        ref={audioRef}
        preload="metadata"
        onContextMenu={(e) => e.preventDefault()}
      />

      <div className="mb-4 flex h-14 items-end gap-[2px] overflow-hidden rounded-2xl border border-white/10 bg-black/10 px-2 py-3 sm:h-18">
        {bars.map((height, index) => (
          <motion.div
            key={index}
            animate={{ height }}
            transition={{ duration: isMobile ? 0.2 : 0.14, ease: "easeOut" }}
            className="flex-1 self-end rounded-full bg-gradient-to-t from-[#7ED6C2] via-[#D9F6EE] to-[#D4B06A] opacity-95"
            style={{ maxHeight: `${MAX_BAR_HEIGHT}px` }}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={togglePlay}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          aria-label={isPlaying ? "Tạm dừng" : "Phát"}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" style={{ color: ACCENT }} />
          ) : (
            <Play className="h-4 w-4" style={{ color: ACCENT }} />
          )}
        </button>

        <button
          type="button"
          onClick={() => seekBy(-10)}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          aria-label="Lùi"
        >
          <SkipBack className="h-4 w-4" style={{ color: ACCENT }} />
        </button>

        <button
          type="button"
          onClick={replay}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          aria-label="Phát lại"
        >
          <RotateCcw className="h-4 w-4" style={{ color: ACCENT }} />
        </button>

        <button
          type="button"
          onClick={() => seekBy(10)}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          aria-label="Tiến"
        >
          <SkipForward className="h-4 w-4" style={{ color: ACCENT }} />
        </button>

        <button
          type="button"
          onClick={toggleMute}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          aria-label="Âm lượng"
        >
          <Volume2
            className={`h-4 w-4 ${muted ? "opacity-50" : ""}`}
            style={{ color: ACCENT }}
          />
        </button>

        <div className="min-w-[52px] text-xs text-white/75">
          {formatTime(currentTime)}
        </div>

        <div className="relative h-2 w-full flex-1 overflow-visible rounded-full bg-white/10">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#7ED6C2] via-[#D9F6EE] to-[#D4B06A]"
            style={{ width: `${progress}%` }}
          />
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            className="audio-range absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none bg-transparent"
            style={{ WebkitAppearance: "none" }}
          />
        </div>
      </div>

      <style>{`
        .audio-range::-webkit-slider-runnable-track { height: 8px; background: transparent; }
        .audio-range::-moz-range-track { height: 8px; background: transparent; }
        .audio-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          margin-top: -3px;
          border-radius: 999px;
          border: 2px solid rgba(255,255,255,0.9);
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
        .audio-range::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.9);
          border-radius: 999px;
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
      `}</style>
    </div>
  );
}

function StructuredCard({ icon: Icon, title, desc, isMobile }) {
  return (
    <motion.div
      whileHover={isMobile ? {} : { y: -6, scale: 1.01 }}
      className={`${gradientOuterCard} h-full p-4 sm:p-5`}
    >
      <div className="h-full rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(6,28,36,0.34)_0%,rgba(11,59,54,0.26)_52%,rgba(15,118,110,0.18)_100%)] px-4 py-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#D4B06A]/10">
            <Icon className="h-5 w-5" style={{ color: ACCENT }} />
          </div>
          <h3 className="text-base font-bold leading-7 text-white sm:text-lg lg:text-xl">
            {title}
          </h3>
        </div>
        <div className="mt-4 rounded-2xl border border-white/10 bg-[rgba(7,37,44,0.56)] px-4 py-4 text-sm leading-7 text-white/78 sm:text-base sm:leading-8">
          {desc}
        </div>
      </div>
    </motion.div>
  );
}

function IdentityCard({ icon: Icon, title, text, large = false, isMobile }) {
  return (
    <motion.div
      whileHover={isMobile ? {} : { y: -6, scale: 1.01 }}
      className={`${gradientOuterCard} h-full p-4 sm:p-5`}
    >
      <div className="h-full rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(6,28,36,0.34)_0%,rgba(11,59,54,0.26)_52%,rgba(15,118,110,0.18)_100%)] px-4 py-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#D4B06A]/10">
            <Icon className="h-5 w-5" style={{ color: ACCENT }} />
          </div>
          <div
            className={`rounded-2xl border border-white/10 bg-white/5 px-4 py-2 font-bold text-white ${
              large ? "text-lg sm:text-xl" : "text-base sm:text-lg"
            }`}
          >
            {title}
          </div>
        </div>
        <div
          className={`mt-4 rounded-2xl border border-white/10 bg-[rgba(7,37,44,0.56)] px-4 py-4 text-white/80 ${
            large
              ? "text-base leading-8 sm:text-lg sm:leading-9 lg:text-xl lg:leading-10"
              : "text-base leading-8 sm:text-lg"
          }`}
        >
          {text}
        </div>
      </div>
    </motion.div>
  );
}

function ImpactCard({ icon: Icon, title, desc, isMobile }) {
  return (
    <motion.div
      whileHover={isMobile ? {} : { y: -6, scale: 1.01 }}
      className={`${gradientOuterCard} h-full p-4 sm:p-5`}
    >
      <div className="h-full rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(6,28,36,0.34)_0%,rgba(11,59,54,0.26)_52%,rgba(15,118,110,0.18)_100%)] px-4 py-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#D4B06A]/10">
            <Icon className="h-5 w-5" style={{ color: ACCENT }} />
          </div>
          <h3 className="text-base font-bold text-white sm:text-lg lg:text-xl">
            {title}
          </h3>
        </div>
        <div className="mt-4 rounded-2xl border border-white/10 bg-[rgba(7,37,44,0.56)] px-4 py-4 text-sm leading-7 text-white/78 sm:text-base sm:leading-8">
          {desc}
        </div>
      </div>
    </motion.div>
  );
}

function ProtectedHlsVideoCard({ video, index, isMobile }) {
  const videoRef = useRef(null);
  const videoIdRef = useRef(`portfolio-video-${index}`);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;

    const onLoaded = () => {
      setDuration(element.duration || 0);
      setIsReady(true);
    };

    const onTimeUpdate = () => setCurrentTime(element.currentTime || 0);

    const onPlay = () => {
      setIsPlaying(true);
      window.dispatchEvent(
        new CustomEvent("sana-video-play", {
          detail: { id: videoIdRef.current },
        })
      );
    };

    const onPause = () => setIsPlaying(false);

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const onOtherVideoPlay = (event) => {
      if (event.detail?.id !== videoIdRef.current && !element.paused) {
        element.pause();
      }
    };

    element.addEventListener("loadedmetadata", onLoaded);
    element.addEventListener("loadeddata", onLoaded);
    element.addEventListener("durationchange", onLoaded);
    element.addEventListener("timeupdate", onTimeUpdate);
    element.addEventListener("play", onPlay);
    element.addEventListener("pause", onPause);
    element.addEventListener("ended", onEnded);
    window.addEventListener("sana-video-play", onOtherVideoPlay);

    return () => {
      element.removeEventListener("loadedmetadata", onLoaded);
      element.removeEventListener("loadeddata", onLoaded);
      element.removeEventListener("durationchange", onLoaded);
      element.removeEventListener("timeupdate", onTimeUpdate);
      element.removeEventListener("play", onPlay);
      element.removeEventListener("pause", onPause);
      element.removeEventListener("ended", onEnded);
      window.removeEventListener("sana-video-play", onOtherVideoPlay);
    };
  }, []);

  const progress = useMemo(
    () => (duration ? (currentTime / duration) * 100 : 0),
    [currentTime, duration]
  );

  const playVideo = () => {
    const el = videoRef.current;
    if (!el) return;
    el.play().catch(() => {});
  };

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;

    if (el.paused) {
      playVideo();
    } else {
      el.pause();
    }
  };

  const replayVideo = () => {
    const el = videoRef.current;
    if (!el) return;
    el.currentTime = 0;
    playVideo();
  };

  const handleSeek = (e) => {
    const el = videoRef.current;
    if (!el) return;
    const next = Number(e.target.value);
    el.currentTime = next;
    setCurrentTime(next);
  };

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    const next = !el.muted;
    el.muted = next;
    setMuted(next);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 12 : 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.5, delay: isMobile ? 0 : index * 0.08 }}
      whileHover={isMobile ? {} : { y: -6, scale: 1.01 }}
      className={`${gradientOuterCard} p-3 sm:p-4`}
    >
      <div className="relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-[rgba(6,28,36,0.55)]">
        <video
          ref={videoRef}
          src={video}
          className="aspect-video w-full object-cover"
          playsInline
          preload="metadata"
          controls={false}
          muted={muted}
          onContextMenu={(e) => e.preventDefault()}
        />

        {!isPlaying && (
          <button
            type="button"
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-[rgba(6,28,36,0.18)] transition hover:bg-[rgba(6,28,36,0.12)]"
            aria-label="Phát video"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-[0_0_28px_rgba(15,118,110,0.14)] sm:h-18 sm:w-18">
              <Play className="ml-1 h-7 w-7 text-white" />
            </span>
          </button>
        )}

        <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/10 bg-[rgba(6,28,36,0.62)] px-3 py-1 text-[11px] text-white/80 backdrop-blur-md">
          {isReady ? "Bản xem trước đã sẵn sàng" : "Đang tải bản xem trước"}
        </div>
      </div>

      <div className="mt-4 rounded-[1.3rem] border border-white/10 bg-[rgba(7,37,44,0.56)] p-3 sm:p-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={toggleMute}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            aria-label="Bật hoặc tắt tiếng"
          >
            <Volume2
              className={`h-4 w-4 ${muted ? "opacity-50" : ""}`}
              style={{ color: ACCENT }}
            />
          </button>

          <button
            type="button"
            onClick={replayVideo}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            aria-label="Phát lại"
          >
            <RotateCcw className="h-4 w-4" style={{ color: ACCENT }} />
          </button>

          <button
            type="button"
            onClick={togglePlay}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            aria-label={isPlaying ? "Tạm dừng" : "Phát"}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" style={{ color: ACCENT }} />
            ) : (
              <Play className="h-4 w-4" style={{ color: ACCENT }} />
            )}
          </button>

          <div className="min-w-[52px] text-xs text-white/75">
            {formatTime(currentTime)}
          </div>

          <div className="relative h-2 w-full flex-1 overflow-visible rounded-full bg-white/10">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#7ED6C2] via-[#D9F6EE] to-[#D4B06A]"
              style={{ width: `${progress}%` }}
            />
            <input
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="video-range absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none bg-transparent"
            />
          </div>
        </div>
      </div>

      <style>{`
        .video-range::-webkit-slider-runnable-track { height: 8px; background: transparent; }
        .video-range::-moz-range-track { height: 8px; background: transparent; }
        .video-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          margin-top: -3px;
          border-radius: 999px;
          border: 2px solid rgba(255,255,255,0.9);
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
        .video-range::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.9);
          border-radius: 999px;
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
      `}</style>
    </motion.div>
  );
}

export default function QuranTranslationLandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <LazyMotion features={domAnimation}>
      <div
        dir="ltr"
        className="relative min-h-screen overflow-hidden bg-transparent text-white"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(126,214,194,0.14),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(212,176,106,0.12),transparent_24%),radial-gradient(circle_at_20%_80%,rgba(15,118,110,0.20),transparent_26%),linear-gradient(180deg,#04171D_0%,#07242C_42%,#0A2F36_100%)]" />

        {!isMobile && (
          <>
            <motion.div
              className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#0F766E]/20 blur-3xl"
              animate={pulseGlow}
            />
            <div className="absolute inset-0 opacity-[0.06]">
              <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:44px_44px]" />
            </div>
          </>
        )}

        <div className={containerClass}>
          <header className="pt-4 sm:pt-6">
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className={`mx-auto flex items-center justify-between gap-3 rounded-[1.5rem] border border-white/10 px-3 py-3 sm:rounded-[2rem] sm:px-4 ${OUTER_GRADIENT} md:backdrop-blur-xl backdrop-blur-sm shadow-[0_8px_22px_rgba(0,0,0,0.14)]`}
            >
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#D4B06A]/20 bg-white/10 shadow-[0_0_16px_rgba(15,118,110,0.10)] sm:h-16 sm:w-16">
                  <img
                    src={sanaLogo}
                    alt="logo Kênh Qur'an Sana"
                    className="h-full w-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                </div>
                <div className="truncate text-sm font-bold tracking-wide sm:text-xl">
                  Kênh Qur'an Sana
                </div>
              </div>

              <nav className="hidden items-center gap-3 md:flex">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-white/10 bg-[rgba(6,28,36,0.85)] px-4 py-2 text-sm font-medium text-white/90 transition hover:border-[#D4B06A]/30 hover:bg-[rgba(11,59,54,0.9)] hover:text-[#F4E7C8]"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 md:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </motion.div>

            {menuOpen && (
              <div
                className={`mt-3 rounded-[1.4rem] p-3 md:hidden sm:rounded-[1.6rem] sm:p-4 ${glass}`}
              >
                <div className="grid gap-2">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 sm:text-base"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </header>

          <section className="relative grid min-h-[auto] items-center gap-10 py-10 sm:gap-12 sm:py-14 lg:min-h-[84vh] lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
            <div className="order-1 lg:order-1">
              <motion.div
                custom={0}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D4B06A]/20 bg-white/10 px-4 py-2 text-xs backdrop-blur-md sm:text-sm"
                style={{ color: ACCENT }}
              >
                <Stars className="h-4 w-4" style={{ color: ACCENT }} />
                <span>Sana... Thông điệp cho muôn thế giới</span>
              </motion.div>

              <motion.h1
                custom={1}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="text-3xl font-black leading-[1.25] sm:text-5xl lg:text-7xl"
              >
                <span className="block bg-gradient-to-l from-[#F6E7C8] via-[#D9F6EE] to-[#D4B06A] bg-clip-text text-transparent">
                  Kênh Qur'an Sana
                </span>
              </motion.h1>

              <motion.p
                custom={2}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8 lg:text-xl"
              >
                Các kênh âm thanh và hình ảnh dành cho bản dịch ý nghĩa Kinh Qur'an bằng mọi ngôn ngữ trên thế giới — một waqf vì Allah.
              </motion.p>

              <motion.div
                custom={3}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4"
              >
                <a
                  href="#features"
                  className="group inline-flex items-center justify-center gap-3 rounded-2xl border px-6 py-3.5 text-sm font-bold shadow-[0_8px_20px_rgba(8,8,32,0.24)] transition hover:scale-[1.02] sm:px-7 sm:py-4 sm:text-base"
                  style={{
                    backgroundColor: CTA_DARK,
                    borderColor: "rgba(212,176,106,0.28)",
                    color: ACCENT,
                  }}
                >
                  <Sparkles
                    className="h-5 w-5 transition group-hover:rotate-12"
                    style={{ color: ACCENT }}
                  />
                  Khám phá nền tảng
                </a>

                <a
                  href="https://www.youtube.com/@SANA.Ti%E1%BA%BFngVi%E1%BB%87t"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:border-[#D4B06A]/20 hover:bg-white/15 sm:px-7 sm:py-4 sm:text-base"
                >
                  <Play className="h-5 w-5" />
                  Truy cập kênh của chúng tôi
                </a>
              </motion.div>

              <motion.div
                custom={4}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4"
              >
                {stats.map((item, i) => (
                  <motion.div
                    key={item.label}
                    animate={isMobile ? {} : { y: [0, -4, 0] }}
                    transition={
                      isMobile
                        ? {}
                        : {
                            duration: 4 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                    }
                    className="rounded-3xl border border-white/10 bg-white/10 p-3 text-center backdrop-blur-md shadow-[0_6px_16px_rgba(0,0,0,0.12)] sm:p-4"
                  >
                    <div
                      className="text-xl font-black sm:text-2xl"
                      style={{ color: ACCENT }}
                    >
                      {item.value}
                    </div>
                    <div className="mt-2 text-xs text-white/70 sm:text-sm">
                      {item.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, rotate: isMobile ? 0 : -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="order-2 relative lg:order-2"
            >
              <motion.div
                animate={isMobile ? {} : { y: [0, -10, 0] }}
                transition={
                  isMobile
                    ? {}
                    : { duration: 7, repeat: Infinity, ease: "easeInOut" }
                }
                className={`relative mx-auto max-w-2xl p-3 sm:p-4 ${gradientOuterCard}`}
              >
                <div className={`rounded-[1.6rem] border border-white/10 p-4 sm:p-6 ${INNER_GRADIENT}`}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs text-white/60 sm:text-sm">
                        Ngôn ngữ hiện tại
                      </p>
                      <h3 className="mt-1 text-xl font-bold sm:text-2xl">
                        Kinh Qur'an bằng tiếng Việt
                      </h3>
                    </div>
                    <div className="w-fit rounded-2xl border border-[#D4B06A]/25 bg-[#D4B06A]/12 px-4 py-2 text-xs text-[#F4E7C8] sm:text-sm">
                      Phát sóng trực tiếp
                    </div>
                  </div>

                  <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-[rgba(6,28,36,0.58)] p-4 sm:mt-8 sm:p-6">
                    <div className="mb-4 flex items-start gap-3 text-sm text-white/80 sm:items-center sm:text-base">
                      <Headphones className="mt-0.5 h-5 w-5 shrink-0 text-[#7ED6C2] sm:mt-0" />
                      <span>
                        Nghe phần xướng đọc cùng phần hiển thị trực quan về ý nghĩa Kinh Qur'an
                      </span>
                    </div>

                    {!isMobile && (
                      <div className="space-y-3">
                        {[65, 88, 42].map((w, idx) => (
                          <motion.div
                            key={idx}
                            animate={{
                              width: [`${w - 14}%`, `${w}%`, `${w - 8}%`],
                            }}
                            transition={{
                              duration: 3 + idx,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="h-3 rounded-full bg-gradient-to-r from-[#7ED6C2] via-[#D9F6EE] to-[#D4B06A]"
                          />
                        ))}
                      </div>
                    )}

                    <div className="mt-6 grid grid-cols-3 gap-2 text-center sm:mt-8 sm:gap-3">
                      {heroCards.map((item) => (
                        <div
                          key={item.label}
                          className="flex min-h-[108px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-2 py-3 sm:min-h-[120px] sm:p-4"
                        >
                          <div
                            className="text-[13px] font-bold leading-tight sm:text-lg"
                            style={{ color: ACCENT }}
                          >
                            {item.value}
                          </div>
                          <div className="mt-2 text-[10px] leading-4 text-white/65 sm:text-xs sm:leading-5">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <HeroAudioPlayer isMobile={isMobile} />
                  </div>
                </div>
              </motion.div>

              <div className="mx-auto mt-5 grid max-w-2xl gap-3 sm:mt-6 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
                {heroBadges.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="w-full rounded-[1.4rem] border border-white/10 bg-white/10 px-5 py-4 text-center backdrop-blur-md shadow-[0_6px_16px_rgba(0,0,0,0.12)] sm:min-w-[220px] sm:w-auto sm:rounded-[1.6rem]"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 sm:h-11 sm:w-11">
                          <Icon className="h-5 w-5" style={{ color: ACCENT }} />
                        </div>
                        <div className="text-sm font-bold text-white sm:text-base">
                          {item.title}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </section>

          <section id="about" className="py-4 lg:py-8">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-8 text-center"
            >
              <LargeSectionBadge
                icon={BookOpen}
                text="Bản sắc Qur'an toàn cầu"
              />
            </motion.div>

            <div className="space-y-6">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.16 }}
                custom={0}
                variants={fadeUp}
              >
                <IdentityCard {...identityCards[0]} large isMobile={isMobile} />
              </motion.div>

              <div className="grid gap-6 lg:grid-cols-2">
                {identityCards.slice(1).map((card, i) => (
                  <motion.div
                    key={card.title}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.16 }}
                    custom={i + 1}
                    variants={fadeUp}
                  >
                    <IdentityCard {...card} isMobile={isMobile} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-8 lg:py-12">
            <div className="mb-6 text-center">
              <LargeSectionBadge
                icon={Building2}
                text="Thực hiện & giám sát"
              />
            </div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className={`relative overflow-hidden p-5 sm:p-6 md:p-10 ${gradientOuterCard}`}
            >
              {!isMobile && (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(214,195,161,0.08),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(212,176,106,0.08),transparent_32%)]" />
              )}

              <div className="relative z-10">
                <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-8">
                  <div className="rounded-[1.8rem] border border-white/10 bg-[rgba(7,37,44,0.46)] p-4 sm:p-6">
                    <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
                      <h2 className="text-2xl font-black sm:text-3xl lg:text-4xl">
                        Đối tác thực hiện đáng tin cậy
                      </h2>
                      <p className="mt-5 text-base leading-8 text-white/75 sm:text-lg">
                        <span className="font-bold text-white">
                          Kênh Qur'an Sana
                        </span>{" "}
                        dự án được triển khai bởi{" "}
                        <span
                          className="font-bold"
                          style={{ color: ACCENT }}
                        >
                          Saudi Jordanian Satellite Broadcasting Company (JASCO)
                        </span>{" "}
                        tại Amman, Jordan, với năng lực hàng đầu trong lĩnh vực sản xuất và phát sóng truyền thông.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-[1.8rem] border border-white/10 bg-[rgba(7,37,44,0.72)] p-4 sm:p-6">
                    <div className="flex h-full flex-col justify-center rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
                      <div className="text-sm text-white/60">
                        Trang web chính thức
                      </div>
                      <div className="mt-2 text-xl font-bold sm:text-2xl">
                        Jasco Media City
                      </div>
                      <a
                        href="https://jascomediacity.net/"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex w-fit items-center gap-2 rounded-2xl border border-[#D4B06A]/25 bg-[#D4B06A]/10 px-5 py-3 text-sm text-[#F4E7C8] transition hover:bg-[#D4B06A]/18 sm:text-base"
                      >
                        Truy cập trang Jasco
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <section id="features" className="py-12 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Sparkles, "Tính năng nền tảng")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">
                Sana... Thông điệp cho muôn thế giới
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                Một nền tảng Qur'an ứng dụng những phương thức mới nhất để truyền tải ý nghĩa của Kinh Qur'an Thánh đến thế giới bằng cách kết hợp học thuật vững chắc với công nghệ hiện đại.
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {features.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <StructuredCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section className="py-10 lg:py-14">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Send, "Kênh xuất bản & lan tỏa")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">
                Nhiều kênh hiện diện
              </h2>
            </motion.div>

            <div className="grid gap-5 lg:grid-cols-3">
              {channels.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <StructuredCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section id="portfolio" className="py-12 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Crown, "Tác phẩm của chúng tôi")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">
                Mẫu tác phẩm của chúng tôi
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                Những bản xướng đọc Qur'an đẹp và bản dịch ý nghĩa Kinh Qur'an sang nhiều ngôn ngữ khác nhau trên thế giới — Sana... Thông điệp cho muôn thế giới.
              </p>
            </motion.div>

            <div className="grid gap-5 lg:grid-cols-3">
              {portfolioVideos.map((video, i) => (
                <ProtectedHlsVideoCard
                  key={video}
                  video={video}
                  index={i}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </section>

          <section className="py-12 lg:py-16">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Globe, "Tác động của dự án")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">
                Tác động và phạm vi lan tỏa của dự án trên toàn thế giới
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                Một thông điệp Qur'an toàn cầu cung cấp những bản dịch đáng tin cậy, mang đến trải nghiệm xúc động và giúp đưa ý nghĩa của Kinh Qur'an Thánh đến các gia đình trên khắp thế giới.
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {impactCards.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <ImpactCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section id="partners" className="py-12 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Users, "Đối tác thành công")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">
                Thành công được xây dựng từ sự hợp tác
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                Dự án đạt được thành công nhờ sự hợp tác của nhiều tổ chức uy tín, bao gồm các bên đóng góp về học thuật, truyền thông, sản xuất và tình nguyện.
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2">
              {partners.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <StructuredCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section id="contact" className="py-8 lg:py-12">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <div className="text-center">
                <div
                  className="inline-flex max-w-full items-center gap-3 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-base font-semibold backdrop-blur-md shadow-[0_6px_16px_rgba(0,0,0,0.12)] sm:px-7 sm:py-4 sm:text-lg"
                  style={{ color: ACCENT }}
                >
                  <Sparkles
                    className="h-5 w-5 shrink-0"
                    style={{ color: ACCENT }}
                  />
                  <span>Liên hệ</span>
                </div>

                <p className="mx-auto mt-5 max-w-4xl text-base leading-8 text-white/75 sm:text-lg">
                  Sana là một thông điệp da’wah toàn cầu, và chúng tôi luôn sẵn lòng đón nhận câu hỏi, góp ý và các cơ hội hợp tác của bạn một cách rõ ràng và trực tiếp.
                </p>
              </div>

              <div
                className={`mt-8 rounded-[2rem] p-4 sm:p-6 md:p-8 ${gradientOuterCard}`}
              >
                <div className="rounded-[2rem] border border-white/10 bg-[rgba(7,37,44,0.72)] p-4 sm:p-6">
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 sm:p-5">
                    <div className="mb-4 text-xl font-bold sm:text-2xl">
                      Kết nối với chúng tôi
                    </div>
                    <div className="space-y-3 text-white/75">
                      <div className="rounded-2xl bg-white/5 px-4 py-3 text-sm sm:text-base">
                        Đội ngũ của chúng tôi sẵn sàng hỗ trợ bạn và phản hồi sớm nhất có thể.
                      </div>
                      <a
                        href="mailto:snachannel159@gmail.com"
                        className="flex items-center justify-center gap-3 rounded-2xl border border-[#D4B06A]/25 bg-[#D4B06A]/10 px-4 py-3 text-center text-sm font-semibold text-[#F4E7C8] transition hover:bg-[#D4B06A]/18 sm:text-base"
                      >
                        <Mail className="h-4 w-4" style={{ color: ACCENT }} />
                        Gửi email
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <footer className="pb-8 pt-4 sm:pb-10">
            <div
              className={`rounded-[2rem] px-4 py-6 sm:px-6 sm:py-8 lg:px-10 ${gradientOuterCard}`}
            >
              <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr_1fr]">
                <div
                  className={`rounded-[1.8rem] border border-white/10 p-4 text-center sm:p-6 ${INNER_GRADIENT}`}
                >
                  <div className="flex h-full min-h-[420px] flex-col items-center justify-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-white/10 shadow-[0_0_18px_rgba(255,255,255,0.06)] backdrop-blur-md sm:h-24 sm:w-24">
                      <img
                        src={sanaLogo}
                        alt="logo Sana"
                        className="h-14 w-14 object-contain sm:h-16 sm:w-16"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <div className="mt-4">
                      <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs text-white/90 sm:px-5 sm:text-sm">
                        Kênh Qur'an Sana
                      </span>
                    </div>

                    <div
                      className="mt-4 text-2xl font-black sm:text-3xl"
                      style={{ color: ACCENT }}
                    >
                      Sana... Thông điệp cho muôn thế giới
                    </div>

                    <p className="mx-auto mt-4 max-w-xl rounded-[1.4rem] border border-[#D4B06A]/20 bg-[linear-gradient(135deg,rgba(6,28,36,0.78)_0%,rgba(11,59,54,0.66)_52%,rgba(15,118,110,0.42)_100%)] px-4 py-4 text-sm leading-7 text-white/90 sm:px-5 sm:text-base sm:leading-8">
                      Các kênh âm thanh và hình ảnh dành cho bản dịch ý nghĩa Kinh Qur'an bằng mọi ngôn ngữ trên thế giới, như một dự án waqf kết hợp vẻ đẹp trong cách trình bày, độ chính xác của ý nghĩa và sự chân thành của thông điệp.
                    </p>
                  </div>
                </div>

                <div className={`rounded-[1.6rem] border border-white/10 p-4 sm:p-5 text-center flex h-full flex-col items-center justify-center ${OUTER_GRADIENT}`}>
                  <div className="mb-5 flex flex-col items-center justify-center gap-3 text-white">
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-[1.35rem] border border-[#D4B06A]/20 bg-[linear-gradient(135deg,rgba(15,118,110,0.24)_0%,rgba(212,176,106,0.16)_100%)] shadow-[0_0_24px_rgba(15,118,110,0.12)] backdrop-blur-md">
                      <MessageCircle
                        className="relative z-10 h-7 w-7 sm:h-8 sm:w-8"
                        style={{ color: ACCENT }}
                      />
                    </div>
                    <div className="text-lg font-bold sm:text-xl">
                      Thông tin của chúng tôi
                    </div>
                  </div>

                  <div className="w-full space-y-4 text-white/72 flex flex-col items-center">
                    <a
                      href="mailto:snachannel159@gmail.com"
                      className="flex w-full items-center justify-center gap-3 break-all rounded-2xl border border-white/10 bg-[rgba(7,37,44,0.50)] px-4 py-3 text-sm text-center transition hover:bg-white/10 sm:text-base"
                    >
                      <Mail
                        className="h-5 w-5 shrink-0"
                        style={{ color: ACCENT }}
                      />
                      <span className="text-center">snachannel159@gmail.com</span>
                    </a>

                    <div className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[rgba(7,37,44,0.50)] px-4 py-3 text-sm text-center sm:text-base">
                      <MapPin
                        className="h-5 w-5 shrink-0"
                        style={{ color: ACCENT }}
                      />
                      <span>Amman - Jordan</span>
                    </div>
                  </div>

                  <div className="mt-5 w-full rounded-[1.4rem] border border-white/10 bg-[rgba(7,37,44,0.46)] p-4 text-center">
                    <a
                      href="https://www.facebook.com/people/SANATi%E1%BA%BFng-Vi%E1%BB%87t/61586280417137/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white transition hover:scale-[1.01] hover:bg-white/10"
                    >
                      <Globe className="h-5 w-5" style={{ color: ACCENT }} />
                      Theo dõi chúng tôi trên Facebook
                    </a>

                    <p className="mt-4 text-center text-sm leading-6 text-white/70">
                      Bắt đầu hành trình Qur'an của bạn ngay bây giờ
                    </p>
                  </div>
                </div>

                <div className={`rounded-[1.8rem] border border-white/10 p-4 backdrop-blur-md sm:p-5 text-center flex h-full flex-col items-center justify-center ${OUTER_GRADIENT}`}>
                  <div className="mb-5 flex flex-col items-center justify-center gap-3 text-white">
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-[1.35rem] border border-[#D4B06A]/20 bg-[linear-gradient(135deg,rgba(15,118,110,0.24)_0%,rgba(212,176,106,0.16)_100%)] shadow-[0_0_24px_rgba(15,118,110,0.12)] backdrop-blur-md">
                      <Link2
                        className="relative z-10 h-7 w-7 sm:h-8 sm:w-8"
                        style={{ color: ACCENT }}
                      />
                    </div>
                    <div className="text-lg font-bold sm:text-xl">
                      Liên kết ứng dụng
                    </div>
                  </div>

                  <div className="w-full rounded-[1.4rem] border border-white/10 bg-[rgba(7,37,44,0.46)] p-4 text-center">
                    <p className="mb-4 text-sm leading-7 text-white/65">
                      Tải ứng dụng và bắt đầu theo dõi nội dung Qur'an một cách dễ dàng thông qua các nền tảng chính thức.
                    </p>

                    <div className="grid gap-3 md:grid-cols-2">
                      <a
                        href="https://play.google.com/store/apps/details?id=com.sana_all&pcampaignid=web_share"
                        target="_blank"
                        rel="noreferrer"
                        className="group rounded-[1.3rem] border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:bg-white/10"
                      >
                        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#D4B06A]/10 text-white">
                            <GooglePlayIcon />
                          </div>
                          <span className="whitespace-nowrap text-sm font-bold text-white sm:text-base">
                            Google Play
                          </span>
                        </div>
                      </a>

                      <a
                        href="https://apps.apple.com/us/app/sana-tv-%D8%B3%D9%86%D8%A7/id6742054715"
                        target="_blank"
                        rel="noreferrer"
                        className="group rounded-[1.3rem] border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:bg-white/10"
                      >
                        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#D4B06A]/10 text-white">
                            <AppStoreIcon />
                          </div>
                          <span className="text-sm font-bold text-white sm:text-base">
                            App Store
                          </span>
                        </div>
                      </a>
                    </div>

                    <div className="mt-5 rounded-[1.4rem] border border-white/10 bg-[rgba(6,28,36,0.62)] p-4 text-center">
                      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/65">
                        <span className="flex items-center gap-1.5">
                          <span style={{ color: ACCENT }}>★</span> đánh giá 4.9
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span style={{ color: ACCENT }}>🌍</span> 100+
                          quốc gia
                        </span>
                      </div>

                      <a
                        href="https://www.youtube.com/@SANA.Ti%E1%BA%BFngVi%E1%BB%87t"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#D4B06A]/25 bg-[#D4B06A]/10 py-3 text-sm font-bold text-[#F4E7C8] transition hover:scale-[1.01] hover:bg-[#D4B06A]/18"
                      >
                        <Sparkles className="h-4 w-4" />
                        Bắt đầu ngay
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-5 text-center text-xs text-white/55 sm:text-sm">
                Mọi quyền được bảo lưu © Kênh Qur'an Sana.
              </div>
            </div>
          </footer>
        </div>
      </div>
    </LazyMotion>
  );
}
