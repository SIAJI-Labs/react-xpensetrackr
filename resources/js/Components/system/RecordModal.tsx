import { useEffect, useMemo, useState } from 'react';
import { format } from "date-fns"

// Script
import { ucwords } from '../../function';
// Plugins
import { IMaskMixin } from 'react-imask';
import { Calendar as CalendarIcon, Check, ChevronsUpDown } from "lucide-react";

// Shadcn
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/Components/ui/dialog';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/Components/ui/command';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover';
import { ScrollArea } from '@/Components/ui/scroll-area';
import { Textarea } from '@/Components/ui/textarea';
import { Calendar } from '@/Components/ui/calendar';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Checkbox } from '@/Components/ui/checkbox';

export default function RecordModal({ openState = false }: { openState: boolean }){
    const [openRecordDialog, setOpenRecordDialog] = useState<boolean>(openState);
    // Generate random string as section-key
    let r = (Math.random() + 1).toString(36).substring(7);

    return (
        <section key={r}>
            
        </section>
    );
}