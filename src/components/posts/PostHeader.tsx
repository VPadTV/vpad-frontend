'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, Button, Chip } from '@nextui-org/react';
import { FaClock, FaEdit, FaTrash } from 'react-icons/fa';
import { useAppDispatch } from '@/redux/hooks';
import { deletePost } from '@/redux/features/postSlice';
import { Post } from '@/types/post';

interface PostHeaderProps {
  post: Post;
  isOwner: boolean;
  onDeleteSuccess: () => void;
}

export default function PostHeader({ post, isOwner, onDeleteSuccess }: PostHeaderProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDelete = () => {
    setIsDeleting(true);
    dispatch(deletePost(post.id)).then(() => {
      onDeleteSuccess();
    });
  };
  
  const handleEdit = () => {
    router.push(`/posts/edit/${post.id}`);
  };
  
  return (
    <div className="mb-6 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <div className="flex flex-wrap gap-2 items-center text-gray-500">
          <div className="flex items-center gap-1">
            <Avatar src={post.author?.profilePhotoUrl?.toString() || '/avatar.png'} size="sm" />            <span className="font-medium">{post.author.nickname}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <FaClock className="text-sm" />
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
          {post.nsfw && (
            <>
              <span>•</span>
              <Chip color="danger" size="sm">NSFW</Chip>
            </>
          )}
        </div>
      </div>
      
      {isOwner && (
        <div className="flex gap-2">
          <Button
            color="primary"
            variant="flat"
            startContent={<FaEdit />}
            onClick={handleEdit}
          >
            Edit
          </Button>
          
          {!showDeleteConfirm ? (
            <Button
              color="danger"
              variant="flat"
              startContent={<FaTrash />}
              onClick={() => setShowDeleteConfirm(true)}
            >
              Delete
            </Button>
          ) : (
            <Button
              color="danger"
              variant="solid"
              isLoading={isDeleting}
              onClick={handleDelete}
            >
              Confirm Delete
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
