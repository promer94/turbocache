'use client'
import { Input } from '~/components/ui/radix-input'
import { Label } from '~/components/ui/radix-label'
import { cn } from '~/lib/utils'
import { useForm } from 'react-hook-form'
import useSWRMutation from 'swr/mutation'
import ky from 'ky'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { Loader2 } from 'lucide-react'

interface FormState {
  name: string
}

interface Props {
  initialName: string
}

const SettingForm = ({ initialName }: Props) => {
  const router = useRouter()
  const [_, start] = useTransition()
  const { register, handleSubmit } = useForm<FormState>({
    mode: 'onBlur',
    defaultValues: {
      name: initialName,
    },
  })
  const { trigger, isMutating } = useSWRMutation(
    '/api/v1/admin/setting',
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
    <form
      className="rounded-lg border"
      onSubmit={handleSubmit((data) =>
        trigger(data, {
          onSuccess: async () => {
            start(() => {
              router.refresh()
            })
          },
        })
      )}
    >
      <div className="flex flex-col gap-4 p-6">
        <Label htmlFor="name" className="text-2xl font-bold">
          Username
        </Label>
        <div className="text-sm">
          Please enter your display name you are comfortable with.
        </div>
        <Input id="name" className="max-w-md" {...register('name')}></Input>
      </div>
      <div className="flex items-center justify-between border-t px-6 py-4">
        <div>Please use 32 characters at maximum.</div>
        <button
          className={cn(
            'flex items-center justify-center gap-1',
            'rounded-md bg-green-100 font-semibold text-green-600 hover:text-green-800',
            'px-3 py-2',
            'focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2',
            'disabled:pointer-events-none disabled:opacity-5'
          )}
          type="submit"
        >
          {isMutating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Save
        </button>
      </div>
    </form>
  )
}

export default SettingForm
