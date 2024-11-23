'use server'

import { createId } from '@paralleldrive/cuid2'
import { revalidateTag } from 'next/cache'
import { eq } from 'drizzle-orm'

import { z } from 'zod'
import { db } from '~/server/db'
import { signins } from '~/server/db/schema'

const signInSchema = z.object({
    center: z.literal('northridge').or(z.literal('silverlake').or(z.literal('altadena'))),
    ninja_name: z.string().refine((value) => value !== '', 'Please enter a name'),
    phone_number: z
        .string()
        .refine((value) => value !== '', 'Please enter a phone number'),
    dropoff_guardian: z
        .string()
        .refine((value) => value !== '', "Please enter the guardian's name"),
    pickup_guardian: z.string().optional()
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
        center: form_data.get('center'),
        ninja_name: form_data.get('ninja_name'),
        phone_number: form_data.get('phone_number'),
        dropoff_guardian: form_data.get('dropoff_guardian'),
        pickup_guardian: form_data.get('pickup_guardian')
    })

    if (!validateFields.success) {
        return {
            success: false,
            errors: validateFields.error.flatten().fieldErrors
        }
    }

    await db.insert(signins).values({
        id: createId(),
        ninja_name: validateFields.data.ninja_name,
        center: validateFields.data.center,
        phone_number: validateFields.data.phone_number,
        dropoff_guardian: validateFields.data.dropoff_guardian,
        pickup_guardian: validateFields.data.pickup_guardian
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
            actual_pickup_guardian: validateFields.data.guardian_signature,
            checked_out: true
        })
        .where(eq(signins.id, validateFields.data.id))

    revalidateTag('ninjas')

    return {
        success: true
    }
}
