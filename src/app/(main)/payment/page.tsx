"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  Check,
  CreditCard,
  Smartphone,
  Wallet,
  Building2,
  QrCode,
} from "lucide-react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const PAYMENT_METHODS = [
  {
    id: "momo",
    name: "Ví MoMo",
    icon: Wallet,
    description: "Thanh toán qua ví điện tử MoMo",
    logo: "https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png",
    color: "from-pink-600 to-pink-700",
  },
  {
    id: "zalopay",
    name: "ZaloPay",
    icon: Wallet,
    description: "Thanh toán qua ví ZaloPay",
    logo: "https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay.png",
    color: "from-blue-600 to-blue-700",
  },
  {
    id: "vnpay",
    name: "VNPAY",
    icon: CreditCard,
    description: "Thanh toán qua cổng VNPAY",
    logo: "https://vnpay.vn/s1/statics.vnpay.vn/2023/9/06ncktiwd6dc1694418196384.png",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "visa-master",
    name: "Thẻ Visa/Mastercard",
    icon: CreditCard,
    description: "Thanh toán bằng thẻ quốc tế",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg",
    color: "from-indigo-600 to-indigo-700",
  },
  {
    id: "atm",
    name: "Thẻ ATM nội địa",
    icon: CreditCard,
    description: "Thanh toán bằng thẻ ATM các ngân hàng",
    logo: "https://cdn-icons-png.flaticon.com/512/633/633611.png",
    color: "from-green-600 to-green-700",
  },
  {
    id: "banking",
    name: "Internet Banking",
    icon: Building2,
    description: "Chuyển khoản qua ngân hàng",
    logo: "https://cdn-icons-png.flaticon.com/512/2830/2830284.png",
    color: "from-teal-600 to-teal-700",
  },
  {
    id: "shopeepay",
    name: "ShopeePay",
    icon: Wallet,
    description: "Thanh toán qua ví ShopeePay",
    logo: "https://down-vn.img.susercontent.com/file/9263fa8c83628f5deff55e2a90758b06",
    color: "from-orange-600 to-orange-700",
  },
  {
    id: "qr",
    name: "Quét mã QR",
    icon: QrCode,
    description: "Quét mã QR để thanh toán",
    logo: "https://cdn-icons-png.flaticon.com/512/714/714397.png",
    color: "from-purple-600 to-purple-700",
  },
];

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Get booking details from URL params (in real app, would come from state/API)
  const movieTitle = searchParams.get("movie") || "Cyberpunk: Edgerunners";
  const seats = searchParams.get("seats") || "D5, D6";
  const date = searchParams.get("date") || "Thứ 7 - 18/11/2025";
  const time = searchParams.get("time") || "19:00";
  const theater = searchParams.get("theater") || "CGV Vincom";
  const total = parseInt(searchParams.get("total") || "180000");

  const handlePayment = async () => {
    if (!selectedMethod) return;

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      router.push(`/payment-success?method=${selectedMethod}&total=${total}`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container pt-8 space-y-8 max-w-6xl">
        <Link
          href="/booking/1"
          className="inline-flex items-center text-muted-foreground hover:text-primary mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Quay lại
        </Link>

        <div>
          <h1 className="text-3xl font-bold mb-2">Thanh toán</h1>
          <p className="text-muted-foreground">
            Chọn phương thức thanh toán phù hợp
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold mb-4">
              Phương thức thanh toán
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PAYMENT_METHODS.map((method) => {
                const Icon = method.icon;
                return (
                  <Card
                    key={method.id}
                    className={`relative p-4 cursor-pointer transition-all hover:shadow-lg ${
                      selectedMethod === method.id
                        ? "ring-2 ring-primary bg-primary/5"
                        : "hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedMethod(method.id)}
                  >
                    {selectedMethod === method.id && (
                      <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}

                    <div className="flex items-center gap-4">
                      <div
                        className={`w-16 h-16 rounded-lg bg-gradient-to-br ${method.color} flex items-center justify-center shrink-0`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1">{method.name}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {method.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <h3 className="font-semibold text-lg mb-4">Thông tin đặt vé</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Phim</p>
                  <p className="font-medium">{movieTitle}</p>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Ngày chiếu
                    </p>
                    <p className="text-sm font-medium">{date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Giờ chiếu
                    </p>
                    <p className="text-sm font-medium">{time}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Rạp</p>
                  <p className="text-sm font-medium">{theater}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Ghế</p>
                  <p className="text-sm font-medium">{seats}</p>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <p className="font-semibold">Tổng tiền</p>
                  <p className="text-2xl font-bold text-primary">
                    {total.toLocaleString()}đ
                  </p>
                </div>

                <Button
                  className="w-full h-12 text-lg font-bold"
                  disabled={!selectedMethod || isProcessing}
                  onClick={handlePayment}
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Đang xử lý...
                    </div>
                  ) : (
                    "Xác nhận thanh toán"
                  )}
                </Button>

                {selectedMethod && (
                  <p className="text-xs text-center text-muted-foreground">
                    Bạn đang thanh toán qua{" "}
                    <span className="font-semibold text-primary">
                      {
                        PAYMENT_METHODS.find((m) => m.id === selectedMethod)
                          ?.name
                      }
                    </span>
                  </p>
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Security Notice */}
        <Card className="p-4 bg-secondary/10">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
              <Check className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">
                Thanh toán an toàn & bảo mật
              </h4>
              <p className="text-sm text-muted-foreground">
                Thông tin thanh toán của bạn được mã hóa và bảo mật tuyệt đối.
                Chúng tôi không lưu trữ thông tin thẻ của bạn.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
