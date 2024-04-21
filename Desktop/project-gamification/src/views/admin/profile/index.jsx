import Banner from "./components/Banner";
import ShowTasks from "../default/components/ShowTasks";
const ProfileOverview = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
        <div className="col-span-12 lg:!mb-0">
          <Banner />
          <ShowTasks/>
        </div>

      </div>
    </div>
  );
};

export default ProfileOverview;
