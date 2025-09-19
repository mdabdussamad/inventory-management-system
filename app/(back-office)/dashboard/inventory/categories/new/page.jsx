"use client";
import FormHeader from "@/components/dashboard/FormHeader";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextareaInput";
import TextInput from "@/components/FormInputs/TextInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function NewCategory({ initialData = {}, isUpdate = false }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({defaultValues: initialData,});
  const [loading, setLoading] = useState(false);
  const router = useRouter()
    function redirect(){
      router.replace("/dashboard/inventory/categories")
    }
  async function onSubmit(data) {
    console.log(data);        
    if (isUpdate) {
          // Update Request
          makePutRequest(
            setLoading,
            `api/categories/${initialData.id}`,
            data,
            "Category",
            redirect,
            reset
          );
        } else {
          makePostRequest(setLoading, "api/categories", data, "Category", reset);
        }
  }
  return (
    <div>
      <FormHeader title={isUpdate ? "Update Category" : "New Category"} href="/dashboard/inventory/categories" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Category Title"
            name="title"
            register={register}
            errors={errors}
          />
          <div className="sm:col-span-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            ></label>
            <TextareaInput
              label="Category Description"
              name="description"
              register={register}
              errors={errors}
            />
          </div>
        </div>
        <SubmitButton isLoading={loading} title={isUpdate ? "Updated Category" : "New Category"} />
      </form>
    </div>
  );
}
