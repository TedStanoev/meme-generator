import { useCallback, useRef, useState } from "react";
import Draggable from "react-draggable";
import Image from "next/image";

import { downloadCanvas } from "@/lib/utils";
import { MemeEditCardProps } from "@/types/props";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export default function MemeEditCard({ meme, style }: MemeEditCardProps) {
  const [text, setText] = useState('');

  const memeRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async (): Promise<void> => {
    if (memeRef.current) {
      await downloadCanvas(memeRef.current);
    }
  }, []);

  return (
    <Card className="w-full max-w-md" style={style}>
      <CardHeader>
        <CardTitle className="text-center">Customize Your Meme</CardTitle>
      </CardHeader>

      <CardContent>
        <div
          ref={memeRef}
          className="relative bg-muted rounded-lg overflow-hidden"
        >
          <Image
            src={meme.url}
            alt={meme.name}
            width={300}
            height={300}
            className="object-cover w-full h-full"
          />

          <Draggable
            defaultPosition={{ x: 0, y: 0 }}
            handle=".handle"
          >
            <div
              className="absolute text-black text-xl font-bold whitespace-pre-wrap handle"
              style={{ left: 0, top: 0 }}
            >
              {text}
            </div>
          </Draggable>
        </div>

        <div className="mt-4">
          <Label htmlFor="meme-text">Add your text</Label>
          <Textarea
            id="meme-text"
            placeholder="Enter your meme text"
            className="mt-1 w-full"
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <Button className="w-full mt-4 bg-teal-200" onClick={handleDownload}>
          Download Meme
        </Button>
      </CardContent>
    </Card>
  )
};
