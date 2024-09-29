import { Meme } from "@/types/meme";
import { useCallback, useEffect, useState } from "react";

export default function useMemesHook(memesPerLoad: number) {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [visibleMemes, setVisibleMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [moreLoading, setMoreLoading] = useState<boolean>(false);

  const loadMore = useCallback((): void => {
    setMoreLoading(true);
    const newVisibleMemes = memes.slice(0, visibleMemes.length + memesPerLoad);
    setVisibleMemes(newVisibleMemes);
    setMoreLoading(false);
  }, [memes, memesPerLoad, visibleMemes.length]);

  const fetchMemes = useCallback(async () => {
    setLoading(true);

    const response = await fetch("https://api.imgflip.com/get_memes");

    const data = await response.json();

    setMemes(data.data.memes);
    setVisibleMemes(data.data.memes.slice(0, memesPerLoad));
    setLoading(false);
  }, [memesPerLoad]);

  useEffect(() => {
    fetchMemes();
  }, [fetchMemes]);

  return {
    totalCount: memes.length,
    memes: visibleMemes,
    loading,
    moreLoading,
    loadMore,
    hasMore: visibleMemes.length < memes.length,
  };
}