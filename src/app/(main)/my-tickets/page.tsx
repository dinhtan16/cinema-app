"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  Ticket,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

// Mock data for purchased tickets
const purchasedTickets = [
  {
    id: "TKT001",
    movieTitle: "Cyberpunk: Edgerunners",
    moviePoster:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80",
    theater: "CGV Vincom",
    date: "18/11/2025",
    time: "19:00",
    seats: ["D5", "D6"],
    totalPrice: 180000,
    paymentMethod: "Thẻ tín dụng",
    purchaseDate: "15/11/2025",
    status: "upcoming",
    format: "2D Phụ đề",
  },
  {
    id: "TKT002",
    movieTitle: "Avatar: The Way of Water",
    moviePoster:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80",
    theater: "Lotte Center",
    date: "14/11/2025",
    time: "20:00",
    seats: ["E7", "E8", "E9"],
    totalPrice: 270000,
    paymentMethod: "Ví MoMo",
    purchaseDate: "10/11/2025",
    status: "completed",
    format: "3D IMAX",
  },
  {
    id: "TKT003",
    movieTitle: "Inception",
    moviePoster:
      "https://images.unsplash.com/photo-1594908900066-3f47337549d8?auto=format&fit=crop&w=800&q=80",
    theater: "Mega Mall",
    date: "10/11/2025",
    time: "15:00",
    seats: ["F4", "F5"],
    totalPrice: 160000,
    paymentMethod: "Tiền mặt",
    purchaseDate: "08/11/2025",
    status: "completed",
    format: "2D Phụ đề",
  },
  {
    id: "TKT004",
    movieTitle: "The Batman",
    moviePoster:
      "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?auto=format&fit=crop&w=800&q=80",
    theater: "CGV Vincom",
    date: "05/11/2025",
    time: "21:00",
    seats: ["C3", "C4"],
    totalPrice: 140000,
    paymentMethod: "Thẻ tín dụng",
    purchaseDate: "01/11/2025",
    status: "completed",
    format: "2D Phụ đề",
  },
  {
    id: "TKT005",
    movieTitle: "Dune: Part Two",
    moviePoster:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=800&q=80",
    theater: "Lotte Center",
    date: "28/10/2025",
    time: "18:30",
    seats: ["G5", "G6", "G7"],
    totalPrice: 300000,
    paymentMethod: "Ví MoMo",
    purchaseDate: "25/10/2025",
    status: "completed",
    format: "IMAX",
  },
  {
    id: "TKT006",
    movieTitle: "Oppenheimer",
    moviePoster:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
    theater: "CGV Vincom",
    date: "20/10/2025",
    time: "19:30",
    seats: ["B5", "B6"],
    totalPrice: 200000,
    paymentMethod: "Thẻ tín dụng",
    purchaseDate: "18/10/2025",
    status: "completed",
    format: "IMAX",
  },
  {
    id: "TKT007",
    movieTitle: "Barbie",
    moviePoster:
      "https://images.unsplash.com/photo-1594908900066-3f47337549d8?auto=format&fit=crop&w=800&q=80",
    theater: "Lotte Center",
    date: "15/10/2025",
    time: "14:00",
    seats: ["A1", "A2", "A3"],
    totalPrice: 210000,
    paymentMethod: "Ví MoMo",
    purchaseDate: "12/10/2025",
    status: "completed",
    format: "2D Phụ đề",
  },
  {
    id: "TKT008",
    movieTitle: "Spider-Man: No Way Home",
    moviePoster:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80",
    theater: "Mega Mall",
    date: "10/10/2025",
    time: "20:30",
    seats: ["H8", "H9"],
    totalPrice: 170000,
    paymentMethod: "Tiền mặt",
    purchaseDate: "08/10/2025",
    status: "completed",
    format: "3D",
  },
  {
    id: "TKT009",
    movieTitle: "The Matrix Resurrections",
    moviePoster:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80",
    theater: "CGV Vincom",
    date: "05/10/2025",
    time: "16:00",
    seats: ["D10", "D11"],
    totalPrice: 150000,
    paymentMethod: "Thẻ tín dụng",
    purchaseDate: "03/10/2025",
    status: "completed",
    format: "2D Phụ đề",
  },
  {
    id: "TKT010",
    movieTitle: "Top Gun: Maverick",
    moviePoster:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=800&q=80",
    theater: "Lotte Center",
    date: "28/09/2025",
    time: "21:00",
    seats: ["F1", "F2", "F3", "F4"],
    totalPrice: 320000,
    paymentMethod: "Ví MoMo",
    purchaseDate: "25/09/2025",
    status: "completed",
    format: "IMAX",
  },
];

const ITEMS_PER_PAGE = 8;

export default function MyTicketsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return (
          <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30 text-xs">
            Sắp chiếu
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 text-xs">
            Đã xem
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-500/20 text-red-500 hover:bg-red-500/30 text-xs">
            Đã hủy
          </Badge>
        );
      default:
        return null;
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(purchasedTickets.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTickets = purchasedTickets.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container pt-8 space-y-8 max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center text-muted-foreground hover:text-primary mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Quay lại
        </Link>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Vé đã mua</h1>
            <p className="text-muted-foreground">
              Bạn có {purchasedTickets.length} vé trong lịch sử • Trang{" "}
              {currentPage}/{totalPages}
            </p>
          </div>
          <Ticket className="w-12 h-12 text-primary/30" />
        </div>

        <div className="space-y-3">
          {currentTickets.length > 0 ? (
            currentTickets.map((ticket) => (
              <Card
                key={ticket.id}
                className="p-4 border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg group"
              >
                <div className="flex items-center gap-4">
                  {/* Movie Poster - Smaller */}
                  <div className="relative w-16 h-24 rounded-md overflow-hidden shrink-0">
                    <Image
                      src={ticket.moviePoster}
                      alt={ticket.movieTitle}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Ticket Info - Compact */}
                  <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-4 gap-3">
                    {/* Column 1: Movie Info */}
                    <div className="md:col-span-1">
                      <h3 className="font-bold text-sm line-clamp-1 mb-1">
                        {ticket.movieTitle}
                      </h3>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          variant="outline"
                          className="text-[10px] px-1.5 py-0"
                        >
                          {ticket.format}
                        </Badge>
                        {getStatusBadge(ticket.status)}
                      </div>
                      <p className="text-xs text-muted-foreground font-mono">
                        {ticket.id}
                      </p>
                    </div>

                    {/* Column 2: Date & Time */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                        <span>{ticket.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                        <span>{ticket.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="truncate">{ticket.theater}</span>
                      </div>
                    </div>

                    {/* Column 3: Seats & Payment */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Ticket className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="font-medium">
                          {ticket.seats.join(", ")}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <CreditCard className="w-3.5 h-3.5 text-muted-foreground" />
                        <span>{ticket.paymentMethod}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Mua: {ticket.purchaseDate}
                      </div>
                    </div>

                    {/* Column 4: Price & Action */}
                    <div className="flex flex-col justify-center items-end">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground mb-0.5">
                          Tổng tiền
                        </p>
                        <p className="text-lg font-bold text-primary">
                          {ticket.totalPrice.toLocaleString()}đ
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-12 text-center">
              <Ticket className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Chưa có vé nào</h3>
              <p className="text-muted-foreground mb-6">
                Bạn chưa mua vé xem phim nào
              </p>
              <Link
                href="/movies"
                className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Đặt vé ngay
              </Link>
            </Card>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => goToPage(page)}
                className="w-10"
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
