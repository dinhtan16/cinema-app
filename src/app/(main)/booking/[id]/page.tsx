"use client";

import { useState, use, useMemo, useEffect } from "react";
import { movies } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const ROWS = 8;
const COLS = 10;
const VIP_ROWS = [3, 4, 5];

// Theater data with showtimes - varies by day
const ALL_THEATERS = [
  { id: "cgv-vincom", name: "CGV Vincom", address: "Tầng 7, Vincom Center" },
  { id: "lotte-center", name: "Lotte Cinema", address: "Tầng 5, Lotte Center" },
  { id: "mega-gs", name: "Mega GS Cinemas", address: "Tầng 3, Mega Mall" },
  {
    id: "galaxy-nguyen-du",
    name: "Galaxy Nguyễn Du",
    address: "116 Nguyễn Du",
  },
  {
    id: "bhd-star",
    name: "BHD Star Cineplex",
    address: "Tầng 3, Vincom Mega Mall",
  },
];

// Generate theaters and showtimes for a specific date
const getTheatersForDate = (dateKey: string) => {
  // Use date key to determine which theaters are available
  const dayIndex = parseInt(dateKey.split("-")[1] || "0");

  // Different theaters available on different days
  const availableTheaters = ALL_THEATERS.filter((_, index) => {
    return (dayIndex + index) % 3 !== 2; // Vary theaters by day
  });

  return availableTheaters.map((theater) => ({
    ...theater,
    showtimes: generateShowtimesForTheater(theater.id, dayIndex),
  }));
};

// Generate showtimes for a specific theater
const generateShowtimesForTheater = (theaterId: string, dayIndex: number) => {
  const baseShowtimes = [
    "09:00",
    "10:30",
    "12:00",
    "13:30",
    "15:00",
    "16:30",
    "18:00",
    "19:30",
    "21:00",
    "22:30",
  ];

  // Different theaters have different showtimes
  const offset = theaterId.length % 3;
  const count = 4 + (dayIndex % 3); // 4-6 showtimes per theater

  return baseShowtimes.slice(offset, offset + count);
};

// Combo options with image placeholder (use unsplash)
const COMBOS = [
  {
    id: "popcorn",
    name: "Bắp rang",
    price: 30000,
    img: "https://images.unsplash.com/photo-1589927986089-35812389fcc5?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: "drink",
    name: "Nước ngọt",
    price: 20000,
    img: "https://images.unsplash.com/photo-1582719478250-5c9a5c1f2e7b?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: "combo1",
    name: "Combo 1 (Bắp + Nước)",
    price: 45000,
    img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=80&q=80",
  },
];

