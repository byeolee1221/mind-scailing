import axios from "axios";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import useSWR, { preload } from "swr";
import { useEffect, useState } from "react";

interface IDiaryList {
  id: number;
  diary: string;
  createdAt: number;
  userId: string;
  userEmail: string;
}

const fetcher = (url: string) =>
  axios.get(url).then((response) => response.data);

const DiaryList = (props: any) => {
  const { data } = useSWR<IDiaryList[]>("/api/myDiary", fetcher);
  const [empty, setEmpty] = useState(false);
  const [resError, setResError] = useState("");
  let filteredDiary: any;

  useEffect(() => {
    preload("/api/myDiary", fetcher);
  }, []);

  if (data) {
    filteredDiary = data.filter(
      (diary: IDiaryList) => diary.userEmail === props.session.user.email
    );
  }

  useEffect(() => {
    if (filteredDiary && filteredDiary.length === 0) {
      setEmpty(true);
    }
  }, [filteredDiary]);

  // console.log(filteredDiary);
  const onDelete = async (id: number) => {
    try {
      const response = await axios.delete("/api/myDiary", {
        data: {
          id: id,
        },
      });

      if (response.status === 200) {
        alert("일기가 삭제되었습니다.");
      }
    } catch (error: any) {
      console.log("myDiary DELETE 클라이언트에서 오류 발생", error);
      setResError(error.response.data);
    }
  };

  return (
    <div className="flex flex-col space-y-3 w-full">
      {!empty ? (
        !resError ? (
          filteredDiary?.map((data: IDiaryList) => (
            <div
              key={data.id}
              className="border p-2 rounded-md flex flex-col space-y-2 text-sm shadow-md dark:bg-slate-700 dark:text-white"
            >
              <h1>{data.createdAt}</h1>
              <p>{data.diary}</p>
              <div className="flex flex-row-reverse">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="bg-slate-200 hover:bg-slate-300 p-2 w-20 rounded-lg transition-colors shadow-sm dark:bg-slate-500 dark:hover:hover:bg-slate-600">
                      삭제
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-[90%] rounded-lg">
                    <AlertDialogHeader className="text-left">
                      <AlertDialogTitle>
                        일기를 삭제하시겠어요?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        삭제하면 되돌릴 수 없습니다.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-2">
                      <AlertDialogAction
                        onClick={() => onDelete(data.id)}
                        className="bg-slate-200 hover:bg-slate-300 p-2 rounded-md transition-colors"
                      >
                        삭제하기
                      </AlertDialogAction>
                      <AlertDialogCancel>취소</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">{resError}</p>
        )
      ) : (
        <p className="text-center bg-slate-200 dark:bg-slate-500 p-2 rounded-md">
          업로드한 일기가 없습니다.
        </p>
      )}
    </div>
  );
};

export default DiaryList;
