import { useGetAllAdminStudentsQuery, useDeleteAdminStudentMutation } from "../../redux/features/admin/adminApi";
import { watchLoader } from "../../utils/loader";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const AdminStudents = () => {
  const { data, isLoading, refetch } = useGetAllAdminStudentsQuery({});
  const [deleteStudent] = useDeleteAdminStudentMutation();

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
          await deleteStudent(id).unwrap();
          refetch();
          toast.success("Student deleted!");
        } catch {
          toast.error("Failed to delete.");
        }
      }
    });
  };

  if (isLoading) return <div className="flex justify-center py-20">{watchLoader}</div>;
  const students = data?.data || [];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Students</h1>
        <p className="text-slate-400 text-sm mt-1">{students.length} students registered</p>
      </div>

      <div className="secondary-bg rounded-xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="text-left px-4 py-3">Student</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">School/College</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">WhatsApp</th>
                <th className="text-right px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s: any) => (
                <tr key={s._id} className="border-b border-white/5 hover:bg-white/5 transition-all">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={s.photo || "https://i.ibb.co/6b4nDXS/default-avatar.png"}
                        className="size-8 rounded-full object-cover" />
                      <div>
                        <p className="font-medium capitalize">{s.name}</p>
                        <p className="text-slate-400 text-xs">{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-300 hidden md:table-cell capitalize">{s.schoolOrCollage}</td>
                  <td className="px-4 py-3 text-slate-300 hidden md:table-cell">{s.whatsApp}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleDelete(s._id, s.name)}
                      className="px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-xs transition-all">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {students.length === 0 && <p className="text-center text-slate-400 py-10">No students found.</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminStudents;
