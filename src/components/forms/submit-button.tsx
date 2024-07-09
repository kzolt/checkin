'use client'

import { useFormStatus } from 'react-dom'

import { Button } from '~/components/ui/button'

export default function SubmitButton(props: { text: string }) {
    const { pending } = useFormStatus()

    return (
        <Button type="submit" disabled={pending} className="disabled:opacity-50">
            {props.text}
        </Button>
    )
}
