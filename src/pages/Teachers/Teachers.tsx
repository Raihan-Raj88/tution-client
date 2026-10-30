import { useState } from "react";
import { useGetAllTeachersQuery } from "../../redux/features/teacher/teacherApi";
import { TLocation, TParamsQuery, TTeacher } from "../Home/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { watchLoader } from "../../utils/loader";
import { PrimaryCard } from "../../components/Cards/PrimaryCard";
import { allDistrictsArray } from "../../assets/district";
import useTitle from "../../utils/useTitle";

const Teachers = () => {
  const [params, setParams] = useState<TParamsQuery[] | undefined>(undefined);
  const [option, setOption] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { data: teachersData, isLoading } = useGetAllTeachersQuery(params);
  useTitle("Tutors");

  const { register, handleSubmit } = useForm<TLocation>();
  const onSubmit: SubmitHandler<TLocation> = (data) => {
    const queryParams: TParamsQuery[] = [];
    queryParams.push({ name: "district", value: data.district });
    setParams(queryParams);
    setOption(data.district);
    setPageNumber(1);
  };

  const handleNextPage = () => {
    const page = teachersData.data.length < 6 ? pageNumber : pageNumber + 1;
    setPageNumber(page);
    if (option) {
      setParams([
        { name: "district", value: option },
        { name: "page", value: page },
      ]);
    } else {
      setParams([{ name: "page", value: page }]);
    }
  };
  const handlePrivPage = () => {
    const page = pageNumber > 1 ? pageNumber - 1 : 1;
    console.log(page);

    setPageNumber(page);
    if (option) {
      setParams([
        { name: "district", value: option },
        { name: "page", value: page },
      ]);
    } else {
      setParams([{ name: "page", value: page }]);
    }
  };
  if (isLoading) {
    return (
      <div className="w-full bg-slate-950 h-screen flex items-center justify-center">
        {watchLoader}
      </div>
    );
  }

  return (
    <div className="pt-20 mx-auto w-4/5">
      <form
        onChange={handleSubmit(onSubmit)}
        className="w-full flex justify-center items-center my-7"
      >
        <div className="relative w-full max-w-[500px] group">
          {/* Glass Morphism Container */}
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/50 rounded-xl p-6 shadow-2xl">
            {/* Floating Label */}
            <div className="relative">
              <select
                {...register("district")}
                className="w-full px-4 py-3 bg-transparent border-2 border-slate-700/50 rounded-lg appearance-none focus:outline-none focus:border-accent-500 transition-all cursor-pointer text-white hover:border-accent-500 focus:ring-2 focus:ring-accent-500 focus:ring-opacity-50 peer"
                required
              >
                <option
                  value=""
                  disabled
                  selected
                  className="text-slate-500"
                ></option>
                {allDistrictsArray.map((dis) => (
                  <option
                    key={dis}
                    value={dis.toLowerCase()}
                    className="bg-slate-900 hover:bg-accent-500 hover:text-white transition-colors"
                  >
                    {dis}
                  </option>
                ))}
              </select>
              {/* Floating Label Text */}
              <label className="absolute left-4 top-3 text-slate-400 pointer-events-none transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-accent-500 peer-valid:-top-2 peer-valid:text-xs bg-slate-900/50 px-1">
                Select your location
              </label>
              {/* Animated Dropdown Arrow */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none transition-transform group-hover:translate-y-0.5">
                <svg
                  className="w-6 h-6 text-slate-500 group-hover:text-accent-500 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="py-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {teachersData.data.map((teacher: TTeacher) => (
          <PrimaryCard
            key={teacher._id}
            image={teacher.photo}
            id={teacher._id}
            name={teacher.name}
            subjects={teacher.subjects}
            description={teacher.description}
          ></PrimaryCard>
        ))}
        <p className="text-center flex justify-center items-center">
          {teachersData.data.length === 0
            ? "There are no data. Please click Previous button"
            : ""}
        </p>
      </div>
      <div className="w-[280px] mx-auto">
        <div className="join grid grid-cols-2">
          <button
            onClick={handlePrivPage}
            className="join-item btn btn-outline"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className="join-item btn btn-outline"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Teachers;
