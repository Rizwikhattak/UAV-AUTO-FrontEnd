import { addOperatorSchema } from "@/app/operators/OperatorsSchema";
import CardInputCommon from "@/components/common/CardInputCommon";
import InputCommon from "@/components/common/InputCommon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addOperator, deleteOperator } from "@/Store/Actions/operatorActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export function DeleteOperatorDialog({ triggerButton, opData }) {
  const operator = useSelector((state) => state.operator);
  const dispatch = useDispatch();
  console.log("OPDATA DELETE", opData);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="hover:text-red-500 w-4 h-4 cursor-pointer transition-all duration-100 ease-in-out"
        >
          {triggerButton}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Operator</DialogTitle>
          <DialogDescription>
            Are u sure u want to delete this operator?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="destructive"
              onClick={() => {
                console.log("OP DELETED");
                dispatch(deleteOperator(opData?.id));
              }}
            >
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
