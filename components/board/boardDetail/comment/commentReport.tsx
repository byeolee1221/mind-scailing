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
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import axios from "axios";
import { ShieldAlert } from "lucide-react";
import { toast } from "sonner";

interface IProps {
  commentId: number;
}

const CommentReport = (props: IProps) => {
  const onReport = async () => {
    try {
      const response = await axios.post("/api/board/boardDetail/commentMenu", {
        commentId: props.commentId
      });

      if (response.status === 200) {
        alert("신고가 완료되었습니다. 감사합니다.");
      }
    } catch (error: any) {
      console.log("commentReport POST 클라이언트에서 오류 발생", error);
      return toast("오류 발생", {
        description: error.response.data
      });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <ShieldAlert className="mr-2 h-4 w-4" />
          <span>댓글 신고</span>
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[90%] rounded-md">
        <AlertDialogHeader>
          <AlertDialogTitle>댓글 신고</AlertDialogTitle>
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

export default CommentReport;
