import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import {
  useEditLectureMutation,
  useGetLectureByIdQuery,
  useRemoveLectureMutation,
} from "@/features/api/courseApi";
import { getRTKErrorMessage } from "@/error/getRTKErrorMessage ";

const MEDIA_API = "http://localhost:5000/api/v1/media";

type UploadVideoInfo = {
  videoUrl: string;
  publicId: string;
};

export default function UpdateLecture() {
  const params = useParams();
  const navigate = useNavigate();
  const { courseId, lectureId } = params;
  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] =
    useState<UploadVideoInfo | null>(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);
  console.log(btnDisable);

  const [editLecture, { data, isSuccess, error }] = useEditLectureMutation();

  const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setMediaProgress(true);
    setUploadProgress(0);

    try {
      const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
        onUploadProgress: (progressEvent) => {
          if (!progressEvent.total) return;

          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setUploadProgress(percent);
        },
      });

      if (res.data.success) {
        setUploadVideoInfo({
          videoUrl: res.data.data.url,
          publicId: res.data.data.public_id,
        });
        setBtnDisable(false);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Video upload failed");
    } finally {
      setMediaProgress(false);
    }
  };
  const editLectureHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await editLecture({
      lectureTitle,
      videoInfo: uploadVideoInfo,
      isPreviewFree: isFree,
      courseId,
      lectureId,
    });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      navigate(`/admin/course/${courseId}/lecture`);
    }
    if (error) {
      toast.error(getRTKErrorMessage(error));
    }
  }, [data, isSuccess, navigate, error, courseId]);
  const [
    removeLecture,
    {
      error: removeLectureError,
      data: removeLectureData,
      isSuccess: removeLectureSuccess,
    },
  ] = useRemoveLectureMutation();
  const handleRemoveLectureHandler = async () => {
    await removeLecture(lectureId);
  };

  const { data: lectureData } = useGetLectureByIdQuery(lectureId);
  const lecture = lectureData?.lecture;
  useEffect(() => {
    if (lecture) {
      setLectureTitle(lecture.lectureTitle);
      setIsFree(lecture.isPreviewFree);
      setUploadVideoInfo(lecture.videoInfo);
    }
  }, [lecture]);

  useEffect(() => {
    if (removeLectureSuccess) {
      toast.success(removeLectureData.message);
    }
    if (removeLectureError) {
      toast.error(getRTKErrorMessage(removeLectureError));
    }
  }, [removeLectureData, removeLectureSuccess, removeLectureError]);
  return (
    <div>
      <Link to={`/admin/course/${courseId}/lecture`}>
        <Button size={"icon"} variant={"outline"} className="rounded-full">
          <ArrowLeft />
        </Button>
      </Link>
      <Card className="w-full max-w-full p-4 mt-2">
        <CardHeader className="flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-lg font-bold">Basic Information</h1>
            <p>Make changes to your course here. Click save when you're done</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Label>Title</Label>
            <p>Make changes and click save when done.</p>
            <Button
              onClick={handleRemoveLectureHandler}
              variant={"default"}
              className="bg-red-500 hover:bg-red-400 cursor-pointer"
            >
              Remove Lecture
            </Button>
          </div>
          <form className="flex flex-col gap-6" onSubmit={editLectureHandler}>
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input
                type="text"
                placeholder="title"
                required
                name="lectureTitle"
                value={lectureTitle}
                onChange={(e) => setLectureTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Video</Label>
              <Input
                type="file"
                name="video/*"
                required
                onChange={fileChangeHandler}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="airplane-mode"
                checked={isFree}
                onCheckedChange={setIsFree}
              />

              <Label htmlFor="airplane-mode">Is this video FREE?</Label>
            </div>
            {mediaProgress && (
              <div>
                <p>{uploadProgress}% uploaded</p>
                <Progress value={uploadProgress} />
              </div>
            )}
            <Button
              type="submit"
              disabled={mediaProgress}
              className="bg-green-700"
            >
              {mediaProgress ? "Uploading..." : "Update Lecture"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
