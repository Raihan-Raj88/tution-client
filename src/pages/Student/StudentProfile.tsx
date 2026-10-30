import { BackgroundGradientRound } from "../../components/ui/round-gradient";

import "../../App.css";
import { useGetOneStudentByIdQuery } from "../../redux/features/student/studentApi";
import { useAppSelector } from "../../redux/hooks";
import { useAuthCurrentUser } from "../../redux/features/auth/authSlice";
import { TUser } from "../Home/types";
import { watchLoader } from "../../utils/loader";
import { NavLink } from "react-router-dom";
const StudentProfile = () => {
  const user: TUser | null = useAppSelector(useAuthCurrentUser);
  const { isLoading, data: student } = useGetOneStudentByIdQuery(user?.email);
  if (isLoading) {
    return (
      <div className="w-full bg-slate-950 h-screen flex items-center justify-center">
        {watchLoader}
      </div>
    );
  }

  return (
    <div className="flex">
      {/* nav bar */}
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* for mobile nav */}
          <div className="lg:hidden navbar flex  shadow-white-xl navbar-bg fixed top-0 left-0 z-50 ">
            <label
              htmlFor="my-drawer-2"
              className="drawer-button cursor-pointer mr-24"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-12"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
            <a className="text-3xl font-semibold text-white">LOGO</a>
          </div>
          <div>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            itaque esse veritatis. Deserunt non itaque quas neque aut, explicabo
            impedit sint repellendus inventore officiis labore, quisquam id
            veniam. Omnis assumenda velit sed maiores optio corporis accusantium
            temporibus maxime! Repellendus exercitationem sit molestiae alias,
            ut earum dolorum! Architecto dolorem facilis voluptas autem odio
            quos magnam a nihil, nisi est laborum totam labore ad! Unde quia
            recusandae porro doloremque incidunt consequuntur sed quo aliquam
            illum id cum quas officia aperiam, saepe veritatis hic possimus nisi
            autem fugit dolore, culpa mollitia. Ipsa temporibus nisi dolore
            tempore nesciunt quaerat maiores veritatis culpa sapiente eaque
            provident cumque omnis cupiditate sit earum, repellendus vel iusto
            rem nemo! Illo ut mollitia tenetur. Voluptatem dolorum, enim aut
            dicta id laudantium debitis cum nulla beatae aperiam at possimus
            nostrum maiores saepe nisi facilis quidem sint autem! Molestiae
            tenetur animi quas veritatis. Reprehenderit a esse beatae in ipsum
            incidunt modi dolor ea eos fuga ratione et, eius doloremque
            perferendis, reiciendis, sint provident pariatur aliquid quas natus
            temporibus assumenda praesentium! Dolor eligendi corrupti
            reprehenderit et perferendis officiis, tempore aliquam consequatur
            facere, voluptatibus unde iusto esse laboriosam assumenda placeat
            modi provident ipsum molestiae libero similique magnam quod.
            Deserunt at mollitia excepturi nobis dolores labore voluptatum
            similique assumenda nemo, exercitationem quisquam obcaecati nisi
            vitae porro. Hic natus ratione sunt dolores saepe perferendis, iste
            non quos neque, consequuntur atque quibusdam rem earum, ea eum aut
            dolorum odio illo voluptatum esse asperiores minus. Suscipit,
            voluptate fugit, earum porro libero minima, et itaque quis
            cupiditate quasi optio repellat reprehenderit quos. Obcaecati
            doloremque velit placeat repellat vel repellendus expedita
            temporibus corporis tenetur distinctio illum fuga cum earum
            asperiores laudantium molestias porro ea dolor illo harum nam, error
            dignissimos repudiandae alias? Consequuntur doloribus veniam illum,
            cupiditate totam aspernatur explicabo deleniti facere neque cum
            similique aliquid ipsum optio deserunt obcaecati ipsa doloremque
            iste reiciendis, quas blanditiis beatae harum! Beatae officiis amet,
            quasi delectus expedita harum ad autem eaque quisquam aliquam nisi
            vel reprehenderit ipsam aspernatur perspiciatis est et. Error cumque
            quidem eligendi in similique ut, at animi modi facere sit tempora
            quasi alias reprehenderit illo accusamus ipsa fugit ullam? Deserunt
            non quis totam reprehenderit dolor, officia quibusdam consectetur
            ducimus nesciunt aliquam nulla sequi laborum minus voluptates ab at
            perspiciatis ipsa necessitatibus suscipit nihil eius temporibus
            aliquid facere rem! Architecto, dolorum voluptatum. Nostrum,
            repudiandae obcaecati autem optio dolores, quaerat aut beatae earum
            saepe eius nemo veritatis? Id, placeat quidem quos ratione velit
            ducimus corrupti libero perferendis veritatis aliquid. Fugiat ex rem
            voluptatibus? Minus quis odit laborum! Ipsam reprehenderit nulla
            modi, officia dolores earum doloremque expedita maxime magni omnis
            aut. In eveniet non odio facere magni aliquid dolor fugit molestiae
            incidunt cupiditate? Explicabo, perferendis quae magni nulla cum
            animi, doloribus repellendus illo autem cupiditate quam voluptatem!
            Doloribus repellat libero, sapiente rerum impedit magni? Sed porro
            asperiores nemo, officia veniam adipisci quae unde aliquam iure
            voluptas inventore molestias fuga, nesciunt nisi, id saepe libero
            autem quibusdam quidem necessitatibus. Consequatur, repellat a
            voluptatem facere iure minus nihil! Fuga accusamus debitis facere
            velit adipisci, nobis eum quibusdam distinctio consectetur!
            Doloremque nulla nihil cumque, esse ipsum perferendis dignissimos ab
            quidem voluptatem error alias est ratione amet consequatur iusto
            minus odit quam qui? Pariatur inventore eum sed deserunt quaerat sit
            repudiandae? Maxime, quasi voluptas! Saepe molestiae odio, impedit
            atque explicabo voluptas quibusdam excepturi dignissimos. Officiis,
            cumque odit obcaecati neque quod perferendis doloremque ab error
            saepe optio repellendus, architecto exercitationem rem alias
            numquam, excepturi placeat ipsam possimus distinctio ipsa ullam ea
            quisquam repellat? Consectetur officiis voluptatum odio cum, enim
            commodi tempore vitae deserunt. Perspiciatis, ex voluptate.
            Blanditiis incidunt tempora consequatur dolorum non labore veritatis
            necessitatibus neque consequuntur.
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className=" drawer-overlay"
          ></label>
          <div className="menu text-base-content min-h-full w-3/5 md:w-80 p-4 secondary-bg">
            <div className="relative z-10 flex justify-center items-center pt-14 lg:pt-8">
              <BackgroundGradientRound>
                <img
                  className="z-10 size-24 rounded-full mx-auto"
                  src={student.data.photo}
                  alt=""
                />
              </BackgroundGradientRound>
            </div>

            <h1 className="text-xl font-medium uppercase secondary-font text-center mt-3">
              {student.data.name}
            </h1>
            <h1 className="text-base text-center  font-normal text-[#00ccb1] capitalize">
              {student.data.schoolOrCollage}
            </h1>

            <ul>
              <li>
                <NavLink to={"/"}>Home</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <div className="relative z-10 flex justify-start items-center pb-10 -mt-[100px] w-4/5 mx-auto">
        <BackgroundGradientRound>
          <img
            className="z-10 size-40 rounded-full mx-auto"
            src={student.data.photo}
            alt=""
          />
        </BackgroundGradientRound>
      </div>
      <div className="w-4/5 mx-auto grid md:grid-cols-2 gap-10 md:gap-0">
        <div>
          <h1 className="text-2xl font-bold uppercase secondary-font">
            {student.data.name}
          </h1>
          <h1 className="text-lg font-normal text-[#00ccb1] uppercase flex gap-3">
            {Education} {student.data.schoolOrCollage}
          </h1>
          <div className="mt-4">
            <p className="flex gap-4 italic text-base">
              {emailSVG} {student.data.email} hello
            </p>
            <p className="flex gap-4 italic text-base mt-3">
              {phoneOutlineSVG} {student.data.whatsApp}
            </p>
          </div>
        </div>
        <div>
          <h4 className="text-2xl md:text-4xl secondary-font uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#00ccb1] to-pink-500">
            Post for Tuition
          </h4>
          <TuitionPostForm
            id={student.data._id}
            whatsApp={student.data.whatsApp}
          />
        </div>
      </div>
      <StudentTuitions id={student.data._id}></StudentTuitions> */}
    </div>
  );
};

export default StudentProfile;
