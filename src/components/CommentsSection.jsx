import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import apiClient from "../api/client";

export default function ({ articleId, pageSize = 5 }) {
  const { token, isAuthenticated } = useSelector((s) => s.auth);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadPage = async (p = 0) => {
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get(
        `/comments/articles/${articleId}/comments`,
        {
          params: {
            page: p,
            pageSize,
          },
        }
      );
      const list = Array.isArray(response.data.commentList) ? response.data.commentList : [];
      if (p === 0) {
        setItems(list);
      } else {
        setItems((prev) => [...prev, ...list]);
      }
      setHasMore(Boolean(response.data.hasNext));
      setPage(p);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setItems([]);
    setPage(0);
    setHasMore(true);
    loadPage(0);
  }, [articleId]);

  return (
    <div className="mt-4">
      <h3 className="font-semibold">Comments</h3>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {items.length === 0 && !loading && (
        <p className="text-gray-500">No comments yet</p>
      )}
      <ul className="ml-4 list-disc space-y-1">
        {items.map((c) => (
          <li key={c.id} className="text-gray-300">
            <span className="font-medium">
              {c.userDTO?.username ?? "Unknown User"}
            </span>{" "}
            {c.content}
          </li>
        ))}
      </ul>
      {hasMore && (
        <button
          disabled={loading}
          onClick={() => loadPage(page + 1)}
          className={
            "mt-2 text-sm px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-60"
          }
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}
