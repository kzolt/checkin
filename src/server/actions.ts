'use server'

import { createId } from '@paralleldrive/cuid2'
import { db } from '~/server/db'
import { signins } from '~/server/db/schema'
import { z } from 'zod'

export type SignInAction = {
    success: boolean
    errors?: { ninja_name?: string[] | undefined }
}

const signInSchema = z.object({
    ninja_name: z.string().refine((value) => value !== '', 'Please enter a name')
})

export async function sign_in_action(prev_state: SignInAction, form_data: FormData) {
    const validateFields = signInSchema.safeParse({
        ninja_name: form_data.get('ninja_name')
    })

    if (!validateFields.success) {
        return {
            success: false,
            errors: validateFields.error.flatten().fieldErrors
        }
    }

    // await db.insert(signins).values({
    //     id: createId(),
    //     ninja_name: ninja_name
    // })

    console.log(validateFields.data.ninja_name)
    return {
        success: true
    }
}
