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
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface IProps {
  postId: string;
}

const DetailPostDelete = (props: IProps) => {
  const router = useRouter();
  const onDeletePost = async () => {
    try {
      const response = await axios.delete("/api/board/boardMenu/postDelete", {
        data: {
          postId: props.postId,
        },
      });

      if (response.status === 200) {
        alert("게시글이 삭제되었습니다.");
        router.back();
      }
    } catch (error: any) {
      console.log("detailPostDelete DELETE 클라이언트에서 오류 발생", error);
      return toast("오류 발생", {
        description: error.response.data,
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="w-full">
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Trash className="mr-2 h-4 w-4" />
            <span>게시글 삭제</span>
          </DropdownMenuItem>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>게시글 삭제</AlertDialogTitle>
          <AlertDialogDescription>
            게시글을 삭제하시겠습니까?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={onDeletePost}>삭제</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DetailPostDelete;
