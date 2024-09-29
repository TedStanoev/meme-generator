"use client";

import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import { Button } from "@/components/ui/button";
import { Meme } from "@/types/meme";
import useMemesHook from "@/hooks/useMemesHook";

import MemeViewCard from "./cards/meme-view-card";
import MemeEditCard from "./cards/meme-edit-card";

const memesPerLoad = 4;

export default function MemeGenerator() {
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);
  
  const {
    memes,
    loading,
    moreLoading,
    loadMore,
    totalCount,
    hasMore,
  } = useMemesHook(memesPerLoad);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="max-w-6xl w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Meme Generator
            </h1>
            <p className="text-muted-foreground">
              Create custom memes with our easy-to-use generator.
            </p>
          </div>
          {loading ? (
            <ClipLoader className="w-12 h-12 text-blue-500" />
          ) : (
            <>
              <div className="p-2 border border-green-400 rounded-lg max-w-[100%] h-full">
                <p className="text-end">Total memes: {totalCount}</p>
                <div className="w-full overflow-x-scroll overflow-y-clip h-full whitespace-nowrap">
                  {memes.map((meme) => (
                    <MemeViewCard
                      key={meme.id}
                      meme={meme}
                      onClick={() => setSelectedMeme(meme)}
                    />
                  ))}
                </div>
              </div>

              {hasMore && (
                <Button
                  onClick={loadMore}
                  disabled={moreLoading}
                  className="mt-4"
                >
                  {moreLoading ? (
                    <ClipLoader className="w-6 h-6 text-white" />
                  ) : (
                    "Load More"
                  )}
                </Button>
              )}
            </>
          )}

          {selectedMeme && (
            <MemeEditCard meme={selectedMeme} style={{ borderColor: 'rgb(74 219 128)' }} />
          )}
        </div>
      </div>
    </div>
  );
};
