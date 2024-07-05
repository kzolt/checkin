'use server'

import { createId } from '@paralleldrive/cuid2'
import { revalidateTag } from 'next/cache'
import { eq } from 'drizzle-orm'

import { z } from 'zod'
import { db } from '~/server/db'
import { signins } from '~/server/db/schema'

const signInSchema = z.object({
    ninja_name: z.string().refine((value) => value !== '', 'Please enter a name')
})

const signOutSchema = z.object({
    id: z.string(),
    guardian_signature: z.string().refine((value) => value !== '', 'Please enter a name')
})

export async function sign_in_action(
    prev_state: {
        success: boolean
        errors?: { ninja_name?: string[] | undefined }
    },
    form_data: FormData
) {
    const validateFields = signInSchema.safeParse({
        ninja_name: form_data.get('ninja_name')
    })

    if (!validateFields.success) {
        return {
            success: false,
            errors: validateFields.error.flatten().fieldErrors
        }
    }

    await db.insert(signins).values({
        id: createId(),
        ninja_name: validateFields.data.ninja_name
    })

    revalidateTag('ninjas')

    return {
        success: true
    }
}

export async function sign_out_action(
    prev_state: {
        success: boolean
        errors?: { guardian_signature?: string[] | undefined; id?: string[] | undefined }
    },
    form_data: FormData
) {
    const validateFields = signOutSchema.safeParse({
        id: form_data.get('id'),
        guardian_signature: form_data.get('guardian_signature')
    })

    if (!validateFields.success) {
        return {
            success: false,
            errors: validateFields.error.flatten().fieldErrors
        }
    }

    await db
        .update(signins)
        .set({
            time_out: new Date(),
            guardian_signature: validateFields.data.guardian_signature,
            checked_out: true
        })
        .where(eq(signins.id, validateFields.data.id))

    revalidateTag('ninjas')

    return {
        success: true
    }
}
