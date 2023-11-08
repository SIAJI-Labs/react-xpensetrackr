import { useEffect, FormEventHandler } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, useForm } from '@inertiajs/react';

import ApplicationLogo from '@/Components/ApplicationLogo';
// Forms
import InputError from '@/Components/InputError';

// Shadcn
import { Card, CardContent } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import Checkbox from '@/Components/Checkbox';

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {
    // Forms
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    // Toggle Password Form
    let passwordIcon = 'fa-eye';
    const togglePasswordType = () => {
        let currentAttribute = document.getElementById('auth-password')?.getAttribute('type');

        if(currentAttribute === 'password'){
            document.getElementById('auth-password_icon')?.classList.remove(passwordIcon);
            passwordIcon = 'fa-eye-slash';
            document.getElementById('auth-password_icon')?.classList.add(passwordIcon);

            // Set to Text
            document.getElementById('auth-password')?.setAttribute('type', 'text');
        } else {
            document.getElementById('auth-password_icon')?.classList.remove(passwordIcon);
            passwordIcon = 'fa-eye';
            document.getElementById('auth-password_icon')?.classList.add(passwordIcon);

            // Set to Password
            document.getElementById('auth-password')?.setAttribute('type', 'password');
        }
    }

    return (
        <PublicLayout>
            <Head title="Login"/>

            <section className={ ` min-h-screen w-full flex items-center justify-center` }>
                <form onSubmit={submit} className={ ` w-[400px]` }>
                    <div className={ `` }>
                        <Link href={route('public.index')}>
                            <ApplicationLogo
                                fontSizeMain={ ` text-3xl` }   
                            ></ApplicationLogo>
                        </Link>
                    </div>

                    <Card className={ ` mt-4` }>
                        <CardContent className={ ` pt-6` }>
                            <h2 className={ ` font-semibold text-lg text-center mb-6` }>Sign-in to your account</h2>
                            
                            <div className={ ` flex flex-col gap-4` }>
                                {/* Email */}
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="auth-email">Email / Username</Label>
                                    <Input
                                        type="text"
                                        id="auth-email"
                                        name="email"
                                        value={data.email}
                                        placeholder="Email / Username"
                                        className={ ` ${errors.email ? `border-destructive` : null} `}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />

                                    {errors.email ? <InputError message={`*${errors.email}`} className=" italic" /> : null}
                                </div>

                                {/* Password */}
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="auth-password">Password</Label>
                                    <div className={ `relative` }>
                                        <Input
                                            type="password"
                                            id="auth-password"
                                            name="password"
                                            value={data.password}
                                            placeholder="Password"
                                            className={ ` ${errors.password ? `border-destructive` : null} pr-12`}
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        
                                        <div className={ ` absolute right-4 top-1/2 -translate-y-1/2` }>
                                            <span
                                                id="auth-password_icon"
                                                className={ ` fa-solid ${passwordIcon} cursor-pointer` }
                                                onClick={togglePasswordType}></span>
                                        </div>
                                    </div>

                                    {errors.password ? <InputError message={`*${errors.password}`} className=" italic"/> : null}
                                </div>

                                <div className={ ` flex flex-row justify-between` }>
                                    {/* Remember me? */}
                                    <div className={ `items-center flex space-x-2` }>
                                        <Checkbox
                                            id="auth-remember"
                                            className=" text-primary focus:ring-primary"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                        />
                                        <div className="grid gap-1.5 leading-none">
                                            <label
                                                htmlFor="auth-remember"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Remember me?
                                            </label>
                                        </div>
                                    </div>

                                    {/* Forgot Password */}
                                    <Link href={route('password.request')} className={ ` text-sm` }>Forgot Password</Link>
                                </div>

                                <div className={ ` w-full flex flex-col gap-2` }>
                                    <Button type='submit' className=' w-full'>Sign In</Button>

                                    <span className={ ` text-sm` }>Didn't have an account yet? <strong><Link href={route('register')}>Sign up</Link></strong> now</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </section>
        </PublicLayout>
    );
}
