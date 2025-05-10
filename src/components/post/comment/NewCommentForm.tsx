import { Button, Textarea } from "@nextui-org/react";
import React from "react";

interface NewCommentFormProps {
  newComment: string;
  setNewComment: (text: string) => void;
  handleSubmitComment: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  placeholder?: string;
}

const NewCommentForm = ({ 
  newComment, 
  setNewComment, 
  handleSubmitComment, 
  isSubmitting,
  placeholder = "Add a comment..."
}: NewCommentFormProps) => {
  return (
    <form onSubmit={handleSubmitComment} className="mb-4">
      <Textarea
        placeholder={placeholder}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        minRows={2}
        className="mb-3 w-full"
        disabled={isSubmitting}
      />
      <div className="flex justify-end">
        <Button
          type="submit"
          color="primary"
          isDisabled={!newComment.trim() || isSubmitting}
          isLoading={isSubmitting}
        >
          Post Comment
        </Button>
      </div>
    </form>
  );
};

export default NewCommentForm;
