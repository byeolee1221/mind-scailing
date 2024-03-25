import { ShieldAlert } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import axios from "axios";

interface IProps {
  postId: number;
}

const MenuReport = (props: IProps) => {
  const onReport = async () => {
    try {
      const fetchData = await axios.post("/api/board/boardMenu", {
        postId: props.postId,
      });

      if (fetchData.status === 200) {
        alert("신고가 완료되었습니다. 감사합니다.");
      }
    } catch (error: any) {
      console.log("menuReport POST 클라이언트에서 오류 발생", error);
      alert(error.response.data);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <ShieldAlert className="mr-2 h-4 w-4 lg:h-6 lg:w-6" />
          <span className="lg:text-base">게시글 신고</span>
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[90%] rounded-md">
        <AlertDialogHeader>
          <AlertDialogTitle>게시글 신고</AlertDialogTitle>
          <AlertDialogDescription>
            신고하시면 운영진이 검토 후 신속히 처리하겠습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={onReport}>신고하기</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MenuReport;
