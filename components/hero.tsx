"use client"
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';


function Hero() {
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()

  const resetFormField = () => {
    setEmail('');
  };

  const isValidEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setError(null);
  };

  const submit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/post-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        console.log('Email successfully submitted');
        router.push('/success');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      setError('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError('Email is invalid');
      return;
    }
    submit();
    resetFormField();
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center h-[80vh]">
      <h1 className="text-5xl text-center text-transparent bg-clip-text bg-gradient-to-l from-zinc-600 via-neutral-50 to-zinc-500">Email Waitlist for Exodia</h1>
      <p className="mx-auto max-w-lg text-sm text-center text-zinc-400">Lorem ipsum, dolor sit amet consectetur adipisisuscipit labore harum ipsa iure qui voluptate delectus deleniti sunt molestias! Ad.</p>
      <form onSubmit={handleSubmit} className="flex h-12 pl-3 w-full rounded-xl bg-neutral-900 overflow-hidden">
        <input 
          value={email} 
          onChange={handleChange} 
          type="email" 
          name="email" 
          id="email" 
          required 
          placeholder="Enter your email" 
          className="bg-transparent placeholder:text-zinc-500 outline-none w-full"
          disabled={isLoading}
        />
        <button 
          type='submit' 
          className="px-4 rounded-2xl hover:from-red-300 hover:to-orange-600 transition bg-gradient-to-l from-red-400 to-orange-800"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default Hero;