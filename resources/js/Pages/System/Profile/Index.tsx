import { FormEventHandler, useEffect, useState } from 'react';
import { PageProps, RecordItem, User } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useIsFirstRender } from '@/lib/utils';
import axios, { AxiosError } from 'axios';

// plugins
import { camel2title, getDicebearAvatar, handleUserAvatar } from '@/function';
import * as diceCollection from '@dicebear/collection';
import { InputElement } from 'imask';

// Partials
import ErrorMessage from '@/Components/forms/ErrorMessage';
import SystemLayout from '@/Layouts/SystemLayout';

// Shadcn Component
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { ScrollArea } from '@/Components/ui/scroll-area';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';

type ContentProps = {
}

export default function Profile({ auth }: PageProps<ContentProps>) {
    const isFirstRender = useIsFirstRender();

    // Handle Avatar
    let avatarType = 'template';
    let avatarTemplate = 'initials';
    if(auth.user.avatar && auth.user.avatar in diceCollection){
        avatarType = 'template';
        avatarTemplate = auth.user.avatar;
    } else {
        avatarType = 'custom';
    }

    // Profile - Forms
    const [previewAvatar, setPreviewAvatar] = useState<string>();
    const [formAvatarType, setFormAvatarType] = useState<string>(avatarType);
    const [formAvatarTemplate, setFormAvatarTemplate] = useState<string>(avatarTemplate);
    const [formAvatarFile, setFormAvatarFile] = useState<any>([]);
    const [formAvatarFileName, setFormAvatarFileName] = useState<string>('');
    const [formName, setFormName] = useState<string>(auth.user.name);
    const [formEmail, setFormEmail] = useState<string>(auth.user.email);
    const [formUsername, setFormUsername] = useState<string | undefined>('username' in auth.user ? auth.user?.username : '');

    // Forms
    const resetForm = (user: User = auth.user) => {
        setFormName(user.name);
        setFormEmail(user.email);
        setFormUsername('username' in user ? user?.username : '');
        setFormAvatarFile([]);
        setFormAvatarFileName('');

        // Handle Avatar
        let avatarType = 'custom';
        let avatarTemplate = 'initials';
        if(user.avatar && user.avatar in diceCollection){
            avatarType = 'template';
            avatarTemplate = user.avatar;
        }
        setFormAvatarType(avatarType);
        if(avatarType === 'template'){
            setFormAvatarTemplate(avatarTemplate);
        }

        // Handle Preview
        let avatar = handleUserAvatar(user);
        setPreviewAvatar(avatar);
    }
    // Form Action
    const [errorBag, setErrorBag] = useState<{ [key: string]: string[] }>({});
    const [abortControllerFormSubmit, setAbortControllerFormSubmit] = useState<AbortController | null>(null);
    const handleFormSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        // Update submit button to loading state
        let submitBtn = document.getElementById('profile-submit');
        if(submitBtn){
            if(submitBtn.tagName.toLowerCase() === 'button'){
                submitBtn.setAttribute('disabled', 'disabled');
            }
            submitBtn.innerHTML = `<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>`;
        }
        // Reset error bag
        setErrorBag({});

        // Create a new AbortController
        const abortController = new AbortController();
        // Store the AbortController in state
        setAbortControllerFormSubmit(abortController);

        // Build Form Data
        let formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('name', formName);
        formData.append('email', formEmail);
        if(formUsername){
            formData.append('username', formUsername);
        }
        // Handle Avatar
        formData.append('avatar_type', formAvatarType);
        if(formAvatarType === 'custom' && formAvatarFile){
            formData.append('avatar_file', formAvatarFile);
        } else {
            formData.append('avatar_template', formAvatarTemplate);
        }

        let actionRoute = route('api.profile.v1.update', auth.user.uuid);
        // Make request call
        axios.post(actionRoute, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            cancelToken: new axios.CancelToken(function executor(c) {
                // Create a CancelToken using Axios, which is equivalent to AbortController.signal
                abortController.abort = c;
            })
        }).then((response) => {
            if (response.status === 200) {
                router.reload();

                const responseJson = response.data;
                let data = responseJson.result.data;
                resetForm(data);
            }
        }).catch((response) => {
            const axiosError = response as AxiosError;

            let errors:any = axiosError.response?.data;
            if(errors.errors){
                // Store to the error bag variable
                setErrorBag(errors.errors);
            }

            // Set a timeout to perform an action after a delay (e.g., 100 milliseconds)
            setTimeout(() => {
                // Find all elements with the class 'form--group' that are marked as 'is--invalid'
                const errorElements = document.querySelectorAll('#profile-forms .form--group.is--invalid');
        
                // Check if there are any 'is--invalid' elements
                if (errorElements.length > 0) {
                    // Find the element with the highest top offset within the 'is--invalid' elements
                    const highestElement = Array.from(errorElements).reduce((a, b) =>
                        (a as HTMLElement).offsetTop > (b as HTMLElement).offsetTop ? b : a
                    );
            
                    // Scroll the element with the highest top offset into view with a smooth behavior
                    highestElement.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }).finally(() => {
            // Clear the AbortController from state
            setAbortControllerFormSubmit(null);
        
            // Update to original state
            let submitBtn = document.getElementById('profile-submit');
            if (submitBtn) {
                if (submitBtn.tagName.toLowerCase() === 'button') {
                    submitBtn.removeAttribute('disabled');
                }
                submitBtn.innerHTML = `Submit`;
            }
        });
    }

    useEffect(() => {
        if(!isFirstRender){
            let avatar = handleUserAvatar(undefined, formAvatarTemplate, formName);
            setPreviewAvatar(avatar);
        }
    }, [formAvatarTemplate, formName]);

    // Document Ready
    useEffect(() => {
        let avatar = handleUserAvatar(auth.user);
        setPreviewAvatar(avatar);
    }, []);

    return (
        <SystemLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <form onSubmit={handleFormSubmit} id={ `profile-forms` } >
                <Card className={ ` w-full` }>
                    <CardHeader>
                        <div>
                            <CardTitle>
                                    <div>Profile</div>
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {/* Avatar Preview & Type */}
                        <div className={ `flex flex-row gap-6 mb-4` }>
                            <div className={ ` w-1/4` }>
                                <div className={ `border rounded-md p-4 w-full aspect-square flex items-center justify-center` }>
                                    <Avatar className={ ` cursor-pointer rounded-lg` }>
                                        <AvatarImage src={previewAvatar} alt="Avatar Preview" />
                                        <AvatarFallback className={ ` cursor-pointer rounded-lg` }>EX</AvatarFallback>
                                    </Avatar>
                                </div>
                            </div>
                            <div className={ ` w-3/4` }>
                                <div className={ `form--group` }>
                                    <label className={ `form--label` }>Type</label>

                                    <Select onValueChange={(value) => {
                                        setFormAvatarType(value);
                                    }} value={formAvatarType}>
                                        <SelectTrigger className={ `dark:text-white ${errorBag?.avatar_type ? ` !border-red-500` : ''}` }>
                                            <SelectValue placeholder="Select an option" className={ `dark:text-white` }/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Select avatar style</SelectLabel>
                                                <SelectItem value="template">Template</SelectItem>
                                                <SelectItem value="custom">Custom</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                    <ErrorMessage message={ errorBag?.avatar_type }/>
                                </div>
                            </div>
                        </div>

                        {/* Avatar Selection */}
                        {(() => {
                            if(formAvatarType === 'template'){
                                return <>
                                    <div className={ `form--group` }>
                                        <label className={ `form--label` }>Avatar</label>

                                        <Select onValueChange={(value) => {
                                            setFormAvatarTemplate(value);
                                        }} value={formAvatarTemplate}>
                                            <SelectTrigger className={ `dark:text-white ${errorBag?.avatar_template ? ` !border-red-500` : ''}` }>
                                                <SelectValue placeholder="Select an option" className={ `dark:text-white` }/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <ScrollArea className="p-0">
                                                        <div className={ `max-h-[10rem]` }>
                                                        <SelectLabel>Select avatar</SelectLabel>
                                                        {(() => {
                                                            let el:any[] = [];
                                                            let lists = Object.keys(diceCollection).map((val, index) => {
                                                                return val;
                                                            });

                                                            lists.forEach((value, index) => {
                                                                let relatedAvatar = handleUserAvatar(undefined, value, formName);

                                                                el.push(
                                                                    <SelectItem value={ value } className={ `flex w-full` } key={ value }>
                                                                        <div className={ `flex gap-4 flex-row items-center justify-between w-full` }>
                                                                            <span>
                                                                                <Avatar className={ ` cursor-pointer h-6 aspect-square rounded-md` }>
                                                                                    <AvatarImage src={relatedAvatar} alt="@shadcn" />
                                                                                    {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                                                                                    <AvatarFallback className={ ` cursor-pointer rounded-lg` }>EX</AvatarFallback>
                                                                                </Avatar>
                                                                            </span>
                                                                            <span>{ camel2title(value) }</span>
                                                                        </div>
                                                                    </SelectItem>
                                                                );
                                                            });

                                                            return el;
                                                        })()}
                                                        </div>
                                                    </ScrollArea>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>

                                        <ErrorMessage message={ errorBag?.avatar_template }/>
                                    </div>
                                </>;
                            } else if(formAvatarType === 'custom'){
                                return <>
                                    <div className={ `form--group` }>
                                        <label className={ `form--label` }>Upload an Avatar</label>

                                        <div className={ `!tw__border-inherit` }>
                                            {/* <input type="file" class="tw__hidden" id="input_profile-avatar_file" accept=".jpeg,.jpg,.png,.svg" max="512" wire:model="avatar_file"> */}
                                            <label htmlFor={ `input_profile-avatar_file` } className={ ` p-4 rounded-md border-2 border-dashed flex items-center gap-4 cursor-pointer` }>
                                                <i className={ `fa-solid fa-paperclip text-2xl -rotate-45` }></i>

                                                <div className={ `` }>
                                                    <input type={ `file` } id={ `input_profile-avatar_file` } onChange={(e) => {
                                                        if(e.target?.files){
                                                            setFormAvatarFile(e.target?.files[0]);
                                                        }
                                                        setFormAvatarFileName(e.target.value);
                                                    }} className={ `hidden` } accept={ `image/jpeg,image/jpg,image/png,image/svg` }/>
                                                    <div className={ `tw__font-bold mb-1 ${formAvatarFileName ? ` underline` : ''}` } id="input_profile-avatar_label_helper">{ formAvatarFileName ? formAvatarFileName.split(/(\\|\/)/g).pop() : `Choose Image` }</div>
                                                    <div className={ `tw__font-light text-xs` }>JPG/JPEG, PNG or SVG. Max size of 512kb</div>
                                                </div>
                                            </label>

                                            {(() => {
                                                if(formAvatarFileName){
                                                    return <>
                                                        <Button variant={ `link` } className={ `px-0 text-red-500 py-1 !h-auto leading-none` } onClick={() => {
                                                            let fileInput = document.getElementById('input_profile-avatar_file') as InputElement;
                                                            if(fileInput){
                                                                console.log(fileInput);
                                                                fileInput.value = '';
                                                                setFormAvatarFile([]);
                                                                setFormAvatarFileName('');
                                                            }
                                                        }}>Remove</Button>
                                                    </>;
                                                }

                                                return <></>;
                                            })()}
                                            {/* <label for="input_profile-avatar_file" class=" tw__p-4 tw__rounded-md tw__border-2 tw__border-dashed tw__flex tw__items-center tw__gap-4 tw__cursor-pointer">
                                                <i class="fa-solid fa-paperclip tw__text-2xl tw__-rotate-45"></i>
                        
                                                <div class="">
                                                    <div class=" tw__font-bold mb-1" id="input_profile-avatar_label_helper">
                                                        {{ 'Choose Image' }}
                                                    </div>
                                                    <div class=" tw__font-light">JPG/JPEG, PNG or SVG. Max size of 512kb</div>
                                                </div>
                                            </label> */}
                                        </div>
                                    </div>
                                </>;
                            }

                            return <></>;
                        })()}

                        {/* Name */}
                        <div className={ `form--group` }>
                            <label className={ `form--label` }>Name</label>
                            <Input value={ formName } onChange={(e) => setFormName(e.target.value)} placeholder={ `Name` } className={ `${errorBag?.name ? ` !border-red-500` : ''}` }/>
                            
                            <ErrorMessage message={ errorBag?.name }/>
                        </div>

                        {/* Email */}
                        <div className={ `form--group` }>
                            <label className={ `form--label` }>Email</label>
                            <Input form={ formEmail } onChange={(e) => setFormEmail(e.target.value)} placeholder={ `Email` } className={ `${errorBag?.email ? ` !border-red-500` : ''}` }/>
                            
                            <ErrorMessage message={ errorBag?.email }/>
                        </div>

                        {/* Username */}
                        <div className={ `form--group` }>
                            <label className={ `form--label` }>Username</label>
                            <Input value={ formUsername } onChange={(e) => setFormUsername(e.target.value)} placeholder={ `Username` } className={ `${errorBag?.username ? ` !border-red-500` : ''}` }/>
                            
                            <ErrorMessage message={ errorBag?.username }/>
                        </div>
                    </CardContent>
                    <CardFooter className={ `justify-end` }>
                        <div className={ `flex flex-row gap-4` }>
                            <Button type={ `button` } variant={ `ghost` } onClick={() => {
                                resetForm();
                            }}>Reset</Button>
                            <Button id={ `profile-submit` }>Submit</Button>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </SystemLayout>
    );
}
