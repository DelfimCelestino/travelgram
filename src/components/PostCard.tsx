"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart, MessageCircle, Share2, Bookmark, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useState } from "react";
import { Traveler } from "@/types/traveler";
import { Post } from "@/types/post";
import { formatDistanceToNow } from "date-fns";
import { pt } from "date-fns/locale";
import Link from "next/link";

export default function PostCard({
  traveler,
  post,
}: {
  traveler: Traveler;
  post: Post;
}) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [comment, setComment] = useState("");

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      // Handle comment submission
      setComment("");
    }
  };

  return (
    <Card>
      <CardHeader
        className="flex-row items-center space-y-0 gap-3 cursor-pointer"
        onClick={() => router.push(`/profile/${traveler.id}`)}
      >
        <Image
          src={traveler.avatar || "/placeholder.svg"}
          alt={`Avatar de ${traveler.name}`}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <div className="font-semibold">{traveler.name}</div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-1 h-3 w-3" />
            {traveler.location}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative aspect-square">
          <Link href={`/post/${post.id}`}>
            <Image
              src={post.image || "/placeholder.svg"}
              alt="Foto do post"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority={post.id <= 2} // Prioritize first 2 posts
            />
          </Link>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLike}
                aria-label={isLiked ? "Descurtir" : "Curtir"}
              >
                <Heart
                  className={`h-6 w-6 ${
                    isLiked ? "fill-red-500 text-red-500" : ""
                  }`}
                />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Comentar">
                <MessageCircle className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Compartilhar">
                <Share2 className="h-6 w-6" />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSave}
              aria-label={isSaved ? "Remover dos salvos" : "Salvar"}
            >
              <Bookmark
                className={`h-6 w-6 ${isSaved ? "fill-current" : ""}`}
              />
            </Button>
          </div>
          <div className="mt-4 space-y-2">
            <p className="font-semibold">
              {post.likes + (isLiked ? 1 : 0)} curtidas
            </p>
            <p>
              <span className="font-semibold">{traveler.name}</span>{" "}
              {post.description}
            </p>
            <button
              onClick={() => router.push(`/post/${post.id}`)}
              className="text-sm text-muted-foreground"
            >
              Ver todos os {post.comments} comentários
            </button>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
                locale: pt,
              })}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-4 py-3">
        <form
          onSubmit={handleComment}
          className="flex w-full items-center gap-3"
        >
          <Image
            src="https://github.com/delfimcelestino.png"
            alt="Seu avatar"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
          <Input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Adicione um comentário..."
            className="flex-1 bg-transparent outline-none"
            aria-label="Adicionar comentário"
          />
          <Button
            type="submit"
            variant="ghost"
            className="text-sm font-semibold text-blue-500"
            disabled={!comment.trim()}
          >
            Publicar
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
