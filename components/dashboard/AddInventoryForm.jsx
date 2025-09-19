"use client";
import SelectInput from "@/components/FormInputs/SelectInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextareaInput";
import TextInput from "@/components/FormInputs/TextInput";
import { makePostRequest } from "@/lib/apiRequest";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddInventoryForm({ items, warehouses, suppliers }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  async function onSubmit(data) {
    console.log(data);
    makePostRequest(
      setLoading,
      "api/adjustments/add",
      data,
      "Add Stock",
      reset
    );
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Reference Number"
          name="referenceNumber"
          register={register}
          errors={errors}           
        />
        <SelectInput
          label="Select the Item"
          name="itemId"
          register={register}
          className="w-full"
          options={items}
        />
        <SelectInput
          label="Select the Supplier"
          name="supplierId"
          register={register}
          className="w-full"
          options={suppliers}
        />
        <TextInput
          label="Enter Quantity of Stock to Add"
          type="number"
          name="addStockQty"
          register={register}
          errors={errors}
          className="w-full"
        />
        <SelectInput
          label="Select the Warehouse that will receive the stock"
          name="receivingWarehouseId"
          register={register}
          className="w-full"
          options={warehouses}
        />
        <div className="sm:col-span-2">
          <label
            htmlFor="notes"
            className="block text-sm font-medium leading-6 text-gray-900"
          ></label>
          <TextareaInput
            label="Adjustment Notes"
            name="notes"
            register={register}
            errors={errors}
          />
        </div>
      </div>
      <SubmitButton isLoading={loading} title="Adjustment" />
    </form>
  );
}
