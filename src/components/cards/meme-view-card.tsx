import Image from "next/image";

import { MemeViewCardProps } from "@/types/props";

import { Card, CardContent } from "../ui/card";

export default function MemeViewCard({ meme, key, onClick, style }: MemeViewCardProps) {
  return (
    <Card
      key={key}
      className="inline-block bg-muted rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 mx-2"
      onClick={onClick}
      style={style}
    >
      <Image
        src={meme.url}
        alt={meme.name}
        width={300}
        height={300}
        className="object-cover w-full h-full"
      />
      <CardContent>
        <p className="text-center">{meme.name}</p>
      </CardContent>
    </Card>
  )
};
