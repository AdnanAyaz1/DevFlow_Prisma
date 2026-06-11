'use client'
import { toast } from '@/hooks/use-toast'


const Toast = ({title, description, variant}: {title: string, description: string, variant: "success" | "destructive" }) => {
  return (
    toast({
        title,
        description,
        variant
    })
  )
}

export default Toast