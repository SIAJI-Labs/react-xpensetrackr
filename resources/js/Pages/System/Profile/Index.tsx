import { FormEventHandler, useEffect, useState } from 'react';
import { PageProps, RecordItem, User } from '@/types';
import { useIsFirstRender } from '@/lib/utils';
import { Head, Link, router } from '@inertiajs/react';
import axios, { AxiosError } from 'axios';

// plugins
import { camel2title, getDicebearAvatar, handleUserAvatar } from '@/function';
import * as diceCollection from '@dicebear/collection';

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
import { InputElement } from 'imask';

type ProfileProps = {
}

export default function Profile({ auth }: PageProps<ProfileProps>) {
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
    const [valueAvatarType, setValueAvatarType] = useState<string>(avatarType);
    const [valueAvatarTemplate, setValueAvatarTemplate] = useState<string>(avatarTemplate);
    const [valueAvatarFile, setValueAvatarFile] = useState<any>([]);
    const [valueAvatarFileName, setValueAvatarFileName] = useState<string>('');
    const [valueName, setValueName] = useState<string>(auth.user.name);
    const [valueEmail, setValueEmail] = useState<string>(auth.user.email);
    const [valueUsername, setValueUsername] = useState<string | undefined>('username' in auth.user ? auth.user?.username : '');

    // Forms
    const resetForm = (user: User = auth.user) => {
        setValueName(user.name);
        setValueEmail(user.email);
        setValueUsername('username' in user ? user?.username : '');
        setValueAvatarFile([]);
        setValueAvatarFileName('');

        // Handle Avatar
        let avatarType = 'custom';
        let avatarTemplate = 'initials';
        if(user.avatar && user.avatar in diceCollection){
            avatarType = 'template';
            avatarTemplate = user.avatar;
        }
        setValueAvatarType(avatarType);
        if(avatarType === 'template'){
            setValueAvatarTemplate(avatarTemplate);
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
        formData.append('name', valueName);
        formData.append('email', valueEmail);
        if(valueUsername){
            formData.append('username', valueUsername);
        }
        // Handle Avatar
        formData.append('avatar_type', valueAvatarType);
        if(valueAvatarType === 'custom' && valueAvatarFile){
            formData.append('avatar_file', valueAvatarFile);
        } else {
            formData.append('avatar_template', valueAvatarTemplate);
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
            let avatar = handleUserAvatar(undefined, valueAvatarTemplate, valueName);
            setPreviewAvatar(avatar);
        }
    }, [valueAvatarTemplate, valueName]);

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
                                        setValueAvatarType(value);
                                    }} value={valueAvatarType}>
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
                            if(valueAvatarType === 'template'){
                                return <>
                                    <div className={ `form--group` }>
                                        <label className={ `form--label` }>Avatar</label>

                                        <Select onValueChange={(value) => {
                                            setValueAvatarTemplate(value);
                                        }} value={valueAvatarTemplate}>
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
                                                                let relatedAvatar = handleUserAvatar(undefined, value, valueName);

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
                            } else if(valueAvatarType === 'custom'){
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
                                                            setValueAvatarFile(e.target?.files[0]);
                                                        }
                                                        setValueAvatarFileName(e.target.value);
                                                    }} className={ `hidden` } accept={ `image/jpeg,image/jpg,image/png,image/svg` }/>
                                                    <div className={ `tw__font-bold mb-1 ${valueAvatarFileName ? ` underline` : ''}` } id="input_profile-avatar_label_helper">{ valueAvatarFileName ? valueAvatarFileName.split(/(\\|\/)/g).pop() : `Choose Image` }</div>
                                                    <div className={ `tw__font-light text-xs` }>JPG/JPEG, PNG or SVG. Max size of 512kb</div>
                                                </div>
                                            </label>

                                            {(() => {
                                                if(valueAvatarFileName){
                                                    return <>
                                                        <Button variant={ `link` } className={ `px-0 text-red-500 py-1 !h-auto leading-none` } onClick={() => {
                                                            let fileInput = document.getElementById('input_profile-avatar_file') as InputElement;
                                                            if(fileInput){
                                                                console.log(fileInput);
                                                                fileInput.value = '';
                                                                setValueAvatarFile([]);
                                                                setValueAvatarFileName('');
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
                            <Input value={ valueName } onChange={(e) => setValueName(e.target.value)} placeholder={ `Name` } className={ `${errorBag?.name ? ` !border-red-500` : ''}` }/>
                            
                            <ErrorMessage message={ errorBag?.name }/>
                        </div>

                        {/* Email */}
                        <div className={ `form--group` }>
                            <label className={ `form--label` }>Email</label>
                            <Input value={ valueEmail } onChange={(e) => setValueEmail(e.target.value)} placeholder={ `Email` } className={ `${errorBag?.email ? ` !border-red-500` : ''}` }/>
                            
                            <ErrorMessage message={ errorBag?.email }/>
                        </div>

                        {/* Username */}
                        <div className={ `form--group` }>
                            <label className={ `form--label` }>Username</label>
                            <Input value={ valueUsername } onChange={(e) => setValueUsername(e.target.value)} placeholder={ `Username` } className={ `${errorBag?.username ? ` !border-red-500` : ''}` }/>
                            
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
