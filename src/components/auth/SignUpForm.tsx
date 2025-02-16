import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { NameFields } from './form/NameFields';
import { EmailField } from './form/EmailField';
import { PasswordFields } from './form/PasswordFields';
import { TenantCheckbox } from './form/TenantCheckbox';
import { SignUpFormValues, signUpFormSchema } from './signUpValidation';
import { useNavigate } from 'react-router-dom';

interface SignUpFormProps {
  onSuccess: () => void;
}

export default function SignUpForm({ onSuccess }: SignUpFormProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      isTenant: false,
    },
  });

  async function onSubmit(values: SignUpFormValues) {
    try {
      setLoading(true);
      console.log('Starting signup process with values:', values);

      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            first_name: values.firstName,
            last_name: values.lastName,
            is_tenant_user: values.isTenant,
          },
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) {
        console.error('Signup error:', error);
        throw error;
      }

      if (!data.user) {
        throw new Error('No user data returned from signup');
      }

      console.log('Signup successful:', data);
      toast({
        title: 'Success',
        description: 'Please check your email to confirm your account.',
      });

      if (onSuccess) {
        onSuccess();
      }

      // Redirect to dashboard after successful signup
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 1000);

    } catch (error: any) {
      console.error('Error in signup process:', error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <NameFields form={form} />
        <EmailField form={form} />
        <PasswordFields form={form} />
        <TenantCheckbox form={form} />
        
        <Button type="submit" className="w-full bg-[#ea384c] hover:bg-[#ea384c]/90" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </Button>
      </form>
    </Form>
  );
}
