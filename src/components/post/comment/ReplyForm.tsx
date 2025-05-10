import { Button, Textarea } from "@nextui-org/react";
import React from "react";

interface ReplyFormProps {
  replyText: string;
  setReplyText: (text: string) => void;
  handleSubmitReply: (e: React.FormEvent) => void;
  isReplying: boolean;
  onCancel: () => void;
  username: string;
}

const ReplyForm = ({
  replyText,
  setReplyText,
  handleSubmitReply,
  isReplying,
  onCancel,
  username,
}: ReplyFormProps) => {
  return (
    <form onSubmit={handleSubmitReply} className="mt-3">
      <Textarea
        placeholder={`Reply to ${username}...`}
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        minRows={2}
        className="mb-2 w-full"
        size="sm"
        disabled={isReplying}
      />
      <div className="flex justify-end gap-2">
        <Button
          size="sm"
          variant="flat"
          onClick={onCancel}
          disabled={isReplying}
        >
          Cancel
        </Button>
        <Button
          size="sm"
          color="primary"
          type="submit"
          isDisabled={!replyText.trim() || isReplying}
          isLoading={isReplying}
        >
          Reply
        </Button>
      </div>
    </form>
  );
};

export default ReplyForm;
