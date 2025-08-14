import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import apiClient from "../api/client";

const getInitials = (nameOrEmail = "") => {
  const str = nameOrEmail.trim();
  if (!str) return "?";
  const parts = str.includes("@") ? [str[0]] : str.split(/\s+|_/);
  return parts
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() || "")
    .join("");
};

const MyProfile = () => {
  const { isAuthenticated, user, token } = useSelector((s) => s.auth);
  const [saving, setSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  if (!isAuthenticated) return <Navigate to={"/login"} replace />;

  const [profile, setProfile] = useState({
    id: user?.id ?? null,
    username: user?.username ?? "",
    email: user?.email ?? "",
    role: user?.role ?? "",
    createdAt: user?.createdAt ?? null,
    updatedAt: user?.updatedAt ?? null,
  });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await apiClient.get(`/user/me`);
        const u = data.userDTO || data.user || data;
        if (!mounted || !u) return;
        setProfile((p) => ({
          ...p,
          id: u.id ?? p.id ?? null,
          username: u.username ?? p.username ?? "",
          email: u.email ?? p.email ?? "",
          role: u.role ?? p.role ?? "",
          createdAt: u.createdAt ?? p.createdAt ?? null,
          updatedAt: u.updatedAt ?? p.updatedAt ?? null,
        }));
      } catch (err) {
        console.warn("[MyProfile] fetch failed:", err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [profile.id, user?.id]);

  const initials = useMemo(
    () => getInitials(profile.username || profile.email),
    [profile.username, profile.email]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(false);
    setMessage(null);
    setError(null);

    try {
      const body = {
        email: profile.email?.trim() || undefined,
        username: profile.username?.trim() || undefined,
      };

      const response = await axios.put(
        `http://localhost:8080/user/${profile.id}`,
        body
      );
      setMessage(response.data.message || "Profile Updated!");
      const u = response.data.userDTO || {};

      if (u.updatedAt)
        setProfile((p) => ({
          ...p,
          updatedAt: u.updatedAt,
        }));
    } catch (error) {
      setError(
        error.response?.data?.message || error.message || "Updated Failed!"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!newPassword) return setError("New Password is required!");
    if (newPassword !== confirm) return setError("Passwords do not match.");
    if (newPassword < 8) return setError("Use at least 8 characters");

    try {
      const payload = { password: newPassword };

      const response = await axios.put(
        `http://localhost:8080/user/${id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(response.data.message || "Password updated successfully");
      setNewPassword("");
      setConfirm("");
      setError(null);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Password update failed!"
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-16 w-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold">
          {initials}
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-100">My profile</h1>
          <p className="text-gray-400">
            {profile.username || profile.email}
            {profile.role && (
              <span className="ml-2 px-2 py-0.5 rounded bg-gray-700 text-xs">
                {profile.role}
              </span>
            )}
          </p>
        </div>
      </div>
      {/* Alerts */}
      {message && (
        <div className="mb-4 rounded bg-emerald-600/20 text-emerald-300 px-3 py-2">
          {message}
        </div>
      )}
      {error && (
        <div className="mb-4 rounded bg-red-600/20 text-red-300 px-3 py-2">
          {error}
        </div>
      )}

      {/* Profile */}
      <form onSubmit={handleSubmit} className="bg-gray-800 rounded p-4 mb-6">
        <h2 className="text-lg font-medium text-gray-100 mb-4">
          Account Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm text-gray-300">
              Username
              <input
                className="mt-1 w-full rounded border border-gray-600 bg-gray-900 text-gray-100 p-2"
                value={profile.username ?? ""}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, username: e.target.value }))
                }
              />
            </span>
          </label>
          <label className="block">
            <span className="text-sm text-gray-300">Email</span>
            <input
              type="email"
              className="mt-1 w-full rounded border border-gray-600 bg-gray-900 text-gray-100 p-2"
              value={profile.email ?? ""}
              onChange={(e) =>
                setProfile((p) => ({ ...p, email: e.target.value }))
              }
              required
            />
          </label>
          <div className="block">
            <span className="text-sm text-gray-300">Created At</span>
            <div className="mt-1 text-gray-400">
              {profile.createdAt
                ? new Date(profile.createdAt).toLocaleString()
                : "-" ?? null}
            </div>
          </div>
          <div className="block">
            <span className="text-sm text-gray-300">Updated At</span>
            <div className="mt-1 text-gray-400">
              {profile.updatedAt
                ? new Date(profile.updatedAt).toLocaleString()
                : "-" ?? null}
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="cursor-pointer px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
      <form onSubmit={handleChangePassword} className="bg-gray-800 rounded p-4">
        <h2 className="text-lg font-medium text-gray-100 mb-4">
          Change Password
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="block">
            <span className="text-sm text-gray-300">Current Password</span>
            <input
              type="password"
              className="mt-1 w-full rounded border border-gray-600 bg-gray-900 text-gray-100 p-2"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              autoComplete="current-password"
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-300">New Password</span>
            <input
              type="password"
              className="mt-1 w-full rounded border border-gray-600 bg-gray-900 text-gray-100 p-2"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
            />
          </label>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            disabled={passwordSaving}
            className="cursor-pointer px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-60"
          >
            {passwordSaving ? "Changing..." : "Change Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
