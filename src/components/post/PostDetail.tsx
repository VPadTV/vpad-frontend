import { Post } from "@/types/post";
import { useState, useRef, useEffect } from "react";
import {
  FaArrowUp, FaArrowDown, FaComment,
  FaExclamationTriangle
} from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import CommentSection from "./CommentSection";
import { Button, Chip, Tooltip, Avatar } from "@nextui-org/react";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks";
import { votePost, getPost } from "@/redux/features/postSlice";
import toast from "react-hot-toast";

interface PostDetailProps {
  post: Post;
  hideComments?: boolean;
  id: string
}

export default function PostDetail({ post, hideComments = false, id }: PostDetailProps) {
  const dispatch = useAppDispatch();
  const [voteCount, setVoteCount] = useState<number>(
    (post.meta?.likes || 0) - (post.meta?.dislikes || 0)
  );
  const [userVote, setUserVote] = useState<number>(post.meta?.myVote || 0);
  const [showNsfwWarning, setShowNsfwWarning] = useState(post.meta?.nsfw || false);
  const [fullSizeView, setFullSizeView] = useState(false);
  const [sortCommentsBy, setSortCommentsBy] = useState<'latest' | 'oldest' | 'popular'>('latest');
  const mediaRef = useRef<HTMLDivElement>(null);


  const UpdateVote= async (vote: number) => {
    try {

      await dispatch(votePost({ postId: id, vote }));
      await dispatch(getPost(id));
    } catch (error) {
      toast.error(error as string);
    }
  }

  const handleVote = async (vote: number) => {
    const newVote = userVote === vote ? 0 : vote;
    setVoteCount(voteCount + (newVote - userVote));
    setUserVote(newVote);

    await dispatch(votePost({ postId: id, vote: newVote }));
    await dispatch(getPost(id));
  };

    

  const toggleFullSizeView = () => {
    if (post.mediaType === "IMAGE") {
      setFullSizeView(!fullSizeView);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fullSizeView && mediaRef.current && !mediaRef.current.contains(event.target as Node)) {
        setFullSizeView(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [fullSizeView]);

  return (
    <div className="rounded-lg overflow-hidden bg-background dark:bg-cardBackground shadow-md">
      <div className="p-4 md:p-6 border-b border-border dark:border-zinc-800">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
              <Avatar
                src={post.meta?.author?.profilePhotoUrl?.toString() || "https://i.pravatar.cc/150"}
                size="md"
                className="border-2 border-primary"
              />
              <div>
                <h3 className="font-semibold text-md">{post.meta?.author?.nickname}</h3>
              </div>
          </div>

          <div className="flex items-center gap-2">
            {post.meta?.minTier ? (
              <Tooltip content={`This post requires "${post.meta.minTier.name}" subscription`}>
                <Chip
                  variant="flat"
                  color="secondary"
                  size="sm"
                  className="mr-1"
                >
                  {post.meta.minTier.name} Tier
                </Chip>
              </Tooltip>
            ) : null}
          </div>
        </div>
      </div>

      <div className="relative">
        {post.meta?.nsfw && showNsfwWarning ? (
          <div className="absolute inset-0 bg-background dark:bg-cardBackground z-10 flex flex-col items-center justify-center p-6 text-center">
            <FaExclamationTriangle className="text-danger text-4xl mb-4" />
            <h3 className="text-xl font-bold mb-2">NSFW Content</h3>
            <p className="mb-4 text-subtext">This post contains Not Safe For Work content.</p>
            <Button
              color="primary"
              onClick={() => setShowNsfwWarning(false)}
            >
              Show Content
            </Button>
          </div>
        ) : null}

        <div className={`relative ${fullSizeView ? 'fixed inset-0 z-50 bg-black/90 flex items-center justify-center' : ''}`} ref={mediaRef}>
          {post.mediaType === "IMAGE" ? (
            <img
              src={post.mediaUrl}
              alt={post.title}
              className={`w-full ${fullSizeView ? 'max-h-screen object-contain cursor-zoom-out' : 'object-cover cursor-zoom-in max-h-[80vh]'}`}
              onClick={toggleFullSizeView}
            />
          ) : (
            <video
              src={post.mediaUrl}
              controls
              className="w-full aspect-video object-contain"
            />
          )}

          {fullSizeView && (
            <button
              className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full"
              onClick={() => setFullSizeView(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="p-4 md:p-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
          <div className="flex items-center gap-2 text-sm text-subtext">
            <time>{formatDistanceToNow(new Date(post.meta?.createdAt || new Date()))} ago</time>
          </div>
        </div>

        {post.meta?.tags && post.meta.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.meta.tags.map((tag, index) => (
            
                <Chip
                  variant="flat"
                  size="sm"
                  className="hover:bg-neutral-200 dark:hover:bg-zinc-800 hover:text-white transition cursor-pointer"
                >
                  #{tag}
                </Chip>
            ))}
          </div>
        )}

        {post.text && (
          <div className="my-6 text-text dark:text-text whitespace-pre-line">
            <p className="leading-relaxed">{post.text}</p>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-border dark:border-zinc-800">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Button
                isIconOnly
                size="sm"
                variant={userVote === 1 ? "solid" : "light"}
                color={userVote === 1 ? "primary" : "default"}
                onClick={() => handleVote(1)}
                type="button"
                className="min-w-0"
                aria-label="Upvote"
              >
                <FaArrowUp />
              </Button>

              <span className="font-medium text-lg">{voteCount}</span>

              <Button
                isIconOnly
                size="sm"
                variant={userVote === -1 ? "solid" : "light"}
                color={userVote === -1 ? "danger" : "default"}
                onClick={() => handleVote(-1)}
                type="button"
                className="min-w-0"
                aria-label="Downvote"
              >
                <FaArrowDown />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {!hideComments && post.comments && (
        <div className="border-t border-border dark:border-zinc-800 p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Comments ({post.comments.length})</h2>

            <div className="flex items-center gap-2">
              <span className="text-sm text-subtext">Sort by:</span>
              <select
                value={sortCommentsBy}
                onChange={(e) => setSortCommentsBy(e.target.value as any)}
                className="bg-background dark:bg-cardBackground border border-border dark:border-zinc-800 rounded-md px-2 py-1 text-sm"
              >
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
                <option value="popular">Popular</option>
              </select>
            </div>
          </div>

          <CommentSection comments={post.comments} postId={post.id} sortBy={sortCommentsBy} />
        </div>
      )}
    </div>
  );
}
