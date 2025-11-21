import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

const promotions = [
  {
    id: 1,
    title: "GIẢM 50% VÉ XEM PHIM",
    subtitle: "Áp dụng cho thành viên mới",
    description:
      "Đăng ký thành viên mới và nhận ngay ưu đãi giảm 50% cho lần đặt vé đầu tiên. Áp dụng cho tất cả các suất chiếu.",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-purple-600 via-pink-600 to-red-600",
    badge: "HOT",
    validUntil: "31/12/2025",
  },
  {
    id: 2,
    title: "COMBO BẮP NƯỚC CHỈ 99K",
    subtitle: "Tiết kiệm đến 40%",
    description:
      "Combo bắp rang bơ lớn + 2 nước ngọt size L chỉ với 99.000đ. Tiết kiệm 40% so với giá thường.",
    image:
      "https://images.unsplash.com/photo-1585647347384-2593bc35786b?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-orange-600 via-amber-600 to-yellow-600",
    badge: "NEW",
    validUntil: "30/11/2025",
  },
  {
    id: 3,
    title: "THỨ 3 VUI VẺ",
    subtitle: "Giá vé chỉ từ 45K",
    description:
      "Mỗi thứ 3 hàng tuần, giá vé xem phim chỉ từ 45.000đ cho tất cả các suất chiếu. Không giới hạn số lượng.",
    image:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-blue-600 via-cyan-600 to-teal-600",
    badge: "SALE",
    validUntil: "Hàng tuần",
  },
  {
    id: 4,
    title: "SINH NHẬT GIẢM 20%",
    subtitle: "Quà tặng đặc biệt",
    description:
      "Giảm 20% tổng hóa đơn trong tháng sinh nhật của bạn. Áp dụng cho cả vé và combo.",
    image:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-pink-600 via-rose-600 to-red-600",
    badge: "GIFT",
    validUntil: "Cả năm",
  },
];

export default function PromotionsPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container pt-8 space-y-8">
        <Link
          href="/"
          className="inline-flex items-center text-muted-foreground hover:text-primary mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Quay lại
        </Link>

        <div>
          <h1 className="text-4xl font-bold mb-2">Khuyến mãi hot 🔥</h1>
          <p className="text-muted-foreground">
            Các chương trình ưu đãi đặc biệt dành cho bạn
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {promotions.map((promo) => (
            <Card
              key={promo.id}
              className="group relative overflow-hidden border-2 border-white/10 hover:border-primary/50 transition-all hover:scale-[1.02] cursor-pointer"
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${promo.gradient} opacity-90`}
              />

              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay"
                style={{ backgroundImage: `url(${promo.image})` }}
              />

              {/* Badge */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/30 z-10">
                {promo.badge}
              </div>

              {/* Content */}
              <div className="relative p-8 text-white space-y-4 min-h-[200px] flex flex-col">
                <div>
                  <h3 className="text-3xl font-black mb-2 drop-shadow-lg">
                    {promo.title}
                  </h3>
                  <p className="text-lg font-bold opacity-90 mb-4">
                    {promo.subtitle}
                  </p>
                  <p className="text-sm opacity-80 leading-relaxed">
                    {promo.description}
                  </p>
                </div>

                <div className="mt-auto pt-4 border-t border-white/20">
                  <p className="text-xs opacity-70">
                    Có hiệu lực đến: {promo.validUntil}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
