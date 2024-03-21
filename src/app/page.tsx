"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
import { useState } from "react";
import { useRouter } from 'next/navigation';


const formSchema = z
  .object({
    cutomerName: z.string().min(2),
    emailAddress: z.string().email(),
    vehiclesTypes: z.enum(["twoWheeler", "fourWheeler"]),
    vechileModel: z.string()
  })

  .refine(
    (data) => {
      if (data.vehiclesTypes === "twoWheeler") {
        return !!data.vechileModel;
      }

      return true;
    },
    {
      message: "Model name is required",
      path: ["twoWheelerModel"],
    }
  )
  .refine(
    (data) => {
      if (data.vehiclesTypes === "fourWheeler") {
        return !!data.vechileModel;
      }
      return true;
    },
    {
      message: "Model name is required",
      path: ["fourWheelerModel"],
    }
  )
  ;

export default function Home() {
  const { push } = useRouter();
  const [userState, setUserState] = useState({});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cutomerName: "",
      emailAddress: "",
    },
  });

  const vehiclesTypes = form.watch("vehiclesTypes");

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const userdata=values;
    setUserState(userdata);
    localStorage.setItem('userinfo',JSON.stringify(userdata));  
    push('/cotation_review');
  };
  
  return (
    <>
    <main className="flex justify-center items-center h-full w-full p-16">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-md w-full flex flex-col gap-4"
          >
          <h1 className="text-green-400">Enter Customer Information:</h1>
          <FormField
            control={form.control}
            name="cutomerName"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Customer Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="cutomer Name"
          
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="emailAddress"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email address"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="vehiclesTypes"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Vehicle type</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an vehicle type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="twoWheeler">Two Wheeler</SelectItem>
                      <SelectItem value="fourWheeler">Four Wheeler</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          {vehiclesTypes === "twoWheeler" && (
              <FormField
              control={form.control}
              name="vechileModel"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Slect an Model</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an Model" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Bajaj Pulsar NS200</SelectItem>
                        <SelectItem value="2">TVS Apache RTR 160</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          )}
          {vehiclesTypes === "fourWheeler" && (
              <FormField
              control={form.control}
              name="vechileModel"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Slect an Model</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an Model" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="3">Tata Nexon</SelectItem>
                        <SelectItem value="4">Maruti Brezza</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          )}
          <Button type="submit" className="w-full font-bold">
            Save & Continue
          </Button>
        </form>
      </Form>
    </main>
    </>
  );
}