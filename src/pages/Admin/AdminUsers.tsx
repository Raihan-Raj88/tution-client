import { useGetAllUsersQuery, useDeleteUserMutation } from "../../redux/features/admin/adminApi";
import { watchLoader } from "../../utils/loader";
import toast from "react-hot-toast";
import moment from "moment";
import Swal from "sweetalert2";

const AdminUsers = () => {
  const { data, isLoading, refetch } = useGetAllUsersQuery({});
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = (id: string, email: string) => {
    Swal.fire({
      title: `Delete ${email}?`, text: "This will delete the user and their profile.",
      icon: "warning", showCancelButton: true,
      confirmButtonColor: "#d33", cancelButtonColor: "#00ccb1",
      confirmButtonText: "Yes, delete!", background: "#0f1f3d", color: "#fff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try { await deleteUser(id).unwrap(); refetch(); toast.success("User deleted!"); }
        catch { toast.error("Failed to delete."); }
      }
    });
  };

  if (isLoading) return <div className="flex justify-center py-20">{watchLoader}</div>;
  const users = data?.data || [];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">All Users</h1>
        <p className="text-slate-400 text-sm mt-1">{users.length} users registered</p>
      </div>
      <div className="secondary-bg rounded-xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="text-left px-4 py-3">Email</th>
                <th className="text-left px-4 py-3">Role</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Joined</th>
                <th className="text-right px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u: any) => (
                <tr key={u._id} className="border-b border-white/5 hover:bg-white/5 transition-all">
                  <td className="px-4 py-3 text-slate-300">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full
                      ${u.role === "teacher" ? "bg-[#00ccb1]/20 text-[#00ccb1]" :
                        u.role === "admin" ? "bg-red-500/20 text-red-400" :
                        "bg-purple-500/20 text-purple-400"}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400 hidden md:table-cell">{moment(u.createdAt).fromNow()}</td>
                  <td className="px-4 py-3 text-right">
                    {u.role !== "admin" && (
                      <button onClick={() => handleDelete(u._id, u.email)}
                        className="px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-xs transition-all">
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && <p className="text-center text-slate-400 py-10">No users found.</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
