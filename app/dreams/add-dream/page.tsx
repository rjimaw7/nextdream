"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { format, set } from "date-fns";
import { cn, getCurrentTimeStamp } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const DreamSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  date: z.date({
    required_error: "A date of dream is required.",
  }),
  dream: z
    .string({
      required_error: "Dream is required",
    })
    .min(10, {
      message: "dream must be at least 10 characters.",
    }),
});

type DreamSchemaType = z.infer<typeof DreamSchema>;

export default function Home() {
  const form = useForm<DreamSchemaType>({
    resolver: zodResolver(DreamSchema),
    defaultValues: {
      title: "",
      date: new Date(),
      dream: "",
    },
  });

  const handleSubmitDream = async () => {
    const selectedDate = form.getValues("date");
    const currentTimestamp = new Date();

    // Set the time part of the selected date to the current timestamp's time
    const updatedDate = set(selectedDate, {
      hours: currentTimestamp.getHours(),
      minutes: currentTimestamp.getMinutes(),
      seconds: currentTimestamp.getSeconds(),
    });

    console.log(form.getValues("title"));
    console.log(getCurrentTimeStamp(form.getValues("date")));
    console.log(form.getValues("dream"));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Add Dream</CardTitle>
          <CardDescription>Tell Us What Happened</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmitDream)}
              className="space-y-4"
            >
              <div className="grid w-full items-center gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          id="title"
                          placeholder="Title of your dream"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                " justify-start text-left font-normal w-full",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>When was it?</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              id="date"
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dream"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dream</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your dream"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
        {/* <CardFooter>
          <Button>Submit</Button>
        </CardFooter> */}
      </Card>
    </main>
  );
}