export default function BookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const movie = movies.find((m) => m.id === id);
  const { toast } = useToast();

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("day-0");
  const [selectedTheater, setSelectedTheater] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedCombos, setSelectedCombos] = useState<string[]>([]);

  if (!movie) return <div>Movie not found</div>;

  // Get theaters for selected date
  const availableTheaters = useMemo(() => {
    return getTheatersForDate(selectedDate);
  }, [selectedDate]);

  // Get showtimes for selected theater
  const availableShowtimes = useMemo(() => {
    const theater = availableTheaters.find((t) => t.id === selectedTheater);
    return theater?.showtimes || [];
  }, [selectedTheater, availableTheaters]);

  // Auto-select first theater when date changes
  useEffect(() => {
    if (availableTheaters.length > 0 && !selectedTheater) {
      setSelectedTheater(availableTheaters[0].id);
    }
  }, [availableTheaters, selectedTheater]);

  // Auto-select first showtime when theater changes
  useEffect(() => {
    if (availableShowtimes.length > 0) {
      setSelectedTime(availableShowtimes[0]);
    }
  }, [availableShowtimes]);

  // Generate fixed reserved seats (won't change on re-render)
  const reservedSeats = useMemo(() => {
    const reserved = new Set<string>();
    // Mock some reserved seats (you can customize this)
    reserved.add("D9");
    reserved.add("E3");
    reserved.add("F9");
    reserved.add("G6");
    return reserved;
  }, []);

  const toggleSeat = (row: number, col: number) => {
    const seatId = `${String.fromCharCode(65 + row)}${col + 1}`;
    if (reservedSeats.has(seatId)) return; // Don't allow selecting reserved seats
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  const toggleCombo = (id: string) => {
    setSelectedCombos((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    const seatTotal = selectedSeats.reduce((total, seat) => {
      const rowChar = seat.charAt(0);
      const row = rowChar.charCodeAt(0) - 65;
      const isVip = VIP_ROWS.includes(row);
      return total + movie.price + (isVip ? 20000 : 0);
    }, 0);
    const comboTotal = selectedCombos.reduce((sum, id) => {
      const combo = COMBOS.find((c) => c.id === id);
      return sum + (combo?.price || 0);
    }, 0);
    return seatTotal + comboTotal;
  };

  const handleBooking = () => {
    const selectedDateInfo = dayLabels.find((d) => d.key === selectedDate);
    const selectedTheaterInfo = availableTheaters.find(
      (t) => t.id === selectedTheater
    );
    const total = calculateTotal();

    const params = new URLSearchParams({
      movie: movie.title,
      seats: selectedSeats.join(", "),
      date: `${selectedDateInfo?.day} - ${selectedDateInfo?.date}/${selectedDateInfo?.month}/${selectedDateInfo?.year}`,
      time: selectedTime,
      theater: selectedTheaterInfo?.name || "",
      total: total.toString(),
    });

    window.location.href = `/payment?${params.toString()}`;
  };

  // Generate dynamic date list from today + 20 days
  const generateDayLabels = () => {
    const days = [];
    const today = new Date();
    const vietnameseDays = [
      "Chủ nhật",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
    ];

    for (let i = 0; i < 20; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const dayOfWeek = vietnameseDays[date.getDay()];
      const dateNum = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      let dayLabel = dayOfWeek;
      if (i === 0) dayLabel = "Hôm nay";
      else if (i === 1) dayLabel = "Ngày mai";

      days.push({
        key: `day-${i}`,
        date: dateNum.toString(),
        day: dayLabel,
        month: month.toString(),
        year: year.toString(),
      });
    }

    return days;
  };

  const dayLabels = generateDayLabels();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container pt-8 space-y-12">
        <Link
          href={`/movie/${id}`}
          className="inline-flex items-center text-muted-foreground hover:text-primary mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Quay lại
        </Link>

        {/* Main booking section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side – selectors, screen, seats, legend */}
          <div className="lg:col-span-2 space-y-8">
            {/* Date selector (horizontal slide) */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Ngày chiếu</h3>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {dayLabels.map((d) => (
                  <button
                    key={d.key}
                    onClick={() => setSelectedDate(d.key)}
                    className={cn(
                      "shrink-0 flex flex-col items-center justify-center w-16 h-16 rounded-lg border-2 transition-all",
                      selectedDate === d.key
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-background border-border hover:border-primary/50"
                    )}
                  >
                    <span className="text-2xl font-bold">{d.date}</span>
                    <span className="text-[10px] uppercase">{d.day}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Theater selector */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Rạp chiếu</h3>
              <div className="flex gap-2">
                {availableTheaters.map((t) => (
                  <Button
                    key={t.id}
                    variant={selectedTheater === t.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTheater(t.id)}
                  >
                    {t.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Showtime selector */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Suất chiếu</h3>
              <div className="grid grid-cols-3 gap-2">
                {availableShowtimes.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTime(time)}
                    className="text-xs"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>

            {/* Screen visual */}
            <div className="w-full flex flex-col items-center mb-4">
              <div className="w-3/4 h-2 bg-primary/50 rounded-full mb-2 shadow-[0_0_30px_rgba(var(--primary),0.5)]" />
              <p className="text-xs text-muted-foreground">MÀN HÌNH</p>
            </div>

            {/* Seats Grid */}
            <div className="flex justify-center overflow-x-auto pb-4">
              <div
                className="grid gap-2 md:gap-3"
                style={{
                  gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
                }}
              >
                {Array.from({ length: ROWS }).map((_, row) =>
                  Array.from({ length: COLS }).map((_, col) => {
                    const seatId = `${String.fromCharCode(65 + row)}${col + 1}`;
                    const isSelected = selectedSeats.includes(seatId);
                    const isVip = VIP_ROWS.includes(row);
                    const isReserved = reservedSeats.has(seatId);
                    return (
                      <button
                        key={seatId}
                        disabled={isReserved}
                        onClick={() => toggleSeat(row, col)}
                        className={cn(
                          "h-8 w-8 md:h-10 md:w-10 rounded-t-lg md:rounded-t-xl text-[10px] md:text-xs font-medium transition-all duration-200 flex items-center justify-center border-b-4",
                          isReserved
                            ? "bg-muted text-muted-foreground cursor-not-allowed border-muted-foreground/30"
                            : isSelected
                            ? "bg-primary text-primary-foreground border-primary-foreground/30 shadow-[0_0_15px_rgba(var(--primary),0.6)] transform -translate-y-1"
                            : isVip
                            ? "bg-purple-900/40 border-purple-500/50 hover:bg-purple-800/60 hover:border-purple-400"
                            : "bg-secondary border-secondary-foreground/20 hover:bg-secondary/80 hover:border-secondary-foreground/40"
                        )}
                      >
                        {seatId}
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-secondary rounded border-b-2 border-secondary-foreground/20" />
                <span>Thường</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-purple-900/40 rounded border-b-2 border-purple-500/50" />
                <span>VIP</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-primary rounded border-b-2 border-primary-foreground/30" />
                <span>Đang chọn</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-muted rounded border-b-2 border-muted-foreground/30" />
                <span>Đã đặt</span>
              </div>
            </div>
          </div>

          {/* Right side – summary + combo selection */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24 border-primary/20 bg-secondary/10 backdrop-blur-sm">
              <div className="flex gap-4 mb-6">
                <div className="relative w-20 h-28 rounded-md overflow-hidden shrink-0">
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg line-clamp-2">
                    {movie.title}
                  </h3>
                  <div className="text-sm text-muted-foreground mt-1">
                    {movie.duration} phút
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold mt-1">
                    <div className="px-2 py-0.5 bg-yellow-500/10 rounded text-xs">
                      2D Phụ đề
                    </div>
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Ngày chiếu
                  </label>
                  <p>
                    {dayLabels.find((d) => d.key === selectedDate)?.day} -{" "}
                    {dayLabels.find((d) => d.key === selectedDate)?.date}/
                    {dayLabels.find((d) => d.key === selectedDate)?.month}/
                    {dayLabels.find((d) => d.key === selectedDate)?.year}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Rạp chiếu
                  </label>
                  <p>
                    {
                      availableTheaters.find((t) => t.id === selectedTheater)
                        ?.name
                    }
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Suất chiếu
                  </label>
                  <p>{selectedTime}</p>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ghế đã chọn:</span>
                  <span className="font-medium text-primary break-all text-right pl-4">
                    {selectedSeats.length > 0
                      ? selectedSeats.join(", ")
                      : "Chưa chọn"}
                  </span>
                </div>

                {/* Combo selection list */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Chọn combo</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {COMBOS.map((combo) => (
                      <Button
                        key={combo.id}
                        variant={
                          selectedCombos.includes(combo.id)
                            ? "default"
                            : "outline"
                        }
                        onClick={() => toggleCombo(combo.id)}
                        className="flex items-center justify-between p-2"
                      >
                        <div className="flex items-center gap-2">
                          <Image
                            src={combo.img}
                            alt={combo.name}
                            width={40}
                            height={40}
                            className="rounded"
                          />
                          <span>{combo.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {combo.price.toLocaleString()} đ
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Total moved below combo */}
                <Separator className="my-4" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Tổng tiền:</span>
                  <span>{calculateTotal().toLocaleString()} đ</span>
                </div>

                <Button
                  className="w-full mt-4 text-lg font-bold h-12"
                  disabled={selectedSeats.length === 0}
                  onClick={handleBooking}
                >
                  Thanh toán
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Movie slider at bottom */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Phim đang chiếu</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {movies.map((m) => (
              <Link
                key={m.id}
                href={`/movie/${m.id}`}
                className="group block shrink-0"
              >
                <div className="relative w-48 aspect-[2/3] rounded-lg overflow-hidden shadow-lg border border-white/10">
                  <Image
                    src={m.poster}
                    alt={m.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <p className="mt-2 text-center text-sm font-medium text-foreground group-hover:text-primary transition-colors w-48 line-clamp-2">
                  {m.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
