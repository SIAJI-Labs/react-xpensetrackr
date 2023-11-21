import { Head, router } from "@inertiajs/react";
import { PageProps, WalletItem } from "@/types";
import { useIsFirstRender } from "@/lib/utils";
import { useEffect, useState } from "react";

// Plugins
import '@/../plugins/nestable/css/nestable.scss';
import '@/../plugins/nestable/js/nestable';
import { v4 as uuidv4 } from 'uuid';

// Partials
import TemplateBackButton from "@/Components/template/TemplateBackButton";
import TemplateNoData from "@/Components/template/TemplateNoData";
import SystemLayout from "@/Layouts/SystemLayout";

// Shadcn
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { useToast } from "@/Components/ui/use-toast";
import axios, { AxiosError } from "axios";
import { abort } from "process";

// Props
type WalletReOrderProps = {
    listWallet: WalletItem
}

export default function Index({ auth, listWallet }: PageProps<WalletReOrderProps>) {
    const isFirstRender = useIsFirstRender();
    const { toast } = useToast();

    const [key, setKey] = useState<string>('');
    const generateKey = (): string => {
        return uuidv4();
    }
    
    // Initialize variable
    let exitFunct = false;
    let nestableInstance: any = null;
    const initNestable = () => {
        if(typeof nestableInstance !== 'undefined' && typeof nestableInstance === 'object' && nestableInstance !== null){
            nestableInstance.destroy();
        }
        
        nestableInstance = new Nestable("#wallet-list", {
            maxDepth: 1,
            animation: 150
        });

        // Listen to event
        nestableInstance.on("stop", (event: any) => {
            if(typeof exitFunct !== 'undefined' && exitFunct){
                // Generate key
                setKey(generateKey());

                toast({
                    title: "Action: Failed",
                    description: "Something went wrong",
                });
                return;
            }

            let activeEl = event.movedNode;
            let parentEl = event.newParentItem;
            // Check if moved node has child
            activeEl.childNodes.forEach((el:any) => {
                if(el.classList.contains('nst-list') && event.newParent && parentEl !== null){                    
                    exitFunct = true;
                }
            }); 
            if(typeof exitFunct !== 'undefined' && exitFunct){
                // Generate key
                setKey(generateKey());

                toast({
                    title: "Action: Failed",
                    description: "Parent data cannot be moved inside another parent data!",
                });
                return;
            }

            if(parentEl === null || parentEl === undefined){
                // ActiveEl is stand alone
                if(event.newParent && event.originalParent !== event.newParent){
                    if(activeEl.hasAttribute('data-parent_id')){
                        // Check if activeEl has data-parent_id attribute
                        activeEl.removeAttribute('data-parent_id');
                    }

                    if(activeEl.querySelector('.item_parent-name')){
                        activeEl.querySelector('.item_parent-name').remove();
                    }
                }
            } else {
                // ActiveEl is moved to child position
                if(!(activeEl.hasAttribute('data-parent_id'))){
                    activeEl.dataset.parent_id = parentEl.dataset.wallet_id;
                }

                if(!activeEl.querySelector('.item_parent-name')){
                    activeEl.querySelector('.item-name').insertAdjacentHTML('afterbegin', `
                        <p class="item_parent-name" data-name="${parentEl.querySelector('.item-name').dataset.name}">${parentEl.querySelector('.item-name').dataset.name} - </p>
                    `);
                } else if(activeEl.dataset.parent_id !== parentEl.dataset.wallet_id){
                    if(activeEl.querySelector('.item_parent-name')){
                        activeEl.querySelector('.item_parent-name').innerHTML = `${parentEl.querySelector('.item-name').dataset.name} - `;
                    }
                }
            }

            let serialize: any[] = [];
            (event.hierarchy).forEach((e: any) => {
                let child: any[] = [];
                // Check if active el has child
                if(e.children !== undefined){
                    (e.children).forEach((ec: any) => {
                        child.push({
                            'id': ec.node.dataset.wallet_id
                        });
                    });
                }

                if(child.length > 0){
                    // Push child arr if exists
                    serialize.push({
                        'id': e.node.dataset.wallet_id,
                        'child': child
                    });
                } else {
                    serialize.push({
                        'id': e.node.dataset.wallet_id
                    });
                }
                
            });
            updateHierarchy(serialize);
        });
    }
    useEffect(() => {
        if(isFirstRender){
            // Generate key
            setKey(generateKey());
        }
    });
    useEffect(() => {
        // Generate Nestable
        initNestable();
    }, [key]);
    // Handle update
    let updateHierarchyAbortController: AbortController | null = null;
    const updateHierarchy = (hierarchy: any) => {
        // Cancel previous request
        if(updateHierarchyAbortController instanceof AbortController){
            updateHierarchyAbortController.abort();
        }

        // Create a new AbortController
        const abortController = new AbortController();
        // Store the AbortController in state
        updateHierarchyAbortController = abortController;

        let formData = new FormData();
            formData.append('hierarchy', JSON.stringify(hierarchy));
            const response = axios.post(`${route('api.wallet.v1.re-order')}`, formData, {
            cancelToken: new axios.CancelToken(function executor(c) {
                // Create a CancelToken using Axios, which is equivalent to AbortController.signal
                abortController.abort = c;
            })
        }).then((response) => {
            toast({
                title: "Action: Success",
                description: "Wallet order successfully updated",
            });

        }).catch((response) => {
            const axiosError = response as AxiosError;
        }).finally(() => {
            // Clear the AbortController from state
            updateHierarchyAbortController = null;
        });
    }

    useEffect(() => {
        const handlePopstate = () => {
            // This function will be called when the user navigates through the history
            console.log('User navigated in history');
            console.log(updateHierarchyAbortController);
            if(updateHierarchyAbortController instanceof AbortController){
                updateHierarchyAbortController.abort();
            }
        };
    
        // Attach the event listener when the component mounts
        window.addEventListener('popstate', handlePopstate);
    
        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('popstate', handlePopstate);
        };
    });

    return (
        <SystemLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Wallet Re-Order</h2>}
            fabAction={ [`wallet`] }
            key={ key }
        >
            <Head title="Wallet Re-Order" />

            <div className="flex flex-col gap-6">
                <TemplateBackButton className={ `px-0` }/>
            </div>

            <Card className={ ` w-full` }>
                <CardHeader>
                    <div className={ ` flex flex-row justify-between items-start` }>
                        <div>
                            <CardTitle>
                                <div>Wallet: Re-Order</div>
                            </CardTitle>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className={ `sa-sortable` }>
                        {(() => {
                            let defaultContent = <TemplateNoData/>;
                            let lists: any[] = [];

                            Object.values(listWallet).forEach((val, index) => {
                                let childs: any[] = [];
                                if(val.child){
                                    Object.values(val.child as WalletItem).forEach((child, child_index) => {
                                        childs.push(
                                            <li data-wallet_id={ child.uuid } data-parent_id={ val.uuid } key={ `child_item-${child.uuid}` }>
                                                <div className={ `nst-handle custom-handle` }>
                                                    <i className={ `fa-solid fa-grip-vertical` }></i>
                                                </div>
                                                <span className={ `item-name` } data-name={ child.name }><p className={ `item_parent-name` } data-name={ val.name }>{ val.name } - </p>{ child.name }</span>
                                            </li>
                                        );
                                    });
                                }

                                lists.push(
                                    <li key={ `sort_${index}` } data-wallet_id={ val.uuid }>
                                        <div className={ `nst-handle custom-handle` }>
                                            <i className={ `fa-solid fa-grip-vertical` }></i>
                                        </div>

                                        <span className={ `item-name` } data-name={ val.name }>{ val.name }</span>

                                        {(() => {
                                            if(childs.length > 0){
                                                return (
                                                    <ol data-wallet_id={ val.uuid } key={ `parent_wallet-${val.uuid}` }>
                                                        {childs}
                                                    </ol>
                                                );
                                            }

                                            return <></>;
                                        })()}
                                    </li>
                                );
                            });

                            if(lists.length > 0){
                                return (
                                    <ol id="wallet-list">
                                        {lists}
                                    </ol>
                                );
                            }

                            return defaultContent;
                        })()}
                    </div>
                </CardContent>
            </Card>
        </SystemLayout>
    );
}