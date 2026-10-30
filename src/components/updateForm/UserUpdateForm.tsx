import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  name: string;
  schoolOrCollege: string;
};

const UserUpdateForm = () => {
  const { register, handleSubmit, watch } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("name"));
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <input defaultValue="test" {...register("name")} />
          <input {...register("schoolOrCollege")} />

          <input type="submit" value="update" />
        </div>
      </form>
    </div>
  );
};

export default UserUpdateForm;
