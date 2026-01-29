import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Input from "../components/Input";
import ConfirmModal from "../components/ConfirmModal";
import { toast } from "react-toastify";
import bgImage from "../assets/background.jpg";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editName, setEditName] = useState("");
  const [editRole, setEditRole] = useState<"user" | "admin">("user");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const res = await api.post("/users", {
        page: 1,
        limit: 10,
      });
      setUsers(res.data.data);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      toast.success("User deleted");
    } catch {
      toast.error("Failed to delete user");
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setEditName(user.name);
    setEditRole(user.role);
  };

  const handleUpdate = async () => {
    if (!editingUser) return;

    try {
      await api.patch(`/users/${editingUser._id}`, {
        name: editName,
        role: editRole,
      });
      setUsers((prev) =>
        prev.map((u) =>
          u._id === editingUser._id ? { ...u, name: editName, role: editRole } : u
        )
      );
      setEditingUser(null);
      toast.success("User updated");
    } catch {
      toast.error("Failed to update user");
    }
  };

  return (
    <div className="min-h-screen relative" style={{backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'}}>
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>
      <div className="relative z-10">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users and permissions</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500"></div>
            <p className="mt-4 text-gray-600">Loading users...</p>
          </div>
        ) : (
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-primary-100">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-primary-600 to-accent-600 text-white">
                  <tr>
                    <th className="p-4 text-left font-semibold">Name</th>
                    <th className="p-4 text-left font-semibold">Email</th>
                    <th className="p-4 text-left font-semibold">Role</th>
                    <th className="p-4 text-center font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, index) => (
                    <tr
                      key={u._id}
                      className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="p-4 font-medium text-gray-800">{u.name}</td>
                      <td className="p-4 text-gray-600">{u.email}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            u.role === "admin"
                              ? "bg-accent-100 text-accent-800"
                              : "bg-primary-100 text-primary-800"
                          }`}
                        >
                          {u.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(u)}
                            className="text-primary-700 hover:text-primary-900 font-semibold px-3 py-1 rounded hover:bg-gray-100 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(u._id)}
                            className="text-accent-600 hover:text-accent-800 font-semibold px-3 py-1 rounded hover:bg-accent-50 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {users.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No users found</h3>
                <p className="text-gray-600">Users will appear here once registered</p>
              </div>
            )}
          </div>
        )}

        <Modal
          isOpen={!!editingUser}
          onClose={() => setEditingUser(null)}
          title="Edit User"
        >
          <Input
            label="Name"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-gray-700">Role</label>
            <select
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
              value={editRole}
              onChange={(e) => setEditRole(e.target.value as "user" | "admin")}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleUpdate} className="flex-1" size="lg">
              Update
            </Button>
            <Button
              onClick={() => setEditingUser(null)}
              variant="secondary"
              className="flex-1"
              size="lg"
            >
              Cancel
            </Button>
          </div>
        </Modal>
      </div>
      <ConfirmModal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() => deleteConfirm && handleDelete(deleteConfirm)}
        title="Delete User"
        message="Are you sure you want to permanently delete this user? This action cannot be undone."
      />
      </div>
    </div>
  );
};

export default AdminDashboard;
