import { useIsFirstRender } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import { WalletShareItem } from "@/types";
import { useEffect, useState } from "react";
import axios from "axios";

// Shadcn
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/Components/ui/drawer";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Button } from "@/Components/ui/button";
import { toast } from "sonner";
import { Input } from "@/Components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider } from "@/Components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import moment from "moment";

type dialogProps = {
    openState: boolean;
    setOpenState: (isOpen: boolean) => void;
};

export default function WalletSharePromptDialog({ openState, setOpenState }: dialogProps){
    const isFirstRender = useIsFirstRender();
    const isDesktop = useMediaQuery("(min-width: 768px)");

    // Dialog Action
    useEffect(() => {
        if(openState){
            document.dispatchEvent(new CustomEvent('dialog.wallet-share.prompt-shown', { bubbles: true }));
        } else {
            // Announce Dialog Global Event
            document.dispatchEvent(new CustomEvent('dialog.wallet-share.prompt-hidden', { bubbles: true }))
        }
    }, [openState]);

    const [walletShare, setWalletShare] = useState<WalletShareItem>();
    // Document Ready
    const [walletShareFetchAbortController, setWalletShareFetchAbortController] = useState<AbortController | null>(null);
    const fetchWalletShareData = async (uuid: string, action: string = 'detail') => {
        // Cancel previous request
        if(walletShareFetchAbortController instanceof AbortController){
            walletShareFetchAbortController.abort();
        }

        // Create a new AbortController
        const abortController = new AbortController();
        // Store the AbortController in state
        setWalletShareFetchAbortController(abortController);
        
        // Fetch
        try {
            const response = await axios.get(`${route('api.wallet-share.v1.show', uuid)}?action=${action}`, {
                cancelToken: new axios.CancelToken(function executor(c) {
                    // Create a CancelToken using Axios, which is equivalent to AbortController.signal
                    abortController.abort = c;
                })
            });
        
            // Use response.data instead of req.json() to get the JSON data
            let jsonResponse = response.data;

            return jsonResponse.result.data;
        } catch (error) {
            if (axios.isCancel(error)) {
                // Handle the cancellation here if needed
                console.log('Request was canceled', error);
            } else {
                // Handle other errors
                console.error('Error:', error);
            }
        }

        return [];
    }
    useEffect(() => {
        // Listen to Edit Action
        const editAction = (event: any) => {
            if(event?.detail?.uuid){
                let uuid = event.detail.uuid;

                // Fetch Data
                fetchWalletShareData(uuid, 'edit').then((data: WalletShareItem) => {
                    // Update State
                    setWalletShare(data);

                    // Open record-dialog
                    setTimeout(() => {
                        setOpenState(true);
                    }, 100);
                });
            } else {
                setOpenState(true);
            }
        }
        document.addEventListener('wallet-share.share-prompt', editAction);
        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('wallet-share.share-prompt', editAction);
        };
    }, []);

    // Tooltip
    const [tooltipOpenState, setTooltipOpenState] = useState<boolean>(false);
    const [tooltipTextContent, setTooltipTextContent] = useState<string>('Copy');

    // Handle Copy Action
    const handleCopyAction = () => {
        if(document.getElementById('share-token')){
            let token = (document.getElementById('share-token') as HTMLFormElement).value;
            navigator.clipboard.writeText(token);

            setTooltipOpenState(true);
            setTooltipTextContent('Copied');
    
            setTimeout(() => {
                setTooltipTextContent('Copy');
            }, 5000);
        }
    }

    const formContent = <>
        <div className={ ` p-4 border-y flex flex-col gap-4` }>
            <div className={ ` flex flex-col gap-1` }>
                <span>Copy link below to give other access to your shared data</span>
                {(() => {
                    if(walletShare){
                        return <div className={ ` flex flex-row gap-4` }>
                            <Input value={ route('public.wallet-share', {
                                'token': walletShare?.token
                            }) } id="share-token" className={ ` hover:cursor-pointer select-none` } onChange={() => {}} readOnly onMouseEnter={() => {
                                setTooltipOpenState(true);
                            }} onMouseLeave={() => {
                                setTooltipOpenState(false);
                                setTooltipTextContent('Copy');
                            }} onClick={handleCopyAction}/>

                            <div className={ ` flex flex-row gap-2` }>
                                <TooltipProvider>
                                    <Tooltip open={ tooltipOpenState } onOpenChange={ setTooltipOpenState }>
                                        <TooltipTrigger asChild>
                                            <Button type={ `button` } variant={ `outline` } className={ `aspect-square` } onMouseEnter={() => {
                                                setTooltipOpenState(true);
                                            }} onMouseLeave={() => {
                                                setTooltipOpenState(false);
                                                setTooltipTextContent('Copy');
                                            }} onClick={handleCopyAction}>
                                                <i className={ `fa-regular fa-copy` }></i>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <span>{ tooltipTextContent }</span>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button type={ `button` } variant={ `outline` } className={ `aspect-square` } onClick={() => {
                                                window.open(route('public.wallet-share', {
                                                    'token': walletShare?.token
                                                }));
                                            }}>
                                                <i className={ `fa-solid fa-arrow-up-right-from-square` }></i>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <span>Open</span>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>;
                    }

                    return <></>;
                })()}
            </div>

            {(() => {
                if(walletShare?.passphrase){
                    return <Alert className={ ` flex flex-row gap-4` }>
                        <i className={ ` fa-solid fa-lock` }></i>
                        <div className={ `` }>
                            <AlertTitle>Passphrase Required</AlertTitle>
                            <AlertDescription>Passphrase is required to access related data</AlertDescription>
                        </div>
                    </Alert>
                }

                return <></>;
            })()}

            {(() => {
                if(walletShare?.valid_until){
                    return <Alert className={ ` flex flex-row gap-4` } variant={ moment(moment(walletShare.valid_until).format('YYYY-MM-DD')) < moment(moment().format('YYYY-MM-DD')) ? `destructive` : `default` }>
                        <i className={ ` fa-solid fa-clock` }></i>
                        <div className={ `` }>
                            <AlertTitle>Limited Access{ moment(moment(walletShare.valid_until).format('YYYY-MM-DD')) < moment(moment().format('YYYY-MM-DD')) ? `(Expired)` : `` }</AlertTitle>
                            <AlertDescription>Related shared data can be accessed until <u>{moment(walletShare.valid_until).format('Do MMM, YYYY')}</u></AlertDescription>
                        </div>
                    </Alert>
                }

                return <></>;
            })()}
        </div>
    </>;

    if(!isDesktop){
        return (
            <section id={ `walletShare-dialogShareSection` }>
                <Drawer open={openState} onOpenChange={setOpenState}>
                    <DrawerContent className={ ` max-h-dvh` }>
                        <DrawerHeader className="text-left">
                            <DrawerTitle className={ ` text-center` }>Share</DrawerTitle>
                        </DrawerHeader>

                        {formContent}

                        <DrawerFooter className="pt-2">
                            <DrawerClose asChild>
                                <Button variant={ `outline` } type='button' id='walletShare-dialogShare'>Close</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </section>
        );
    }

    return (
        <section id={ `walletShare-dialogShareSection` }>
            <Dialog open={openState} onOpenChange={setOpenState}>
                <DialogContent className=" flex flex-col h-auto max-lg:bottom-0 max-lg:top-[unset] max-lg:translate-y-0 lg:min-w-[400px] p-0" data-type="wallet_share-dialog">
                    <DialogHeader className={ ` p-6 pb-2` }>
                        <DialogTitle className={ ` dark:text-white` }>Share</DialogTitle>
                    </DialogHeader>

                    { formContent }
                    
                    <DialogFooter className={ ` p-6 pt-2` }>
                        <DialogClose asChild>
                            <Button variant={ `outline` } type='button' id='walletShare-dialogShare'>Close</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    );
}