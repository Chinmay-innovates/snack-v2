import { Dispatch, FC, SetStateAction, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Typography } from '@/components/ui/typography';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
export const CreateChannelDialog: FC<{
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  workspaceId: string;
  userId: string;
}> = ({ dialogOpen, setDialogOpen, userId, workspaceId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const formSchema = z.object({
    name: z
      .string()
      .nonempty({ message: 'Channel name is required' })
      .min(3, { message: 'Channel name too short. Must be at least 3 characters long' })
      .trim()
      .transform((name) => name.replace(/\s+/g, '-')), // replace whitespace with hyphens
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async ({ name }: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);

      //   await createChannel({
      //     name,
      //     userId,
      //     workspaceId,
      //   });

      router.refresh();
      setIsSubmitting(false);
      setDialogOpen(false);
      form.reset();
      toast(`Channel #${name} is Live`, {
        description: 'Channel up and running smoothly.',
        icon: '🎉',
        duration: 5000,
        style: {
          background: '#1a1a1a',
          color: '#ffffff',
        },
      });
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen((prevState) => !prevState)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="my-4">
            <Typography text="Create channel" variant="h3" />
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Typography text="Channel name" variant="p" />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="# channel-name" {...field} />
                  </FormControl>
                  <FormDescription>
                    <Typography
                      text="choose a short, clear name that reflects your topic."
                      variant="p"
                      className="mb-4"
                    />
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="mt-3" disabled={isSubmitting} type="submit">
              {isSubmitting ? 'Creating...' : 'Create'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
