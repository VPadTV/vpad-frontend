import { Comment } from "@/types/post";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { editComment, fetchChildComments, fetchComments, removeComment, addComment } from "@/redux/features/commentSlice";
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Textarea } from "@nextui-org/react";
import { formatDistanceToNow } from "date-fns";
import React, { useState } from "react";
import { FaReply, FaEllipsisH, FaTrash, FaFlag, FaEdit, FaChevronDown, FaChevronUp } from "react-icons/fa";
import toast from "react-hot-toast";
import ReplyForm from "./ReplyForm";

interface CommentItemProps {
  comment: Comment;
  allComments: Comment[];
  level: number;
  currentUser: any;
  postId: string;
  sortBy: 'latest' | 'oldest' | 'popular';
  refreshComments: () => Promise<void>;
}

const CommentItem = ({ 
  comment, 
  allComments, 
  level, 
  currentUser, 
  postId, 
  sortBy,
  refreshComments
}: CommentItemProps) => {
  const dispatch = useAppDispatch();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [childrenFetched, setChildrenFetched] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  
  const { childComments, childrenLoading } = useAppSelector((state) => state.comments);
  const childrenInStore = childComments[comment.id] || [];
  const isLoadingChildren = childrenLoading[comment.id] || false;
  const childCommentsFromAllComments = allComments.filter(c => c.parentId === comment.id);
  const displayedChildren = childrenFetched ? childrenInStore : childCommentsFromAllComments;
  const paddingLeft = level > 0 ? `${Math.min(level * 16, 48)}px` : "0";
  
  const isParentComment = !comment.parentId;
  const commentCardStyle = isParentComment 
    ? "bg-background dark:bg-cardBackground rounded-lg" 
    : "bg-slate-50 dark:bg-zinc-900 rounded-lg";

  const loadChildComments = async () => {
    if (!childrenFetched && comment.childrenCount > 0) {
      try {
        await dispatch(fetchChildComments({
          parentId: comment.id,
          postId: postId,
          sortBy: sortBy === 'popular' ? 'latest' : sortBy
        })).unwrap();
        
        setChildrenFetched(true);
        setIsExpanded(true);
      } catch (error) {
        toast.error("Failed to load replies");
      }
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !currentUser) return;

    try {
      setIsReplying(true);
      await dispatch(addComment({
        postId,
        text: replyText,
        parentId: comment.id
      })).unwrap();

      await refreshComments();
      
      let currentCommentId = comment.id;
      let rootParentId = comment.parentId;
      
      if (level > 0) {
        let currentParent = allComments.find(c => c.id === comment.parentId);
        while (currentParent && currentParent.parentId) {
          rootParentId = currentParent.parentId;
          currentParent = allComments.find(c => c.id === rootParentId);
        }
        
        if (rootParentId) {
          await dispatch(fetchChildComments({
            parentId: rootParentId,
            postId: postId,
            sortBy: sortBy === 'popular' ? 'latest' : sortBy
          })).unwrap();
        }
      }

      await dispatch(fetchChildComments({
        parentId: currentCommentId,
        postId: postId,
        sortBy: sortBy === 'popular' ? 'latest' : sortBy
      })).unwrap();
      
      setChildrenFetched(true);
      setIsExpanded(true);
      
      toast.success("Reply posted successfully");
      setReplyText("");
      setShowReplyForm(false);
    } catch (error) {
      toast.error("Failed to post reply: " + (error instanceof Error ? error.message : String(error)));
    } finally {
      setIsReplying(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editText.trim()) return;

    try {
      await dispatch(editComment({ id: comment.id, text: editText })).unwrap();
      await refreshComments();

      setIsEditing(false);
      toast.success("Comment updated");
    } catch (error) {
      toast.error("Failed to update comment: " + (error instanceof Error ? error.message : String(error)));
    }
  };

  const handleDeleteComment = async () => {
    try {
      if (!confirm("Are you sure you want to delete this comment?")) return;
      await dispatch(removeComment(comment.id)).unwrap();
      await refreshComments();
      toast.success("Comment deleted successfully");
    } catch (error) {
      toast.error("Failed to delete comment: " + (error instanceof Error ? error.message : String(error)));
    }
  };

  const isOwnComment = currentUser && comment.user.id === currentUser.id;
  const replyIndicator = level > 0 
    ? "border-l-2 border-l-primary dark:border-l-primary/70" 
    : "border-l-2 border-transparent";

  return (
    <div>
      <div className={replyIndicator} style={{ marginLeft: paddingLeft }}>
        <div className={`pl-4 py-3 ${commentCardStyle} p-3 my-2`}>
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <Avatar
                src={comment.user.profilePhotoUrl || "https://i.pravatar.cc/150?u=a042581f4e29026704d"}
                size="sm"
              />
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-medium text-sm">{comment.user.nickname}</span>
                  <span className="text-xs text-subtext">
                    {formatDistanceToNow(new Date(comment.createdAt))} ago
                  </span>
                  {!isParentComment && (
                    <span className="text-xs bg-primary/10 text-primary px-1 py-0.5 rounded">Reply</span>
                  )}
                </div>
              </div>
            </div>

            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly variant="light" size="sm" className="min-w-0">
                  <FaEllipsisH size={14} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Comment actions">
                {isOwnComment && (
                  <DropdownItem
                    key="edit"
                    startContent={<FaEdit size={14} />}
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </DropdownItem>
                )}
                {isOwnComment && (
                  <DropdownItem
                    key="delete"
                    startContent={<FaTrash size={14} />}
                    className="text-danger"
                    onClick={handleDeleteComment}
                  >
                    Delete
                  </DropdownItem>
                )}
                <DropdownItem key="report" startContent={<FaFlag size={14} />} className="text-danger">
                  Report
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          <div className="mt-2 pl-8">
            {isEditing ? (
              <form onSubmit={handleEditSubmit}>
                <Textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="mb-2 w-full"
                  minRows={2}
                />
                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="flat"
                    onClick={() => {
                      setIsEditing(false);
                      setEditText(comment.text);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    color="primary"
                    type="submit"
                    isDisabled={!editText.trim()}
                  >
                    Save
                  </Button>
                </div>
              </form>
            ) : (
              <p className="text-foreground text-sm whitespace-pre-line">{comment.text}</p>
            )}

            {!isEditing && (
              <div className="flex items-center gap-4 mt-3 text-subtext text-xs">
                <button
                  className="flex items-center gap-1 hover:text-primary transition p-1"
                  onClick={() => currentUser ? setShowReplyForm(!showReplyForm) : toast.error("Login to reply")}
                >
                  <FaReply size={12} /> Reply
                </button>

                {comment.childrenCount > 0 && (
                  <Button 
                    size="sm" 
                    variant="light" 
                    color="primary"
                    className="h-6 min-w-0 px-2 text-xs"
                    isLoading={isLoadingChildren}
                    isDisabled={isLoadingChildren}
                    startContent={isExpanded ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                    onClick={loadChildComments}
                  >
                    {isExpanded 
                      ? `Hide ${comment.childrenCount} ${comment.childrenCount === 1 ? 'reply' : 'replies'}`
                      : `Show ${comment.childrenCount} ${comment.childrenCount === 1 ? 'reply' : 'replies'}`}
                  </Button>
                )}
              </div>
            )}
          </div>

          {showReplyForm && !isEditing && (
            <div className="pl-8 mt-3">
              <ReplyForm
                replyText={replyText}
                setReplyText={setReplyText}
                handleSubmitReply={handleSubmitReply}
                isReplying={isReplying}
                onCancel={() => setShowReplyForm(false)}
                username={comment.user.nickname}
              />
            </div>
          )}
        </div>
      </div>

      {displayedChildren.length > 0 && isExpanded && (
        <div className="mt-1">
          {displayedChildren.map(childComment => (
            <CommentItem
              key={childComment.id}
              comment={childComment}
              allComments={allComments}
              level={level + 1}
              currentUser={currentUser}
              postId={postId}
              sortBy={sortBy}
              refreshComments={refreshComments}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
