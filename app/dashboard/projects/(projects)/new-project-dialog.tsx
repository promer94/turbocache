'use client'
import { PlusIcon, HelpCircleIcon, Loader2 } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/radix-tooltip'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/radix-dialog'
import { Input } from '~/components/ui/radix-input'
import { Label } from '~/components/ui/radix-label'
import { cn } from '~/lib/utils'
import { useState, useTransition } from 'react'
import useSWRMutation from 'swr/mutation'
import ky from 'ky'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import is from '@sindresorhus/is'

interface FormState {
  name: string
  slug?: string
  description?: string
}

const Form = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const router = useRouter()
  const [isPending, start] = useTransition()
  const {
    register,
    handleSubmit,
    formState: { errors, isValidating },
  } = useForm<FormState>({
    mode: 'onBlur',
  })
  const { trigger, isMutating } = useSWRMutation(
    '/api/v1/admin/project',
    (
      url,
      {
        arg,
      }: {
        arg: FormState
      }
    ) => ky.post(url, { json: arg }).json()
  )
  return (
    <DialogContent
      className={cn('sm:max-w-[425px]', {
        'pointer-events-none opacity-70': isPending || isMutating,
      })}
    >
      <DialogHeader>
        <DialogTitle>Create a new Project</DialogTitle>
        <DialogDescription>Speed up your monorepeo now !</DialogDescription>
      </DialogHeader>
      <form
        onSubmit={handleSubmit((data) =>
          trigger(data, {
            onSuccess: () => {
              start(() => {
                setOpen(false)
                router.refresh()
              })
            },
            throwOnError: true,
          })
        )}
      >
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-gray-600">
              Name
            </Label>
            <Input id="name" {...register('name')} />
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="slug"
              className="flex items-center gap-2 text-gray-600"
            >
              Slug
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircleIcon className="h-4 w-4"></HelpCircleIcon>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>A unique string to identify your team</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input
              id="slug"
              {...register('slug', {
                validate: async (value) => {
                  if (is.nonEmptyString(value)) {
                    const res = await ky
                      .get(`/api/v1/admin/slug/check?slug=${value}`)
                      .json<{ used: boolean }>()
                    return !res.used
                  }
                  return true
                },
              })}
            />
            {errors.slug?.type === 'validate' ? (
              <p className="text-sm text-red-500">
                <span className="font-bold">Error:</span> The specified project
                slug is already in use
              </p>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description" className="text-gray-600">
              Description
            </Label>
            <Input id="description" {...register('description')} />
          </div>
        </div>
        <DialogFooter>
          <button
            disabled={isMutating || isPending || isValidating}
            type="submit"
            className="w-min-[96px] h-min-[72px] flex items-center gap-2 rounded-md bg-green-100 px-3 py-2 text-sm font-bold text-green-600 hover:text-green-800 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 disabled:opacity-50"
          >
            {isMutating ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Submit
          </button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}

export default function NewProjectDialog() {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={cn(
            'flex w-[80px] items-center justify-center gap-1',
            'rounded-md bg-green-100 text-green-600 hover:text-green-800',
            'px-3 py-2',
            'focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2',
            'disabled:pointer-events-none disabled:opacity-5'
          )}
          type="button"
        >
          <PlusIcon className="h-4 w-4"></PlusIcon>
          <div className="text-sm font-bold">New</div>
        </button>
      </DialogTrigger>
      {open ? <Form setOpen={setOpen} /> : null}
    </Dialog>
  )
}
