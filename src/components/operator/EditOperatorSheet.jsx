import { addOperatorSchema } from "@/views/operators/OperatorsSchema";
import CardInputCommon from "@/components/common/CardInputCommon";
import InputCommon from "@/components/common/InputCommon";
import Spinner from "@/components/common/SpinnerCommon";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { addOperator, updateOperator } from "@/Store/Actions/operatorActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export function EditOperatorSheet({ triggerButton, opData }) {
  const operator = useSelector((state) => state.operator);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const initialState = {
    name: opData.name,
    email: opData.email,
    password: "",
    confirmPassword: "",
    image: opData.image_path,
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
      formData.append("id", opData.id);
      formData.append("user_id", opData.user_id);
      console.log("opData", opData);
      console.log("form data", formData);
      await dispatch(updateOperator(formData)).unwrap();
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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          onClick={() => setOpen(true)}
          className="hover:text-blue-500 w-4 h-4 cursor-pointer transition-all duration-100 ease-in-out"
        >
          {triggerButton}
        </Button>
      </SheetTrigger>
      <SheetContent className="h-screen overflow-y-auto p-5">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
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

            <SheetFooter className="!p-0">
              <SheetClose asChild>
                <Button
                  type="submit"
                  disabled={operator.loading}
                  onClick={() => setOpen(false)}
                  variant={
                    operator.loading ? "outline-full" : "hover-blue-full"
                  }
                >
                  {operator.loading ? <Spinner /> : "Update Operator"}
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
