import { useGetAdminStatsQuery, useGetPendingUsersQuery, useApproveUserMutation, useRejectUserMutation } from "../../redux/features/admin/adminApi";
import { watchLoader } from "../../utils/loader";
import toast from "react-hot-toast";
import moment from "moment";

const StatCard = ({ label, value, icon, color }: any) => (
  <div className="secondary-bg rounded-xl p-5 border border-white/5">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-slate-400 text-sm">{label}</p>
        <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
      </div>
      <span className="text-3xl">{icon}</span>
    </div>
  </div>
);

const AdminDashboard = () => {
  const { data, isLoading } = useGetAdminStatsQuery({});
  const { data: pendingData, refetch } = useGetPendingUsersQuery({});
  const [approveUser] = useApproveUserMutation();
  const [rejectUser] = useRejectUserMutation();

  const handleApprove = async (id: string, email: string) => {
    try {
      await approveUser(id).unwrap();
      refetch();
      toast.success(`${email} approved!`);
    } catch {
      toast.error("Failed to approve.");
    }
  };

  const handleReject = async (id: string, email: string) => {
    try {
      await rejectUser(id).unwrap();
      refetch();
      toast.success(`${email} rejected.`);
    } catch {
      toast.error("Failed to reject.");
    }
  };

  if (isLoading) return <div className="flex justify-center py-20">{watchLoader}</div>;

  const stats = data?.data;
  const pending = pendingData?.data || [];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-slate-400 text-sm mt-1">Platform statistics at a glance</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard label="Total Users" value={stats?.users} icon="👥" color="text-blue-400" />
        <StatCard label="Teachers" value={stats?.teachers} icon="👨‍🏫" color="text-[#00ccb1]" />
        <StatCard label="Students" value={stats?.students} icon="👨‍🎓" color="text-purple-400" />
        <StatCard label="Posts" value={stats?.posts} icon="📋" color="text-yellow-400" />
        <StatCard label="Blogs" value={stats?.blogs} icon="📝" color="text-pink-400" />
        <StatCard label="Pending" value={stats?.pending} icon="⏳" color="text-orange-400" />
      </div>

      {/* Pending Approvals */}
      {pending.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Pending Approvals</h2>
            <span className="text-xs bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full">
              {pending.length} waiting
            </span>
          </div>

          <div className="secondary-bg rounded-xl border border-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400">
                    <th className="text-left px-4 py-3">User</th>
                    <th className="text-left px-4 py-3">Role</th>
                    <th className="text-left px-4 py-3 hidden md:table-cell">Registered</th>
                    <th className="text-right px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pending.map((u: any) => (
                    <tr key={u._id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="px-4 py-3 text-slate-300">{u.email}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full
                          ${u.role === "teacher" ? "bg-[#00ccb1]/20 text-[#00ccb1]" : "bg-purple-500/20 text-purple-400"}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-400 hidden md:table-cell">{moment(u.createdAt).fromNow()}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handleApprove(u._id, u.email)}
                            className="px-3 py-1.5 bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded-lg text-xs transition-all">
                            ✓ Approve
                          </button>
                          <button onClick={() => handleReject(u._id, u.email)}
                            className="px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-xs transition-all">
                            ✕ Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="secondary-bg rounded-xl p-5 border border-white/5">
          <h2 className="font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { label: "Manage Teachers", to: "/admin/teachers", color: "bg-[#00ccb1]/10 text-[#00ccb1]" },
              { label: "Manage Students", to: "/admin/students", color: "bg-purple-500/10 text-purple-400" },
              { label: "Manage Posts", to: "/admin/posts", color: "bg-yellow-500/10 text-yellow-400" },
              { label: "Manage Blogs", to: "/admin/blogs", color: "bg-pink-500/10 text-pink-400" },
            ].map((item) => (
              <a key={item.to} href={item.to}
                className={`flex items-center justify-between px-4 py-3 rounded-lg ${item.color} hover:opacity-80 transition-all`}>
                <span className="text-sm font-medium">{item.label}</span>
                <span>→</span>
              </a>
            ))}
          </div>
        </div>

        <div className="secondary-bg rounded-xl p-5 border border-white/5">
          <h2 className="font-semibold mb-4">Platform Info</h2>
          <div className="space-y-3">
            {[
              { label: "Total Users", value: stats?.users },
              { label: "Active Teachers", value: stats?.teachers },
              { label: "Active Students", value: stats?.students },
              { label: "Tuition Requests", value: stats?.posts },
              { label: "Published Blogs", value: stats?.blogs },
              { label: "Pending Approvals", value: stats?.pending },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-sm text-slate-400">{item.label}</span>
                <span className="font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
