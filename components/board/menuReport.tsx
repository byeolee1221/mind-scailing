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

const MenuReport = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <ShieldAlert className="mr-2 h-4 w-4" />
          <span>게시글 신고</span>
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
          <AlertDialogAction>신고하기</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MenuReport;
