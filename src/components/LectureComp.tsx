import type { TLecture } from "@/pages/admin/lecture/Lecture";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

type TLectureCompProps = {
  lecture: TLecture;
  courseId: string | undefined;
  index: number;
};

const LectureComp: React.FC<TLectureCompProps> = ({
  lecture,
  courseId,
  index,
}) => {
  const navigate = useNavigate();
  console.log("lecture", lecture);
  const goToUpdateLecture = () => {
    navigate(`/admin/course/${courseId}/${lecture._id}`);
  };
  return (
    <>
      <div className="flex items-center justify-between bg-[#d1dce26b] py-2 rounded-sm px-4 my-2">
        <h1>
          {" "}
          <span className="font-semibold"> Lecture - {index + 1}:</span>{" "}
          {lecture?.lectureTitle}
        </h1>
        <Edit
          onClick={goToUpdateLecture}
          size={20}
          className="cursor-pointer text-gray-600"
        />
      </div>
    </>
  );
};

export default LectureComp;
