import { Comment } from "@/types/post";
import { useState, useEffect } from "react";
import { Button, Spinner } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addComment, fetchComments } from "@/redux/features/commentSlice";
import toast from "react-hot-toast";
import CommentItem from "./comment/CommentItem";
import NewCommentForm from "./comment/NewCommentForm";

interface CommentSectionProps {
  comments: Comment[];
  postId: string;
  sortBy: 'latest' | 'oldest' | 'popular';
}

const CommentSection = ({ comments: initialComments, postId, sortBy }: CommentSectionProps) => {
  const dispatch = useAppDispatch();
  const { comments, loading } = useAppSelector((state) => state.comments);
  const { user: currentUser } = useAppSelector((state) => state.auth);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sortedComments, setSortedComments] = useState<Comment[]>(initialComments || []);
  const [page, setPage] = useState(1);
  const pageSize = 50;

  const backendSortBy = sortBy === 'popular' ? 'latest' : sortBy;
  useEffect(() => {
    dispatch(fetchComments({
      postId,
      sortBy: backendSortBy,
      page: page,
      size: pageSize
    }));
  }, [dispatch, postId, backendSortBy, page]);

  useEffect(() => {
    if (comments && comments.length > 0) {
      setSortedComments(comments);
    } else if (initialComments && initialComments.length > 0) {
      setSortedComments(initialComments);
    }
  }, [comments, initialComments]);

  const topLevelComments = sortedComments.filter(comment => !comment.parentId);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (!currentUser) {
      toast.error("You need to be logged in to comment");
      return;
    }

    try {
      setIsSubmitting(true);

      await dispatch(addComment({ postId, text: newComment })).unwrap();

      await dispatch(fetchComments({
        postId,
        sortBy: backendSortBy,
        page: 1,
        size: pageSize
      }));

      toast.success("Comment posted successfully");
      setNewComment("");
    } catch (error) {
      toast.error("Failed to post comment: " + (error instanceof Error ? error.message : String(error)));
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const refreshComments = async () => {
    try {
      const result = await dispatch(fetchComments({
        postId,
        sortBy: backendSortBy,
        page: 1,
        size: pageSize
      })).unwrap();
      
      if (page !== 1) setPage(1);
      
      if (result && Array.isArray(result) && result.length > 0) {
        setSortedComments(result);
      }
      
    } catch (error) {
      console.error("Failed to refresh comments:", error);
      toast.error("Failed to refresh comments");
    }
  };

  return (
    <div className="relative h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        {loading && comments.length === 0 && initialComments.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-subtext">Loading comments...</p>
          </div>
        ) : comments.length === 0 && initialComments.length === 0 ? (
          <div className="py-8 text-center border-2 border-dashed border-border dark:border-zinc-800 rounded-lg">
            <p className="text-subtext">No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          <div className="space-y-4 divide-y divide-border dark:divide-zinc-800">
            {topLevelComments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                allComments={sortedComments}
                level={0}
                currentUser={currentUser}
                postId={postId}
                sortBy={sortBy}
                refreshComments={refreshComments}
              />
            ))}
          </div>
        )}
      </div>

      <div className="sticky bottom-0 left-0 right-0 bg-background dark:bg-cardBackground border-t border-border dark:border-zinc-800 p-4">
        {currentUser ? (
          <NewCommentForm
            newComment={newComment}
            setNewComment={setNewComment}
            handleSubmitComment={handleSubmitComment}
            isSubmitting={isSubmitting}
          />
        ) : (
          <div className="text-center py-3">
            <p className="text-sm text-subtext mb-2">Log in to add a comment</p>
            <Button
              color="primary"
              size="sm"
              onClick={() => toast.error("Please log in to comment")}
            >
              Log In
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;