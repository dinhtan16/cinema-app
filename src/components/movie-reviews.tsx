"use client";

import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

const mockReviews: Review[] = [
  {
    id: "1",
    userName: "Nguyễn Văn A",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
    rating: 5,
    comment: "Phim rất hay, đáng xem! Cốt truyện hấp dẫn, diễn xuất tốt.",
    date: "20/11/2025",
  },
  {
    id: "2",
    userName: "Trần Thị B",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
    rating: 4,
    comment: "Phim ổn, nhưng hơi dài. Hiệu ứng đẹp mắt.",
    date: "19/11/2025",
  },
  {
    id: "3",
    userName: "Lê Văn C",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
    rating: 5,
    comment: "Xuất sắc! Đây là một trong những bộ phim hay nhất năm.",
    date: "18/11/2025",
  },
];

export function MovieReviews({ movieId }: { movieId: string }) {
  const [reviews] = useState<Review[]>(mockReviews);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);

  const averageRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card className="p-6 bg-secondary/10">
        <div className="flex items-center gap-8">
          <div className="text-center">
            <div className="text-5xl font-bold text-primary mb-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex items-center justify-center gap-1 mb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(averageRating)
                      ? "fill-yellow-500 text-yellow-500"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              {reviews.length} đánh giá
            </p>
          </div>

          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = reviews.filter((r) => r.rating === star).length;
              const percentage = (count / reviews.length) * 100;
              return (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-sm w-8">{star} ⭐</span>
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Write Review */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Viết đánh giá của bạn</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Đánh giá</label>
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setNewRating(i + 1)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      i < newRating
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Nhận xét</label>
            <Textarea
              placeholder="Chia sẻ cảm nhận của bạn về bộ phim..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              rows={4}
            />
          </div>
          <Button disabled={!newRating || !newReview.trim()}>
            Gửi đánh giá
          </Button>
        </div>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Đánh giá từ khán giả</h3>
        {reviews.map((review) => (
          <Card key={review.id} className="p-4">
            <div className="flex items-start gap-4">
              <Avatar className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                <img src={review.userAvatar} alt={review.userName} />
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold">{review.userName}</p>
                    <p className="text-xs text-muted-foreground">
                      {review.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "fill-yellow-500 text-yellow-500"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm">{review.comment}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
