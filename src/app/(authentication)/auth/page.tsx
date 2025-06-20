'use client';

import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BsSlack } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { RxGithubLogo } from 'react-icons/rx';
import { MdOutlineAutoAwesome } from 'react-icons/md';

import { supabaseBrowserClient } from '@/supabase/supabase-client';
import { Typography } from '@/components/ui/typography';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Provider } from '@supabase/supabase-js';
import { registerWithEmail } from '@/server/register-with-email';

const AuthPage = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getCurrUser = async () => {
      const {
        data: { session },
      } = await supabaseBrowserClient().auth.getSession();

      if (session) {
        return router.push('/');
      }
    };

    getCurrUser();
    setIsMounted(true);
  }, [router]);

  const formSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsAuthenticating(true);
    const response = await registerWithEmail({ email: values.email });
    const { data, error } = JSON.parse(response);

    if (error) {
      console.warn(error);
      return alert(error.message);
    }

    setIsAuthenticating(false);
  }

  const socialAuth = async (provider: Provider) => {
    setIsAuthenticating(true);
    await supabaseBrowserClient().auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setIsAuthenticating(false);
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen p-5 grid text-center place-content-center bg-white">
      <div className="max-w-[450px]">
        <div className="flex justify-center items-center gap-3 mb-4">
          <BsSlack size={30} />
          <Typography text="Snackk" variant="h2" />
        </div>

        <Typography text="Sign in to your Snackk" variant="h2" className="mb-3" />

        <Typography
          text="We suggest using the email address that you use at work"
          variant="p"
          className="opacity-90 mb-7"
        />

        <div className="flex flex-col space-y-4">
          <Button
            disabled={isAuthenticating}
            variant="outline"
            className="py-6 border-2 flex space-x-3 bg-[#4285F4] text-white [&_svg]:size-6"
            onClick={() => socialAuth('google')}
          >
            <FcGoogle size={30} />
            <Typography className="text-xl" text="Sign in with Google" variant="p" />
          </Button>
          <Button
            disabled={isAuthenticating}
            variant="outline"
            className="py-6 border-2 flex space-x-3 bg-black text-white [&_svg]:size-6"
            onClick={() => socialAuth('github')}
          >
            <RxGithubLogo size={30} />
            <Typography className="text-xl" text="Sign in with GitHub" variant="p" />
          </Button>
        </div>

        <div>
          <div className="flex items-center my-6">
            <Separator className="mr-[10px] flex-1 border-t bg-neutral-300" />
            <Typography text="OR" variant="p" />
            <Separator className="ml-[10px] flex-1 border-t bg-neutral-300" />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <fieldset disabled={isAuthenticating}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="name@work-email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  variant="secondary"
                  className="bg-primary-dark hover:bg-primary-dark/90 w-full my-5 text-white"
                  type="submit"
                >
                  <Typography text="Sign in with Email" variant="p" />
                </Button>

                <div className="px-5 py-4 bg-gray-100 rounded-sm">
                  <div className="text-gray-500 flex items-center space-x-3">
                    <MdOutlineAutoAwesome />
                    <Typography
                      text="We will email you a magic link for a password-free sign-in"
                      variant="p"
                    />
                  </div>
                </div>
              </fieldset>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
