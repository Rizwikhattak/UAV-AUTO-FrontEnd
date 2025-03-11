import { addOperatorSchema } from "@/app/operators/OperatorsSchema";
import CardInputCommon from "@/components/common/CardInputCommon";
import InputCommon from "@/components/common/InputCommon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
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
import { addOperator } from "@/Store/Actions/operatorActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export function EditDialogOperator({ triggerButton }) {
  const operator = useSelector((state) => state.operator);
  const dispatch = useDispatch();
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  };

  const form = useForm({
    resolver: zodResolver(addOperatorSchema),
    defaultValues: initialState,
  });
  const handleFormSubmit = async (data) => {
    try {
      console.log("Form Submitted:", data);

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("role", "operator");
      await dispatch(addOperator(formData)).unwrap();
      form.reset();
    } catch (err) {
      console.log(err);
    }
  };

  const handleError = (errors) => {
    console.log("Validation Errors:", errors);
    toast.error("Please fix the errors before submitting.");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{triggerButton}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form} className="w-full">
          <form
            onSubmit={form.handleSubmit(handleFormSubmit, handleError)}
            className="space-y-4"
          >
            {/* Image Upload */}
            <CardInputCommon control={form.control} />

            {/* Name Field */}
            <InputCommon
              control={form.control}
              name="name"
              label="Name"
              placeholder="Enter operator name"
            />

            {/* Email Field */}
            <InputCommon
              control={form.control}
              name="email"
              inputType="email"
              label="Email"
              placeholder="Enter email"
            />

            {/* Password Field */}
            <InputCommon
              control={form.control}
              name="password"
              inputType="password"
              label="Password"
              placeholder="Enter password"
            />

            {/* Confirm Password Field */}
            <InputCommon
              control={form.control}
              name="confirmPassword"
              inputType="password"
              label="Confirm Password"
              placeholder="Re-enter password"
            />

            <Button
              type="submit"
              disabled={operator.loading}
              variant={operator.loading ? "outline-full" : "hover-blue-full"}
            >
              {operator.loading ? <Spinner /> : "Add Operator"}
            </Button>
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
