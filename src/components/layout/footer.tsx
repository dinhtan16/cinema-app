import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background/50 backdrop-blur-lg">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary">CINEVIBE</h3>
            <p className="text-sm text-muted-foreground">
              Trải nghiệm điện ảnh đỉnh cao với hệ thống rạp chiếu phim hiện đại
              và trẻ trung nhất.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Về chúng tôi</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Tuyển dụng
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Điều khoản</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary">
                  Điều khoản chung
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Quy định thành viên
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Kết nối</h4>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 text-center text-sm text-muted-foreground">
          © 2024 CineVibe. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
