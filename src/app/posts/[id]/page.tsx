'use client'

import PostDetail from "@/components/post/PostDetail";
import Navbar from "@/components/ui/Navbar";
import Sidebar from "@/components/ui/Sidebar";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { useState, useEffect } from "react";
import SignInComponent1 from "@/components/auth/Signin1";
import { useRouter } from "next/navigation";
import CommentSection from "@/components/post/CommentSection";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getPost, clearCurrentPost } from "@/redux/features/postSlice";
import toast from "react-hot-toast";

export default function PostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { open } = useSidebarContext();
  const [activeModal, setActiveModal] = useState(false);
  
  const dispatch = useAppDispatch();
  const { currentPost: post, error } = useAppSelector((state) => state.posts);

  function setCloseModalHandler(a: boolean) {
    setActiveModal(a);
  }

  useEffect(() => {
    dispatch(getPost(params.id));
  
    return () => {
      dispatch(clearCurrentPost());
    };
  }, [params.id, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <main className="bg-background text-foreground min-h-screen">
      {open && <Sidebar />}
      {activeModal && <SignInComponent1 setActivemodal={setCloseModalHandler} />}
      <Navbar setActivemodal={setCloseModalHandler} />
      
      <div className="pt-[80px] pb-16 px-4 sm:px-6 max-w-[1600px] mx-auto">
        {error ? (
          <div className="text-center py-16 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
            <p className="text-subtext mb-8">
              The post you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => router.back()}
              className="px-6 py-2 rounded-full bg-primary text-white hover:bg-opacity-90 transition"
            >
              Go Back
            </button>
          </div>
        ) : post ? (
          <div className="grid lg:grid-cols-[1fr,400px] xl:grid-cols-[1fr,450px] gap-6">
            <div className="rounded-lg bg-background dark:bg-cardBackground shadow-md overflow-hidden">
              <PostDetail post={post} hideComments  id={params.id}/>
            </div>
            <div className="lg:sticky lg:top-[100px] lg:h-[calc(100vh-120px)] rounded-lg bg-background dark:bg-cardBackground shadow-md overflow-hidden">
              <CommentSection comments={post.comments ?? []} postId={params.id} sortBy="latest" />
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
