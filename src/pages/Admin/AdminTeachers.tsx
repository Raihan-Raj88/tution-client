import { useGetAllAdminTeachersQuery, useDeleteAdminTeacherMutation } from "../../redux/features/admin/adminApi";
import { watchLoader } from "../../utils/loader";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const AdminTeachers = () => {
  const { data, isLoading, refetch } = useGetAllAdminTeachersQuery({});
  const [deleteTeacher] = useDeleteAdminTeacherMutation();

  const handleDelete = (id: string, name: string) => {
    Swal.fire({
      title: `Delete ${name}?`,
      text: "This will also delete their user account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#00ccb1",
      confirmButtonText: "Yes, delete!",
      background: "#0f1f3d", color: "#fff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteTeacher(id).unwrap();
          refetch();
          toast.success("Teacher deleted!");
        } catch {
          toast.error("Failed to delete.");
        }
      }
    });
  };

  if (isLoading) return <div className="flex justify-center py-20">{watchLoader}</div>;

  const teachers = data?.data || [];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Teachers</h1>
        <p className="text-slate-400 text-sm mt-1">{teachers.length} teachers registered</p>
      </div>

      <div className="secondary-bg rounded-xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="text-left px-4 py-3">Teacher</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">University</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">District</th>
                <th className="text-left px-4 py-3 hidden lg:table-cell">Subjects</th>
                <th className="text-right px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t: any) => (
                <tr key={t._id} className="border-b border-white/5 hover:bg-white/5 transition-all">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={t.photo || "https://i.ibb.co/6b4nDXS/default-avatar.png"}
                        className="size-8 rounded-full object-cover" />
                      <div>
                        <p className="font-medium capitalize">{t.name}</p>
                        <p className="text-slate-400 text-xs">{t.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-300 hidden md:table-cell capitalize">{t.university}</td>
                  <td className="px-4 py-3 text-slate-300 hidden md:table-cell capitalize">{t.district}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {t.subjects?.slice(0, 2).map((s: string) => (
                        <span key={s} className="text-xs bg-[#00ccb1]/20 text-[#00ccb1] px-2 py-0.5 rounded-full">{s}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleDelete(t._id, t.name)}
                      className="px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-xs transition-all">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {teachers.length === 0 && (
            <p className="text-center text-slate-400 py-10">No teachers found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTeachers;
