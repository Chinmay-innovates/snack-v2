import { cn } from '@/lib/utils';
import { ElementType } from 'react';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

const variantClasses: Record<Variant, string> = {
  h1: 'scroll-m-20 text-4xl font-extra-bold tracking-tight lg:text-5xl',
  h2: 'scroll-m-16 text-3xl font-bold tracking-tight lg:text-4xl',
  h3: 'scroll-m-12 text-2xl font-semi-bold tracking-tight lg:text-3xl',
  h4: 'scroll-m-10 text-xl font-medium tracking-tight lg:text-2xl',
  h5: 'scroll-m-8 text-lg font-normal tracking-tight lg:text-xl',
  h6: 'scroll-m-6 text-base font-normal tracking-tight lg:text-xl',
  p: 'scroll-m-4 text-sm font-normal tracking-tight lg:text-base',
};

type TypographyProps<T extends ElementType = 'p'> = {
  as?: T;
  variant?: Variant;
  text: string;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>;

export const Typography = <T extends ElementType = 'p'>({
  as,
  variant = 'p',
  text,
  className,
  ...props
}: TypographyProps<T>) => {
  const Component = as || variant || 'p';
  const combinedClassName = cn(variantClasses[variant], className);

  return (
    <Component className={combinedClassName} {...props}>
      {text}
    </Component>
  );
};

Typography.displayName = 'Typography';
