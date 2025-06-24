import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { fetchUserPosts, createUserPost, fetchUserPostDetail } from "@/api/user";
import type { UserPost, UserPostDetailResponse } from "@/types/user";
import {
  fetchCommunityComments,
  createCommunityComment,
  deleteCommunityComment,
} from "@/api/jobPosting";
import type { JobPostingComment } from "@/types/user";

export default function BoardPage() {
  const [posts, setPosts] = useState<UserPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detail, setDetail] = useState<UserPostDetailResponse | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [comments, setComments] = useState<JobPostingComment[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);

  const userId = localStorage.getItem("mainUserId");

  const loadPosts = () => {
    if (!userId) {
      setError("로그인이 필요합니다.");
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchUserPosts(userId)
      .then((res) => {
        if (res.success) {
          setPosts(res.userPostList);
        } else {
          setError(res.message);
        }
      })
      .catch(() => setError("게시글을 불러오지 못했습니다."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line
  }, []);

  const handleOpenModal = () => {
    setTitle("");
    setContent("");
    setSubmitError(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTitle("");
    setContent("");
    setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    if (!title.trim() || !content.trim()) {
      setSubmitError("제목과 내용을 모두 입력하세요.");
      return;
    }
    setSubmitLoading(true);
    setSubmitError(null);
    try {
      const res = await createUserPost({ userId, postTitle: title, postContent: content });
      if (res.success) {
        handleCloseModal();
        loadPosts();
      } else {
        setSubmitError(res.message || "등록에 실패했습니다.");
      }
    } catch {
      setSubmitError("등록 중 오류가 발생했습니다.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const loadComments = async (userPostId: string) => {
    setCommentLoading(true);
    setCommentError(null);
    try {
      const res = await fetchCommunityComments(userPostId);
      if (res.success) {
        setComments(res.responseCommentsGetDTOS);
      } else {
        setCommentError(res.message || "댓글을 불러오지 못했습니다.");
      }
    } catch {
      setCommentError("댓글을 불러오지 못했습니다.");
    } finally {
      setCommentLoading(false);
    }
  };

  const handleOpenDetail = async (userPostId: string) => {
    setShowDetailModal(true);
    setDetail(null);
    setDetailError(null);
    setDetailLoading(true);
    await loadComments(userPostId);
    try {
      const res = await fetchUserPostDetail(userPostId);
      setDetail(res);
    } catch {
      setDetailError("상세 정보를 불러오지 못했습니다.");
    } finally {
      setDetailLoading(false);
    }
  };

  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setDetail(null);
    setDetailError(null);
    setDetailLoading(false);
  };

  const handleCommentSubmit = async () => {
    if (!userId || !detail) return;
    if (!commentInput.trim()) return;
    setCommentLoading(true);
    try {
      const res = await createCommunityComment({
        targetId: detail.userPostInfo.userPostId,
        userId,
        content: commentInput,
      });
      if (res.success) {
        setCommentInput("");
        await loadComments(detail.userPostInfo.userPostId);
      } else {
        setCommentError(res.message || "댓글 등록 실패");
      }
    } catch {
      setCommentError("댓글 등록 실패");
    } finally {
      setCommentLoading(false);
    }
  };

  const handleCommentDelete = async (commentId: string) => {
    setCommentLoading(true);
    try {
      await deleteCommunityComment(commentId);
      if (detail) await loadComments(detail.userPostInfo.userPostId);
    } catch {
      setCommentError("댓글 삭제 실패");
    } finally {
      setCommentLoading(false);
    }
  };

  return (
    <div className="p-6 mx-auto max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">게시판</h1>
        <Button onClick={handleOpenModal}>글 작성</Button>
      </div>
      {loading ? (
        <div className="py-12 text-center text-gray-500">불러오는 중...</div>
      ) : error ? (
        <div className="py-12 text-center text-red-500">{error}</div>
      ) : posts.length === 0 ? (
        <div className="py-12 text-center text-gray-500">등록된 게시글이 없습니다.</div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.userPostId} onClick={() => handleOpenDetail(post.userPostId)} className="transition cursor-pointer hover:bg-gray-50">
              <CardHeader>
                <CardTitle>{post.postTitle}</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between text-sm">
                <span className="truncate max-w-[70%] text-gray-700">{post.postContent}</span>
                <span className={post.isFinish ? "text-green-600" : "text-gray-400"}>
                  {post.isFinish ? "완료" : "진행중"}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      {/* 글 작성 모달 */}
      {showModal && (
        <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-40">
          <div className="relative p-6 w-full max-w-md bg-white rounded-lg shadow-lg">
            <button
              className="absolute top-3 right-3 text-2xl font-bold text-gray-400 hover:text-gray-700"
              onClick={handleCloseModal}
              aria-label="닫기"
            >
              ×
            </button>
            <h2 className="mb-4 text-xl font-semibold text-gray-800">글 작성</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  className="px-3 py-2 w-full rounded border focus:outline-none focus:ring"
                  placeholder="제목"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  maxLength={100}
                  required
                />
              </div>
              <div>
                <textarea
                  className="w-full px-3 py-2 border rounded min-h-[120px] focus:outline-none focus:ring"
                  placeholder="내용"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  maxLength={2000}
                  required
                />
              </div>
              {submitError && <div className="text-sm text-center text-red-500">{submitError}</div>}
              <Button type="submit" className="w-full" disabled={submitLoading}>
                {submitLoading ? "등록 중..." : "등록"}
              </Button>
            </form>
          </div>
        </div>
      )}
      {/* 게시글 상세 모달 */}
      {showDetailModal && (
        <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-40">
          <div className="relative p-6 w-full max-w-md bg-white rounded-lg shadow-lg">
            <button
              className="absolute top-3 right-3 text-2xl font-bold text-gray-400 hover:text-gray-700"
              onClick={handleCloseDetail}
              aria-label="닫기"
            >
              ×
            </button>
            <h2 className="mb-4 text-xl font-semibold text-gray-800">게시글 상세</h2>
            {detailLoading ? (
              <div className="py-8 text-center text-gray-500">불러오는 중...</div>
            ) : detailError ? (
              <div className="py-8 text-center text-red-500">{detailError}</div>
            ) : detail ? (
              <div className="space-y-4">
                <div>
                  <div className="mb-2 text-lg font-bold text-primary-700">{detail.userPostInfo.postTitle}</div>
                  <div className="mb-2 text-gray-700 whitespace-pre-line">{detail.userPostInfo.postContent}</div>
                  <div className="text-sm">
                    <span className={detail.userPostInfo.isFinish ? "text-green-600" : "text-gray-400"}>
                      {detail.userPostInfo.isFinish ? "완료" : "진행중"}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="mt-6 mb-2 text-lg font-semibold">댓글</h3>
                  {commentLoading ? (
                    <div className="text-gray-500">댓글 불러오는 중...</div>
                  ) : commentError ? (
                    <div className="text-red-500">{commentError}</div>
                  ) : (
                    <div className="overflow-y-auto space-y-2 max-h-40">
                      {comments.length === 0 ? (
                        <div className="text-gray-400">아직 댓글이 없습니다.</div>
                      ) : (
                        comments.map((c) => (
                          <div key={c.commentId} className="flex justify-between items-center px-2 py-1 rounded bg-slate-50">
                            <span className="text-sm text-gray-800">{c.content}</span>
                            {c.userId === userId && (
                              <button
                                className="ml-2 text-xs text-red-500 hover:underline"
                                onClick={() => handleCommentDelete(c.commentId)}
                              >
                                삭제
                              </button>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  )}
                  <div className="flex gap-2 mt-2">
                    <input
                      className="flex-1 px-2 py-1 text-sm rounded border"
                      placeholder="댓글을 입력하세요"
                      value={commentInput}
                      onChange={e => setCommentInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleCommentSubmit()}
                      disabled={commentLoading}
                    />
                    <Button size="sm" onClick={handleCommentSubmit} disabled={commentLoading || !commentInput.trim()}>
                      등록
                    </Button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
