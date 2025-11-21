"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Download, Home, Ticket } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const method = searchParams.get("method") || "";
  const total = searchParams.get("total") || "0";

  const methodNames: Record<string, string> = {
    momo: "Ví MoMo",
    zalopay: "ZaloPay",
    vnpay: "VNPAY",
    "visa-master": "Thẻ Visa/Mastercard",
    atm: "Thẻ ATM nội địa",
    banking: "Internet Banking",
    shopeepay: "ShopeePay",
    qr: "Quét mã QR",
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold mb-2">Thanh toán thành công!</h1>
        <p className="text-muted-foreground mb-8">
          Đơn hàng của bạn đã được xác nhận và thanh toán thành công
        </p>

        {/* Payment Details */}
        <div className="bg-secondary/10 rounded-lg p-6 mb-8 text-left">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Mã giao dịch</p>
              <p className="font-mono font-semibold">
                TXN{Date.now().toString().slice(-8)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Phương thức</p>
              <p className="font-semibold">
                {methodNames[method] || "Không xác định"}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Số tiền</p>
              <p className="text-2xl font-bold text-primary">
                {parseInt(total).toLocaleString()}đ
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Thời gian</p>
              <p className="font-semibold">
                {new Date().toLocaleString("vi-VN")}
              </p>
            </div>
          </div>
        </div>

        {/* Info Message */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-8 text-left">
          <div className="flex items-start gap-3">
            <Ticket className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1 text-blue-500">
                Vé điện tử đã được gửi
              </h3>
              <p className="text-sm text-muted-foreground">
                Vé điện tử và mã QR đã được gửi đến email của bạn. Vui lòng kiểm
                tra hộp thư để xem chi tiết.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" className="flex-1" asChild>
            <Link href="/my-tickets">
              <Ticket className="w-4 h-4 mr-2" />
              Xem vé của tôi
            </Link>
          </Button>
          <Button variant="outline" className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            Tải vé xuống
          </Button>
          <Button className="flex-1" asChild>
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Về trang chủ
            </Link>
          </Button>
        </div>

        {/* Support */}
        <p className="text-sm text-muted-foreground mt-8">
          Cần hỗ trợ? Liên hệ{" "}
          <a
            href="mailto:support@cinevibe.vn"
            className="text-primary hover:underline"
          >
            support@cinevibe.vn
          </a>
        </p>
      </Card>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
