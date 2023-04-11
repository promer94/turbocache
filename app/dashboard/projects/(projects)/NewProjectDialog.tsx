import { PlusIcon, HelpCircleIcon, Loader2 } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/Tooltip'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/Dialog'
import { Input } from '~/components/ui/Input'
import { Label } from '~/components/ui/Label'
import { cn } from '~/lib/utils'
import { useState, useTransition } from 'react'
import useSWRMutation from 'swr/mutation'
import ky from 'ky'
import { useRouter } from 'next/navigation'

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement
  slug: HTMLInputElement
}
interface NameAndSlugForm extends HTMLFormElement {
  readonly elements: FormElements
}

export function NewProjectDialog() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const [isPending, start] = useTransition()
  const { trigger, isMutating } = useSWRMutation(
    '/api/v1/admin/project',
    (
      url,
      {
        arg,
      }: {
        arg: { name?: string; slug?: string }
      }
    ) => ky.post(url, { json: arg }).json()
  )
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={cn(
            'flex w-[80px] items-center justify-center gap-1',
            'rounded-md bg-green-200 text-green-500 hover:text-green-600',
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
          onSubmit={(e: React.FormEvent<NameAndSlugForm>) => {
            e.preventDefault()
            const { name, slug } = e.currentTarget.elements
            trigger(
              { name: name.value, slug: slug.value },
              {
                onSuccess: () => {
                  start(() => {
                    setOpen(false)
                    router.refresh()
                  })
                },
                throwOnError: false,
              }
            )
          }}
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="name" className="text-gray-600">
                Name
              </Label>
              <Input id="name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
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
                      <p>Slug needs to be unique</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input id="slug" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <button
              disabled={isMutating || isPending}
              type="submit"
              className="w-min-[96px] h-min-[72px] flex items-center gap-2 rounded-md bg-green-100 px-3 py-2 text-sm font-bold text-green-600 hover:text-green-800 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 disabled:opacity-50"
            >
              {isMutating ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Submit
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
